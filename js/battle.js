/* ============================================================
   BLOODMACH — battle.js
   Motor de batalha por turnos: dano, status, distância, estilo,
   parry, reflexo, esquiva, itens e IA inimiga.
   ============================================================ */
var BM = (window.BM = window.BM || {});

BM.battle = (function () {
  'use strict';
  const D = BM.DATA;

  let S = null;
  const ui = () => (BM.ui || {});

  /* ---------------- utilidades ---------------- */
  const rand = (a, b) => a + Math.random() * (b - a);
  const chance = p => Math.random() < p;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const MELEE_TYPES = ['corte', 'impacto', 'sangue'];
  // escala global: o V1 causes menos dano, os inimigos causam mais
  const ESCALA_JOGADOR = 0.40;
  const ESCALA_INIMIGO = 1.00;
  // ATQ/DEF de referência do V1 no nível base de cada camada (para escalar os inimigos)
  const BASE_ATK = { limbo: 38, lust: 56, gluttony: 74 };
  const BASE_DEF = { limbo: 28, lust: 40, gluttony: 52 };

  function log(msg, cls) {
    if (!S) return;
    S.log.push({ msg, cls: cls || '' });
    if (S.log.length > 40) S.log.shift();
    const u = ui();
    if (u.battleLog) u.battleLog(msg, cls);
  }
  function refresh() { const u = ui(); if (u.battleUpdate) u.battleUpdate(); }
  function shake(k) { const u = ui(); if (u.shake) u.shake(k); }
  function float(text, side, kind) { const u = ui(); if (u.floatText) u.floatText(text, side, kind); }
  function flash() { const u = ui(); if (u.flashTurn) u.flashTurn(); }

  /* ---------------- efetividade ---------------- */
  function effVs(faction, type) {
    const f = D.FACTIONS[faction];
    if (!f || !type) return 1;
    if (f.weak.indexOf(type) >= 0) return 2;
    if (f.resist.indexOf(type) >= 0) return 0.5;
    return 1;
  }

  function distMod(type, kind) {
    // retorna multiplicador de dano pela distância
    if (kind === 'explosive' || type === 'explosao' || type === 'fogo') return 1;
    if (kind === 'ranged') return S.dist === 0 ? 1.2 : (S.dist === 2 ? 0.8 : 1);
    // melee
    return S.dist === 2 ? 1.2 : (S.dist === 0 ? 0.8 : 1);
  }

  function weightScale() { return 1 - 0.10 * S.player.peso; }

  /* ---------------- status ---------------- */
  function hasStatus(e, id) { return !!(e.status && e.status[id]); }
  function addStatus(e, id, turns) {
    if (!e.status) e.status = {};
    e.status[id] = Math.max(e.status[id] || 0, turns);
  }
  function clearStatus(e, id) { if (e.status) delete e.status[id]; }

  function statusDef(entity, side) {
    if (!entity.status) return {};
    const defs = {
      sangramento: { label:'Sangramento', cls:'sangramento' },
      derretido:   { label:'Derretido',   cls:'derretido' },
      ferrugem:   { label:'Ferrugem',    cls:'ferrugem' },
      coagulo:    { label:'Coágulo',     cls:'coagulo' },
      atordoado:  { label:'Atordoado',   cls:'atordoado' },
      exposto:    { label:'Exposto',     cls:'exposto' },
      postura:    { label:'Postura',     cls:'postura' },
      paralisado: { label:'Paralisado',  cls:'atordoado' },
      veneno:     { label:'Veneno',      cls:'sangramento' },
    };
    const out = {};
    Object.keys(entity.status).forEach(k => { if (defs[k]) out[k] = defs[k]; });
    return out;
  }

  function defOf(e) {
    let d = (e.def || 0) * (1 + (e.bonusDef || 0));
    if (e.status && e.status.ferrugem) d *= 0.75;
    if (e.status && e.status.derretido) d *= 0.9;
    if (e.status && e.status.postura) d *= 1.3;
    return Math.max(1, d);
  }

  function tickStatus(e, side) {
    if (!e.status) return;
    if (e.status.sangramento) {
      const dmg = Math.max(1, Math.round(e.maxHp * 0.05));
      e.hp = Math.max(0, e.hp - dmg);
      log((side === 'player' ? 'V1' : e.name) + ' perde ' + dmg + ' HP por Sangramento.', 'hl');
      float('-' + dmg, side, 'enemy');
    }
    if (e.status.derretido) {
      const dmg = Math.max(1, Math.round(e.maxHp * 0.05));
      e.hp = Math.max(0, e.hp - dmg);
      log((side === 'player' ? 'V1' : e.name) + ' derrete e perde ' + dmg + ' HP.', 'hl');
      float('-' + dmg, side, 'enemy');
    }
    if (e.status.veneno) {
      const dmg = Math.max(1, Math.round(e.maxHp * 0.04));
      e.hp = Math.max(0, e.hp - dmg);
      log((side === 'player' ? 'V1' : e.name) + ' envenena e perde ' + dmg + ' HP.', 'hl');
      float('-' + dmg, side, 'enemy');
    }
    Object.keys(e.status).forEach(k => {
      e.status[k]--;
      if (e.status[k] <= 0) delete e.status[k];
    });
  }

  /* ---------------- cura / dano ---------------- */
  function heal(e, pct, reason) {
    if (e.status && e.status.coagulo) {
      log('Coágulo: a cura é bloqueada!', 'warn');
      return 0;
    }
    let mul = 1;
    if (S.passives.healBonus) mul += 0.25;
    if (S.layerMod && S.layerMod.healMul) mul *= S.layerMod.healMul;
    const amount = Math.round(e.maxHp * pct * mul);
    const before = e.hp;
    e.hp = Math.min(e.maxHp, e.hp + amount);
    const gained = e.hp - before;
    if (gained > 0) {
      log((e.isPlayer ? 'V1' : e.name) + ' recupera ' + gained + ' HP' + (reason ? ' (' + reason + ')' : '') + '.', 'ok');
      float('+' + gained, e.isPlayer ? 'player' : 'enemy', 'heal');
    }
    return gained;
  }

  function damage(e, amount, side) {
    e.hp = Math.max(0, e.hp - amount);
  }

  /* ---------------- estilo ---------------- */
  function styleRank() {
    const pts = S.style.points;
    let rank = D.STYLE_RANKS[0];
    for (const r of D.STYLE_RANKS) if (pts >= r.min) rank = r;
    return rank;
  }
  function addStyle(n) {
    S.style.points = Math.max(0, S.style.points + n);
    S.style.rank = styleRank();
    try { BM.save.noteLayerStyle(S.style.points); } catch (e) { /* ignora */ }
  }

  /* ---------------- aplicação de movimento ---------------- */
  function applyMove(attacker, defender, move, side) {
    const isPlayer = side === 'player';
    const target = isPlayer ? S.enemy : S.player;
    const atk = isPlayer ? S.player.atk : S.enemy.atk * (1 + (S.enemy.bonusAtk || 0));
    const lvl = isPlayer ? S.player.level : S.enemy.level;
    const def = defOf(target);
    const hits = move.hits || 1;
    let total = 0, anyHit = false, crit = false, eff = 1, parried = false;
    // teto por golpe: nenhum movimento pode levar mais que isto do HP máximo do alvo
    const capTotal = Math.round(target.maxHp * (target.isBoss ? 0.45 : 0.60));

    for (let i = 0; i < hits; i++) {
      if (Math.random() * 100 > (move.acc == null ? 100 : move.acc)) continue;
      anyHit = true;
      eff = effVs(target.faction, move.type);
      const isCrit = isPlayer ? (S.player.critNext || chance(0.0625)) : chance(0.05);
      if (isCrit) crit = true;
      const ratio = atk / Math.max(1, def);
      const mult = Math.min(1.75, 0.6 + 0.4 * ratio);
      const base = move.power * mult * (1 + lvl / 25) * ESCALA_JOGADOR;
      let d = base * eff * (isCrit ? 1.5 : 1) * rand(0.9, 1.1);
      // foco: os próximos golpes do V1 batem mais forte
      if (isPlayer && S.player.focus > 0) { d *= 1.5; S.player.focus--; }
      // bônus de ATQ por item (Tônico de Combustão)
      if (isPlayer && S.player.atkBuffTurns > 0) d *= (1 + S.player.atkBuffPct);
      // Moeda Gasta: crítico com dano extra
      if (isPlayer && S.player.critPower > 0 && isCrit) { d *= (1 + S.player.critPower); S.player.critPower = 0; }
      // passiva do Knuckleblaster empurra; passiva Hellwhip ignora penalidade de distância
      if (isPlayer && attacker.velBoost > 0) d *= 1.2;
      if (isPlayer && S.enemy.canParry && Math.random() < 0.18) { d *= 0.45; parried = true; }
      let final = move.power > 0 ? Math.max(1, Math.round(d)) : 0;   // golpes sem poder não causam dano
      if (total + final > capTotal) final = Math.max(0, capTotal - total);
      if (final <= 0) continue;
      total += final;
      damage(target, final, isPlayer ? 'player' : 'enemy');
      float('-' + final, isPlayer ? 'enemy' : 'player', isCrit ? 'crit' : '');
      if (isCrit) log('CRÍTICO!', 'warn');
      if (eff === 2) log('É super eficaz!', 'warn');
      else if (eff === 0.5) log('Não é muito eficaz...', '');
    }

    if (parried) log('V2 devolve o golpe!', 'warn');

    if (!anyHit) {
      log((isPlayer ? 'V1 erra ' : target.name + ' erra ') + move.name + '.', '');
      return { total: 0, hit: false, crit: false, eff: 1 };
    }

    // efeitos
    applyEffects(move, attacker, target, isPlayer, total);

    // passivas dos novos braços
    if (isPlayer && total > 0) {
      if (S.passives.shock && !hasStatus(target, 'paralisado') && chance(0.20)) {
        addStatus(target, 'paralisado', 1);
        log(target.name + ' fica paralisado pela estática!', 'warn');
      }
      if (S.passives.soulReduce) {
        S.player.soulReduce = Math.min(0.20, (S.player.soulReduce || 0) + 0.025);
      }
      if (S.passives.voidGrip && chance(0.25)) {
        S.enemy.cancelNext = true;
        log('O vazio desfaz o golpe do inimigo.', 'ok');
      }
    }

    // sangramento gera cura
    if (isPlayer && move.blood) heal(S.player, move.blood / 100, 'sangue');
    if (!isPlayer && move.blood) { /* inimigos não curam V1 */ }

    if (total > 0) {
      if (isPlayer) {
        log(move.name + ' causa ' + total + ' de dano.', 'hl');
        if (crit) shake(2); else shake(1);
      } else {
        log(move.name + ' causa ' + total + ' de dano em V1.', 'hl');
        shake(total > 45 ? 3 : 2);
        addStyle(-20);
      }
    }
    return { total, hit: true, crit, eff };
  }

  function applyEffects(move, attacker, target, isPlayer, dmgDealt) {
    const eff = move.effect;
    if (!eff) return;
    const partes = String(eff).split(':');
    const effKey = partes[0];
    const effVal = parseFloat(partes[1]) || 0;
    switch (effKey) {
      case 'contra':
        if (hasStatus(target, 'atordoado') || hasStatus(target, 'exposto')) {
          // dano já aplicado; bônus de 50% será somado aqui
          const bonus = Math.round(dmgDealt * 0.5);
          damage(target, bonus, isPlayer);
          float('-' + bonus, isPlayer ? 'enemy' : 'player', 'crit');
          log('Contra-Golpe acerta o ponto fraco!', 'warn');
        }
        break;
      case 'postura':
        addStatus(S.player, 'postura', 2);
        log('V1 assume postura defensiva.', 'ok');
        break;
      case 'stun':
        if (chance(0.3)) { addStatus(target, 'atordoado', 1); log(target.name + ' fica atordoado!', 'warn'); }
        break;
      case 'explodeBonus':
        if (hasStatus(target, 'exposto')) {
          const bonus = Math.round(dmgDealt * 0.5);
          damage(target, bonus, isPlayer);
          float('-' + bonus, isPlayer ? 'enemy' : 'player', 'crit');
          log('Detonação explode na brecha!', 'warn');
        }
        break;
      case 'bind':
        addStatus(target, 'ligado', 2);
        log(target.name + ' fica preso à distância.', 'warn');
        break;
      case 'pull': case 'pullExpose': case 'pullMelt':
        pullTarget(isPlayer, effKey === 'pullExpose' || effKey === 'pullMelt');
        break;
      case 'bleed':
        addStatus(target, 'sangramento', 3);
        log(target.name + ' está sangrando.', 'hl');
        break;
      case 'drain':
        heal(S.player, Math.min(0.8, (dmgDealt / S.player.maxHp) * 0.8), 'dreno');
        break;
      case 'healSelf': {
        const pct = (S.enemy.status && S.enemy.status.sangramento) ? 0.20 : 0.12;
        heal(S.player, pct, 'transfusão');
        break;
      }
      case 'feast': {
        if (target.status && target.status.sangramento) heal(S.player, Math.min(1, dmgDealt / S.player.maxHp), 'banquete');
        else log('O alvo não está sangrando.', '');
        break;
      }
      case 'melt':
        addStatus(target, 'derretido', 3);
        log(target.name + ' está Derretido!', 'warn');
        break;
      case 'meltPierce':
        if (target.status && target.status.derretido) {
          const extra = Math.round(dmgDealt * 0.5);
          damage(target, extra, isPlayer);
          float('-' + extra, isPlayer ? 'enemy' : 'player', 'crit');
          log('A corrente funde a blindagem!', 'warn');
        }
        break;
      case 'consumeMelt':
        if (target.status && target.status.derretido) {
          const extra = Math.round(dmgDealt * 0.5);
          damage(target, extra, isPlayer);
          float('-' + extra, isPlayer ? 'enemy' : 'player', 'crit');
          clearStatus(target, 'derretido');
          log('Erupção consome o Derretido!', 'warn');
        }
        break;
      case 'push':
        pushTarget(isPlayer);
        break;
      case 'ferrugem':
        addStatus(target, 'ferrugem', 3);
        log(target.name + ' está corroído.', 'warn');
        break;
      case 'approach':
        if (!isPlayer) setDist(2, 'enemy');
        break;
      case 'buffDef': case 'buffAtk':
        break;
      case 'paralyze': {
        const turnos = effVal || 1;
        addStatus(target, 'paralisado', turnos);
        log(target.name + ' fica paralisado por ' + turnos + ' turno(s)!', 'warn');
        // a gravidade cobra o preço: o inimigo volta batendo mais forte
        if (isPlayer && S.passives.gravity) S.enemy.gravityCharge = 0.30;
        break;
      }
      case 'venom': {
        let turnos = effVal || 3;
        if (isPlayer && S.passives.venom) turnos += 1;
        addStatus(target, 'veneno', turnos);
        log(target.name + ' está envenenado por ' + turnos + ' turnos.', 'hl');
        break;
      }
      case 'gravPull':
        pullTarget(isPlayer, false);
        addStatus(target, 'paralisado', 2);
        log(target.name + ' fica preso e paralisado por 2 turnos!', 'warn');
        if (isPlayer && S.passives.gravity) S.enemy.gravityCharge = 0.30;
        break;
      case 'gravPull2':
        pullTarget(isPlayer, false);
        addStatus(target, 'paralisado', 1);
        log(target.name + ' fica paralisado!', 'warn');
        if (isPlayer && S.passives.gravity) S.enemy.gravityCharge = 0.30;
        break;
      case 'gravPush':
        pushTarget(isPlayer);
        addStatus(target, 'paralisado', 1);
        log(target.name + ' é arremessado e fica paralisado!', 'warn');
        if (isPlayer && S.passives.gravity) S.enemy.gravityCharge = 0.30;
        break;
      case 'cancelAttack':
        S.enemy.cancelNext = true;
        log('O ataque do inimigo é anulado pelo vazio.', 'ok');
        break;
      case 'healVoid': {
        const pct = effVal || 0.12;
        heal(S.player, pct, 'vazio');
        break;
      }
      case 'sealEnemy':
        addStatus(target, 'paralisado', 1);
        heal(S.player, 0.08, 'vazio');
        log(target.name + ' fica selado por 1 turno.', 'warn');
        break;
      case 'drainSoul':
        heal(S.player, Math.min(0.8, (dmgDealt / S.player.maxHp) * 0.8), 'dreno');
        S.player.soulReduce = Math.min(0.20, (S.player.soulReduce || 0) + 0.05);
        log('A alma do alvo enfraquece: dano recebido -' + Math.round(S.player.soulReduce * 100) + '%.', 'ok');
        break;
      case 'soulMark':
        S.player.soulReduce = Math.min(0.20, (S.player.soulReduce || 0) + 0.05);
        log('A marca da alma: dano recebido -' + Math.round(S.player.soulReduce * 100) + '%.', 'ok');
        break;
    }
  }

  /* ---------------- distância ---------------- */
  function setDist(target, who) {
    if (target === 1) return;
    if (who === 'enemy' && S.enemy.status && S.enemy.status.ligado) {
      log('O inimigo está preso à distância.', '');
      return;
    }
    const cur = S.dist;
    let next = target;
    if (who === 'player') {
      // V1 resistindo a empurrões (peso)
      const scale = weightScale();
      next = Math.round(cur + (target - cur) * scale);
    }
    next = clamp(next, 0, 2);
    if (next !== cur) {
      S.dist = next;
      log(who === 'player' ? 'V1 é ' + distName(next) + '.' : 'O inimigo fica ' + distName(next) + '.', '');
    }
  }
  function distName(d) { return d === 2 ? 'perto' : (d === 0 ? 'longe' : 'no meio'); }
  function pullTarget(isPlayer, expose) {
    const target = isPlayer ? S.enemy : S.player;
    if (!isPlayer && S.player.status && S.player.status.ligado) { log('V1 está preso.', ''); return; }
    if (isPlayer && S.enemy.status && S.enemy.status.ligado) { log('O inimigo está preso.', ''); return; }
    S.dist = 2;
    log(isPlayer ? 'O inimigo é puxado para perto.' : 'V1 é puxado para perto.', '');
    if (expose) { addStatus(target, 'exposto', 2); log(target.name + ' fica Exposto!', 'warn'); }
  }
  function pushTarget(isPlayer) {
    if (!isPlayer && S.player.status && S.player.status.ligado) { log('V1 está preso.', ''); return; }
    const cur = S.dist;
    const scale = weightScale();
    const next = clamp(Math.round(cur + (0 - cur) * scale), 0, 2);
    S.dist = next;
    log(isPlayer ? 'O inimigo é empurrado para longe.' : 'V1 é empurrado para longe.', '');
  }

  /* ---------------- parry / esquiva / reflexo ---------------- */
  async function enemyAttack(move) {
    const enemy = S.enemy;
    const p = S.player;

    // 0) precisão do golpe (depende da dificuldade)
    const acc = Math.min(0.99, (move.acc || 90) / 100 + ((S.diff && S.diff.accBonus) || 0) / 100);
    if (!chance(acc)) {
      log(enemy.name + ' erra o golpe.', 'ok');
      addStyle(10);
      return;
    }

    // 1) parry
    if (move.parryable !== false && S.passives.parry) {
      const res = await ui().promptParry ? await ui().promptParry(S.parryCfg) : 'miss';
      if (res === 'perfect') {
        S.parryFalhas = 0;
        const reflect = (S.layerMod && S.layerMod.reflect) ? S.layerMod.reflect : 0.5;
        const back = Math.round(move.power * 0.6 * reflect);
        damage(enemy, back, 'enemy');
        float('-' + back, 'enemy', 'crit');
        addStatus(enemy, 'atordoado', 1);
        heal(p, 0.08, 'parry');
        addStyle(40);
        const stt = BM.save.get().stats; stt.parries = (stt.parries || 0) + 1;
        log('PARRY PERFEITO! O golpe é devolvido.', 'ok');
        shake(2);
        return;
      }
      if (res === 'good') {
        log('Parry parcial: dano reduzido pela metade.', 'ok');
        addStyle(20);
        const dmg = Math.round(move.power * 0.5);
        applyEnemyDamage(dmg, move);
        return;
      }
      // duas falhas seguidas: o parry é perdido e conta como erro
      S.parryFalhas = (S.parryFalhas || 0) + 1;
      if (S.parryFalhas >= 2) {
        S.parryFalhas = 0;
        S.parryErros = (S.parryErros || 0) + 1;
        S.passives.parry = false;
        S.parryBreak = true;
        try { const stt = BM.save.get().stats; stt.parriesErro = (stt.parriesErro || 0) + 1; } catch (e) { }
        log('PARRY PERDIDO! O Feedbacker falhou duas vezes.', 'bad');
        shake(3);
      } else {
        log('Parry falhou! Mais um e o Feedbacker quebra.', 'warn');
      }
    }

    // 2) Dash
    if (p.dashArmed && !move.unavoidable) {
      p.dashArmed = false;
      log('DASH! V1 desvia completamente.', 'ok');
      addStyle(15);
      return;
    }

    // 3) esquiva normal (parável) ou reflexo (imparável)
    const unparryable = move.parryable === false;
    const unavoidable = !!move.unavoidable;
    if (!unavoidable && chance(p.esquiva)) {
      log('V1 esquiva do golpe.', 'ok');
      addStyle(15);
      if (S.legPassive === 'shadowGuard') {
        p.shadowGuard = true;
        log('Passo Sombrio: o próximo golpe vai bater pela metade.', 'ok');
      }
      return;
    }
    if (unparryable && !unavoidable && chance(p.reflexo)) {
      log('REFLEXO! V1 desvia por instinto.', 'ok');
      addStyle(20);
      return;
    }
    if (unavoidable) log('Não há como evitar...', 'warn');

    // 4) dano
    const eff = effVs(p.faction || 'casca', move.type);
    const base = move.power * (0.6 + 0.4 * (enemy.atk / Math.max(1, defOf(p)))) * (1 + enemy.level / 25) * ESCALA_INIMIGO;
    let d = base * eff * rand(0.9, 1.1) * (S.diff.dmgEnemy || 1);
    if (move.kind === 'ranged') d *= (S.dist === 0 ? 1.2 : (S.dist === 2 ? 0.8 : 1));
    else if (MELEE_TYPES.indexOf(move.type) >= 0) d *= (S.dist === 2 ? 1.2 : (S.dist === 0 ? 0.8 : 1));
    let final = Math.max(1, Math.round(d));
    // Soulreaver: o inimigo bate mais fraco a cada golpe acumulado
    if (S.player.soulReduce) final = Math.round(final * (1 - S.player.soulReduce));
    // Gravityhook: o inimigo paralisado volta 30% mais forte
    if (S.enemy.gravityCharge > 0) {
      final = Math.round(final * (1 + S.enemy.gravityCharge));
      S.enemy.gravityCharge = 0;
      log('A gravidade concentra o golpe: +30% de dano.', 'warn');
    }
    if (S.layerMod && S.layerMod.atkMul) final = Math.round(final * S.layerMod.atkMul);
    if (S.layerMod && S.layerMod.dmgPlayer) final = Math.round(final * S.layerMod.dmgPlayer);
    if (S.parryBreak) { final = Math.round(final * 1.3); S.parryBreak = false; log('O Feedbackor quebrado deixa o golpe mais fundo.', 'bad'); }
    const capInimigo = Math.round(p.maxHp * 0.40);
    if (final > capInimigo) final = capInimigo;
    applyEnemyDamage(final, move);
  }

  function applyEnemyDamage(dmg, move) {
    const p = S.player;
    let final = Math.max(1, Math.round(dmg));
    // Shadow Step: depois de esquivar, o próximo golpe bate pela metade
    if (p.shadowGuard) {
      final = Math.round(final * 0.5);
      p.shadowGuard = false;
      log('O Passo Sombrio amortece o golpe: 50% menos dano.', 'ok');
    }
    // Titan Husk: quanto menos vida, mais resistência (até 30%)
    if (S.chassisPassive === 'titan') {
      const low = 1 - (p.hp / p.maxHp);
      const resist = Math.min(0.30, low * 0.30);
      if (resist > 0) {
        final = Math.round(final * (1 - resist));
        log('A casca de titã absorve o golpe: -' + Math.round(resist * 100) + '%.', 'ok');
      }
    }
    damage(p, final, 'enemy');
    try { BM.save.addLayerDamage(final); } catch (e) { /* ignora */ }
    float('-' + final, 'player', '');
    log(move.name + ' causa ' + final + ' de dano em V1.', 'hl');
    addStyle(-20);
    if (move.effect === 'bleed') { addStatus(p, 'sangramento', 3); log('V1 está sangrando!', 'hl'); }
    if (move.effect === 'ferrugem') { addStatus(p, 'ferrugem', 3); log('V1 está corroído!', 'hl'); }
    if (move.effect === 'push') pushTarget(false);
    if (move.effect === 'approach') setDist(2, 'enemy');
    if (dmg > 40) shake(3); else shake(1);
    if (p.hp <= 0) { S.over = 'lose'; }
  }

  /* ---------------- IA inimiga ---------------- */
  function chooseIntent() {
    const e = S.enemy;
    const cands = e.moves.filter(m => !m.minHp || e.hp <= e.maxHp * m.minHp);
    const list = cands.length ? cands : e.moves;
    const scored = list.map(m => {
      let s = 1;
      // inimigos curam pouco, com recarga, e param de curar se a luta se arrasta
      if (m.kind === 'heal' || m.effect === 'healSelf') s = 0;   // inimigos não se curam
      else if (m.kind === 'buff') s = e.buffed ? 0.15 : 1.1;
      else {
        if (m.range === 'perto') s *= (S.dist === 2 ? 1.8 : 0.45);
        else if (m.range === 'longe') s *= (S.dist === 0 ? 1.8 : (S.dist === 1 ? 1.0 : 0.4));
        else s *= 1.15;
        if (m.unavoidable) s *= 0.7;
      }
      return { m, s: s * rand(0.75, 1.25) };
    });
    scored.sort((a, b) => b.s - a.s);
    const pick = scored[0].m;
    e.intent = pick;
    e.buffed = false;
    return pick;
  }

  /* ---------------- turnos ---------------- */
  async function performPlayerAction(action) {
    const p = S.player;
    if (action.type === 'move') {
      const move = D.MOVES[action.id];
      if (!move) return;
      p.cooldowns[action.id] = move.cd || 0;
      if (move.effect === 'charge') {
        p.charge = action.id;
        log('V1 carrega o Soco...', 'warn');
        float('CARGA', 'player', '');
        return;
      }
      if (move.effect === 'healSelf') {
        applyEffects(move, p, S.enemy, true, 0);
        addStyle(5);
        return;
      }
      if (move.effect === 'postura') {
        applyEffects(move, p, S.enemy, true, 0);
        addStyle(5);
        return;
      }
      const res = applyMove(p, S.enemy, move, 'player');
      if (res.hit) {
        if (S.lastMove !== action.id) addStyle(12); else addStyle(-6);
        if (move.priority) S.priorityTurn = true;
        S.player.critNext = false;
        S.lastMove = action.id;
      }
      S.usedMoves[S.usedMoves.length - 1] = action.id;
    } else if (action.type === 'item') {
      useBattleItem(action.id);
    } else if (action.type === 'dash') {
      if (!p.dashUsed) { p.dashArmed = true; p.dashUsed = true; log('V1 se prepara para o Dash.', 'ok'); }
    } else if (action.type === 'arranque') {
      if (!p.arranqueUsed) { p.arranqueUsed = true; p.velBoost = 2; log('ARRANQUE! Os pistões ignitam: +50% VEL e +20% de dano por 2 turnos.', 'warn'); }
    } else if (action.type === 'flee') {
      tryFlee();
    }
  }

  function useBattleItem(id) {
    const item = D.ITEMS.find(i => i.id === id);
    if (!item) return;
    if (item.heal) { heal(S.player, item.heal, item.name); }
    if (item.healOverTime) {
      S.player.hotTurns = item.healOverTime.turns;
      S.player.hotPct = item.healOverTime.pct;
      log('O sangue circula: cura gradual por ' + item.healOverTime.turns + ' turnos.', 'ok');
    }
    if (item.cureStatus) { S.player.status = {}; log('Todos os status foram removidos.', 'ok'); }
    if (item.crit) { S.player.critNext = true; log('O próximo golpe será crítico.', 'warn'); }
    if (item.critPower) { S.player.critPower = item.critPower; log('A moeda está gasta: crítico com dano extra.', 'warn'); }
    if (item.focus) { S.player.focus = (S.player.focus || 0) + item.focus; log('Foco: os próximos ' + item.focus + ' golpe(s) batem 50% mais forte.', 'ok'); }
    if (item.atkBuff) {
      S.player.atkBuffTurns = item.atkBuff.turns;
      S.player.atkBuffPct = item.atkBuff.pct;
      log('Combustão turbo: +' + Math.round(item.atkBuff.pct * 100) + '% de ATQ por ' + item.atkBuff.turns + ' turnos.', 'warn');
    }
    if (item.melt) { addStatus(S.enemy, 'derretido', item.melt); log(S.enemy.name + ' está Derretido!', 'hl'); }
    if (item.bleed) { addStatus(S.enemy, 'sangramento', item.bleed); log(S.enemy.name + ' está sangrando!', 'hl'); }
    if (item.fixedDamage) {
      damage(S.enemy, item.fixedDamage, 'player');
      float('-' + item.fixedDamage, 'enemy', 'crit');
      log(item.name + ' causa ' + item.fixedDamage + ' de dano.', 'hl');
      shake(2);
    }
    if (item.revive) { /* usado fora da batalha */ }
    if (BM.save.itemCount(id) > 0) BM.save.useItem(id);
    addStyle(4);
  }

  function tryFlee() {
    const p = S.player;
    if (S.isBoss) { log('Não é possível fugir de um chefe.', 'warn'); return; }
    if (chance(p.fuga)) {
      log('V1 foge da batalha.', 'ok');
      S.over = 'fled';
      BM.save.get().stats.fugas++;
    } else {
      log('A fuga falhou!', 'warn');
    }
  }

  async function startPlayerTurn() {
    const p = S.player;
    Object.keys(p.cooldowns).forEach(k => { if (p.cooldowns[k] > 0) p.cooldowns[k]--; if (p.cooldowns[k] <= 0) delete p.cooldowns[k]; });
    if (p.velBoost > 0) p.velBoost--;
    // Berserk Springs: quanto menos vida, mais velocidade e esquiva (até 40%)
    if (S.legPassive === 'berserk') {
      const low = 1 - Math.max(0, p.hp) / p.maxHp;
      const bonus = low * 0.40;
      p.vel = Math.round((S.playerBaseVel || p.vel) * (1 + bonus));
      p.esquiva = Math.min(0.90, (S.playerBaseEsquiva || p.esquiva) + bonus);
    }
    // Bloodforge: regenera 20% da vida total a cada 3 turnos
    if (S.chassisPassive === 'bloodforge') {
      S.bloodforgeTurns = (S.bloodforgeTurns || 0) + 1;
      if (S.bloodforgeTurns >= 3) {
        S.bloodforgeTurns = 0;
        heal(p, 0.20, 'forja');
        log('A Forja de Sangue recompõe a carcaça.', 'ok');
      }
    }
    if (p.atkBuffTurns > 0) { p.atkBuffTurns--; if (p.atkBuffTurns === 0) { p.atkBuffPct = 0; log('O combustível turbo acaba.', ''); } }
    if (p.hotTurns > 0) {
      heal(p, p.hotPct, 'sangue');
      p.hotTurns--;
      log('A bolsa fria sangra no circuito.', 'ok');
    }
    if (p.status && p.status.atordoado) {
      p.status.atordoado = 0;
      delete p.status.atordoado;
      log('V1 está atordoado e perde o turno!', 'warn');
      return 'stunned';
    }
    tickStatus(p, 'player');
    if (p.hp <= 0) { S.over = 'lose'; return 'dead'; }
    if (p.charge) {
      const mid = p.charge;
      p.charge = null;
      const move = D.MOVES[mid];
      log('Carga liberada!', 'warn');
      const res = applyMove(p, S.enemy, move, 'player');
      if (res.hit) addStyle(12);
      refresh();
      await sleep(420);
      return 'charged';
    }
    return 'ok';
  }

  async function enemyTurn() {
    const e = S.enemy;
    const intent = e.intent;
    if (!intent) return;
    if (e.status && e.status.atordoado) {
      e.status.atordoado = 0; delete e.status.atordoado;
      log(e.name + ' está atordoado e perde o turno!', 'ok');
      await sleep(300);
      return;
    }
    if (e.status && e.status.paralisado) {
      log(e.name + ' está paralisado e não ataca!', 'ok');
      tickStatus(e, 'enemy');
      await sleep(260);
      return;
    }
    if (e.cancelNext) {
      e.cancelNext = false;
      log(e.name + ' tenta atacar, mas o golpe se desfaz no vazio.', 'ok');
      tickStatus(e, 'enemy');
      await sleep(260);
      return;
    }
    tickStatus(e, 'enemy');
    if (e.hp <= 0) { S.over = e.flee ? 'fugiu' : 'win'; return; }

    if (intent.kind === 'heal' || intent.effect === 'healSelf') {
      // inimigos nunca se curam: o golpe vira um ataque comum
      await enemyAttack({ name: 'Ataque', type: 'impacto', power: 14, acc: 92, kind: 'melee', range: 'perto', parryable: true });
    } else if (intent.kind === 'buff') {
      if (intent.effect === 'buffDef') { e.bonusDef = 0.3; e.bonusAtk = 0; e.buffTurns = 3; e.buffed = true; log(e.name + ' endurece a carcaça.', 'warn'); }
      if (intent.effect === 'buffAtk') { e.bonusAtk = 0.3; e.bonusDef = 0; e.buffTurns = 3; e.buffed = true; log(e.name + ' acelera os circuitos.', 'warn'); }
    } else {
      await enemyAttack(intent);
    }
    refresh();
    await sleep(380);
  }

  async function endOfRound() {
    const e = S.enemy;
    // checagem de vitória (ou fuga)
    if (S.enemy.hp <= 0 && !S.over) {
      if (S.enemy.flee) {
        S.over = 'fugiu';
        log('>>> ' + S.enemy.name + ' ESCAPA! <<<', 'warn');
      } else {
        S.over = 'win';
      }
      return;
    }
    if (S.player.hp <= 0 && !S.over) { S.over = 'lose'; return; }
    // fase do chefe
    if (e.isBoss && e.hp <= e.maxHp * 0.5 && e.phase === 1) {
      e.phase = 2;
      log('>>> ' + e.name + ' ENTRA EM OVERCLOCK! <<<', 'warn');
      shake(3);
    }
    if (e.healCd > 0) e.healCd--;
    if (e.buffTurns > 0) {
      e.buffTurns--;
      if (e.buffTurns === 0) { e.bonusDef = 0; e.bonusAtk = 0; e.buffed = false; log(e.name + ' perde o bônus.', ''); }
    }
    S.turn++;
    chooseIntent();
    refresh();
  }

  /* ---------------- API principal ---------------- */
  function finishTurn() {
    if (!S) return;               // a batalha pode ter sido encerrada no meio do turno
    S.busy = false;
    refresh();
    if (S.over && BM.main && BM.main.onBattleOver) { try { BM.main.onBattleOver(S.over); } catch (e) { /* ignora */ } }
  }

  async function runTurn(action) {
    if (!S || S.over) return;
    const st = S;                 // guarda a batalha deste turno
    S.busy = true;
    refresh();
    flash();
    const res = await startPlayerTurn();
    if (S !== st) return;
    if (res === 'stunned') {
      await sleep(350);
      if (S !== st) return;
      if (!S.over) await enemyTurn();
      if (S !== st) return;
      if (!S.over) await endOfRound();
      finishTurn();
      return;
    }
    if (res === 'charged') {
      if (S !== st) return;
      if (!S.over) await enemyTurn();
      if (S !== st) return;
      if (!S.over) await endOfRound();
      finishTurn();
      return;
    }
    if (res === 'dead') { finishTurn(); return; }
    await performPlayerAction(action);
    if (S !== st) return;
    refresh();
    await sleep(280);
    if (S !== st) return;
    if (!S.over) await enemyTurn();
    if (S !== st) return;
    if (!S.over) await endOfRound();
    finishTurn();
  }

  function start(opts) {
    const save = BM.save;
    const data = BM.save.get();
    const st = save.v1Stats();
    const layer = D.LAYERS[opts.layerIndex || 0];
    const enemyDef = D.ENEMIES[opts.enemyId];
    const isBoss = !!enemyDef.boss;
    const enemyLevel = (layer.baseLevel || 7) + (isBoss ? 3 : 0);
    const diff = D.DIFFICULTIES[data.settings.dificuldade] || D.DIFFICULTIES.standard;

    // o inimigo escala junto com o V1 (mantém a duração das lutas estável)
    const layerId = layer.id;
    const hpScale = Math.max(0.70, Math.min(1.80, st.atk / BASE_ATK[layerId]));
    const atkScale = Math.max(0.70, Math.min(1.80, st.def / BASE_DEF[layerId]));
    const diffHp = diff.hpMul || 1, diffAtk = diff.atkMul || 1;
    const enemyHp = Math.round(enemyDef.hp * hpScale * diffHp);
    const enemy = {
      id: enemyDef.id, name: enemyDef.name, faction: enemyDef.faction,
      sprite: enemyDef.sprite, isPlayer: false,
      hp: enemyHp, maxHp: enemyHp, atk: Math.round(enemyDef.atk * atkScale * diffAtk), def: Math.round(enemyDef.def * hpScale),
      vel: enemyDef.vel, level: enemyLevel, status: {}, cooldowns: {},
      moves: enemyDef.moves.slice(), intent: null, phase: 1, isBoss: isBoss,
      bossName: enemyDef.name,
      gravityCharge: 0, cancelNext: false
    };

    // V2 copia o build do jogador
    if (enemyDef.copies) {
      const copies = data.loadout.map(mid => {
        const m = D.MOVES[mid];
        if (!m || !m.power) return null;
        const kind = (m.type === 'explosao' || m.type === 'fogo') ? 'explosive'
          : (m.type === 'sangue' || m.type === 'corte' || m.type === 'impacto') ? 'melee' : 'melee';
        return {
          name: 'CÓPIA: ' + m.name, type: m.type, power: Math.round(m.power * 0.7), acc: 90,
          kind: kind, range: m.range === 'any' ? 'any' : 'perto', parryable: true, text: 'VAI COPIAR'
        };
      }).filter(Boolean);
      enemy.moves = copies.concat(enemyDef.moves);
    }

    const passives = {};
    save.equippedArms().forEach(aid => {
      const a = D.ARMS.find(x => x.id === aid);
      if (a && a.passive) passives[a.passive.id] = true;
    });


    S = {
      layerIndex: opts.layerIndex || 0,
      layer: layer,
      layerMod: layer.modifier,
      isBoss: isBoss,
      diff: diff,
      passives: passives,
      player: {
        name: 'V1', isPlayer: true, faction: 'casca',
        hp: opts.hp != null ? Math.max(1, opts.hp) : st.maxHp,
        maxHp: st.maxHp, atk: st.atk, def: st.def, vel: st.vel, level: st.level,
        peso: st.peso, reflexo: st.reflexo, esquiva: st.esquiva, fuga: st.fuga,
        status: {}, cooldowns: {}, charge: null, dashArmed: false, dashUsed: false,
        critNext: false, velBoost: 0, arranqueUsed: false, legs: st.legs, chassis: st.chassis,
        focus: 0, critPower: 0, hotTurns: 0, hotPct: 0, atkBuffTurns: 0, atkBuffPct: 0
      },
      enemy: enemy,
      dist: 1,
      fugiu: false,
      turn: 1,
      busy: false,
      over: null,
      log: [],
      style: { points: 0, rank: D.STYLE_RANKS[0] },
      lastMove: null,
      usedMoves: [],
      parryCfg: {
        perfect: data.settings.parryAssist ? 0.18 : 0.12,
        good: data.settings.parryAssist ? 0.34 : 0.24,
        ms: data.settings.parryAssist ? diff.parryMs * 1.4 : diff.parryMs
      },
      parryFalhas: 0,
      parryErros: 0,
      parryBreak: false,
      soulReduce: 0,
      shadowGuard: false,
      bloodforgeTurns: 0,
      playerBaseVel: st.vel,
      playerBaseEsquiva: st.esquiva,
      legPassive: (D.LEGS.find(l => l.id === data.equip.legs) || {}).passive ? D.LEGS.find(l => l.id === data.equip.legs).passive.id : null,
      chassisPassive: (D.CHASSIS.find(c => c.id === data.equip.chassis) || {}).passive ? D.CHASSIS.find(c => c.id === data.equip.chassis).passive.id : null
    };

    enemy.canParry = !!passives.parry && isBoss;
    chooseIntent();
    log('>>> ' + enemy.name + ' aparece! <<<', 'warn');
    if (isBoss) log('O V1 treme. Este não é um husk comum.', 'warn');
    if (enemyDef.copies) log('V2 copiou o seu build.', 'hl');
    refresh();
    return S;
  }

  function end() { S = null; }

  return {
    get state() { return S; },
    start, end, runTurn, refresh, log,
    styleRank, distName
  };
})();
