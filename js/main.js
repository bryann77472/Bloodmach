/* ============================================================
   BLOODMACH — main.js
   Fluxo do jogo: novo jogo, camadas, batalhas, progressão e final.
   ============================================================ */
var BM = (window.BM = window.BM || {});

BM.main = (function () {
  'use strict';
  const D = BM.DATA;

  let pending = null;   // { type:'tutorial'|'layer', layerIndex, enemyId }
  let battleHandled = false; // impede que o resultado seja processado duas vezes
  let currentHp = null; // HP do V1 entre batalhas da camada

  /* ---------------- boot ---------------- */
  function boot() {
    BM.save.load();
    BM.save.applySettings();
    BM.ui.title();
    document.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') {
        const c = BM.ui.current;
        if (c === 'options' || c === 'credits') { BM.audio.play('cancel'); backFromOptions(); }
      }
    });
  }

  /* ---------------- título ---------------- */
  function playPressed() {
    BM.audio.ensure();
    // cada dificuldade tem seu próprio save: o jogador escolhe qual jogar
    BM.ui.savePick(function (diff, isNew) {
      if (isNew) newGame(diff); else continueGame();
    });
  }

  function newGame(diff) {
    BM.save.newGame(diff);
    BM.save.applySettings();
    BM.audio.ensure();
    BM.audio.startAmbient();
    BM.ui.dialogue(D.STORY.intro, function () { beginTutorial(); });
  }

  function continueGame() {
    const d = BM.save.get();
    BM.audio.startAmbient();
    if (!d.flags.tutorial) { beginTutorial(); return; }
    currentHp = null;
    BM.ui.lobby();
  }

  function beginTutorial() {
    battleHandled = false;
    pending = { type: 'tutorial' };
    BM.battle.start({ enemyId: 'husk', layerIndex: 0 });
    BM.ui.battle();
  }

  /* ---------------- camadas ---------------- */
  function startLayer(index) {
    const d = BM.save.get();
    d.progress.layer = index;
    d.progress.node = 0;
    currentHp = null;
    BM.save.resetLayerStats();
    BM.save.persist();
    BM.audio.play('confirm');
    const camada = D.LAYERS[index];
    const fala = D.STORY[camada.id + 'Start'];
    if (fala && !d.flags['camada' + index + 'Vista']) {
      d.flags['camada' + index + 'Vista'] = true;
      BM.save.persist();
      BM.ui.dialogue(fala, function () { BM.ui.layerMap(index); });
      return;
    }
    BM.ui.layerMap(index);
  }

  function startBattle(enemyId, layerIndex) {
    if (BM.battle.state && !BM.battle.state.over) return; // já existe uma batalha em andamento
    battleHandled = false;
    const d = BM.save.get();
    const st = BM.save.v1Stats();
    const L = D.LAYERS[layerIndex];
    const node = d.progress.node;
    if (currentHp == null) currentHp = st.maxHp;
    pending = { type: 'layer', layerIndex: layerIndex, enemyId: enemyId };
    const enemyDef = D.ENEMIES[enemyId];
    function comecar() {
      BM.battle.start({ enemyId: enemyId, layerIndex: layerIndex, hp: currentHp });
      BM.ui.battle();
    }
    // cutscene de entrada: somente os chefes têm (aparece sem falar)
    if (enemyDef && enemyDef.boss) BM.ui.enemyIntro(enemyId, layerIndex, comecar);
    else comecar();
  }

  /* ---------------- fim de batalha ---------------- */
  function onBattleOver(result) {
    const S = BM.battle.state;
    if (!S || S.overHandled) return;
    S.overHandled = true;
    const d = BM.save.get();
    d.stats.batalhas++;
    BM.save.persist();

    if (result === 'win') {
      d.stats.vitorias++;
      const en = D.ENEMIES[S.enemy.id];
      const rank = BM.battle.styleRank();
      const diff = D.DIFFICULTIES[d.settings.dificuldade] || D.DIFFICULTIES.normal;
      const scrap = Math.round(en.scrap * rank.mult * diff.scrap);
      const xp = en.exp;
      // recursos ficam acumulados: só entram na mochila ao concluir a camada
      BM.save.addPending('scrap', scrap);
      BM.save.addPending('xp', xp);
      d.stats.estiloMax = Math.max(d.stats.estiloMax, S.style.points);
      currentHp = Math.min(BM.save.v1Stats().maxHp, S.player.hp + Math.round(BM.save.v1Stats().maxHp * 0.12));
      BM.save.persist();
      const acum = BM.save.pending();
      BM.ui.result({
        result: 'win', rank: rank, stylePoints: S.style.points,
        scrap: acum.scrap, xp: acum.xp, levels: [], enemyName: S.enemy.name
      });
    } else if (result === 'lose') {
      d.stats.mortes++;
      BM.save.persist();
      currentHp = null;
      const li = pending && pending.type === 'layer' ? pending.layerIndex : d.progress.layer;
      // música de desligamento do V1 + cutscene: ele desliga e cai, depois game over
      BM.audio.playMusic('desligamento');
      BM.ui.deathScene(function () {
        BM.ui.gameOver({
          layerIndex: li,
          layerName: D.LAYERS[li].name,
          wins: d.progress.node,
          kit: BM.save.itemCount('kit_reparo') > 0
        });
      });
    } else if (result === 'fugiu') {
      // o inimigo escapou: sem recompensas, mas a camada continua
      BM.audio.play('warn');
      const enF = D.ENEMIES[S.enemy.id];
      const bossF = !!enF.boss;
      BM.ui.result({ result: 'fugiu', enemyName: S.enemy.name });
      pending = pending || {};
      pending.bossFugiu = bossF;
    } else {
      BM.audio.play('cancel');
      BM.ui.result({ result: 'fled' });
    }
  }

  function afterBattle(info) {
    if (battleHandled) return;
    battleHandled = true;
    const d = BM.save.get();
    if (info.result === 'win') {
      const S = BM.battle.state;
      BM.battle.end();
      if (pending && pending.type === 'tutorial') {
        d.flags.tutorial = true;
        BM.save.persist();
        currentHp = null;
        BM.ui.lobby();
        return;
      }
      const layerIndex = pending ? pending.layerIndex : d.progress.layer;
      d.progress.node++;
      BM.save.persist();
      if (S && S.enemy.isBoss) {
        onBossDefeated(layerIndex, S.enemy.id);
        return;
      }
      BM.ui.layerMap(layerIndex);
    } else if (info.result === 'fugiu') {
      // o inimigo escapou: segue para o próximo (ou encerra a camada se era o chefe)
      BM.battle.end();
      const layerIndexF = pending && pending.type === 'layer' ? pending.layerIndex : d.progress.layer;
      if (pending && pending.bossFugiu) {
        d.flags['camada' + layerIndexF + 'Feita'] = true;
        // o V2 foge em vez de morrer, mas o progresso conta: libera o Knuckleblaster
        if (pending.bossId === 'v2' || D.LAYERS[layerIndexF].boss === 'v2') {
          d.flags.v2Dead = true;
          d.flags.nucleo_v2 = true;
          d.progress.unlockedLayers = Math.max(d.progress.unlockedLayers, 2);
          BM.save.persist();
        }
        grantLayerCores();
        if (layerIndexF + 1 < D.LAYERS.length) d.progress.unlockedLayers = Math.max(d.progress.unlockedLayers, layerIndexF + 2);
        const pagoF = BM.save.collectPending();
        BM.ui.layerResult({ layerIndex: layerIndexF, layerName: D.LAYERS[layerIndexF].name, rank: BM.save.layerRank(D.LAYERS[layerIndexF].id), bossId: D.LAYERS[layerIndexF].boss, pago: pagoF, fugiu: true });
        return;
      }
      d.progress.node++;
      BM.save.persist();
      BM.ui.layerMap(layerIndexF);
    } else if (info.result === 'lose') {
      BM.battle.end();
      if (pending && pending.type === 'tutorial') {
        BM.ui.dialogue([
          { who: 'MOTOR', text: 'SISTEMA CRÍTICO. O V1 foi consertado de novo. Tente outra vez.', portrait: 'motor' }
        ], function () {
          pending = { type: 'tutorial' };
          BM.battle.start({ enemyId: 'husk', layerIndex: 0 });
          BM.ui.battle();
        });
        return;
      }
      const layerIndex = pending ? pending.layerIndex : d.progress.layer;
      d.progress.node = 0;
      BM.save.persist();
      BM.ui.layerMap(layerIndex);
    } else {
      BM.battle.end();
      const layerIndex = pending ? pending.layerIndex : d.progress.layer;
      BM.ui.layerMap(layerIndex);
    }
  }

  function restartLayer(index) {
    const d = BM.save.get();
    d.progress.layer = index;
    d.progress.node = 0;
    currentHp = null;
    BM.save.resetLayerStats();
    BM.save.persist();
    BM.ui.layerMap(index);
  }

  function abandonLayer(index) {
    const d = BM.save.get();
    d.progress.layer = index;
    d.progress.node = 0;
    currentHp = null;
    // recursos coletados na camada são perdidos
    BM.save.discardPending();
    BM.save.resetLayerStats();
    BM.save.persist();
    BM.ui.toast('Camada abandonada. Recursos perdidos.', 'bad');
    BM.ui.lobby();
  }

  function useRepairKit() {
    const d = BM.save.get();
    const kit = D.ITEMS.find(i => i.id === 'kit_reparo');
    if (!BM.save.useItem('kit_reparo')) return;
    const st = BM.save.v1Stats();
    currentHp = Math.round(st.maxHp * (kit && kit.revivePct ? kit.revivePct : 0.3));
    BM.audio.play('heal');
    BM.ui.toast('Kit de Reparo usado. Integridade restaurada.', 'ok');
    const layerIndex = pending && pending.type === 'layer' ? pending.layerIndex : d.progress.layer;
    if (pending && pending.type === 'tutorial') {
      pending = { type: 'tutorial' };
      BM.battle.start({ enemyId: 'husk', layerIndex: 0, hp: currentHp });
      BM.ui.battle();
      return;
    }
    BM.battle.start({ enemyId: pending ? pending.enemyId : D.LAYERS[layerIndex].encounters[0], layerIndex: layerIndex, hp: currentHp });
    BM.ui.battle();
  }

  /** Núcleos por camada concluída: 1 no Lenient, 2 no Standard/Violent. */
  function grantLayerCores() {
    const dif = BM.save.get().settings.dificuldade || 'standard';
    const qtd = dif === 'lenient' ? 1 : 2;
    BM.save.addCores(qtd);
    BM.ui.toast('+' + qtd + ' ' + (qtd > 1 ? 'NÚCLEOS' : 'NÚCLEO'), 'ok');
    return qtd;
  }

  function onBossDefeated(layerIndex, bossId) {
    const d = BM.save.get();
    if (bossId === 'v2') {
      d.flags.v2Dead = true;
      d.flags.nucleo_v2 = true;
      d.progress.unlockedLayers = Math.max(d.progress.unlockedLayers, 2);
      d.progress.node = 0;
      BM.save.persist();
    } else if (bossId === 'gabriel') {
      d.flags.gabrielDead = true;
      BM.save.persist();
    } else if (bossId === 'v2_greed') {
      // o segundo corpo de V2 cai de verdade: sem fuga, com núcleo e Hellwhip.
      // não mexe em v2Dead: as peças de Ignição/Forja continuam exigindo o V2 do Ato I.
      d.flags.nucleo_v2 = true;
      d.flags.greedV2Dead = true;
      d.flags.hellwhipUnlocked = true;
      d.progress.unlockedLayers = Math.max(d.progress.unlockedLayers, 4);
      d.progress.node = 0;
      BM.save.persist();
      BM.ui.toast('HELLWHIP E PEÇAS DE FIBRA LIBERADOS NA LOJA', 'ok');
    }
    // a camada foi concluída: libera a próxima e paga os núcleos
    d.flags['camada' + layerIndex + 'Feita'] = true;
    grantLayerCores();
    if (layerIndex + 1 < D.LAYERS.length) d.progress.unlockedLayers = Math.max(d.progress.unlockedLayers, layerIndex + 2);
    // recursos da camada entram na mochila agora (concluída)
    const pago = BM.save.collectPending();
    if (pago.levels.length) { BM.audio.play('levelup'); BM.ui.toast('NÍVEL ' + pago.levels[pago.levels.length - 1] + '!', 'ok'); }
    // rank da camada: tempo, vida perdida e estilo
    const rank = BM.save.layerRank(D.LAYERS[layerIndex].id);
    if (rank.perfeito) {
      d.flags.rankP = d.flags.rankP || {};
      if (!d.flags.rankP[layerIndex]) {
        d.flags.rankP[layerIndex] = true;
        BM.save.addScrap(500);
      }
      BM.save.persist();
    }
    BM.ui.layerResult({ layerIndex: layerIndex, layerName: D.LAYERS[layerIndex].name, rank: rank, bossId: bossId, pago: pago });
  }

  function afterLayer(info) {
    currentHp = null;
    if (info.bossId === 'v2') {
      BM.ui.dialogue(D.STORY.afterV2, function () {
        BM.ui.lobby();
      });
      return;
    }
    if (info.bossId === 'minos') {
      BM.ui.dialogue(D.STORY.afterMinos, function () {
        BM.ui.lobby();
      });
      return;
    }
    if (info.bossId === 'v2_greed') {
      BM.ui.v2Death(function () {
        BM.ui.dialogue(D.STORY.afterGreedV2, function () {
          BM.ui.lobby();
        });
      });
      return;
    }
    if (info.bossId !== 'gabriel') { BM.ui.lobby(); return; }
    BM.ui.gabrielBleed(function () {
      BM.ui.dialogue(D.STORY.gabrielAfter, function () {
        BM.ui.dialogue(D.STORY.gabrielFoge, function () {
          BM.ui.dialogue(D.STORY.ending, function () {
            BM.ui.ending();
          });
        });
      });
    });
  }

  function finishGame() {
    const d = BM.save.get();
    d.flags.ending = true;
    BM.save.persist();
    BM.ui.postCredits();
  }

  /* ---------------- telas auxiliares ---------------- */
  function openLoadout(returnTo) {
    BM.ui.loadout(returnTo || 'lobby');
  }

  function backFromOptions() {
    const d = BM.save.get();
    if (d && d.flags.tutorial) BM.ui.lobby(); else BM.ui.title();
  }

  return {
    boot, playPressed, newGame, continueGame, beginTutorial,
    startLayer, startBattle, onBattleOver, afterBattle, afterLayer, useRepairKit, restartLayer, abandonLayer,
    finishGame, openLoadout, backFromOptions
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  BM.main.boot();
});
