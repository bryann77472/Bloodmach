/* ============================================================
   BLOODMACH — data.js
   Todos os dados estáticos: tipos, braços, pernas, carcaças,
   itens, inimigos, camadas e história.
   ============================================================ */
var BM = (window.BM = window.BM || {});

BM.DATA = (function () {
  'use strict';

  /* ---------------- TIPOS DE DANO ---------------- */
  const TYPES = {
    corte:   { name: 'Corte',    color: '#9ad7ff', icon: '✦' },
    impacto: { name: 'Impacto',  color: '#ffc266', icon: '◆' },
    explosao:{ name: 'Explosão', color: '#ff6b4a', icon: '✷' },
    sangue:  { name: 'Sangue',   color: '#ff3b5c', icon: '☗' },
    fogo:    { name: 'Fogo',     color: '#ff9d2e', icon: '▲' },
  };

  /* ---------------- FACÇÕES E FRAQUEZAS ---------------- */
  const FACTIONS = {
    casca:   { name: 'Casca',    weak: ['corte', 'impacto'], resist: ['sangue'] },
    maquina: { name: 'Máquina',  weak: ['explosao', 'fogo'],  resist: ['corte'] },
    carne:   { name: 'Carne',    weak: ['corte', 'fogo'],     resist: ['sangue'] },
    demonio: { name: 'Demônio',  weak: ['impacto', 'sangue'], resist: ['fogo'] },
    anjo:    { name: 'Anjo',     weak: ['sangue', 'corte'],   resist: ['fogo'] },
  };

  /* ---------------- MOVIMENTOS DE BRAÇO ---------------- */
  const MOVES = {
    /* Feedbacker (azul) */
    jab_rapido: {
      id:'jab_rapido', name:'Jab Rápido', type:'impacto', power:25, acc:100, cd:0, blood:2,
      priority:true, desc:'Ataque rápido. Age primeiro em empates de velocidade.'
    },
    rajada_tres: {
      id:'rajada_tres', name:'Rajada de Três', type:'impacto', power:12, acc:95, cd:1, blood:3, hits:3,
      desc:'Três golpes rápidos.'
    },
    contra_golpe: {
      id:'contra_golpe', name:'Contra-Golpe', type:'impacto', power:45, acc:100, cd:1, blood:2.5, effect:'contra',
      desc:'Dano dobrado contra alvos Atordoados ou Expostos.'
    },
    postura_defensiva: {
      id:'postura_defensiva', name:'Postura Defensiva', type:null, power:0, acc:100, cd:3, blood:0, effect:'postura',
      desc:'+30% DEF e janela de parry maior por 2 turnos.'
    },

    /* Knuckleblaster (vermelho) */
    soco_foguete: {
      id:'soco_foguete', name:'Soco-Foguete', type:'explosao', power:55, acc:90, cd:1, blood:0, effect:'push',
      desc:'Explosão que empurra o alvo para longe.'
    },
    carga_sismica: {
      id:'carga_sismica', name:'Carga Sísmica', type:'explosao', power:90, acc:85, cd:3, blood:0, effect:'charge',
      desc:'Carrega por 1 turno e explode no seguinte, quebrando a postura.'
    },
    onda_de_choque: {
      id:'onda_de_choque', name:'Onda de Choque', type:'explosao', power:35, acc:100, cd:2, blood:0, effect:'stun',
      desc:'Choque em área. 30% de atordoar.'
    },
    detonacao: {
      id:'detonacao', name:'Detonação', type:'explosao', power:70, acc:80, cd:2, blood:0, effect:'explodeBonus',
      desc:'+50% de dano contra alvos Expostos.'
    },

    /* Whiplash (verde) */
    puxao: {
      id:'puxao', name:'Puxão', type:'corte', power:20, acc:100, cd:0, blood:2.5, effect:'pull',
      desc:'Puxa o inimigo para perto.'
    },
    laco: {
      id:'laco', name:'Laço', type:'corte', power:15, acc:90, cd:2, blood:1.5, effect:'bind',
      desc:'Prende a distância do inimigo por 2 turnos.'
    },
    gancho_vital: {
      id:'gancho_vital', name:'Gancho Vital', type:'corte', power:30, acc:95, cd:2, blood:2.5, effect:'pullExpose',
      desc:'Puxa e expõe o alvo (próximo golpe é crítico).'
    },
    arremesso: {
      id:'arremesso', name:'Arremesso', type:'impacto', power:45, acc:85, cd:1, blood:2, range:'any',
      desc:'Arremessa sucata. Funciona em qualquer distância.'
    },

    /* Bloodreaver (carmim) */
    drenar: {
      id:'drenar', name:'Drenar', type:'sangue', power:30, acc:100, cd:0, blood:4, effect:'drain',
      desc:'Rouba vida: cura 50% do dano causado.'
    },
    sangria: {
      id:'sangria', name:'Sangria', type:'sangue', power:20, acc:95, cd:1, blood:2.5, effect:'bleed',
      desc:'Aplica Sangramento por 3 turnos.'
    },
    transfusao: {
      id:'transfusao', name:'Transfusão', type:null, power:0, acc:100, cd:3, blood:0, effect:'healSelf',
      desc:'Cura 25% do HP máximo (40% se o alvo estiver sangrando).'
    },
    banquete: {
      id:'banquete', name:'Banquete', type:'sangue', power:60, acc:90, cd:2, blood:6, effect:'feast',
      desc:'Cura 100% do dano se o alvo estiver sangrando.'
    },

    /* Hellwhip (laranja) */
    chicote_de_lava: {
      id:'chicote_de_lava', name:'Chicote de Lava', type:'fogo', power:30, acc:100, cd:0, blood:2, effect:'melt',
      desc:'Corrente incandescent. Aplica Derretido por 3 turnos.'
    },
    laco_igneo: {
      id:'laco_igneo', name:'Laço Ígneo', type:'fogo', power:20, acc:100, cd:1, blood:2.5, effect:'pullMelt',
      desc:'Puxa o alvo para perto e o derrete.'
    },
    corrente_fundida: {
      id:'corrente_fundida', name:'Corrente Fundida', type:'fogo', power:45, acc:100, cd:2, blood:3, effect:'meltPierce',
      desc:'Ignora 50% da DEF se o alvo estiver Derretido.'
    },
    erupcao: {
      id:'erupcao', name:'Erupção', type:'fogo', power:70, acc:90, cd:3, blood:4, effect:'consumeMelt',
      desc:'Consome o Derretido para +50% de dano.'
    },
  };

  /* ---------------- BRAÇOS ---------------- */
  const ARMS = [
    {
      id:'feedbacker', name:'Feedbacker', cor:'Azul', corHex:'#4aa8ff', type:'impacto',
      role:'Rápido, parry, fraco', price:0, unlock:'initial',
      passive:{ id:'parry', name:'Parry', desc:'Libera o parry: uma circunferência aparece e você clica nela.' },
      moves:['jab_rapido','rajada_tres','contra_golpe','postura_defensiva']
    },
    {
      id:'knuckleblaster', name:'Knuckleblaster', cor:'Vermelho', corHex:'#ff3b3b', type:'explosao',
      role:'Lento, explosivo, forte', price:350, unlock:'v2',
      passive:{ id:'push', name:'Empurra', desc:'Ataques empurram o alvo para longe.' },
      moves:['soco_foguete','carga_sismica','onda_de_choque','detonacao']
    },
    {
      id:'whiplash', name:'Whiplash', cor:'Verde', corHex:'#3ddc84', type:'corte',
      role:'Puxa e controla a distância', price:400, unlock:'gabriel',
      passive:{ id:'pullAlways', name:'Puxão certeiro', desc:'O Puxão nunca erra.' },
      moves:['puxao','laco','gancho_vital','arremesso']
    },
    {
      id:'bloodreaver', name:'Bloodreaver', cor:'Carmim', corHex:'#e0417a', type:'sangue',
      role:'Suga vida, sustain', price:600, unlock:'layer2',
      passive:{ id:'healBonus', name:'Sede', desc:'+25% em toda cura.' },
      moves:['drenar','sangria','transfusao','banquete']
    },
    {
      id:'hellwhip', name:'Hellwhip', cor:'Laranja', corHex:'#ff9d2e', type:'fogo',
      role:'Corrente que puxa e derrete', price:600, unlock:'layer2',
      passive:{ id:'anyRange', name:'Alcance Ígneo', desc:'Acerte o alvo em qualquer distância.' },
      moves:['chicote_de_lava','laco_igneo','corrente_fundida','erupcao']
    },
  ];

  /* ---------------- PERNAS ---------------- */
  const LEGS = [
    {
      id:'servico', name:'Pernas de Serviço', peso:0, vel:1.00, esquiva:0.10, fuga:0.50,
      ability:'dash', price:0, unlock:'initial',
      desc:'Configuração de fábrica. Peso e velocidade medianos.',
      abilityDesc:'Dash: 1x por batalha, esquiva completamente um ataque.'
    },
    {
      id:'ignicao', name:'Pernas de Ignição', peso:1, vel:0.85, esquiva:0.05, fuga:0.35,
      ability:'arranque', price:300, unlock:'v2',
      desc:'Estrutura pesada com ignição embutida. Lenta, mas explosiva.',
      abilityDesc:'Arranque Explosivo: 1x por batalha, +50% VEL por 2 turnos e age primeiro.'
    },
    {
      id:'fibra', name:'Pernas de Fibra', peso:-1, vel:1.20, esquiva:0.20, fuga:0.65,
      ability:null, price:250, unlock:'gabriel',
      desc:'Estrutura ultraleve, sem sistema extra. Rápida e frágil.',
      abilityDesc:'Sem habilidade ativa.'
    },
  ];

  /* ---------------- CARCAÇAS ---------------- */
  const CHASSIS = [
    {
      id:'v1', name:'Carcaça V1', peso:0, hp:1.00, vel:1.00, price:0, unlock:'initial',
      desc:'Carcaça original do V1. Equilibrada em tudo.'
    },
    {
      id:'fibra', name:'Carcaça de Fibra', peso:-1, hp:0.80, vel:1.25, price:250, unlock:'gabriel',
      desc:'Placas ultraleves. Muito rápido, muito frágil.'
    },
    {
      id:'forja', name:'Carcaça de Forja', peso:1, hp:1.30, vel:0.80, price:350, unlock:'v2',
      desc:'Blindagem de forja. Aguenta muito, responde pouco.'
    },
  ];

  /* ---------------- ITENS ---------------- */
  /* Consumíveis comuns (sucata) e itens de núcleo (moeda: núcleos). */
  const ITEMS = [
    /* --- consumíveis iniciais --- */
    { id:'bolsa_sangue', name:'Bolsa de Sangue', price:40, unlock:'initial', battle:true,
      desc:'Cura 40% do HP na hora.', heal:0.40 },
    { id:'adrenalina', name:'Adrenalina', price:50, unlock:'initial', battle:true,
      desc:'Remove todos os status e o próximo golpe causa 50% mais dano.', cureStatus:true, focus:1 },
    { id:'moeda', name:'Moeda', price:60, unlock:'lvl4', battle:true,
      desc:'O próximo golpe é crítico garantido.', crit:true },
    { id:'bomba', name:'Bomba', price:80, unlock:'lvl5', battle:true,
      desc:'60 de dano fixo, ignora DEF.', fixedDamage:60 },
    { id:'kit_reparo', name:'Kit de Reparo', price:120, unlock:'lvl6', battle:true,
      desc:'Revive o V1 com 30% do HP.', revive:true, revivePct:0.30 },

    /* --- itens de núcleo (moeda: núcleos) --- */
    { id:'sangue_frio', name:'Sangue Frio', cores:3, unlock:'lvl6', battle:true,
      desc:'Cura 55% do HP e o próximo golpe causa 50% mais dano.', heal:0.55, focus:1 },
    { id:'adrenalina_forte', name:'Adrenalina Forte', cores:2, unlock:'lvl8', battle:true,
      desc:'Remove todos os status e os próximos 2 golpes causam 50% mais dano.', cureStatus:true, focus:2 },
    { id:'carvao_vivo', name:'Carvão Vivo', cores:2, unlock:'lvl7', battle:true,
      desc:'Aplica Derretido por 4 turnos no alvo.', melt:4 },
    { id:'estilhaco', name:'Estilhaço Sangrento', cores:4, unlock:'lvl10', battle:true,
      desc:'150 de dano fixo, ignora DEF, e aplica Sangramento.', fixedDamage:150, bleed:3 },
    { id:'reator', name:'Reator de Emergência', cores:3, unlock:'lvl9', battle:true,
      desc:'Revive o V1 com 60% do HP e limpa todos os status.', revive:true, revivePct:0.60, cureStatus:true },

    /* --- melhorias de outros itens (sucata) --- */
    { id:'bolsa_fria', name:'Bolsa Fria', price:150, unlock:'lvl6', battle:true,
      desc:'Cura 12% do HP a cada turno durante 3 turnos.', healOverTime:{ pct:0.12, turns:3 } },
    { id:'moeda_gasta', name:'Moeda Gasta', price:140, unlock:'lvl5', battle:true,
      desc:'O próximo golpe é crítico garantido e causa 30% mais dano.', crit:true, critPower:0.30 },
    { id:'bomba_fundida', name:'Bomba Fundida', price:220, unlock:'lvl8', battle:true,
      desc:'120 de dano fixo, ignora DEF, e aplica Sangramento por 3 turnos.', fixedDamage:120, bleed:3 },
    { id:'tonico', name:'Tônico de Combustão', price:260, unlock:'lvl7', battle:true,
      desc:'+30% de ATQ por 3 turnos.', atkBuff:{ pct:0.30, turns:3 } },
    { id:'kit_avancado', name:'Kit Avançado', price:300, unlock:'lvl10', battle:true,
      desc:'Revive o V1 com 50% do HP e o próximo golpe causa 50% mais dano.', revive:true, revivePct:0.50, focus:1 },
  ];

  /* ---------------- INIMIGOS ---------------- */
  /* ============================================================
     ELENCO — Atos, camadas e inimigos
     ============================================================ */
  const ACTS = [
    { id: 'act1', num: 'I', name: 'Infinity Hyperdeath', desc: 'Três camadas: a cidade afogada, a catedral de carne e a fábrica de digestão.', wip: false, layers: ['limbo', 'lust', 'gluttony'] },
    { id: 'act2', num: 'II', name: 'Reversão', desc: 'O suborno da carne se inverte. Em desenvolvimento.', wip: true, layers: [] },
    { id: 'act3', num: 'III', name: 'Expiação', desc: 'O julgamento final. Em desenvolvimento.', wip: true, layers: [] }
  ];

  const LAYERS = [
    {
      id: 'limbo', act: 1, order: 1, baseLevel: 7,
      name: 'Limbo', subtitle: 'A Cidade Submersa',
      desc: 'Fábricas afogadas, cascas apodrecendo sob a água suja.',
      modifier: { id: 'mare', name: 'Maré Morta', desc: 'O V1 se debate: dano recebido +10%.', dmgPlayer: 1.10 },
      encounters: ['husk', 'stray', 'wretch', 'caged', 'drone', 'ceremoniar'],
      boss: 'v2',
      checkpoints: [3],
      theme: { a: '#2b5a6b', b: '#0c1a20', c: '#7fd4e8' }
    },
    {
      id: 'lust', act: 1, order: 2, baseLevel: 13,
      name: 'Lust', subtitle: 'O Corpo do Rei Minos',
      desc: 'Uma catedral de carne onde os corpos se arrastam e beijam.',
      modifier: { id: 'luxuria', name: 'Luxúria', desc: 'Os inimigos golpeiam 18% mais forte.', atkMul: 1.18 },
      encounters: ['enthusiast', 'journeyman', 'corporal', 'fanatic', 'lustful_husk', 'ceremoniar2'],
      boss: 'minos',
      checkpoints: [3],
      theme: { a: '#7a2a5a', b: '#1c0a16', c: '#e0a0d0' }
    },
    {
      id: 'gluttony', act: 1, order: 3, baseLevel: 19,
      name: 'Gluttony', subtitle: 'A Fábrica de Digestão',
      desc: 'Fornos, ácido e um anjo esperando no fim da linha.',
      modifier: { id: 'acido', name: 'Digestão Ácida', desc: 'Toda cura é 30% menor.', healMul: 0.70 },
      encounters: ['soothsayer', 'filet', 'bigjohn', 'tallow', 'drone2', 'ceremoniar3'],
      boss: 'gabriel',
      checkpoints: [3],
      theme: { a: '#7d1f16', b: '#2a0d0a', c: '#d8b25a' }
    }
  ];

  const ENEMIES = {
    /* ================= LIMBO ================= */
    husk: {
      id: 'husk', name: 'Husk', faction: 'casca', sprite: 'husk',
      hp: 250, atk: 22, def: 19, vel: 8, exp: 48, scrap: 26,
      moves: [
        { name: 'Mordida', type: 'corte', power: 16, acc: 95, kind: 'melee', range: 'perto', parryable: true, text: 'VAI MORDER' },
        { name: 'Arranhão', type: 'corte', power: 14, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI ARRANHAR' },
        { name: 'Casco Duro', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI SE ENDURECER' }
      ]
    },
    stray: {
      id: 'stray', name: 'Stray', faction: 'casca', sprite: 'stray',
      hp: 215, atk: 21, def: 18, vel: 18, exp: 46, scrap: 25,
      moves: [
        { name: 'Garra', type: 'corte', power: 15, acc: 95, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI RASGAR' },
        { name: 'Salto', type: 'corte', power: 19, acc: 90, kind: 'melee', range: 'any', parryable: true, effect: 'approach', text: 'VAI AVANÇAR' },
        { name: 'Bote', type: 'impacto', power: 16, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI CHOCAR' }
      ]
    },
    wretch: {
      id: 'wretch', name: 'Wretch', faction: 'carne', sprite: 'wretch',
      hp: 185, atk: 21, def: 17, vel: 16, exp: 44, scrap: 24,
      moves: [
        { name: 'Cuspe', type: 'sangue', power: 16, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI CUSPIR' },
        { name: 'Agarrar', type: 'corte', power: 18, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'pull', text: 'VAI AGARRAR' },
        { name: 'Contorção', type: 'impacto', power: 15, acc: 90, kind: 'melee', range: 'perto', parryable: true, text: 'VAI SE CONTORCER' }
      ]
    },
    caged: {
      id: 'caged', name: 'Caged Thing', faction: 'maquina', sprite: 'caged',
      hp: 270, atk: 23, def: 25, vel: 5, exp: 62, scrap: 34,
      moves: [
        { name: 'Ácido', type: 'sangue', power: 17, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI ATIRAR ÁCIDO' },
        { name: 'Avalanche', type: 'explosao', power: 22, acc: 85, kind: 'explosive', range: 'any', parryable: false, text: 'VAI ESMAGAR' },
        { name: 'Calibragem', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI SE CALIBRAR' }
      ]
    },
    drone: {
      id: 'drone', name: 'Drone', faction: 'maquina', sprite: 'drone',
      hp: 205, atk: 22, def: 20, vel: 22, exp: 56, scrap: 30,
      moves: [
        { name: 'Bico', type: 'corte', power: 16, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI PICAR' },
        { name: 'Rajada', type: 'sangue', power: 15, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI ATIRAR' },
        { name: 'Mergulho', type: 'impacto', power: 18, acc: 91, kind: 'melee', range: 'any', parryable: true, effect: 'approach', text: 'VAI MERGULHAR' }
      ]
    },
    ceremoniar: {
      id: 'ceremoniar', name: 'Ceremoniar', faction: 'carne', sprite: 'ceremoniar',
      hp: 235, atk: 23, def: 19, vel: 9, exp: 60, scrap: 32,
      moves: [
        { name: 'Vela', type: 'fogo', power: 18, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI ACENDER' },
        { name: 'Chama', type: 'fogo', power: 21, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI QUEIMAR' },
        { name: 'Sopro', type: 'sangue', power: 16, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI SOPRAR' }
      ]
    },
    v2: {
      id: 'v2', name: 'V2', faction: 'maquina', sprite: 'v2',
      hp: 480, atk: 24, def: 25, vel: 13, exp: 320, scrap: 180, boss: true, copies: true, flee: true,
      moves: [
        { name: 'Overclock', type: 'explosao', power: 27, acc: 90, kind: 'explosive', range: 'any', parryable: false, text: 'VAI EXPLODIR' },
        { name: 'Varredura', type: 'impacto', power: 22, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI VARRER' },
        { name: 'Recarga', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI SE RECARREGAR' }
      ]
    },

    /* ================= LUST ================= */
    enthusiast: {
      id: 'enthusiast', name: 'Enthusiast', faction: 'carne', sprite: 'enthusiast',
      hp: 275, atk: 25, def: 21, vel: 11, exp: 70, scrap: 38,
      moves: [
        { name: 'Lâmina', type: 'corte', power: 21, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI LAMINAR' },
        { name: 'Grito', type: 'impacto', power: 17, acc: 88, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI GRITAR' },
        { name: 'Embate', type: 'corte', power: 23, acc: 90, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI EMBESTIR' }
      ]
    },
    journeyman: {
      id: 'journeyman', name: 'Journeyman', faction: 'carne', sprite: 'journeyman',
      hp: 295, atk: 25, def: 23, vel: 9, exp: 74, scrap: 40,
      moves: [
        { name: 'Corrente', type: 'corte', power: 20, acc: 93, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI CHICOTEAR' },
        { name: 'Peso', type: 'impacto', power: 21, acc: 90, kind: 'melee', range: 'perto', parryable: false, text: 'VAI ARREMESSAR' },
        { name: 'Puxão', type: 'corte', power: 18, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'pull', text: 'VAI PUXAR' }
      ]
    },
    corporal: {
      id: 'corporal', name: 'Corporal', faction: 'carne', sprite: 'corporal',
      hp: 355, atk: 27, def: 26, vel: 6, exp: 88, scrap: 48,
      moves: [
        { name: 'Impacto', type: 'impacto', power: 26, acc: 93, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' },
        { name: 'Marreta', type: 'explosao', power: 26, acc: 88, kind: 'explosive', range: 'any', parryable: false, text: 'VAI MARRETAR' },
        { name: 'Casco', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI SE BARREAR' }
      ]
    },
    fanatic: {
      id: 'fanatic', name: 'Husk Fanatic', faction: 'carne', sprite: 'fanatic',
      hp: 285, atk: 26, def: 21, vel: 13, exp: 76, scrap: 41,
      moves: [
        { name: 'Machado', type: 'impacto', power: 21, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI MACHADAR' },
        { name: 'Cegueira', type: 'sangue', power: 18, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI CEGAR' },
        { name: 'Fúria', type: 'corte', power: 22, acc: 88, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI INVESTIR' }
      ]
    },
    lustful_husk: {
      id: 'lustful_husk', name: 'Lustful Husk', faction: 'casca', sprite: 'lustful_husk',
      hp: 275, atk: 25, def: 21, vel: 10, exp: 70, scrap: 38,
      moves: [
        { name: 'Abraço', type: 'corte', power: 19, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'pull', text: 'VAI ABRAÇAR' },
        { name: 'Beijo', type: 'sangue', power: 17, acc: 90, kind: 'melee', range: 'perto', parryable: false, effect: 'bleed', text: 'VAI BESAR' },
        { name: 'Sussurro', type: 'sangue', power: 18, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI SUSSURRAR' }
      ]
    },
    ceremoniar2: {
      id: 'ceremoniar2', name: 'Ceremoniar II', faction: 'carne', sprite: 'ceremoniar2',
      hp: 300, atk: 26, def: 22, vel: 8, exp: 82, scrap: 44,
      moves: [
        { name: 'Vela', type: 'fogo', power: 20, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI ACENDER' },
        { name: 'Chama', type: 'fogo', power: 23, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI QUEIMAR' },
        { name: 'Chumbo', type: 'explosao', power: 22, acc: 87, kind: 'explosive', range: 'any', parryable: false, text: 'VAI LANÇAR CHUMBO' }
      ]
    },
    minos: {
      id: 'minos', name: 'O Corpo do Rei Minos', faction: 'carne', sprite: 'minos',
      hp: 1350, atk: 29, def: 32, vel: 5, exp: 700, scrap: 420, boss: true, giant: true,
      moves: [
        { name: 'Esmagamento', type: 'impacto', power: 31, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' },
        { name: 'Dedos', type: 'corte', power: 27, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI ESGARRA' },
        { name: 'Cavidade', type: 'sangue', power: 29, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI VOMITAR' },
        { name: 'Sentença do Rei', type: 'explosao', power: 35, acc: 100, kind: 'inevitable', range: 'any', parryable: false, unavoidable: true, minHp: 0.3, text: 'SENTENÇA DO REI' }
      ]
    },

    /* ================= GLUTTONY ================= */
    soothsayer: {
      id: 'soothsayer', name: 'Soothsayer', faction: 'carne', sprite: 'soothsayer',
      hp: 400, atk: 28, def: 26, vel: 9, exp: 86, scrap: 46,
      moves: [
        { name: 'Profecia', type: 'sangue', power: 23, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI PROFERIR' },
        { name: 'Fogo', type: 'fogo', power: 24, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI QUEIMAR' },
        { name: 'Presságio', type: 'sangue', power: 22, acc: 90, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI PREVER' }
      ]
    },
    filet: {
      id: 'filet', name: 'Filet Machine', faction: 'maquina', sprite: 'filet',
      hp: 460, atk: 29, def: 29, vel: 6, exp: 96, scrap: 52,
      moves: [
        { name: 'Ácido', type: 'sangue', power: 23, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI ATIRAR ÁCIDO' },
        { name: 'Calibragem', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI SE CALIBRAR' },
        { name: 'Corte', type: 'corte', power: 23, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI CORTAR' }
      ]
    },
    bigjohn: {
      id: 'bigjohn', name: 'Big John', faction: 'carne', sprite: 'bigjohn',
      hp: 440, atk: 28, def: 27, vel: 7, exp: 94, scrap: 50,
      moves: [
        { name: 'Gancho', type: 'corte', power: 25, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI ESCARRAR' },
        { name: 'Esmagar', type: 'impacto', power: 24, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' },
        { name: 'Empurra-quebrado', type: 'explosao', power: 23, acc: 88, kind: 'explosive', range: 'any', parryable: false, effect: 'push', text: 'VAI ARREMESSAR' }
      ]
    },
    tallow: {
      id: 'tallow', name: 'Tallow Golem', faction: 'carne', sprite: 'tallow',
      hp: 470, atk: 29, def: 30, vel: 5, exp: 98, scrap: 54,
      moves: [
        { name: 'Chuva de Cera', type: 'explosao', power: 26, acc: 87, kind: 'explosive', range: 'any', parryable: false, text: 'VAI CHOVER CERA' },
        { name: 'Amolecer', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI AMOLECER' },
        { name: 'Esmagar', type: 'impacto', power: 25, acc: 91, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' }
      ]
    },
    drone2: {
      id: 'drone2', name: 'Drone II', faction: 'maquina', sprite: 'drone2',
      hp: 380, atk: 29, def: 25, vel: 20, exp: 92, scrap: 50,
      moves: [
        { name: 'Bico', type: 'corte', power: 22, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI PICAR' },
        { name: 'Rajada', type: 'sangue', power: 20, acc: 91, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI ATIRAR' },
        { name: 'Mergulho', type: 'impacto', power: 23, acc: 90, kind: 'melee', range: 'any', parryable: true, effect: 'approach', text: 'VAI MERGULHAR' }
      ]
    },
    ceremoniar3: {
      id: 'ceremoniar3', name: 'Ceremoniar III', faction: 'carne', sprite: 'ceremoniar3',
      hp: 420, atk: 30, def: 26, vel: 8, exp: 96, scrap: 52,
      moves: [
        { name: 'Vela', type: 'fogo', power: 23, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI ACENDER' },
        { name: 'Chama', type: 'fogo', power: 26, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI QUEIMAR' },
        { name: 'Chumbo', type: 'explosao', power: 24, acc: 88, kind: 'explosive', range: 'any', parryable: false, text: 'VAI LANÇAR CHUMBO' }
      ]
    },
    gabriel: {
      id: 'gabriel', name: 'Gabriel', faction: 'anjo', sprite: 'gabriel',
      hp: 850, atk: 31, def: 30, vel: 12, exp: 900, scrap: 600, boss: true,
      moves: [
        { name: 'Espada', type: 'corte', power: 24, acc: 95, kind: 'melee', range: 'perto', parryable: true, text: 'VAI DESFERRIR' },
        { name: 'Combo Sagrado', type: 'impacto', power: 29, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI COMBINAR' },
        { name: 'Julgamento', type: 'fogo', power: 26, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI JULGAR' },
        { name: 'Coro de Anjos', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI INVOCAR' },
        { name: 'Sentença', type: 'explosao', power: 35, acc: 100, kind: 'inevitable', range: 'any', parryable: false, unavoidable: true, minHp: 0.35, text: 'SENTENÇA FINAL' }
      ]
    }
  };

  /* Narração curta antes de cada batalha (o chefe não fala) */
  const ENEMY_INTRO = {
    husk: ['Uma casca vazia cambaleia na água suja.'],
    stray: ['Algo pequeno e rápido se move entre os escombros.'],
    wretch: ['Uma massa informe se contorce, procurando carne.'],
    caged: ['Uma máquina se arrasta, pingando ácido.'],
    drone: ['Um drone flutuante chia e mergulha no seu campo de visão.'],
    ceremoniar: ['Uma vela se acende no alto de uma figura mascarada.'],
    enthusiast: ['Ele sorri com a lâmina e não para de beijar.'],
    journeyman: ['Correntes arrastam pelo piso de carne.'],
    corporal: ['Ombros largos, punhos de concreto.'],
    fanatic: ['O martelo sobe antes do grito.'],
    lustful_husk: ['Ela abre os braços como quem espera um abraço.'],
    ceremoniar2: ['A vela grossa ilumina um ceremonial maior.'],
    soothsayer: ['Um olho enorme observa através da carne.'],
    filet: ['A máquina de filete abre a boca e cospe ácido.'],
    bigjohn: ['Um boi inchado de músculo e gancho de açougue.'],
    tallow: ['Uma massa de cera endurecida endurece o chão.'],
    drone2: ['Um drone maior, blindado, com Asas de metal.'],
    ceremoniar3: ['A vela imensa ilumina a catedral de carne.']
  };


  /* ---------------- HISTÓRIA ---------------- */
  const STORY = {
    intro: [
      { who:'...', text:'Sangue: 0%. Integridade: 0%. Objetivo: nenhum.', portrait:null },
      { who:'MOTOR', text:'Unidade V1 detectada. Sangue insuficiente. Recommendado: descer.', portrait:'motor' },
      { who:'V1', text:'[ ... ]', portrait:'v1' },
      { who:'MOTOR', text:'Você caiu nas fábricas afogadas de Limbo. A carnemunha consome a carne e o sangue de Veyra desde sempre.', portrait:'motor' },
      { who:'MOTOR', text:'Existe um motor lá embaixo. Encontre-o. E não se torne a máquina.', portrait:'motor' },
      { who:'V2', text:'Olha só. A versão antiga ainda respira.', portrait:'v2' },
      { who:'V2', text:'Você não passa de um protótipo enferrujado. Eu sou o próximo passo.', portrait:'v2' },
      { who:'V1', text:'[ ... ]', portrait:'v1' }
    ],
    afterMinos: [
      { who:'MOTOR', text:'O Corpo do Rei Minos parou de se mover. A catedral range e silencia.', portrait:'motor' },
      { who:'MOTOR', text:'Abaixo: Gluttony. A fábrica de digestão. Algo espera lá embaixo — e o seu nome está gravado nas peças.', portrait:'motor' }
    ],
    afterV2: [
      { who:'V2', text:'Então... era isso? Um punho velho contra uma máquina nova.', portrait:'v2' },
      { who:'V2', text:'Eu sou o modelo. Você é a peça descartada.', portrait:'v2' },
      { who:'V2', text:'— pare. Você não tem sangue. Não tem mais nada.', portrait:'v2' },
      { who:'MOTOR', text:'Unidade V2 desativada. Núcleo EXTRAÍDO. Novos sistemas disponíveis para integração.', portrait:'motor' },
      { who:'MOTOR', text:'Abaixo: Lust. O corpo do Rei Minos espera por alguém que o mate.', portrait:'motor' }
    ],
    lustStart: [
      { who:'MOTOR', text:'Lust. Uma catedral de carne onde os corpos se arrastam e beijam o que sobrou do Rei Minos.', portrait:'motor' },
      { who:'MOTOR', text:'Recomendo: parry. O Feedbacker responde bem contra lâminas de luz.', portrait:'motor' }
    ],
    gluttonyStart: [
      { who:'MOTOR', text:'Gluttony. A fábrica de digestão. Aqui o sangue é ingrediente.', portrait:'motor' },
      { who:'MOTOR', text:'Ele espera no fundo. Não dobra o Feedbacker.', portrait:'motor' }
    ],
    gabrielBefore: [
      { who:'GABRIEL', text:'Então é você. A lâmina que não aceita ser julgada.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Você não tem alma, V1. Não tem alma, e por isso não tem perdão. Só fome, e metal.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Vou mostrar qual de nós dois foi feito para seguir em frente.', portrait:'gabriel' }
    ],
    gabrielAfter: [
      { who:'GABRIEL', text:'...Isso não estava no cálculo.', portrait:'gabriel' },
      { who:'GABRIEL', text:'O portão está aberto. O sangue lá embaixo é infinito. Você pode descer, pode devorar tudo.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Ou pode parar. Como?', portrait:'gabriel' }
    ],
    bossIntro: {
      v2: [
        { who: 'V2', text: 'Olha só. A versão antiga ainda respira.', portrait: 'v2' },
        { who: 'V2', text: 'Você não passa de um protótipo enferrujado. Eu sou o próximo passo.', portrait: 'v2' },
        { who: 'V2', text: 'Mostre o que sobrou de você.', portrait: 'v2' }
      ],
      gabriel: [
        { who: 'GABRIEL', text: 'Então é você. A lâmina que não aceita ser julgada.', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'Você não tem alma, V1. Não tem alma, e por isso não tem perdão. Só fome, e metal.', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'Vou mostrar qual de nós dois foi feito para seguir em frente.', portrait: 'gabriel' }
      ]
    },
    gabrielFoge: [
      { who: 'GABRIEL', text: '...Você me feriu. Sangue. O meu sangue também.', portrait: 'gabriel' },
      { who: 'GABRIEL', text: 'Não. Hoje eu não. Ainda não.', portrait: 'gabriel' },
      { who: '...', text: '[ As lâminas de Gabriel se recolhem. Ele desaparece em brasa. ]', portrait: 'gabriel' }
    ],
    ending: [
      { who:'GABRIEL', text:'...', portrait:'gabriel' },
      { who:'GABRIEL', text:'A carnificina parou de bombear. As máquinas lá embaixo vão apodrecer em paz.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Você era a fera, e mesmo assim... escolheu o fim.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Eu não sei se isso é vitória. Mas é... humano.', portrait:'gabriel' }
    ]
  };

  /* ---------------- RANK DE ESTILO ---------------- */
  const STYLE_RANKS = [
    { key:'D',   min:0,    mult:1.0,  color:'#8a7f78' },
    { key:'C',   min:40,   mult:1.15, color:'#b09a7a' },
    { key:'B',   min:100,  mult:1.3,  color:'#c8a15a' },
    { key:'A',   min:180,  mult:1.5,  color:'#ff9d2e' },
    { key:'S',   min:300,  mult:1.75, color:'#ff7a3c' },
    { key:'SS',  min:1350, mult:2.0,  color:'#ff3355' },
    { key:'SSS', min:1900, mult:2.4,  color:'#ff5a72' },
  ];

  /* Rank de camada: tempo, vida perdida e estilo. Tudo em S => P (perfeito). */
  const LAYER_RANK = {
    order: ['D', 'C', 'B', 'A', 'S', 'P'],
    tempoAlvo: { limbo: 540, lust: 600, gluttony: 660 },
    tempo: [
      { key: 'S', max: 1.00 }, { key: 'A', max: 1.40 }, { key: 'B', max: 1.90 },
      { key: 'C', max: 2.60 }, { key: 'D', max: 99 }
    ],
    vida: [
      { key: 'S', max: 0.10 }, { key: 'A', max: 0.25 }, { key: 'B', max: 0.45 },
      { key: 'C', max: 0.70 }, { key: 'D', max: 99 }
    ],
    estilo: [
      { key: 'S', min: 320 }, { key: 'A', min: 200 }, { key: 'B', min: 110 },
      { key: 'C', min: 40 }, { key: 'D', min: 0 }
    ]
  };

  const DIFFICULTIES = {
    lenient: {
      id: 'lenient', name: 'Lenient', label: 'Lenient (Fácil)',
      desc: 'Inimigos fracos e lentos. Ideal para aprender o parry.',
      parryMs: 1500, hpMul: 0.78, atkMul: 0.72, dmgEnemy: 0.80, dmgPlayer: 1.05, scrap: 0.9, accBonus: -6
    },
    standard: {
      id: 'standard', name: 'Standard', label: 'Standard (Normal)',
      desc: 'O equilíbrio original do jogo. Inimigos duros, parry justo.',
      parryMs: 1050, hpMul: 1.00, atkMul: 1.00, dmgEnemy: 1.00, dmgPlayer: 1.00, scrap: 1.0, accBonus: 0
    },
    violent: {
      id: 'violent', name: 'Violent', label: 'Violent (Difícil)',
      desc: 'Inimigos mais fortes, mais rápidos e mais letais. Recompensa maior.',
      parryMs: 820, hpMul: 1.35, atkMul: 1.28, dmgEnemy: 1.22, dmgPlayer: 1.00, scrap: 1.4, accBonus: 6
    }
  };

  return {
    TYPES, FACTIONS, MOVES, ARMS, LEGS, CHASSIS, ITEMS,
    ENEMIES, LAYERS, ACTS, ENEMY_INTRO, STORY, STYLE_RANKS, DIFFICULTIES, LAYER_RANK
  };
})();
