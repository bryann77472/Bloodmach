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

    /* Thunderfist (amarelo) — paralisa o inimigo */
    trovao_soco: {
      id:'trovao_soco', name:'Soco de Trovão', type:'impacto', power:28, acc:95, cd:0, blood:2,
      effect:'paralyze:1', desc:'Impacto eletrificado que paralisa o alvo por 1 turno.'
    },
    trovao_corrente: {
      id:'trovao_corrente', name:'Corrente Elétrica', type:'impacto', power:22, acc:92, cd:1, blood:2, range:'longe',
      effect:'paralyze:1', desc:'Descarga à distância que paralisa o alvo por 1 turno.'
    },
    trovao_tempestade: {
      id:'trovao_tempestade', name:'Tempestade', type:'explosao', power:42, acc:85, cd:2, blood:0, range:'any',
      effect:'paralyze:2', desc:'Rajada que paralisa o alvo por 2 turnos.'
    },
    trovao_pulso: {
      id:'trovao_pulso', name:'Pulso Elétrico', type:'impacto', power:14, acc:96, cd:2, blood:1,
      effect:'paralyze:2', desc:'Pulso curto que trava o alvo por 2 turnos.'
    },

    /* Venomclaw (verde tóxico) — envenena */
    veneno_corte: {
      id:'veneno_corte', name:'Corte Venenoso', type:'corte', power:24, acc:95, cd:0, blood:2,
      effect:'venom:3', desc:'Corte que envenena o alvo por 3 turnos.'
    },
    veneno_cuspe: {
      id:'veneno_cuspe', name:'Cuspe Tóxico', type:'sangue', power:20, acc:91, cd:1, blood:2, range:'longe',
      effect:'venom:3', desc:'Cuspe ácido que envenena por 3 turnos.'
    },
    veneno_mordida: {
      id:'veneno_mordida', name:'Mordida Peçonhenta', type:'corte', power:28, acc:94, cd:1, blood:2.5,
      effect:'venom:4', desc:'Mordida que envenena o alvo por 4 turnos.'
    },
    veneno_nuvem: {
      id:'veneno_nuvem', name:'Nuvem Venenosa', type:'explosao', power:30, acc:88, cd:2, blood:0, range:'any',
      effect:'venom:4', desc:'Explosão de gás que envenena por 4 turnos.'
    },

    /* Soulreaver (branco) — drena a força do inimigo */
    alma_sifao: {
      id:'alma_sifao', name:'Sifão de Almas', type:'sangue', power:26, acc:96, cd:0, blood:4,
      effect:'drain', desc:'Rouba vida: cura 50% do dano causado.'
    },
    alma_foice: {
      id:'alma_foice', name:'Foice de Alma', type:'corte', power:32, acc:93, cd:1, blood:3,
      desc:'Corte fantasma que arranca pedaço da alma do alvo.'
    },
    alma_grito: {
      id:'alma_grito', name:'Grito de Alma', type:'impacto', power:18, acc:92, cd:2, blood:2, range:'longe',
      effect:'soulMark', desc:'Grito que drena 5% a mais da força do inimigo.'
    },
    alma_marca: {
      id:'alma_marca', name:'Marca da Alma', type:'sangue', power:22, acc:94, cd:2, blood:3,
      effect:'drainSoul', desc:'Marca a alma do alvo: rouba vida e reduz o dano que ele causa.'
    },

    /* Voidgrip (preto) — cancela ataques e cura, sem dano */
    vazio_nulo: {
      id:'vazio_nulo', name:'Nulo', type:null, power:0, acc:100, cd:1, blood:0,
      effect:'cancelAttack', desc:'Anula o próximo ataque do inimigo. Não causa dano.'
    },
    vazio_drenar: {
      id:'vazio_drenar', name:'Drenar Vazio', type:null, power:0, acc:100, cd:2, blood:0,
      effect:'healVoid:0.12', desc:'Puxa energia do nada: cura 12% do HP. Não causa dano.'
    },
    vazio_selamento: {
      id:'vazio_selamento', name:'Selo do Vazio', type:null, power:0, acc:100, cd:3, blood:0,
      effect:'sealEnemy', desc:'Prende o inimigo por 1 turno e cura 8% do HP.'
    },
    vazio_cura: {
      id:'vazio_cura', name:'Cura do Vazio', type:null, power:0, acc:100, cd:3, blood:0,
      effect:'healVoid:0.25', desc:'Regenera 25% do HP a partir do vazio.'
    },

    /* Gravityhook (roxo) — puxa e paralisa, mas o inimigo volta mais forte */
    gravidade_garrao: {
      id:'gravidade_garrao', name:'Agarrão Gravitacional', type:'impacto', power:24, acc:94, cd:0, blood:2,
      effect:'gravPull', desc:'Puxa o alvo para perto e paralisa por 2 turnos.'
    },
    gravidade_puxao: {
      id:'gravidade_puxao', name:'Puxão Gravitacional', type:'impacto', power:20, acc:93, cd:1, blood:2, range:'longe',
      effect:'gravPull2', desc:'Puxa o alvo e paralisa por 1 turno.'
    },
    gravidade_esmagamento: {
      id:'gravidade_esmagamento', name:'Esmagamento Gravitacional', type:'impacto', power:34, acc:91, cd:2, blood:3,
      effect:'paralyze:2', desc:'Peso esmagador: paralisa o alvo por 2 turnos.'
    },
    gravidade_estilingue: {
      id:'gravidade_estilingue', name:'Estilingue Gravitacional', type:'impacto', power:22, acc:92, cd:1, blood:2, range:'any',
      effect:'gravPush', desc:'Arremessa o alvo para longe e paralisa por 1 turno.'
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
      role:'Lento, explosivo, forte', price:0, unlock:'initial',
      passive:{ id:'push', name:'Empurra', desc:'Ataques empurram o alvo para longe.' },
      moves:['soco_foguete','carga_sismica','onda_de_choque','detonacao']
    },
    {
      id:'whiplash', name:'Whiplash', cor:'Verde', corHex:'#3ddc84', type:'corte',
      role:'Puxa e controla a distância', price:400, unlock:'v2',
      passive:{ id:'pullAlways', name:'Puxão certeiro', desc:'O Puxão nunca erra.' },
      moves:['puxao','laco','gancho_vital','arremesso']
    },
    {
      id:'bloodreaver', name:'Bloodreaver', cor:'Carmim', corHex:'#e0417a', type:'sangue',
      role:'Suga vida, sustain', price:600, unlock:'gabriel',
      passive:{ id:'healBonus', name:'Sede', desc:'+25% em toda cura.' },
      moves:['drenar','sangria','transfusao','banquete']
    },
    {
      id:'hellwhip', name:'Hellwhip', cor:'Laranja', corHex:'#ff9d2e', type:'fogo',
      role:'Corrente que puxa e derrete', price:600, unlock:'greed',
      passive:{ id:'anyRange', name:'Alcance Ígneo', desc:'Acerte o alvo em qualquer distância.' },
      moves:['chicote_de_lava','laco_igneo','corrente_fundida','erupcao']
    },
  ];

  /* Braços extras (conteúdo novo) */
  ARMS.push(
    {
      id:'thunderfist', name:'Thunderfist', cor:'Amarelo', corHex:'#ffd23f', type:'impacto',
      role:'Paralisa o inimigo com descargas', price:450, unlock:'heresyGabriel',
      passive:{ id:'shock', name:'Estática', desc:'20% de chance de paralisar o alvo a cada golpe.' },
      moves:['trovao_soco','trovao_corrente','trovao_tempestade','trovao_pulso']
    },
    {
      id:'venomclaw', name:'Venomclaw', cor:'Verdo', corHex:'#7bd93a', type:'sangue',
      role:'Envenena o alvo até derrubar', price:500, unlock:'layer2',
      passive:{ id:'venom', name:'Toxina', desc:'Os golpes aplicam 1 turno extra de veneno.' },
      moves:['veneno_corte','veneno_cuspe','veneno_mordida','veneno_nuvem']
    },
    {
      id:'soulreaver', name:'Soulreaver', cor:'Branco', corHex:'#e8eef5', type:'sangue',
      role:'Drena a força do inimigo', price:550, unlock:'layer2',
      passive:{ id:'soulReduce', name:'Drenar Almas', desc:'Cada golpe acumulado reduz em até 20% o dano que o inimigo causa.' },
      moves:['alma_sifao','alma_foice','alma_grito','alma_marca']
    },
    {
      id:'voidgrip', name:'Voidgrip', cor:'Preto', corHex:'#2b2b33', type:'sangue',
      role:'Cancela ataques e cura, sem dano', price:700, unlock:'layer2',
      passive:{ id:'voidGrip', name:'Vazio', desc:'Golpes do V1 têm 25% de chance de cancelar o ataque do inimigo. Este braço não causa dano.' },
      moves:['vazio_nulo','vazio_drenar','vazio_selamento','vazio_cura']
    },
    {
      id:'gravityhook', name:'Gravityhook', cor:'Roxo', corHex:'#a05cff', type:'impacto',
      role:'Puxa e paralisa — mas o inimigo volta mais forte', price:600, unlock:'layer2',
      passive:{ id:'gravity', name:'Gravidade', desc:'O inimigo paralisado pelo V1 ataca 30% mais forte quando se recuperar.' },
      moves:['gravidade_garrao','gravidade_puxao','gravidade_esmagamento','gravidade_estilingue']
    }
  );

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
      ability:null, price:250, unlock:'greed',
      desc:'Estrutura ultraleve, sem sistema extra. Rápida e frágil.',
      abilityDesc:'Sem habilidade ativa.'
    },
    {
      id:'shadow', name:'Pernas Shadow Step', peso:1, vel:1.05, esquiva:0.15, fuga:0.60,
      ability:null, price:300, unlock:'heresyGabriel',
      passive:{ id:'shadowGuard', name:'Passo Sombrio', desc:'Depois de esquivar, o próximo golpe recebido causa 50% menos dano.' },
      desc:'Passos que atravessam a sombra. Pesadas, mas flexíveis.',
      abilityDesc:'Passo Sombrio: depois de esquivar, o próximo golpe recebido causa 50% menos dano.'
    },
    {
      id:'berserk', name:'Pernas Berserk Springs', peso:0, vel:1.10, esquiva:0.12, fuga:0.55,
      ability:null, price:300, unlock:'layer2',
      passive:{ id:'berserk', name:'Fúria', desc:'Quanto menos vida, mais velocidade e esquiva: até 40% a mais com o V1 quase morto.' },
      desc:'Molas de combustão que soltam o corpo quando o sangue escasseia.',
      abilityDesc:'Fúria: quanto menos vida, mais velocidade e esquiva (até 40%).'
    },
  ];

  /* ---------------- CARCAÇAS ---------------- */
  const CHASSIS = [
    {
      id:'v1', name:'Carcaça V1', peso:0, hp:1.00, vel:1.00, price:0, unlock:'initial',
      desc:'Carcaça original do V1. Equilibrada em tudo.'
    },
    {
      id:'fibra', name:'Carcaça de Fibra', peso:-1, hp:0.80, vel:1.25, price:250, unlock:'greed',
      desc:'Placas ultraleves. Muito rápido, muito frágil.'
    },
    {
      id:'forja', name:'Carcaça de Forja', peso:1, hp:1.30, vel:0.80, price:350, unlock:'v2',
      desc:'Blindagem de forja. Aguenta muito, responde pouco.'
    },
    {
      id:'titan', name:'Carcaça Titan Husk', peso:2, hp:1.50, vel:0.70, price:400, unlock:'layer2',
      passive:{ id:'titan', name:'Casca de Titã', desc:'Quanto menos vida, mais resistência: até 30% de dano reduzido.' },
      desc:'Casca colossal de husk endurecido. Lenta e pesada, quase indestrutível.'
    },
    {
      id:'bloodforge', name:'Carcaça Bloodforge', peso:1, hp:1.20, vel:0.90, price:400, unlock:'heresyGabriel',
      passive:{ id:'bloodforge', name:'Forja de Sangue', desc:'Regenera 20% da vida total a cada 3 turnos.' },
      desc:'Placas forjadas com sangue. O corpo se refaz sozinho.'
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
    { id: 'act1', num: 'I', name: 'Infinity Hyperdeath', desc: 'Três camadas: os campos ensolarados, a metrópole neon e o estômago de carne.', wip: false, layers: ['limbo', 'lust', 'gluttony'] },
    { id: 'act2', num: 'II', name: 'Imperfect Hatred', desc: 'Greed, Wrath e Heresy: o deserto dos reis, o mar dos afogados e a cidade de Dis em chamas eternas.', wip: false, layers: ['greed', 'wrath', 'heresy'] },
    { id: 'act3', num: 'III', name: 'Expiação', desc: 'O julgamento final. Em desenvolvimento.', wip: true, layers: [] }
  ];

  const LAYERS = [
    {
      id: 'limbo', act: 1, order: 1, baseLevel: 7,
      name: 'Limbo', subtitle: 'O Vale Ensolarado',
      desc: 'Céu azul, montanhas colossais, árvores e um vale de grama e água.',
      modifier: { id: 'mare', name: 'Maré Morta', desc: 'O V1 se debate: dano recebido +10%.', dmgPlayer: 1.10 },
      encounters: ['husk', 'stray', 'wretch', 'caged', 'drone', 'ceremoniar'],
      boss: 'v2',
      checkpoints: [3],
      theme: { a: '#7ec8f0', b: '#3a8fc4', c: '#d9f2c4' }
    },
    {
      id: 'lust', act: 1, order: 2, baseLevel: 13,
      name: 'Lust', subtitle: 'A Metrópole Desejada',
      desc: 'Metrópole neon de arranha-céus colossais, passarelas e andaimes no vazio.',
      modifier: { id: 'luxuria', name: 'Luxúria', desc: 'Os inimigos golpeiam 18% mais forte.', atkMul: 1.18 },
      encounters: ['enthusiast', 'journeyman', 'corporal', 'fanatic', 'lustful_husk', 'ceremoniar2'],
      boss: 'mao',
      checkpoints: [3],
      theme: { a: '#a326c4', b: '#22053a', c: '#ff5ad0' }
    },
    {
      id: 'gluttony', act: 1, order: 3, baseLevel: 19,
      name: 'Gluttony', subtitle: 'O Estômago do Mundo',
      desc: 'Carne exposta, pequenas poças de ácido e o brilho amarelado da bile.',
      modifier: { id: 'acido', name: 'Digestão Ácida', desc: 'Toda cura é 30% menor.', healMul: 0.70 },
      encounters: ['soothsayer', 'filet', 'bigjohn', 'tallow', 'drone2', 'ceremoniar3'],
      boss: 'gabriel',
      checkpoints: [3],
      theme: { a: '#8a2214', b: '#1a0706', c: '#c9d24a' }
    },
    {
      id: 'greed', act: 2, order: 1, baseLevel: 20,
      name: 'Greed', subtitle: 'O Deserto dos Reis',
      desc: 'Pirâmides colossais, templos egípcios e colunatas greco-romanas soterrados sob um deserto incandescente.',
      modifier: { id: 'sol', name: 'Sol Impiedoso', desc: 'O calor do deserto aumenta o dano recebido em 15%.', dmgPlayer: 1.15 },
      encounters: ['anubis', 'mumia', 'legionario', 'esfinge', 'colosso', 'escaravelho'],
      boss: 'v2_greed',
      checkpoints: [3],
      theme: { a: '#e8b45a', b: '#5a2412', c: '#ffe6a0' }
    },
    {
      id: 'wrath', act: 2, order: 2, baseLevel: 21,
      name: 'Wrath', subtitle: 'O Mar dos Afogados',
      desc: 'Águas escuras e cinzentas sob um céu tempestuoso, pontes de ferro, torres góticas afogadas e cascas de navios abandonados.',
      modifier: { id: 'mare', name: 'Maré de Ferro', desc: 'A tempestade corrói o V1: dano recebido +12%.', dmgPlayer: 1.12 },
      encounters: ['afogado', 'gargula', 'barqueiro', 'noiva_afogada', 'tempestade', 'corsario'],
      boss: 'ferryman',
      checkpoints: [3],
      theme: { a: '#63727a', b: '#111b22', c: '#9fd8e8' }
    },
    {
      id: 'heresy', act: 2, order: 3, baseLevel: 23,
      name: 'Heresy', subtitle: 'A Cidade de Dis',
      desc: 'Catedrais góticas em ruínas, sepulcros de ferro incandescente e abismos de lava e sangue fervente sob um céu de brasas.',
      modifier: { id: 'fogoeterno', name: 'Fogo Eterno', desc: 'As chamas de Dis enfurecem os condenados: ataque dos inimigos +20%.', atkMul: 1.20 },
      encounters: ['herege', 'fornalha', 'serpente_lava', 'carrasco', 'alma_queimada', 'cavaleiro_ferro'],
      boss: 'gabriel_heresy',
      checkpoints: [3],
      theme: { a: '#b3261c', b: '#1a0806', c: '#ffb01f' }
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
    mao: {
      id: 'mao', name: 'A Mão do Rei Minos', faction: 'carne', sprite: 'mao',
      hp: 1350, atk: 29, def: 32, vel: 5, exp: 700, scrap: 420, boss: true, hand: true,
      moves: [
        { name: 'Esmagamento', type: 'impacto', power: 31, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' },
        { name: 'Dedos', type: 'corte', power: 27, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI ESGARRA' },
        { name: 'Palma', type: 'impacto', power: 29, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'push', text: 'VAI EMPURRAR' },
        { name: 'Dedo do Rei', type: 'explosao', power: 35, acc: 100, kind: 'inevitable', range: 'any', parryable: false, unavoidable: true, minHp: 0.3, text: 'DEDO DO REI' }
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
    },

    /* ================= GREED ================= */
    anubis: {
      id: 'anubis', name: 'Chacal de Anúbis', faction: 'casca', sprite: 'anubis',
      hp: 520, atk: 32, def: 30, vel: 12, exp: 118, scrap: 68,
      moves: [
        { name: 'Khopesh', type: 'corte', power: 26, acc: 94, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI DECAPITAR' },
        { name: 'Uivo do Deserto', type: 'impacto', power: 23, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'push', text: 'VAI UIVAR' },
        { name: 'Julgamento de Anúbis', type: 'sangue', power: 27, acc: 88, kind: 'melee', range: 'perto', parryable: true, text: 'VAI JULGAR' }
      ]
    },
    mumia: {
      id: 'mumia', name: 'Múmia Real', faction: 'carne', sprite: 'mumia',
      hp: 560, atk: 31, def: 28, vel: 6, exp: 122, scrap: 70,
      moves: [
        { name: 'Ataduras', type: 'corte', power: 22, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'pull', text: 'VAI AMARRAR' },
        { name: 'Maldição', type: 'sangue', power: 25, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'bleed', text: 'VAI AMALDIÇOAR' },
        { name: 'Poeira de Tumba', type: 'sangue', power: 21, acc: 90, kind: 'ranged', range: 'longe', parryable: true, effect: 'ferrugem', text: 'VAI SUFOCAR' }
      ]
    },
    legionario: {
      id: 'legionario', name: 'Legionário de Bronze', faction: 'maquina', sprite: 'legionario',
      hp: 600, atk: 34, def: 36, vel: 8, exp: 128, scrap: 76,
      moves: [
        { name: 'Gládio', type: 'corte', power: 25, acc: 94, kind: 'melee', range: 'perto', parryable: true, text: 'VAI GOLPEAR' },
        { name: 'Pilum', type: 'impacto', power: 24, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'push', text: 'VAI ARREMESSAR' },
        { name: 'Testudo', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI SE PROTEGER' }
      ]
    },
    esfinge: {
      id: 'esfinge', name: 'Esfinge de Ouro', faction: 'demonio', sprite: 'esfinge',
      hp: 540, atk: 33, def: 29, vel: 16, exp: 124, scrap: 72,
      moves: [
        { name: 'Garras', type: 'corte', power: 27, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI RASGAR' },
        { name: 'Enigma', type: 'sangue', power: 24, acc: 91, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI PERGUNTAR' },
        { name: 'Rajada de Areia', type: 'impacto', power: 22, acc: 90, kind: 'ranged', range: 'longe', parryable: true, effect: 'push', text: 'VAI SOPRAR' }
      ]
    },
    colosso: {
      id: 'colosso', name: 'Colosso de Marfim', faction: 'maquina', sprite: 'colosso',
      hp: 680, atk: 35, def: 40, vel: 4, exp: 138, scrap: 84,
      moves: [
        { name: 'Punho de Estátua', type: 'impacto', power: 31, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' },
        { name: 'Queda do Templo', type: 'explosao', power: 28, acc: 88, kind: 'explosive', range: 'any', parryable: false, text: 'VAI DESABAR' },
        { name: 'Pele de Bronze', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI ENDURECER' }
      ]
    },
    escaravelho: {
      id: 'escaravelho', name: 'Escaravelho Solar', faction: 'demonio', sprite: 'escaravelho',
      hp: 500, atk: 33, def: 26, vel: 18, exp: 120, scrap: 70,
      moves: [
        { name: 'Mandíbula', type: 'corte', power: 24, acc: 94, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI TRITURAR' },
        { name: 'Raio Solar', type: 'fogo', power: 27, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI QUEIMAR' },
        { name: 'Enxame', type: 'fogo', power: 21, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI ENXAMEAR' }
      ]
    },
    v2_greed: {
      id: 'v2_greed', name: 'V2 — Ascensão', faction: 'maquina', sprite: 'v2',
      hp: 1000, atk: 36, def: 34, vel: 16, exp: 1100, scrap: 700, boss: true, copies: true,
      moves: [
        { name: 'Overclock', type: 'explosao', power: 34, acc: 90, kind: 'explosive', range: 'any', parryable: false, text: 'VAI EXPLODIR' },
        { name: 'Lâmina Ascendente', type: 'corte', power: 30, acc: 94, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI CORTAR' },
        { name: 'Recarga', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI SE RECARREGAR' },
        { name: 'Ascensão', type: 'explosao', power: 42, acc: 100, kind: 'inevitable', range: 'any', parryable: false, unavoidable: true, minHp: 0.35, text: 'ASCENSÃO' }
      ]
    },

    /* ================= WRATH ================= */
    afogado: {
      id: 'afogado', name: 'Afogado', faction: 'casca', sprite: 'afogado',
      hp: 580, atk: 35, def: 30, vel: 10, exp: 145, scrap: 84,
      moves: [
        { name: 'Tridente Enferrujado', type: 'corte', power: 30, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI PERFURAR' },
        { name: 'Corrente do Porto', type: 'impacto', power: 28, acc: 90, kind: 'melee', range: 'perto', parryable: true, effect: 'push', text: 'VAI ACORRENTAR' },
        { name: 'Água nos Pulmões', type: 'sangue', power: 26, acc: 88, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI AFOGAR' }
      ]
    },
    gargula: {
      id: 'gargula', name: 'Gárgula de Ferro', faction: 'demonio', sprite: 'gargula',
      hp: 620, atk: 36, def: 38, vel: 12, exp: 152, scrap: 88,
      moves: [
        { name: 'Garra de Pedra', type: 'corte', power: 31, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI RASGAR' },
        { name: 'Uivo da Tempestade', type: 'impacto', power: 29, acc: 89, kind: 'ranged', range: 'longe', parryable: false, effect: 'push', text: 'VAI UIVAR' },
        { name: 'Pouso de Ferro', type: 'impacto', power: 33, acc: 90, kind: 'melee', range: 'any', parryable: true, effect: 'approach', text: 'VAI DESCER' }
      ]
    },
    barqueiro: {
      id: 'barqueiro', name: 'Barqueiro Menor', faction: 'carne', sprite: 'barqueiro',
      hp: 640, atk: 37, def: 32, vel: 9, exp: 158, scrap: 92,
      moves: [
        { name: 'Remo Pesado', type: 'impacto', power: 32, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'push', text: 'VAI REMAR' },
        { name: 'Lanterna Fria', type: 'fogo', power: 28, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI ILUMINAR' },
        { name: 'Corrente de Almas', type: 'corte', power: 29, acc: 91, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI PRENDER' }
      ]
    },
    noiva_afogada: {
      id: 'noiva_afogada', name: 'Noiva Afogada', faction: 'carne', sprite: 'noiva_afogada',
      hp: 600, atk: 36, def: 28, vel: 14, exp: 150, scrap: 86,
      moves: [
        { name: 'Véu de Algas', type: 'corte', power: 27, acc: 94, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI ENVOLVER' },
        { name: 'Lamento', type: 'sangue', power: 30, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI LAMENTAR' },
        { name: 'Abraço Frio', type: 'impacto', power: 31, acc: 91, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ABRAÇAR' }
      ]
    },
    tempestade: {
      id: 'tempestade', name: 'Tempestade Viva', faction: 'demonio', sprite: 'tempestade',
      hp: 560, atk: 39, def: 26, vel: 20, exp: 160, scrap: 94,
      moves: [
        { name: 'Raio', type: 'fogo', power: 34, acc: 88, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI CAIR' },
        { name: 'Vendaval', type: 'impacto', power: 28, acc: 90, kind: 'ranged', range: 'longe', parryable: true, effect: 'push', text: 'VAI SOPRAR' },
        { name: 'Descarga', type: 'explosao', power: 32, acc: 86, kind: 'ranged', range: 'any', parryable: false, text: 'VAI DESCARGAR' }
      ]
    },
    corsario: {
      id: 'corsario', name: 'Corsário Morto', faction: 'casca', sprite: 'corsario',
      hp: 610, atk: 38, def: 33, vel: 16, exp: 156, scrap: 90,
      moves: [
        { name: 'Cutelo do Corsário', type: 'corte', power: 32, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI CORTAR' },
        { name: 'Gancho', type: 'corte', power: 28, acc: 91, kind: 'melee', range: 'perto', parryable: true, effect: 'push', text: 'VAI GANCHAR' },
        { name: 'Pederneira', type: 'explosao', power: 30, acc: 87, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI ATIRAR' }
      ]
    },
    ferryman: {
      id: 'ferryman', name: 'Ferryman', faction: 'carne', sprite: 'ferryman',
      hp: 1150, atk: 41, def: 36, vel: 12, exp: 1600, scrap: 1000, boss: true,
      moves: [
        { name: 'Remo do Juízo', type: 'impacto', power: 38, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'push', text: 'VAI REMAR' },
        { name: 'Lanterna dos Afogados', type: 'fogo', power: 34, acc: 90, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI CHAMAR' },
        { name: 'Corrente de Almas', type: 'sangue', power: 32, acc: 91, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI ACORRENTAR' },
        { name: 'Maré Negra', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI AFUNDAR' },
        { name: 'Sentença do Barqueiro', type: 'explosao', power: 48, acc: 100, kind: 'inevitable', range: 'any', parryable: false, unavoidable: true, minHp: 0.35, text: 'SENTENÇA DO BARQUEIRO' }
      ]
    },

    /* ================= HERESY ================= */
    herege: {
      id: 'herege', name: 'Herege', faction: 'casca', sprite: 'herege',
      hp: 680, atk: 40, def: 34, vel: 10, exp: 185, scrap: 105,
      moves: [
        { name: 'Ferro em Brasa', type: 'fogo', power: 34, acc: 92, kind: 'melee', range: 'perto', parryable: true, text: 'VAI MARCAR' },
        { name: 'Livro Profano', type: 'sangue', power: 31, acc: 90, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI RECITAR' },
        { name: 'Grito Herético', type: 'impacto', power: 30, acc: 91, kind: 'ranged', range: 'longe', parryable: true, effect: 'push', text: 'VAI GRITAR' }
      ]
    },
    fornalha: {
      id: 'fornalha', name: 'Fornalha Viva', faction: 'maquina', sprite: 'fornalha',
      hp: 820, atk: 41, def: 44, vel: 5, exp: 200, scrap: 115,
      moves: [
        { name: 'Jato de Chama', type: 'fogo', power: 36, acc: 89, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI QUEIMAR' },
        { name: 'Porta Incandescente', type: 'impacto', power: 34, acc: 91, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ABRIR' },
        { name: 'Superaquecer', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI SUPERAQUECER' }
      ]
    },
    serpente_lava: {
      id: 'serpente_lava', name: 'Serpente de Lava', faction: 'demonio', sprite: 'serpente_lava',
      hp: 720, atk: 43, def: 32, vel: 17, exp: 195, scrap: 110,
      moves: [
        { name: 'Presa de Magma', type: 'corte', power: 33, acc: 93, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI MORDER' },
        { name: 'Cuspe de Lava', type: 'fogo', power: 35, acc: 88, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI CUSPIR' },
        { name: 'Enroscar', type: 'impacto', power: 32, acc: 90, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ENROSCAR' }
      ]
    },
    carrasco: {
      id: 'carrasco', name: 'Carrasco de Dis', faction: 'carne', sprite: 'carrasco',
      hp: 780, atk: 44, def: 38, vel: 7, exp: 205, scrap: 120,
      moves: [
        { name: 'Machado do Carrasco', type: 'corte', power: 38, acc: 91, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI DECAPITAR' },
        { name: 'Pé de Cabra', type: 'impacto', power: 35, acc: 90, kind: 'melee', range: 'perto', parryable: true, effect: 'push', text: 'VAI QUEBRAR' },
        { name: 'Sentença de Dis', type: 'sangue', power: 34, acc: 89, kind: 'ranged', range: 'longe', parryable: false, effect: 'ferrugem', text: 'VAI CONDENAR' }
      ]
    },
    alma_queimada: {
      id: 'alma_queimada', name: 'Alma Queimada', faction: 'demonio', sprite: 'alma_queimada',
      hp: 660, atk: 42, def: 30, vel: 19, exp: 190, scrap: 108,
      moves: [
        { name: 'Lamento Eterno', type: 'sangue', power: 32, acc: 92, kind: 'ranged', range: 'longe', parryable: true, text: 'VAI LAMENTAR' },
        { name: 'Chama Eterna', type: 'fogo', power: 37, acc: 88, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI ARDER' },
        { name: 'Cinzas', type: 'sangue', power: 29, acc: 90, kind: 'ranged', range: 'longe', parryable: true, effect: 'ferrugem', text: 'VAI SUFOCAR' }
      ]
    },
    cavaleiro_ferro: {
      id: 'cavaleiro_ferro', name: 'Cavaleiro de Ferro', faction: 'maquina', sprite: 'cavaleiro_ferro',
      hp: 860, atk: 42, def: 46, vel: 8, exp: 210, scrap: 125,
      moves: [
        { name: 'Espada Incandescente', type: 'corte', power: 36, acc: 92, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI CORTAR' },
        { name: 'Martelo de Escória', type: 'impacto', power: 38, acc: 89, kind: 'melee', range: 'perto', parryable: true, text: 'VAI ESMAGAR' },
        { name: 'Escudo de Brasa', type: null, kind: 'buff', effect: 'buffDef', text: 'VAI PROTEGER' }
      ]
    },
    gabriel_heresy: {
      id: 'gabriel_heresy', name: 'Gabriel — Heresia', faction: 'anjo', sprite: 'gabriel',
      hp: 1400, atk: 45, def: 40, vel: 15, exp: 2400, scrap: 1500, boss: true, heresy: true,
      moves: [
        { name: 'Espada Herética', type: 'corte', power: 40, acc: 94, kind: 'melee', range: 'perto', parryable: true, effect: 'bleed', text: 'VAI DESFERRIR' },
        { name: 'Combo Profano', type: 'impacto', power: 44, acc: 91, kind: 'melee', range: 'perto', parryable: true, text: 'VAI COMBINAR' },
        { name: 'Julgamento de Fogo', type: 'fogo', power: 42, acc: 89, kind: 'ranged', range: 'longe', parryable: false, text: 'VAI JULGAR' },
        { name: 'Asas de Brasa', type: null, kind: 'buff', effect: 'buffAtk', text: 'VAI ARDER' },
        { name: 'Sentença Final', type: 'explosao', power: 58, acc: 100, kind: 'inevitable', range: 'any', parryable: false, unavoidable: true, minHp: 0.35, text: 'SENTENÇA FINAL' }
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
    ceremoniar3: ['A vela imensa ilumina a catedral de carne.'],
    anubis: ['Um chacal de bronze ergue a khopesh sob o sol.'],
    mumia: ['Ataduras antigas se desenrolam na areia.'],
    legionario: ['Um legionário de bronze bate o escudo no chão.'],
    esfinge: ['A esfinge abre os olhos e sorri com dentes de pedra.'],
    colosso: ['O colosso se move. A areia treme.'],
    escaravelho: ['Um sol pequeno desce zumbindo sobre a areia.'],
    mao: ['Uma mão colossal se ergue do vazio, aberta, apontando para você.'],
    v2_greed: ['O deserto se cala. V2 desce das pirâmides, dourado e mais forte.'],
    afogado: ['Um corpo inchado emerge das águas cinzentas, tridente em punho.'],
    gargula: ['Uma gárgula de ferro abre as asas sob o relâmpago.'],
    barqueiro: ['Um barqueiro menor ergue o remo, a lanterna balançando no escuro.'],
    noiva_afogada: ['Um véu de algas se arrasta pela ponte. Algo espera dentro dele.'],
    tempestade: ['A tempestade ganha olhos. O ar cheira a ferro queimado.'],
    corsario: ['Um corsário morto sobe do casco afundado, cutelo entre os dentes.'],
    ferryman: ['O navio range. O Ferryman se ergue no convés, remo e lanterna em mãos.'],
    herege: ['Um herege marca o próprio corpo com ferro em brasa.'],
    fornalha: ['Uma fornalha viva abre a portinhola do peito. O calor cega.'],
    serpente_lava: ['Uma serpente de magma desliza entre os sepulcros incandescentes.'],
    carrasco: ['O carrasco de Dis arrasta o machado pelas pedras da catedral.'],
    alma_queimada: ['Uma alma queimada flutua, ainda gritando o nome de Deus.'],
    cavaleiro_ferro: ['Um cavaleiro de ferro incandescente ergue a espada em brasa.'],
    gabriel_heresy: ['O portão de Dis se abre. Gabriel desce entre chamas e cinzas.']
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
    afterMao: [
      { who:'MOTOR', text:'A Mão do Rei Minos se desfaz em pó. A catedral de Lust range e silencia.', portrait:'motor' },
      { who:'MOTOR', text:'Abaixo: Gluttony. A fábrica de digestão. Algo espera lá embaixo — e o seu nome está gravado nas peças.', portrait:'motor' }
    ],
    afterV2: [
      { who:'V2', text:'Então... era isso? Um punho velho contra uma máquina nova.', portrait:'v2' },
      { who:'V2', text:'Eu sou o modelo. Você é a peça descartada.', portrait:'v2' },
      { who:'V2', text:'— pare. Você não tem sangue. Não tem mais nada.', portrait:'v2' },
      { who:'MOTOR', text:'Unidade V2 desativada. Núcleo EXTRAÍDO. Novos sistemas disponíveis para integração.', portrait:'motor' },
      { who:'MOTOR', text:'Abaixo: Lust. A mão do Rei Minos se ergue das trevas, aberta, esperando por você.', portrait:'motor' }
    ],
    lustStart: [
      { who:'MOTOR', text:'Lust. Uma catedral de carne onde os corpos se arrastam diante da mão do Rei Minos.', portrait:'motor' },
      { who:'MOTOR', text:'Recomendo: parry. O Feedbacker responde bem contra dedos de pedra.', portrait:'motor' }
    ],
    gluttonyStart: [
      { who:'MOTOR', text:'Gluttony. A fábrica de digestão. Aqui o sangue é ingrediente.', portrait:'motor' },
      { who:'MOTOR', text:'Ele espera no fundo. Não dobra o Feedbacker.', portrait:'motor' }
    ],
    greedStart: [
      { who:'MOTOR', text:'Greed. O deserto dos reis. Pirâmides colossais, templos soterrados e um sol que não perdoa.', portrait:'motor' },
      { who:'MOTOR', text:'As assinaturas de V2 estão aqui. Mais fortes. Mais douradas.', portrait:'motor' },
      { who:'V2', text:'Você demorou. Eu já não sou o mesmo corpo.', portrait:'v2' }
    ],
    wrathStart: [
      { who:'MOTOR', text:'Wrath. O mar dos afogados. A tempestade não para de cair desde que a cidade afundou.', portrait:'motor' },
      { who:'MOTOR', text:'Pontes de ferro, torres góticas e cascos de navios. Algo maior navega entre os destroços.', portrait:'motor' },
      { who:'V1', text:'[ ... ]', portrait:'v1' }
    ],
    heresyStart: [
      { who:'MOTOR', text:'Heresy. A cidade de Dis. Catedrais em ruínas, sepulcros de ferro e rios de sangue fervente.', portrait:'motor' },
      { who:'MOTOR', text:'Gabriel está aqui. Não é o anjo que você feriu em Gluttony. Este desceu mais fundo.', portrait:'motor' },
      { who:'MOTOR', text:'Quando o portão abrir, não espere perdão.', portrait:'motor' },
      { who:'V1', text:'[ ... ]', portrait:'v1' }
    ],
    gabrielHeresyBefore: [
      { who:'GABRIEL', text:'Máquina...', portrait:'gabriel' },
      { who:'GABRIEL', text:'Eu vou te destruir.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Vou te despedaçar, espalhar os restos da sua forma profana por todas as ESTRELAS!', portrait:'gabriel' },
      { who:'GABRIEL', text:'Vou te triturar até que as próprias FAÍSCAS SUPLIQUEM POR PIEDADE!', portrait:'gabriel' },
      { who:'GABRIEL', text:'Minhas mãos vão se deleitar ao acabar com você...', portrait:'gabriel' },
      { who:'GABRIEL', text:'AQUI E AGORA!', portrait:'gabriel' }
    ],
    gabrielHeresyDeath: [
      { who:'GABRIEL', text:'Impossível... eu carreguei a luz através de mil eras.', portrait:'gabriel' },
      { who:'GABRIEL', text:'E você... uma máquina faminta... não deveria ter chegado até aqui.', portrait:'gabriel' },
      { who:'GABRIEL', text:'Mas eu vejo agora. A vontade que me falta... é toda sua.', portrait:'gabriel' }
    ],
    gabrielHeresyLastWords: [
      { who:'GABRIEL', text:'Que teus sofrimentos sejam muitos... e teus dias poucos.', portrait:'gabriel' }
    ],
    afterFerryman: [
      { who:'MOTOR', text:'O Ferryman afunda com o navio. As águas de Wrath se aquietam.', portrait:'motor' },
      { who:'MOTOR', text:'A ponte de ferro range adiante. Heresy espera: a cidade de Dis, onde as catedrais queimam sem fim.', portrait:'motor' },
      { who:'V1', text:'[ ... ]', portrait:'v1' }
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
    afterGreedV2: [
      { who:'MOTOR', text:'V2 — Ascensão foi desativada. O núcleo dourado está na oficina.', portrait:'motor' },
      { who:'MOTOR', text:'Hellwhip e as peças de Fibra liberados para compra. O deserto de Greed está em silêncio.', portrait:'motor' },
      { who:'MOTOR', text:'As pontes de Wrath rangem adiante. E além delas, Dis queima sem fim.', portrait:'motor' },
      { who:'V1', text:'[ ... ]', portrait:'v1' }
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
      ],
      gabriel_heresy: [
        { who: 'GABRIEL', text: 'Máquina...', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'Eu vou te destruir.', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'Vou te despedaçar, espalhar os restos da sua forma profana por todas as ESTRELAS!', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'Vou te triturar até que as próprias FAÍSCAS SUPLIQUEM POR PIEDADE!', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'Minhas mãos vão se deleitar ao acabar com você...', portrait: 'gabriel' },
        { who: 'GABRIEL', text: 'AQUI E AGORA!', portrait: 'gabriel' }
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
    tempoAlvo: { limbo: 540, lust: 600, gluttony: 660, greed: 720, wrath: 780, heresy: 840 },
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
