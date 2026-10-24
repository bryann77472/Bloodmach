/* ============================================================
   BLOODMACH — save.js
   Estado do jogo, progressão, inventário e preferências.
   ============================================================ */
var BM = (window.BM = window.BM || {});

BM.save = (function () {
  'use strict';
  const D = BM.DATA;
  const KEY_BASE = 'bloodmach_save_v1';
  const KEY_LAST = 'bloodmach_last_diff';
  const DIFFS = ['lenient', 'standard', 'violent'];

  let data = null;
  let currentDiff = 'standard';   // difficulty do save ativo
  const listeners = [];

  function keyFor(diff) { return KEY_BASE + '_' + (diff || currentDiff); }
  function difficulties() { return DIFFS.slice(); }

  function defaults() {
    return {
      version: 3,
      createdAt: Date.now(),
      v1: { level: 1, xp: 0, scrap: 150, cores: 0 },
      owned: {
        arms: ['feedbacker', 'knuckleblaster'],
        legs: ['servico'],
        chassis: ['v1']
      },
      equip: { legs: 'servico', chassis: 'v1' },
      loadout: ['jab_rapido', 'rajada_tres', 'contra_golpe', 'soco_foguete'],
      items: { bolsa_sangue: 2, adrenalina: 1 },
      progress: { layer: 0, node: 0, unlockedLayers: 1, checkpoint: null,
        layerStats: { t0: 0, dmg: 0, styleMax: 0, maxHp: 0 },
        pending: { scrap: 0, xp: 0 } },
      flags: { tutorial: false, v2Dead: false, nucleo_v2: false, gabrielDead: false, greedV2Dead: false, hellwhipUnlocked: false, ending: false, ngPlus: false },
      settings: {
        som: true, volume: 0.7, musica: 0.4, tremor: true,
        dificuldade: 'standard', parryAssist: false, textoRápido: false
      },
      stats: { batalhas: 0, vitorias: 0, mortes: 0, parries: 0, execucoes: 0, estiloMax: 0, fugas: 0 }
    };
  }

  /* ---------------- persistência ---------------- */
  /** Lê o save de uma dificuldade sem alterar o save ativo. */
  function readSave(diff) {
    try {
      const raw = localStorage.getItem(keyFor(diff));
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  /** Resumo de um save (usado na tela de escolha). */
  function saveInfo(diff) {
    const raw = readSave(diff);
    if (!raw) return { existe: false, diff: diff };
    const d = raw;
    return {
      existe: true, diff: diff,
      nivel: (d.v1 && d.v1.level) || 1,
      scrap: (d.v1 && d.v1.scrap) || 0,
      cores: (d.v1 && d.v1.cores) || 0,
      v2Dead: !!(d.flags && d.flags.v2Dead),
      gabrielDead: !!(d.flags && d.flags.gabrielDead),
      greedV2Dead: !!(d.flags && d.flags.greedV2Dead),
      hellwhipUnlocked: !!(d.flags && d.flags.hellwhipUnlocked),
      camada: (d.progress && d.progress.layer) || 0,
      tutorial: !!(d.flags && d.flags.tutorial),
      updatedAt: d.updatedAt || 0
    };
  }

  function load(diff) {
    if (diff) currentDiff = diff;
    else if (!readSave(currentDiff)) {
      let last = null;
      try { last = localStorage.getItem(KEY_LAST); } catch (e) { }
      if (last && DIFFS.indexOf(last) >= 0 && readSave(last)) currentDiff = last;
    }
    try { localStorage.setItem(KEY_LAST, currentDiff); } catch (e) { }
    try {
      const raw = localStorage.getItem(keyFor(currentDiff));
      if (!raw) { data = null; return null; }
      const parsed = JSON.parse(raw);
      data = Object.assign(defaults(), parsed);
      // garante chaves internas
      const d = defaults();
      data.v1 = Object.assign(d.v1, parsed.v1 || {});
      data.owned = Object.assign(d.owned, parsed.owned || {});
      data.equip = Object.assign(d.equip, parsed.equip || {});
      data.progress = Object.assign(d.progress, parsed.progress || {});
      data.flags = Object.assign(d.flags, parsed.flags || {});
      data.settings = Object.assign(d.settings, parsed.settings || {});
      data.stats = Object.assign(d.stats, parsed.stats || {});
      data.items = parsed.items || d.items;
      if (!Array.isArray(data.loadout) || !data.loadout.length) data.loadout = d.loadout;
      // migração: o Knuckleblaster agora é livre e já vem com o V1
      if (data.owned.arms.indexOf('knuckleblaster') < 0) data.owned.arms.push('knuckleblaster');
      // migração: o loadout padrão antigo (4 golpes do Feedbacker) vira 3 + 1 do Knuckleblaster
      const padraoAntigo = ['jab_rapido', 'rajada_tres', 'contra_golpe', 'postura_defensiva'];
      const padraoNovo = ['jab_rapido', 'rajada_tres', 'contra_golpe', 'soco_foguete'];
      if (data.loadout.length === 4 && padraoAntigo.every(function (m, i) { return data.loadout[i] === m; })) {
        data.loadout = padraoNovo.slice();
      }
      // migração das dificuldades antigas
      const difAntigo = { facil: 'lenient', normal: 'standard', dificil: 'violent' };
      if (difAntigo[data.settings.dificuldade]) data.settings.dificuldade = difAntigo[data.settings.dificuldade];
      if (!BM.DATA.DIFFICULTIES[data.settings.dificuldade]) data.settings.dificuldade = 'standard';
    } catch (e) { data = null; }
    return data;
  }

  function persist() {
    try { data.updatedAt = Date.now(); localStorage.setItem(keyFor(currentDiff), JSON.stringify(data)); } catch (e) { /* ignora */ }
    emit();
  }

  function emit() { listeners.forEach(fn => { try { fn(data); } catch (e) { /* ignora */ } }); }
  function onChange(fn) { listeners.push(fn); }

  function newGame(diff) {
    if (diff) currentDiff = diff;
    data = defaults();
    data.settings.dificuldade = currentDiff;
    persist();
    return data;
  }

  function hasSave(diff) { return !!readSave(diff || currentDiff); }

  function wipe(diff) {
    const d = diff || currentDiff;
    try { localStorage.removeItem(keyFor(d)); } catch (e) { /* ignora */ }
    if (d === currentDiff) data = null;
  }

  function setDifficulty(diff) {
    if (DIFFS.indexOf(diff) < 0) return false;
    currentDiff = diff;
    try { localStorage.setItem(KEY_LAST, diff); } catch (e) { }
    load(diff);
    return true;
  }
  function currentDifficulty() { return currentDiff; }

  /* ---------------- consultas ---------------- */
  function get() { if (!data) data = defaults(); return data; }
  function ownedArm(id) { return get().owned.arms.indexOf(id) >= 0; }
  function ownedLeg(id) { return get().owned.legs.indexOf(id) >= 0; }
  function ownedChassis(id) { return get().owned.chassis.indexOf(id) >= 0; }
  function armById(id) { return D.ARMS.find(a => a.id === id); }
  function moveById(id) { return D.MOVES[id]; }
  function armOfMove(id) { const m = D.MOVES[id]; return m ? D.ARMS.find(a => a.moves.indexOf(id) >= 0) : null; }

  /** BraçosLSL efetivamente equipados: braços distintos entre os 4 movimentos. */
  function equippedArms() {
    const set = [];
    get().loadout.forEach(mid => {
      const a = armOfMove(mid);
      if (a && set.indexOf(a.id) < 0) set.push(a.id);
    });
    return set;
  }

  function hasPassive(id) {
    return equippedArms().some(aid => {
      const a = armById(aid);
      return a && a.passive && a.passive.id === id;
    });
  }

  /** Braços que podem ser usados no loadout (possuídos). */
  function availableArms() { return D.ARMS.filter(a => ownedArm(a.id)); }

  function loadoutMoves() { return get().loadout.map(id => D.MOVES[id]).filter(Boolean); }

  /* ---------------- estatísticas do V1 ---------------- */
  function v1Stats() {
    const d = get();
    const lvl = d.v1.level;
    const chassis = D.CHASSIS.find(c => c.id === d.equip.chassis) || D.CHASSIS[0];
    const legs = D.LEGS.find(l => l.id === d.equip.legs) || D.LEGS[0];
    const maxHp = Math.round((140 + 10 * (lvl - 1)) * chassis.hp);
    const atk = 20 + 3 * (lvl - 1);
    const def = 16 + 2 * (lvl - 1);
    const vel = Math.max(1, Math.round((10 + (lvl - 1)) * chassis.vel * legs.vel));
    const peso = chassis.peso + legs.peso;
    const reflexo = Math.max(0.15, Math.min(0.85, 0.5 - 0.10 * peso));
    return {
      level: lvl, maxHp, atk, def, vel, peso, reflexo,
      esquiva: legs.esquiva, fuga: legs.fuga,
      legs, chassis
    };
  }

  /* ---------------- progressão ---------------- */
  function xpNeeded(level) { return 20 + 12 * level; }

  function addXp(amount) {
    const d = get();
    d.v1.xp += amount;
    const levels = [];
    while (d.v1.xp >= xpNeeded(d.v1.level) && d.v1.level < 20) {
      d.v1.xp -= xpNeeded(d.v1.level);
      d.v1.level++;
      levels.push(d.v1.level);
    }
    if (d.v1.level >= 20) d.v1.xp = 0;
    return levels;
  }

  function addScrap(n) { get().v1.scrap = Math.max(0, get().v1.scrap + n); }
  function addCores(n) { get().v1.cores = Math.max(0, get().v1.cores + n); }

  /* ---------------- estatísticas de camada ---------------- */
  function layerStats() {
    const d = get();
    if (!d.progress.layerStats) d.progress.layerStats = { t0: 0, dmg: 0, styleMax: 0, maxHp: 0 };
    return d.progress.layerStats;
  }

  function resetLayerStats() {
    const d = get();
    const st = v1Stats();
    d.progress.layerStats = { t0: Date.now(), dmg: 0, styleMax: 0, maxHp: st.maxHp };
    // recursos da camada só entram no fim: se desistir ou morrer, tudo se perde
    d.progress.pending = { scrap: 0, xp: 0 };
    persist();
  }

  function pending() {
    const d = get();
    if (!d.progress.pending) d.progress.pending = { scrap: 0, xp: 0 };
    return d.progress.pending;
  }

  function addPending(kind, amount) {
    const p = pending();
    p[kind] = (p[kind] || 0) + amount;
  }

  function collectPending() {
    const d = get();
    const p = pending();
    const scrap = p.scrap || 0;
    const xp = p.xp || 0;
    d.progress.pending = { scrap: 0, xp: 0 };
    if (scrap) addScrap(scrap);
    const levels = xp ? addXp(xp) : [];
    persist();
    return { scrap: scrap, xp: xp, levels: levels };
  }

  function discardPending() {
    const d = get();
    d.progress.pending = { scrap: 0, xp: 0 };
    persist();
  }

  function addLayerDamage(n) {
    const ls = layerStats();
    ls.dmg += n;
  }

  function noteLayerStyle(points) {
    const ls = layerStats();
    if (points > ls.styleMax) ls.styleMax = points;
  }

  function pickMax(tiers, v) { for (let i = 0; i < tiers.length; i++) if (v <= tiers[i].max) return tiers[i].key; return 'D'; }
  function pickMin(tiers, v) { for (let i = 0; i < tiers.length; i++) if (v >= tiers[i].min) return tiers[i].key; return 'D'; }

  function layerRank(layerId) {
    const cfg = D.LAYER_RANK;
    const ls = layerStats();
    const elapsed = ls.t0 ? (Date.now() - ls.t0) / 1000 : 0;
    const alvo = cfg.tempoAlvo[layerId] || 300;
    const lossPct = ls.maxHp ? ls.dmg / ls.maxHp : 0;
    const tempo = pickMax(cfg.tempo, elapsed / alvo);
    const vida = pickMax(cfg.vida, lossPct);
    const estilo = pickMin(cfg.estilo, ls.styleMax);
    const order = cfg.order;
    let final = 'P';
    [tempo, vida, estilo].forEach(function (r) { if (order.indexOf(r) < order.indexOf(final)) final = r; });
    const perfeito = (tempo === 'S' && vida === 'S' && estilo === 'S');
    return {
      tempo: tempo, vida: vida, estilo: estilo,
      final: perfeito ? 'P' : final, perfeito: perfeito,
      elapsed: elapsed, lossPct: lossPct, styleMax: ls.styleMax, alvo: alvo
    };
  }

  /* ---------------- compras ---------------- */
  function unlockState(kind, id) {
    const d = get();
    const item = kind === 'arm' ? armById(id)
      : kind === 'leg' ? D.LEGS.find(x => x.id === id)
      : kind === 'chassis' ? D.CHASSIS.find(x => x.id === id)
      : D.ITEMS.find(x => x.id === id);
    if (!item) return { ok: false, reason: 'ITEM INVÁLIDO' };
    const u = item.unlock;
    if (!u || u === 'initial') return { ok: true, reason: '' };
    if (u.indexOf('lvl') === 0) {
      const lvl = parseInt(u.slice(3), 10) || 1;
      if (d.v1.level < lvl) return { ok: false, reason: 'REQUER NÍVEL ' + lvl };
    }
    if (u === 'v2' && !d.flags.v2Dead) return { ok: false, reason: 'DERROTE O V2' };
    if (u === 'gabriel' && !d.flags.gabrielDead) return { ok: false, reason: 'DERROTE GABRIEL' };
    if (u === 'greed' && !d.flags.greedV2Dead) return { ok: false, reason: 'DERROTE O V2 EM GREED' };
    if (u === 'layer2') return { ok: false, reason: 'CAMADA 2 — EM DESENVOLVIMENTO' };
    return { ok: true, reason: '' };
  }

  function buy(kind, id) {
    const d = get();
    const st = unlockState(kind, id);
    if (!st.ok) return { ok: false, msg: st.reason };
    const item = kind === 'arm' ? armById(id)
      : kind === 'leg' ? D.LEGS.find(x => x.id === id)
      : kind === 'chassis' ? D.CHASSIS.find(x => x.id === id)
      : D.ITEMS.find(x => x.id === id);
    const price = item.price || 0;
    if (item.cores) {
      if (d.v1.cores < item.cores) return { ok: false, msg: 'NÚCLEOS INSUFICIENTES' };
      d.v1.cores -= item.cores;
    } else {
      if (d.v1.scrap < price) return { ok: false, msg: 'SUCATA INSUFICIENTE' };
      d.v1.scrap -= price;
    }
    if (kind === 'arm' && ownedArm(id)) return { ok: false, msg: 'JÁ ADQUIRIDO' };
    if (kind === 'leg' && ownedLeg(id)) return { ok: false, msg: 'JÁ ADQUIRIDO' };
    if (kind === 'chassis' && ownedChassis(id)) return { ok: false, msg: 'JÁ ADQUIRIDO' };
    if (kind === 'arm') d.owned.arms.push(id);
    if (kind === 'leg') d.owned.legs.push(id);
    if (kind === 'chassis') d.owned.chassis.push(id);
    if (kind === 'item') d.items[id] = (d.items[id] || 0) + 1;
    persist();
    return { ok: true, msg: 'COMPRADO' };
  }

  function equipLeg(id) { if (ownedLeg(id)) { get().equip.legs = id; persist(); } }
  function equipChassis(id) { if (ownedChassis(id)) { get().equip.chassis = id; persist(); } }

  function setLoadout(moves) {
    const d = get();
    d.loadout = moves.slice(0, 4);
    persist();
  }

  function toggleMove(moveId) {
    const d = get();
    const i = d.loadout.indexOf(moveId);
    if (i >= 0) { d.loadout.splice(i, 1); persist(); return; }
    if (d.loadout.length >= 4) return;
    d.loadout.push(moveId);
    persist();
  }

  function itemCount(id) { return get().items[id] || 0; }
  function useItem(id) {
    const d = get();
    if (!d.items[id]) return false;
    d.items[id]--;
    persist();
    return true;
  }

  /* ---------------- preferências ---------------- */
  function setSetting(key, value) { get().settings[key] = value; persist(); }
  function setDificuldade(k) { if (BM.DATA.DIFFICULTIES[k]) { get().settings.dificuldade = k; persist(); } }

  function applySettings() {
    const s = get().settings;
    BM.audio.setEnabled(s.som);
    BM.audio.setVolume(s.volume);
    BM.audio.setMusicVolume(s.musica);
  }

  return {
    load, persist, newGame, hasSave, wipe, get, onChange,
    readSave, saveInfo, setDifficulty, currentDifficulty, difficulties,
    ownedArm, ownedLeg, ownedChassis, armById, moveById, armOfMove,
    equippedArms, hasPassive, availableArms, loadoutMoves,
    v1Stats, xpNeeded, addXp, addScrap, addCores,
    unlockState, buy, equipLeg, equipChassis, setLoadout, toggleMove,
    layerStats, resetLayerStats, addLayerDamage, noteLayerStyle, layerRank,
    pending, addPending, collectPending, discardPending,
    itemCount, useItem, setSetting, setDificuldade, applySettings
  };
})();
