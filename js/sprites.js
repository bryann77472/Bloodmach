/* ============================================================
   BLOODMACH — sprites.js
   Arte vetorial procedural: V1, V2, Gabriel, inimigos e cenários.
   ============================================================ */
var BM = (window.BM = window.BM || {});

BM.sprites = (function () {
  'use strict';

  const VB = '0 0 200 260';

  function svg(inner, extra) {
    return '<svg viewBox="' + VB + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">' +
      (extra || '') + inner + '</svg>';
  }

  const defs = `
    <defs>
      <linearGradient id="g-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a6a72"/><stop offset=".5" stop-color="#3a3a44"/><stop offset="1" stop-color="#20202a"/>
      </linearGradient>
      <linearGradient id="g-steel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9aa3b0"/><stop offset=".55" stop-color="#4a5361"/><stop offset="1" stop-color="#242a33"/>
      </linearGradient>
      <linearGradient id="g-blood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ff3b5c"/><stop offset="1" stop-color="#7a0a18"/>
      </linearGradient>
      <linearGradient id="g-flesh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b98a78"/><stop offset="1" stop-color="#5c3a34"/>
      </linearGradient>
      <linearGradient id="g-wax" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e8c46a"/><stop offset="1" stop-color="#8a5a1c"/>
      </linearGradient>
      <linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff3c4"/><stop offset=".5" stop-color="#e0b155"/><stop offset="1" stop-color="#8a5f1c"/>
      </linearGradient>
      <linearGradient id="g-bone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#efe7d6"/><stop offset="1" stop-color="#a89a84"/>
      </linearGradient>
      <radialGradient id="g-eye" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#ffd85a"/><stop offset="1" stop-color="#ff7a1a"/>
      </radialGradient>
      <linearGradient id="g-wing" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#ff6a00"/><stop offset=".55" stop-color="#ffb01f"/><stop offset="1" stop-color="#ffe08a"/>
      </linearGradient>
      <radialGradient id="g-mecheye" cx=".5" cy=".45" r=".6">
        <stop offset="0" stop-color="#fffbe8"/><stop offset=".45" stop-color="#ffd85a"/><stop offset="1" stop-color="#ff7a1a"/>
      </radialGradient>
      <radialGradient id="g-acid" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#c8ff6a"/><stop offset="1" stop-color="#4a7a10"/>
      </radialGradient>
    </defs>`;

  /* ---------------- V1 ---------------- */
  /* ============================================================
     V1 / V2 — recriação vetorial (mesmo estilo do Gabriel),
     usando os PNGs como referência.
     ============================================================ */
  const V1_CORES = {
    arm: '#4a5a92', armDark: '#2a3352', armEdge: '#161c2c',
    wingA: '#ffc233', wingB: '#f2661a', wingEdge: '#7a3200',
    eyeA: '#fff6c0', eyeB: '#ff8a12', core: '#ffb01f',
    sombra: 'rgba(0,0,0,.5)'
  };
  const V2_CORES = {
    arm: '#c2471f', armDark: '#7a2410', armEdge: '#3a1006',
    wingA: '#ffb03a', wingB: '#f04a12', wingEdge: '#7a1c00',
    eyeA: '#fff8d0', eyeB: '#ff7a12', core: '#ffd05a',
    sombra: 'rgba(0,0,0,.5)'
  };

  function mechSvg(c) {
    return svg(defs + `
      <ellipse cx="100" cy="252" rx="44" ry="8" fill="${c.sombra}"/>

      <!-- lâminas das costas -->
      <g stroke="${c.wingEdge}" stroke-width="2" stroke-linejoin="round">
        <path d="M74 104 L8 26 L36 40 L10 6 L62 48 Z" fill="url(#g-wing)"/>
        <path d="M78 96 L44 4 L58 20 L58 2 L82 70 Z" fill="url(#g-wing)"/>
        <path d="M126 104 L192 26 L164 40 L190 6 L138 48 Z" fill="url(#g-wing)"/>
        <path d="M122 96 L156 4 L142 20 L142 2 L118 70 Z" fill="url(#g-wing)"/>
        <path d="M70 128 L4 96 L26 96 L6 74 L60 100 Z" fill="url(#g-wing)"/>
        <path d="M130 128 L196 96 L174 96 L194 74 L140 100 Z" fill="url(#g-wing)"/>
      </g>

      <!-- pernas -->
      <g>
        <path d="M80 158 L98 158 L94 196 L78 196 Z" fill="${c.armDark}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M102 158 L120 158 L122 196 L106 196 Z" fill="${c.armDark}" stroke="${c.armEdge}" stroke-width="2"/>
        <rect x="80" y="192" width="14" height="10" rx="3" fill="${c.armEdge}"/>
        <rect x="106" y="192" width="14" height="10" rx="3" fill="${c.armEdge}"/>
        <path d="M76 200 L96 200 L92 228 L74 228 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M104 200 L124 200 L126 228 L108 228 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M72 226 L96 226 L100 244 L64 244 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M106 226 L130 226 L136 244 L100 244 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="2"/>
        <rect x="66" y="242" width="32" height="6" rx="2" fill="${c.armEdge}"/>
        <rect x="102" y="242" width="32" height="6" rx="2" fill="${c.armEdge}"/>
      </g>

      <!-- cinto / quadril -->
      <path d="M76 146 L124 146 L120 162 L80 162 Z" fill="${c.armEdge}"/>
      <rect x="88" y="148" width="24" height="10" rx="2" fill="${c.core}" opacity=".9"/>

      <!-- torso -->
      <path d="M72 90 L128 90 L136 116 L130 150 L70 150 L64 116 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="3"/>
      <path d="M84 96 L116 96 L118 118 L82 118 Z" fill="${c.armDark}"/>
      <rect x="88" y="102" width="24" height="6" rx="2" fill="${c.core}"/>
      <path d="M70 120 L130 120 L126 140 L74 140 Z" fill="${c.armDark}" opacity=".7"/>
      <circle cx="100" cy="130" r="7" fill="${c.armEdge}"/>
      <circle cx="100" cy="130" r="3.4" fill="${c.core}"/>

      <!-- ombreiras -->
      <path d="M62 88 L80 84 L84 106 L58 108 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="3"/>
      <path d="M138 88 L120 84 L116 106 L142 108 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="3"/>

      <!-- braços -->
      <g>
        <path d="M56 106 L70 106 L68 140 L56 140 Z" fill="${c.armDark}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M54 138 L70 138 L70 176 L56 176 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M56 172 L70 172 L68 190 L58 190 Z" fill="${c.armDark}"/>
        <path d="M130 106 L144 106 L144 140 L132 140 Z" fill="${c.armDark}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M130 138 L146 138 L144 176 L130 176 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="2"/>
        <path d="M130 172 L144 172 L142 190 L132 190 Z" fill="${c.armDark}"/>
      </g>

      <!-- pescoço e cabeça -->
      <rect x="92" y="78" width="16" height="16" rx="3" fill="${c.armEdge}"/>
      <path d="M76 36 L124 36 L132 58 L126 82 L74 82 L68 58 Z" fill="${c.arm}" stroke="${c.armEdge}" stroke-width="3"/>
      <path d="M76 36 L124 36 L128 46 L72 46 Z" fill="${c.armDark}"/>
      <circle cx="100" cy="60" r="15" fill="${c.armEdge}"/>
      <circle cx="100" cy="60" r="11" fill="url(#g-mecheye)"/>
      <circle cx="96" cy="56" r="3" fill="#fff" opacity=".7"/>
      <path d="M82 74 L118 74 L116 82 L84 82 Z" fill="${c.armEdge}"/>
    `);
  }

  function v1Svg() { return mechSvg(V1_CORES); }
  function v2Svg() { return mechSvg(V2_CORES); }

  function fallbackV1() { return v1Svg(); }
  function fallbackV2() { return v2Svg(); }

  /* ============================================================
     SPRITES DA LOJA
     ============================================================ */
  const SHOP_VB = '0 0 100 100';
  function shopSvg(inner) {
    return '<svg viewBox="' + SHOP_VB + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">' +
      defs + inner + '</svg>';
  }

  /* --- braço: antebraço com o módulo do equipamento --- */
  function armSprite(id) {
    const base = (cor, cor2, extra) => shopSvg(`
      <ellipse cx="50" cy="92" rx="26" ry="5" fill="rgba(0,0,0,.45)"/>
      <path d="M34 22 L66 22 L70 52 L64 74 L36 74 L30 52 Z" fill="${cor2}" stroke="#12151c" stroke-width="3"/>
      <path d="M32 44 L68 44 L66 70 L34 70 Z" fill="${cor}" stroke="#12151c" stroke-width="3"/>
      ${extra}
      <path d="M36 70 L64 70 L62 82 L38 82 Z" fill="#1a1e26"/>
      <path d="M40 80 L46 80 L46 90 L40 90 Z" fill="#2a303c"/>
      <path d="M54 80 L60 80 L60 90 L54 90 Z" fill="#2a303c"/>
    `);
    if (id === 'feedbacker') return base('#4a5a92', '#2a3352', `
      <circle cx="50" cy="52" r="11" fill="#12151c"/>
      <circle cx="50" cy="52" r="7" fill="url(#g-mecheye)"/>
      <rect x="38" y="28" width="24" height="6" rx="2" fill="#8fb0ff" opacity=".8"/>
    `);
    if (id === 'knuckleblaster') return base('#c2372a', '#7a1a12', `
      <rect x="36" y="44" width="28" height="16" rx="3" fill="#12151c"/>
      <rect x="40" y="48" width="20" height="8" rx="2" fill="#ff6b4a"/>
      <path d="M44 60 L56 60 L52 70 L48 70 Z" fill="#ff9d2e" opacity=".9"/>
    `);
    if (id === 'whiplash') return base('#2f9a5c', '#17512f', `
      <g stroke="#3ddc84" stroke-width="3" fill="none">
        <path d="M50 30 q16 8 6 22"/><path d="M56 52 q16 8 6 22"/>
      </g>
      <path d="M62 72 q10 -4 12 4 q-6 6 -12 2 Z" fill="#cfe9d8" stroke="#12151c" stroke-width="2"/>
    `);
    if (id === 'bloodreaver') return base('#a3244a', '#5c1026', `
      <path d="M38 30 L44 30 L42 62 L36 62 Z" fill="#e0417a" opacity=".85"/>
      <path d="M50 26 L56 26 L54 58 L48 58 Z" fill="#e0417a" opacity=".85"/>
      <path d="M60 32 L66 32 L64 64 L58 64 Z" fill="#e0417a" opacity=".85"/>
      <circle cx="50" cy="52" r="8" fill="url(#g-blood)"/>
    `);
    if (id === 'hellwhip') return base('#c2661a', '#6b3208', `
      <g stroke="#ff9d2e" stroke-width="3.5" fill="none">
        <path d="M46 26 q18 10 4 24"/><path d="M54 48 q18 10 4 24"/>
      </g>
      <circle cx="60" cy="74" r="7" fill="url(#g-blood)"/>
      <circle cx="60" cy="74" r="3" fill="#ffe08a"/>
    `);
    if (id === 'thunderfist') return base('#c9a520', '#6d5406', `
      <circle cx="50" cy="52" r="12" fill="#12151c"/>
      <circle cx="50" cy="52" r="8" fill="#ffd23f"/>
      <g stroke="#fff3b0" stroke-width="3" fill="none" stroke-linecap="round">
        <path d="M36 30 l-6 10 l8 2 l-8 10"/>
        <path d="M64 30 l6 10 l-8 2 l8 10"/>
      </g>
    `);
    if (id === 'venomclaw') return base('#4e8a1c', '#26460c', `
      <g stroke="#b8f05a" stroke-width="4" fill="none" stroke-linecap="round">
        <path d="M42 34 q-8 14 -2 26"/><path d="M52 32 q-2 16 2 28"/><path d="M62 34 q8 14 2 26"/>
      </g>
      <circle cx="50" cy="52" r="9" fill="#12151c"/>
      <circle cx="50" cy="52" r="5" fill="#9ee02a"/>
      <path d="M46 66 q4 8 8 0 z" fill="#9ee02a" opacity=".8"/>
    `);
    if (id === 'soulreaver') return base('#c8d2de', '#7b8794', `
      <ellipse cx="50" cy="46" rx="15" ry="18" fill="#f2f7ff" opacity=".92"/>
      <ellipse cx="45" cy="42" rx="4" ry="6" fill="#12151c"/>
      <ellipse cx="55" cy="42" rx="4" ry="6" fill="#12151c"/>
      <path d="M42 58 q8 6 16 0" stroke="#12151c" stroke-width="3" fill="none"/>
      <path d="M50 64 q-6 10 0 16 q6 -6 0 -16 z" fill="#ffffff" opacity=".7"/>
    `);
    if (id === 'voidgrip') return base('#2b2b33', '#12121a', `
      <circle cx="50" cy="50" r="16" fill="#05050a"/>
      <circle cx="50" cy="50" r="16" fill="none" stroke="#6a4cff" stroke-width="2.5" opacity=".8"/>
      <g stroke="#1a1a22" stroke-width="7" stroke-linecap="round">
        <path d="M38 40 l-4 14"/><path d="M44 36 l-2 16"/><path d="M56 36 l2 16"/><path d="M62 40 l4 14"/>
      </g>
      <circle cx="50" cy="50" r="5" fill="#8a6cff" opacity=".85"/>
    `);
    if (id === 'gravityhook') return base('#6b34c4', '#33176b', `
      <path d="M64 30 q16 12 4 30 q-10 14 -22 4" fill="none" stroke="#c9a0ff" stroke-width="6" stroke-linecap="round"/>
      <path d="M46 64 q-8 8 0 14 q8 -6 0 -14 z" fill="#e8d4ff"/>
      <g stroke="#a05cff" stroke-width="2.5" fill="none" opacity=".85">
        <ellipse cx="50" cy="52" rx="24" ry="10"/>
        <ellipse cx="50" cy="52" rx="16" ry="6"/>
      </g>
      <circle cx="50" cy="52" r="6" fill="#a05cff"/>
    `);
    return base('#5a6470', '#2b3138', '');
  }

  /* --- perna --- */
  function legSprite(id) {
    if (id === 'ignicao') return shopSvg(`
      <ellipse cx="50" cy="94" rx="24" ry="4" fill="rgba(0,0,0,.45)"/>
      <path d="M36 14 L64 14 L68 44 L60 72 L40 72 L32 44 Z" fill="#4a5058" stroke="#12161a" stroke-width="3"/>
      <rect x="40" y="26" width="20" height="8" rx="2" fill="#ff9d2e" opacity=".9"/>
      <path d="M38 66 L62 66 L64 84 L36 84 Z" fill="#2b3138"/>
      <path d="M42 84 L58 84 L62 92 L38 92 Z" fill="#ff6b4a" opacity=".9"/>
      <path d="M34 40 L66 40" stroke="#8b8b96" stroke-width="3" opacity=".6"/>
    `);
    if (id === 'fibra') return shopSvg(`
      <ellipse cx="50" cy="94" rx="20" ry="4" fill="rgba(0,0,0,.45)"/>
      <path d="M40 12 L60 12 L62 44 L54 74 L46 74 L38 44 Z" fill="#cfd8e2" stroke="#12161a" stroke-width="3"/>
      <path d="M44 30 L56 30 L56 44 L44 44 Z" fill="#3fd8d8" opacity=".85"/>
      <path d="M42 70 L58 70 L60 86 L40 86 Z" fill="#9aa8b6"/>
      <path d="M40 86 L60 86 L64 92 L36 92 Z" fill="#e6eef5"/>
    `);
    if (id === 'shadow') return shopSvg(`
      <ellipse cx="50" cy="94" rx="24" ry="5" fill="rgba(0,0,0,.5)"/>
      <path d="M38 12 L62 12 L64 44 L58 74 L42 74 L36 44 Z" fill="#e8eef5" stroke="#12151c" stroke-width="3"/>
      <path d="M42 28 L58 28 L58 44 L42 44 Z" fill="#3a4050"/>
      <path d="M42 74 L58 74 L60 86 L40 86 Z" fill="#9aa6b6"/>
      <path d="M40 86 L60 86 L66 92 L34 92 Z" fill="#12151c"/>
      <path d="M32 60 q18 8 36 0" stroke="#12151c" stroke-width="3" fill="none" opacity=".7"/>
    `);
    if (id === 'berserk') return shopSvg(`
      <ellipse cx="50" cy="94" rx="24" ry="4" fill="rgba(0,0,0,.45)"/>
      <path d="M38 12 L62 12 L66 44 L58 76 L42 76 L34 44 Z" fill="#3f6a24" stroke="#12151a" stroke-width="3"/>
      <g stroke="#7bd93a" stroke-width="4" fill="none">
        <path d="M40 40 q10 -8 20 0 q-10 8 -20 0"/>
        <path d="M40 52 q10 -8 20 0 q-10 8 -20 0"/>
        <path d="M40 64 q10 -8 20 0 q-10 8 -20 0"/>
      </g>
      <rect x="40" y="22" width="20" height="7" rx="2" fill="#b8f05a" opacity=".85"/>
      <path d="M38 86 L62 86 L66 92 L34 92 Z" fill="#2b3138"/>
    `);
    return shopSvg(`
      <ellipse cx="50" cy="94" rx="22" ry="4" fill="rgba(0,0,0,.45)"/>
      <path d="M38 12 L62 12 L66 44 L58 76 L42 76 L34 44 Z" fill="#4a5058" stroke="#12161a" stroke-width="3"/>
      <rect x="40" y="24" width="20" height="7" rx="2" fill="#8b8b96" opacity=".8"/>
      <path d="M40 72 L60 72 L62 86 L38 86 Z" fill="#2b3138"/>
      <path d="M38 86 L62 86 L66 92 L34 92 Z" fill="#6a7078"/>
    `);
  }

  /* --- carcaça --- */
  function chassisSprite(id) {
    if (id === 'fibra') return shopSvg(`
      <path d="M22 26 L78 26 L86 46 L80 76 L20 76 L14 46 Z" fill="#dfe7ef" stroke="#12161a" stroke-width="3"/>
      <path d="M34 36 L66 36 L66 50 L34 50 Z" fill="#3fd8d8" opacity=".8"/>
      <path d="M22 58 L78 58 L76 70 L24 70 Z" fill="#b3c0cd"/>
    `);
    if (id === 'forja') return shopSvg(`
      <path d="M16 22 L84 22 L92 48 L84 80 L16 80 L8 48 Z" fill="#3a4048" stroke="#12161a" stroke-width="3"/>
      <circle cx="26" cy="34" r="3" fill="#6a7078"/><circle cx="74" cy="34" r="3" fill="#6a7078"/>
      <circle cx="26" cy="68" r="3" fill="#6a7078"/><circle cx="74" cy="68" r="3" fill="#6a7078"/>
      <path d="M34 40 L66 40 L66 56 L34 56 Z" fill="#12161a"/>
      <path d="M40 44 L60 44 L60 52 L40 52 Z" fill="#ff6b4a" opacity=".9"/>
      <path d="M16 60 L84 60 L84 74 L16 74 Z" fill="#2b3138"/>
    `);
    if (id === 'titan') return shopSvg(`
      <path d="M14 20 L86 20 L94 48 L86 82 L14 82 L6 48 Z" fill="#5a6068" stroke="#12161a" stroke-width="3"/>
      <circle cx="24" cy="32" r="4" fill="#8b8b96"/><circle cx="76" cy="32" r="4" fill="#8b8b96"/>
      <circle cx="24" cy="70" r="4" fill="#8b8b96"/><circle cx="76" cy="70" r="4" fill="#8b8b96"/>
      <path d="M30 36 L70 36 L70 58 L30 58 Z" fill="#2b3138"/>
      <path d="M38 42 L62 42 L62 52 L38 52 Z" fill="#ffb01f" opacity=".85"/>
      <path d="M14 62 L86 62 L84 76 L16 76 Z" fill="#3a4048"/>
      <path d="M22 26 L34 26" stroke="#c8a15a" stroke-width="3" opacity=".7"/>
    `);
    if (id === 'bloodforge') return shopSvg(`
      <path d="M18 22 L82 22 L90 46 L82 80 L18 80 L10 46 Z" fill="#7a1f1f" stroke="#12161c" stroke-width="3"/>
      <path d="M32 34 L68 34 L68 52 L32 52 Z" fill="#2a0a0a"/>
      <circle cx="50" cy="43" r="8" fill="url(#g-blood)"/>
      <g stroke="#ff3b5c" stroke-width="2.5" fill="none" opacity=".85">
        <path d="M26 58 q10 8 6 18"/><path d="M74 58 q-10 8 -6 18"/>
        <path d="M50 58 q-6 8 0 16 q6 -8 0 -16"/>
      </g>
      <path d="M18 64 L82 64 L80 76 L20 76 Z" fill="#4a1010"/>
    `);
    return shopSvg(`
      <path d="M20 24 L80 24 L88 46 L80 78 L20 78 L12 46 Z" fill="#4a5a92" stroke="#12151c" stroke-width="3"/>
      <path d="M36 34 L64 34 L64 50 L36 50 Z" fill="#12151c"/>
      <circle cx="50" cy="42" r="7" fill="url(#g-mecheye)"/>
      <path d="M20 60 L80 60 L78 72 L22 72 Z" fill="#2a3352"/>
    `);
  }

  /* --- consumíveis --- */
  function itemSprite(id) {
    if (id === 'bolsa_sangue') return shopSvg(`
      <path d="M30 30 L70 30 L74 70 L26 70 Z" fill="#5c1026" stroke="#12151c" stroke-width="3"/>
      <path d="M32 44 L68 44 L71 68 L29 68 Z" fill="url(#g-blood)"/>
      <rect x="42" y="20" width="16" height="12" rx="2" fill="#3a3f4a" stroke="#12151c" stroke-width="2"/>
      <path d="M44 32 L56 32" stroke="#3a3f4a" stroke-width="4"/>
    `);
    if (id === 'adrenalina') return shopSvg(`
      <g transform="rotate(-35 50 50)">
        <rect x="40" y="18" width="20" height="44" rx="3" fill="#dfe7ef" stroke="#12151c" stroke-width="3"/>
        <rect x="43" y="30" width="14" height="24" rx="2" fill="#ff9d2e" opacity=".9"/>
        <rect x="44" y="10" width="12" height="10" rx="2" fill="#6a7078"/>
        <path d="M50 62 L50 84" stroke="#cfe9d8" stroke-width="3"/>
      </g>
    `);
    if (id === 'moeda') return shopSvg(`
      <circle cx="50" cy="50" r="26" fill="#c8a15a" stroke="#6b4a10" stroke-width="3"/>
      <circle cx="50" cy="50" r="18" fill="none" stroke="#6b4a10" stroke-width="3" opacity=".7"/>
      <path d="M50 36 L50 64 M42 42 L58 58 M58 42 L42 58" stroke="#6b4a10" stroke-width="3" opacity=".8"/>
      <circle cx="43" cy="40" r="4" fill="#fff" opacity=".35"/>
    `);
    if (id === 'bomba') return shopSvg(`
      <circle cx="46" cy="58" r="24" fill="#2b3138" stroke="#12161c" stroke-width="3"/>
      <path d="M60 38 q10 -12 18 -8" stroke="#8b8b96" stroke-width="4" fill="none"/>
      <path d="M78 28 q8 -6 6 -14 q10 6 6 16 z" fill="#ff9d2e" opacity=".95"/>
      <rect x="34" y="50" width="24" height="10" rx="2" fill="#ff6b4a" opacity=".8"/>
    `);
    if (id === 'kit_reparo') return shopSvg(`
      <rect x="16" y="38" width="68" height="40" rx="4" fill="#c23a18" stroke="#12151c" stroke-width="3"/>
      <path d="M34 38 L34 28 q0 -8 16 -8 q16 0 16 8 L66 38" fill="none" stroke="#8b8b96" stroke-width="4"/>
      <rect x="34" y="52" width="32" height="10" rx="2" fill="#f0d9a0" opacity=".85"/>
      <rect x="10" y="52" width="8" height="14" rx="2" fill="#8b8b96"/>
    `);
    /* --- itens novos --- */
    if (id === 'sangue_frio') return shopSvg(`
      <path d="M30 30 L70 30 L74 70 L26 70 Z" fill="#2a3a52" stroke="#12151c" stroke-width="3"/>
      <path d="M32 44 L68 44 L71 68 L29 68 Z" fill="#7fd4e8" opacity=".85"/>
      <rect x="42" y="20" width="16" height="12" rx="2" fill="#3a3f4a" stroke="#12151c" stroke-width="2"/>
      <path d="M44 32 L56 32" stroke="#3a3f4a" stroke-width="4"/>
      <path d="M36 52 l6 -6 l6 6 l-6 6 z" fill="#fff" opacity=".8"/>
      <path d="M52 58 l5 -5 l5 5 l-5 5 z" fill="#fff" opacity=".6"/>
    `);
    if (id === 'adrenalina_forte') return shopSvg(`
      <g transform="rotate(-35 50 50)">
        <rect x="38" y="16" width="24" height="48" rx="3" fill="#dfe7ef" stroke="#12151c" stroke-width="3"/>
        <rect x="41" y="28" width="18" height="26" rx="2" fill="#ff3b5c" opacity=".9"/>
        <rect x="42" y="8" width="16" height="12" rx="2" fill="#6a7078"/>
        <path d="M50 64 L50 88" stroke="#ffb0c0" stroke-width="3"/>
      </g>
      <path d="M76 30 l6 -10 l6 10 l-6 10 z" fill="#ff3b5c" opacity=".8"/>
    `);
    if (id === 'carvao_vivo') return shopSvg(`
      <path d="M34 78 q-6 -30 16 -44 q-8 18 4 26 q-4 -22 16 -30 q-6 20 8 30 q10 8 4 18 z"
            fill="#1c1a18" stroke="#0b0a09" stroke-width="3"/>
      <path d="M46 74 q-4 -18 8 -26 q-4 12 2 16 q0 -12 10 -18 q-4 14 4 20 q6 6 2 10 z" fill="#ff7a1a"/>
      <path d="M52 74 q-2 -10 6 -14 q-2 7 1 10 q2 -8 8 -11 q-3 9 3 13 z" fill="#ffd85a"/>
    `);
    if (id === 'estilhaco') return shopSvg(`
      <path d="M50 12 L62 44 L88 52 L64 62 L54 92 L42 62 L16 54 L42 44 Z"
            fill="#b9c0c8" stroke="#12151c" stroke-width="3"/>
      <path d="M50 24 L56 48 L50 44 L44 48 Z" fill="#ff3b5c" opacity=".9"/>
      <path d="M30 54 L44 48" stroke="#8b8b96" stroke-width="3"/>
    `);
    if (id === 'reator') return shopSvg(`
      <circle cx="50" cy="50" r="26" fill="#2a2f38" stroke="#12151c" stroke-width="3"/>
      <circle cx="50" cy="50" r="16" fill="url(#g-blood)"/>
      <path d="M50 34 L50 26 M50 74 L50 66 M34 50 L26 50 M74 50 L66 50" stroke="#ff3b5c" stroke-width="4"/>
      <circle cx="44" cy="44" r="4" fill="#fff" opacity=".6"/>
    `);
    if (id === 'bolsa_fria') return shopSvg(`
      <path d="M30 30 L70 30 L74 70 L26 70 Z" fill="#2a4a52" stroke="#12151c" stroke-width="3"/>
      <path d="M32 44 L68 44 L71 68 L29 68 Z" fill="#9fe8e4" opacity=".85"/>
      <rect x="42" y="20" width="16" height="12" rx="2" fill="#3a3f4a" stroke="#12151c" stroke-width="2"/>
      <path d="M36 40 q6 -8 12 0 q6 8 12 0" stroke="#cfe9f5" stroke-width="3" fill="none"/>
      <path d="M38 58 q6 -6 12 0 q6 6 12 0" stroke="#cfe9f5" stroke-width="3" fill="none"/>
    `);
    if (id === 'moeda_gasta') return shopSvg(`
      <circle cx="50" cy="50" r="26" fill="#8a6a2a" stroke="#4a3a10" stroke-width="3"/>
      <circle cx="50" cy="50" r="17" fill="none" stroke="#4a3a10" stroke-width="3" opacity=".8"/>
      <path d="M50 38 L50 62" stroke="#4a3a10" stroke-width="4"/>
      <path d="M34 46 L66 54" stroke="#4a3a10" stroke-width="3" opacity=".8"/>
      <path d="M40 26 l6 8 l8 -10" stroke="#ff9d2e" stroke-width="3" fill="none"/>
    `);
    if (id === 'bomba_fundida') return shopSvg(`
      <circle cx="44" cy="58" r="23" fill="#4a2a18" stroke="#12161c" stroke-width="3"/>
      <path d="M58 38 q10 -12 18 -8" stroke="#8b8b96" stroke-width="4" fill="none"/>
      <path d="M76 30 q10 -8 4 -18 q12 8 6 20 z" fill="#ff6b4a" opacity=".95"/>
      <rect x="32" y="50" width="24" height="10" rx="2" fill="#ffb01f" opacity=".9"/>
      <path d="M24 44 l-8 -8 M70 46 l8 -8" stroke="#ff9d2e" stroke-width="3"/>
    `);
    if (id === 'tonico') return shopSvg(`
      <path d="M36 34 L64 34 L60 78 q-2 6 -12 6 q-10 0 -12 -6 z" fill="#2a3038" stroke="#12151c" stroke-width="3"/>
      <path d="M38 48 L62 48 L60 70 q-2 6 -11 6 q-9 0 -11 -6 z" fill="#ff9d2e" opacity=".9"/>
      <rect x="42" y="24" width="16" height="12" rx="2" fill="#6a7078"/>
      <path d="M50 16 q-6 -8 0 -14 q6 6 0 14 z" fill="#ffd85a"/>
    `);
    if (id === 'kit_avancado') return shopSvg(`
      <rect x="14" y="36" width="72" height="44" rx="4" fill="#8a2a18" stroke="#12151c" stroke-width="3"/>
      <path d="M34 36 L34 26 q0 -8 16 -8 q16 0 16 8 L66 36" fill="none" stroke="#8b8b96" stroke-width="4"/>
      <rect x="32" y="50" width="36" height="12" rx="2" fill="#ffd85a" opacity=".9"/>
      <rect x="8" y="52" width="8" height="16" rx="2" fill="#8b8b96"/>
      <path d="M44 42 l6 -6 l6 6 l-6 6 z" fill="#fff" opacity=".8"/>
    `);
    return shopSvg('<circle cx="50" cy="50" r="24" fill="#8a7f78"/>');
  }

  /* --- sucata e núcleo (carteira) --- */
  function scrapSprite() {
    return shopSvg(`
      <path d="M20 62 L38 32 L62 26 L82 46 L66 76 L40 78 Z" fill="#5a6470" stroke="#12161c" stroke-width="3"/>
      <path d="M38 32 L48 54 L20 62 Z" fill="#8b8b96" opacity=".8"/>
      <path d="M48 54 L62 26 L66 76 Z" fill="#3a4048" opacity=".9"/>
      <path d="M30 70 L44 66" stroke="#c8a15a" stroke-width="3" opacity=".7"/>
    `);
  }
  function coreSprite() {
    return shopSvg(`
      <circle cx="50" cy="50" r="24" fill="#2a0a10" stroke="#12151c" stroke-width="3"/>
      <circle cx="50" cy="50" r="14" fill="url(#g-blood)"/>
      <circle cx="45" cy="44" r="4" fill="#fff" opacity=".5"/>
      <path d="M50 18 L50 8 M50 82 L50 92 M18 50 L8 50 M82 50 L92 50" stroke="#ff3b5c" stroke-width="3" opacity=".7"/>
    `);
  }

  function v1() { return v1Svg(); }
  function v2() { return v2Svg(); }

  /* ============================================================
     INIMIGOS — recriação vetorial (referências do Ultrakill)
     ============================================================ */
  const gHusk = { pele: '#8d7f74', pele2: '#5f544c', osso: '#efe7d6', mascara: '#f2ead9', sombra: '#3a312c', sangue: '#a01530' };
  const gLust = { pele: '#b08a7c', pele2: '#6d4a44', osso: '#f0e0c8', mascara: '#e8d8b8', sombra: '#3a2622', sangue: '#c02040' };
  const gGlut = { pele: '#9aa06a', pele2: '#5c5f38', osso: '#e8e2c0', mascara: '#dfe0b0', sombra: '#2e3018', sangue: '#8f7a20' };
  const gGreed = { pele: '#b9814f', pele2: '#7a4a2a', osso: '#f2dfb2', mascara: '#f6e6b8', sombra: '#3a2412', sangue: '#b8862a' };

  /* casca genérica: máscara branca, corpo magro */
  function casca(c, opt) {
    const o = Object.assign({ h: 1, mask: true, arma: '', head: '', cor: c.pele }, opt || {});
    const s = o.h;
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="${40 * s}" ry="8" fill="rgba(0,0,0,.45)"/>
      <g>
        <rect x="${86 - 9 * s}" y="${176}" width="${18 * s}" height="${54 * s}" fill="${c.pele2}"/>
        <rect x="${108 - 9 * s}" y="${176}" width="${18 * s}" height="${54 * s}" fill="${c.pele2}"/>
        <rect x="${78 - 12 * s}" y="${226}" width="${24 * s}" height="10" rx="2" fill="${c.sombra}"/>
        <rect x="${110 - 12 * s}" y="${226}" width="${24 * s}" height="10" rx="2" fill="${c.sombra}"/>
      </g>
      <path d="M${100 - 26 * s} 132 L${100 + 26 * s} 132 L${100 + 22 * s} 182 L${100 - 22 * s} 182 Z" fill="${c.pele}" stroke="#191410" stroke-width="3"/>
      <rect x="${100 - 14 * s}" y="${142}" width="${28 * s}" height="${12 * s}" fill="${c.sangue}" opacity=".45"/>
      <rect x="${100 - 30 * s}" y="118" width="${13 * s}" height="48" rx="4" fill="${c.pele2}" stroke="#191410" stroke-width="2"/>
      <rect x="${100 + 17 * s}" y="118" width="${13 * s}" height="48" rx="4" fill="${c.pele2}" stroke="#191410" stroke-width="2"/>
      <g>
        ${o.head || `<ellipse cx="100" cy="92" rx="${24 * s}" ry="${26 * s}" fill="${c.pele}"/>
        ${o.mask ? `<ellipse cx="100" cy="94" rx="${17 * s}" ry="${20 * s}" fill="${c.mascara}"/>
        <rect x="${100 - 11 * s}" y="89" width="${8 * s}" height="4" fill="#140d10"/>
        <rect x="${100 + 3 * s}" y="89" width="${8 * s}" height="4" fill="#140d10"/>
        <rect x="${100 - 6 * s}" y="102" width="${12 * s}" height="3" fill="#6b3a38"/>` : ''}
        <path d="M${100 - 14 * s} 70 q${14 * s} ${-12 * s} ${28 * s} 0" stroke="${c.sombra}" stroke-width="4" fill="none"/>`}
      </g>
      ${o.arma}
    `);
  }

  /* máquina: caixa, olho, rebites */
  function maquina(c, opt) {
    const o = Object.assign({ eye: '#ff9d2e', tank: false, arm: false }, opt || {});
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="52" ry="9" fill="rgba(0,0,0,.5)"/>
      <rect x="66" y="188" width="18" height="52" fill="#2b3138"/>
      <rect x="116" y="188" width="18" height="52" fill="#2b3138"/>
      <rect x="54" y="234" width="42" height="12" rx="3" fill="#1b1f24"/>
      <rect x="106" y="234" width="42" height="12" rx="3" fill="#1b1f24"/>
      <path d="M62 108 L138 108 L146 152 L136 194 L64 194 L54 152 Z" fill="${c.shell}" stroke="#12161a" stroke-width="3"/>
      <rect x="74" y="118" width="52" height="26" rx="4" fill="#1b1f24"/>
      <circle cx="100" cy="131" r="10" fill="${o.eye}"/>
      <circle cx="100" cy="131" r="4" fill="#1b1f24"/>
      <rect x="76" y="158" width="48" height="10" fill="#3d454e"/>
      <rect x="38" y="112" width="20" height="58" rx="5" fill="${c.shell}" stroke="#12161a" stroke-width="3"/>
      <rect x="142" y="112" width="20" height="58" rx="5" fill="${c.shell}" stroke="#12161a" stroke-width="3"/>
      <g>
        <rect x="78" y="52" width="44" height="32" rx="4" fill="${c.shell}" stroke="#12161a" stroke-width="3"/>
        <rect x="86" y="62" width="28" height="9" rx="2" fill="${o.eye}" opacity=".95"/>
        <rect x="94" y="38" width="12" height="16" fill="#39424f"/>
      </g>
      ${o.tank ? `<g><ellipse cx="100" cy="102" rx="28" ry="16" fill="#3d5a20" stroke="#1d2a10" stroke-width="3"/>
        <ellipse cx="100" cy="98" rx="21" ry="10" fill="url(#g-acid)"/></g>` : ''}
      ${o.arm ? `<g><rect x="150" y="150" width="16" height="46" rx="4" fill="#3d454e"/>
        <path d="M158 196 l16 -10 l-4 20 z" fill="#8b8b96"/></g>` : ''}
    `);
  }

  /* ============================================================
     INIMIGOS — baseados nos inimigos originais de Ultrakill
     (Husk, Stray, Wretch, Caged Thing, Drone, Ceremoniar,
      Enthusiast, Corporal, Journeyman, Husk Fanatic, Lustful Husk,
      Soothsayer, Filet Machine, Big John, Tallow Golem)
     ============================================================ */

  /* ---- GREED: cabeças e corpos temáticos ---- */
  const headAnubis = `
    <g>
      <path d="M78 102 C72 90 74 74 82 64 L100 58 L118 64 C126 74 128 90 122 102 L100 110 Z"
            fill="#2a2118" stroke="#0e0b08" stroke-width="2"/>
      <path d="M80 68 L66 22 L90 42 Z" fill="#1c1712" stroke="#0e0b08" stroke-width="2"/>
      <path d="M120 68 L134 22 L110 42 Z" fill="#1c1712" stroke="#0e0b08" stroke-width="2"/>
      <path d="M84 80 L116 80 L108 104 L92 104 Z" fill="#4a3824"/>
      <rect x="87" y="82" width="10" height="5" fill="#ffcf5a"/>
      <rect x="103" y="82" width="10" height="5" fill="#ffcf5a"/>
      <path d="M94 100 L106 100" stroke="#0e0b08" stroke-width="2"/>
      <path d="M82 106 q18 12 36 0" stroke="#c8a15a" stroke-width="4" fill="none"/>
      <circle cx="100" cy="108" r="4" fill="#7fe8ff" opacity=".8"/>
    </g>`;

  const headMumia = `
    <g>
      <ellipse cx="100" cy="88" rx="25" ry="30" fill="#d6c39a" stroke="#8a744a" stroke-width="2"/>
      <path d="M77 72 q23 -15 46 0" stroke="#b6a274" stroke-width="5" fill="none"/>
      <path d="M76 84 q24 9 48 0" stroke="#b6a274" stroke-width="5" fill="none"/>
      <path d="M78 96 q22 8 44 0" stroke="#b6a274" stroke-width="5" fill="none"/>
      <path d="M84 64 q16 -8 32 0" stroke="#b6a274" stroke-width="4" fill="none"/>
      <rect x="86" y="82" width="11" height="5" fill="#241c10"/>
      <rect x="103" y="82" width="11" height="5" fill="#241c10"/>
      <circle cx="91" cy="84" r="2" fill="#7fe8ff"/>
      <circle cx="108" cy="84" r="2" fill="#7fe8ff"/>
      <path d="M89 105 q11 4 22 0" stroke="#6b5a3a" stroke-width="3" fill="none"/>
      <path d="M74 66 L64 106 L82 112 L84 78 Z" fill="#2a4a6a" stroke="#c8a15a" stroke-width="2"/>
      <path d="M126 66 L136 106 L118 112 L116 78 Z" fill="#2a4a6a" stroke="#c8a15a" stroke-width="2"/>
      <g stroke="#c8a15a" stroke-width="1.5" opacity=".8">
        <path d="M70 76 L81 74 M68 88 L81 86 M67 100 L82 98"/>
        <path d="M130 76 L119 74 M132 88 L119 86 M133 100 L118 98"/>
      </g>
    </g>`;

  const headLegion = `
    <g>
      <path d="M78 70 C78 48 122 48 122 70 L122 94 L112 104 L108 80 L92 80 L88 104 L78 94 Z"
            fill="#b08a4a" stroke="#4a3210" stroke-width="2"/>
      <rect x="90" y="80" width="20" height="9" fill="#241c10"/>
      <rect x="91" y="82" width="8" height="5" fill="#ffcf5a"/>
      <rect x="101" y="82" width="8" height="5" fill="#ffcf5a"/>
      <path d="M100 48 C94 34 96 22 100 10 C104 22 106 34 100 48" fill="#a01a24" stroke="#4a0a0e" stroke-width="2"/>
      <path d="M86 98 q14 8 28 0" stroke="#7a5a2a" stroke-width="3" fill="none"/>
      <path d="M78 66 q-8 4 -10 14 M122 66 q8 4 10 14" stroke="#7a5a2a" stroke-width="3" fill="none"/>
    </g>`;

  function sphinx() {
    return svg(defs + `
      <ellipse cx="100" cy="246" rx="66" ry="8" fill="rgba(0,0,0,.5)"/>
      <path d="M154 210 q30 -4 22 -34 q-8 -20 -26 -12" stroke="#8a5a28" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M48 202 q-16 28 8 42 h30 q-18 -20 -8 -42" fill="#b9854a" stroke="#5a3a18" stroke-width="3"/>
      <path d="M152 202 q16 28 -8 42 h-30 q18 -20 8 -42" fill="#b9854a" stroke="#5a3a18" stroke-width="3"/>
      <path d="M42 202 q-4 -36 30 -48 h56 q34 12 30 48 q-4 28 -28 32 h-60 q-24 -4 -28 -32z"
            fill="#c99a58" stroke="#6e4a28" stroke-width="3"/>
      <path d="M52 218 q-18 16 -6 26 h32 q6 -10 -4 -24" fill="#d8ad68" stroke="#6e4a28" stroke-width="2"/>
      <path d="M148 218 q18 16 6 26 h-32 q-6 -10 4 -24" fill="#d8ad68" stroke="#6e4a28" stroke-width="2"/>
      <path d="M56 160 C24 124 26 80 64 62 C58 94 74 106 90 116 Z" fill="#e0b96a" stroke="#7a5620" stroke-width="2"/>
      <path d="M144 160 C176 124 174 80 136 62 C142 94 126 106 110 116 Z" fill="#e0b96a" stroke="#7a5620" stroke-width="2"/>
      <g stroke="#7a5620" stroke-width="1.6" opacity=".75">
        <path d="M54 146 L38 98 M64 140 L50 86 M74 134 L64 76"/>
        <path d="M146 146 L162 98 M136 140 L150 86 M126 134 L136 76"/>
      </g>
      <path d="M70 112 C70 72 130 72 130 112 L138 150 L124 158 L120 120 L80 120 L76 158 L62 150 Z"
            fill="#2a4a6a" stroke="#c8a15a" stroke-width="2"/>
      <g stroke="#c8a15a" stroke-width="2" opacity=".9">
        <path d="M72 90 L128 90 M68 102 L132 102 M66 116 L80 116 M120 116 L134 116"/>
      </g>
      <ellipse cx="100" cy="98" rx="22" ry="26" fill="#d8b07a"/>
      <rect x="86" y="92" width="11" height="5" fill="#241c10"/>
      <rect x="103" y="92" width="11" height="5" fill="#241c10"/>
      <circle cx="91" cy="94" r="2" fill="#7fe8ff"/>
      <circle cx="108" cy="94" r="2" fill="#7fe8ff"/>
      <path d="M94 106 L106 106 L100 112 Z" fill="#8a5a38"/>
      <path d="M90 116 q10 5 20 0" stroke="#6e4a28" stroke-width="2" fill="none"/>
      <path d="M70 126 q30 18 60 0" stroke="#c8a15a" stroke-width="4" fill="none"/>
      <g fill="#c8a15a" opacity=".7">
        <circle cx="76" cy="148" r="2"/><circle cx="124" cy="148" r="2"/>
      </g>
    `);
  }

  function colossus() {
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="60" ry="9" fill="rgba(0,0,0,.55)"/>
      <path d="M66 226 h22 v20 h-22z M112 226 h22 v20 h-22z" fill="#9a7a4a" stroke="#4a3218" stroke-width="2"/>
      <rect x="72" y="178" width="22" height="58" fill="#b89a6a" stroke="#4a3218" stroke-width="2"/>
      <rect x="106" y="178" width="22" height="58" fill="#b89a6a" stroke="#4a3218" stroke-width="2"/>
      <path d="M62 108 L138 108 L146 160 L128 198 L72 198 L54 160 Z" fill="#c8a86a" stroke="#5a3a1a" stroke-width="3"/>
      <path d="M70 120 L130 120 L134 152 L118 166 L82 166 L66 152 Z" fill="#d8bc80" opacity=".45"/>
      <path d="M64 158 L136 158" stroke="#8a6a3a" stroke-width="5"/>
      <rect x="38" y="116" width="22" height="74" rx="4" fill="#b89a6a" stroke="#4a3218" stroke-width="2"/>
      <rect x="140" y="116" width="22" height="74" rx="4" fill="#b89a6a" stroke="#4a3218" stroke-width="2"/>
      <path d="M78 60 C78 34 122 34 122 60 L120 82 L112 92 L108 70 L92 70 L88 92 L80 82 Z"
            fill="#c8a86a" stroke="#4a3218" stroke-width="2"/>
      <rect x="88" y="68" width="24" height="7" fill="#1a1208"/>
      <rect x="90" y="70" width="9" height="3" fill="#ffcf5a"/>
      <rect x="101" y="70" width="9" height="3" fill="#ffcf5a"/>
      <path d="M100 36 C92 22 94 10 100 0 C106 10 108 22 100 36" fill="#7a1a1a" stroke="#3a0808" stroke-width="2"/>
      <path d="M164 58 V244" stroke="#7a5a2a" stroke-width="5"/>
      <path d="M164 46 l-8 20 h16 z" fill="#d8d0b8" stroke="#6a6252" stroke-width="1.5"/>
      <circle cx="48" cy="154" r="27" fill="#8a5a2a" stroke="#c8a15a" stroke-width="3"/>
      <path d="M48 136 L56 152 L48 168 L40 152 Z" fill="#c8a15a" opacity=".8"/>
      <g stroke="#5a3a1a" stroke-width="1.6" opacity=".7" fill="none">
        <path d="M84 126 l10 18 l-6 14"/><path d="M116 132 l-8 16"/><path d="M96 176 l4 16"/>
        <path d="M58 138 l-6 12"/><path d="M142 130 l6 10"/>
      </g>
      <g fill="#e8cf8a" opacity=".45">
        <circle cx="72" cy="190" r="2"/><circle cx="128" cy="188" r="1.6"/><circle cx="100" cy="148" r="2"/>
      </g>
    `);
  }

  function scarab() {
    return svg(defs + `
      <ellipse cx="100" cy="244" rx="54" ry="8" fill="rgba(0,0,0,.5)"/>
      <circle cx="100" cy="70" r="38" fill="#ffcf5a" opacity=".12"/>
      <circle cx="100" cy="70" r="24" fill="#e8a13a" opacity=".22"/>
      <g stroke="#b08a4a" stroke-width="6" fill="none" stroke-linecap="round">
        <path d="M62 148 q-30 -10 -40 8"/><path d="M62 172 q-32 4 -38 26"/>
        <path d="M66 196 q-26 16 -24 38"/>
        <path d="M138 148 q30 -10 40 8"/><path d="M138 172 q32 4 38 26"/>
        <path d="M134 196 q26 16 24 38"/>
      </g>
      <ellipse cx="100" cy="168" rx="46" ry="56" fill="#1f3a3a" stroke="#c8a15a" stroke-width="3"/>
      <path d="M100 118 q-32 20 -30 52 q0 34 30 50 q30 -16 30 -50 q2 -32 -30 -52z"
            fill="#2f5a52" stroke="#8fd8c0" stroke-width="1.5"/>
      <path d="M100 128 q-22 18 -21 42 q0 28 21 40 q21 -12 21 -40 q1 -24 -21 -42z"
            fill="#3f7a6a" opacity=".55"/>
      <path d="M100 138 L108 154 L100 170 L92 154 Z" fill="#e8c46a" opacity=".9"/>
      <circle cx="100" cy="154" r="7" fill="#ffcf5a"/>
      <g stroke="#c8a15a" stroke-width="2" opacity=".8" fill="none">
        <path d="M62 168 q38 -12 76 0"/><path d="M60 188 q40 -10 80 0"/><path d="M64 208 q36 -8 72 0"/>
      </g>
      <ellipse cx="100" cy="112" rx="21" ry="16" fill="#1f3a3a" stroke="#c8a15a" stroke-width="2"/>
      <circle cx="91" cy="110" r="4" fill="#ffcf5a"/>
      <circle cx="109" cy="110" r="4" fill="#ffcf5a"/>
      <path d="M88 124 q-8 12 -18 12 M112 124 q8 12 18 12" stroke="#b08a4a" stroke-width="4" fill="none"/>
      <path d="M84 122 q-10 8 -20 4 M116 122 q10 8 20 4" stroke="#c8a15a" stroke-width="3" fill="none"/>
      <g fill="#ffcf5a" opacity=".5">
        <circle cx="58" cy="132" r="2"/><circle cx="142" cy="136" r="1.8"/><circle cx="100" cy="96" r="1.6"/>
      </g>
    `);
  }

  const INIMIGOS = {
    /* ---- LIMBO ---- */
    husk: () => casca(gHusk, {}),
    stray: () => casca(gHusk, {
      h: 0.82,
      arma: '<path d="M132 150 l26 -34" stroke="#8b8b96" stroke-width="4"/>'
    }),
    wretch: () => casca(gHusk, {
      h: 0.9, mask: false,
      arma: '<g><path d="M40 196 q-14 12 4 18" stroke="#7a6a5a" stroke-width="5" fill="none"/>' +
        '<path d="M160 196 q14 12 -4 18" stroke="#7a6a5a" stroke-width="5" fill="none"/></g>'
    }),
    caged: () => maquina({ shell: '#4a5058' }, { eye: '#7fe8ff' }),
    drone: () => svg(defs + `
      <ellipse cx="100" cy="246" rx="34" ry="7" fill="rgba(0,0,0,.4)"/>
      <g stroke="#5a6068" stroke-width="5" stroke-linecap="round" opacity=".9">
        <path d="M48 70 q28 -16 50 -2"/><path d="M152 70 q-28 -16 -50 -2"/>
      </g>
      <g fill="#3d454e">
        <rect x="38" y="62" width="30" height="9" rx="4"/><rect x="132" y="62" width="30" height="9" rx="4"/>
      </g>
      <path d="M100 88 L138 110 L132 152 L100 166 L68 152 L62 110 Z" fill="#4a5058" stroke="#12161a" stroke-width="3"/>
      <rect x="76" y="102" width="48" height="24" rx="5" fill="#1b1f24"/>
      <circle cx="100" cy="114" r="10" fill="#7fe8ff"/><circle cx="100" cy="114" r="4" fill="#1b1f24"/>
      <path d="M100 164 l15 28 l-15 -7 l-15 7 z" fill="#9b9ba6" stroke="#12161a" stroke-width="2"/>
      <g stroke="#3d454e" stroke-width="6" fill="none">
        <path d="M74 156 q-14 22 -6 42"/><path d="M126 156 q14 22 6 42"/>
      </g>
    `),
    ceremoniar: () => casca(gHusk, {
      h: 0.92, mask: false,
      arma: '<g><rect x="94" y="34" width="12" height="30" rx="3" fill="#f2ead0"/>' +
        '<ellipse cx="100" cy="28" rx="7" ry="11" fill="#ffd97a"/>' +
        '<ellipse cx="100" cy="26" rx="15" ry="17" fill="#ffb01f" opacity=".22"/></g>'
    }),

    /* ---- LUST ---- */
    enthusiast: () => casca(gLust, {
      h: 1.05, mask: false,
      arma: '<g><path d="M150 120 l-16 74" stroke="#e8e2d0" stroke-width="6"/>' +
        '<path d="M150 120 l-16 74" stroke="#b9b3a0" stroke-width="2"/></g>'
    }),
    journeyman: () => casca(gLust, {
      h: 1.1, mask: true,
      arma: '<g fill="none" stroke="#8b8b96" stroke-width="3">' +
        '<path d="M56 150 q-24 20 -8 40 q16 18 30 2"/><path d="M144 150 q24 20 8 40 q-16 18 -30 2"/></g>'
    }),
    corporal: () => casca(gLust, {
      h: 1.45, mask: true,
      arma: '<g><rect x="146" y="126" width="30" height="24" rx="4" fill="#4a423c"/>' +
        '<rect x="140" y="120" width="12" height="36" rx="3" fill="#2e2823"/></g>'
    }),
    fanatic: () => casca(gLust, {
      h: 0.95, mask: true,
      arma: '<g><path d="M142 140 l18 30" stroke="#7a6a5a" stroke-width="6"/></g>'
    }),
    lustful_husk: () => casca(gLust, {
      h: 1.0, mask: false,
      arma: '<g stroke="#a01530" stroke-width="3" fill="none"><path d="M74 160 q26 18 52 0"/></g>'
    }),
    ceremoniar2: () => casca(gLust, {
      h: 1.2, mask: false,
      arma: '<g><rect x="92" y="24" width="16" height="40" rx="3" fill="#f2ead0"/>' +
        '<ellipse cx="100" cy="16" rx="9" ry="14" fill="#ffd97a"/>' +
        '<ellipse cx="100" cy="14" rx="19" ry="21" fill="#ffb01f" opacity=".22"/></g>' +
        '<g stroke="#c02040" stroke-width="3" fill="none"><path d="M66 150 q34 20 68 0"/></g>'
    }),

    /* ---- GLUTTONY ---- */
    soothsayer: () => casca(gGlut, {
      h: 1.3, mask: false,
      arma: '<g><path d="M100 44 q26 -26 52 -6 q-24 6 -28 26 z" fill="#2e3018" stroke="#14160a" stroke-width="3"/>' +
        '<ellipse cx="100" cy="86" rx="13" ry="16" fill="#e8e2c0"/>' +
        '<rect x="93" y="80" width="6" height="6" fill="#0f1008"/><rect x="101" y="80" width="6" height="6" fill="#0f1008"/></g>'
    }),
    filet: () => maquina({ shell: '#4c5a3a' }, { eye: '#c8ff6a', tank: true }),
    bigjohn: () => casca(gGlut, {
      h: 1.3, mask: true,
      arma: '<g><ellipse cx="100" cy="158" rx="34" ry="26" fill="#8a7a34" stroke="#3a3014" stroke-width="3"/>' +
        '<ellipse cx="100" cy="152" rx="24" ry="15" fill="#a89a40"/></g>' +
        '<g stroke="#cfc8ae" stroke-width="6" fill="none"><path d="M150 92 q26 12 16 40 q-8 20 -22 12"/></g>'
    }),
    tallow: () => svg(defs + `
      <ellipse cx="100" cy="244" rx="52" ry="10" fill="rgba(0,0,0,.5)"/>
      <path d="M100 52 C148 58 172 108 168 158 C164 202 136 226 100 226 C64 226 36 202 32 158 C28 108 52 58 100 52 Z"
            fill="#e8c46a" stroke="#6a4a12" stroke-width="4"/>
      <path d="M100 74 C134 80 148 116 144 156 C140 186 124 202 100 202 C76 202 60 186 56 156 C52 116 66 80 100 74 Z"
            fill="#f4dc9a" opacity=".45"/>
      <g fill="#a87a24" opacity=".8">
        <ellipse cx="74" cy="150" rx="11" ry="8"/><ellipse cx="126" cy="168" rx="9" ry="6"/>
        <ellipse cx="100" cy="196" rx="13" ry="7"/>
      </g>
      <ellipse cx="100" cy="122" rx="15" ry="12" fill="#2a1c08"/>
      <circle cx="100" cy="122" r="7" fill="#ff9d2e"/>
      <g stroke="#6a4a12" stroke-width="5" fill="none">
        <path d="M56 190 q-18 12 -6 28"/><path d="M144 190 q18 12 6 28"/>
      </g>
    `),
    drone2: () => svg(defs + `
      <ellipse cx="100" cy="246" rx="42" ry="8" fill="rgba(0,0,0,.45)"/>
      <g stroke="#6a5050" stroke-width="6" stroke-linecap="round" opacity=".95">
        <path d="M40 66 q34 -18 60 -2"/><path d="M160 66 q-34 -18 -60 -2"/>
      </g>
      <g fill="#4a3a3a">
        <rect x="28" y="56" width="36" height="11" rx="5"/><rect x="136" y="56" width="36" height="11" rx="5"/>
      </g>
      <path d="M100 84 L146 110 L138 162 L100 178 L62 162 L54 110 Z" fill="#5a3f3f" stroke="#12161a" stroke-width="3"/>
      <path d="M100 84 L146 110 L132 124 L100 104 L68 124 L54 110 Z" fill="#7a5555" stroke="#12161a" stroke-width="2"/>
      <rect x="72" y="112" width="56" height="28" rx="6" fill="#1b1214"/>
      <circle cx="100" cy="126" r="12" fill="#ff6a2a"/><circle cx="100" cy="126" r="5" fill="#1b1214"/>
      <path d="M100 176 l19 34 l-19 -9 l-19 9 z" fill="#b5a89a" stroke="#12161a" stroke-width="2"/>
      <g stroke="#7a5555" stroke-width="7" fill="none">
        <path d="M68 164 q-18 24 -8 46"/><path d="M132 164 q18 24 8 46"/>
      </g>
      <g fill="#c9b26a">
        <path d="M44 104 l10 -14 l4 16 z"/><path d="M156 104 l-10 -14 l-4 16 z"/>
      </g>
    `),
    ceremoniar3: () => casca(gGlut, {
      h: 1.5, mask: false,
      arma: '<g><rect x="90" y="12" width="20" height="46" rx="4" fill="#f2ead0"/>' +
        '<ellipse cx="100" cy="2" rx="11" ry="16" fill="#ffd97a"/>' +
        '<ellipse cx="100" cy="0" rx="24" ry="26" fill="#ffb01f" opacity=".2"/></g>' +
        '<g stroke="#8f7a20" stroke-width="4" fill="none"><path d="M58 146 q42 26 84 0"/></g>'
    }),

    /* ---- GREED ---- */
    anubis: () => casca(gGreed, {
      h: 1.12, mask: false, head: headAnubis,
      arma: '<g>' +
        '<path d="M146 156 q34 -26 30 -62" stroke="#c8a15a" stroke-width="6" fill="none"/>' +
        '<path d="M176 92 q10 -8 14 0 q-6 10 -14 4z" fill="#d8c08a" stroke="#5a3a12" stroke-width="2"/>' +
        '<path d="M142 152 l8 10" stroke="#5a3a12" stroke-width="5"/>' +
        '<path d="M58 160 q-14 20 0 38" stroke="#c8a15a" stroke-width="4" fill="none"/>' +
        '</g>'
    }),
    mumia: () => casca(gGreed, {
      h: 1.04, mask: false, head: headMumia,
      arma: '<g stroke="#e2d2a8" stroke-width="5" fill="none" opacity=".9">' +
        '<path d="M70 132 q30 8 60 0"/><path d="M70 150 q30 8 60 0"/><path d="M68 168 q32 8 64 0"/>' +
        '<path d="M64 128 q-12 22 4 42"/><path d="M136 128 q12 22 -4 42"/></g>' +
        '<g fill="#2a4a6a" stroke="#c8a15a" stroke-width="2">' +
        '<path d="M94 148 l6 -10 l6 10 l-6 12 z"/><circle cx="100" cy="172" r="5"/></g>'
    }),
    legionario: () => casca(gGreed, {
      h: 1.16, mask: false, head: headLegion,
      arma: '<g>' +
        '<path d="M142 124 Q190 132 188 178 Q180 210 158 220 Q136 206 132 172 Q130 142 142 124Z" fill="#7a1a24" stroke="#c8a15a" stroke-width="3"/>' +
        '<path d="M146 156 h32 M162 140 v60" stroke="#c8a15a" stroke-width="3" opacity=".85"/>' +
        '<path d="M150 172 l12 -10 l12 10 l-12 14 z" fill="#c8a15a" opacity=".9"/>' +
        '<path d="M40 112 L40 228" stroke="#7a5a2a" stroke-width="4"/>' +
        '<path d="M40 100 l-5 16 h10 z" fill="#c8c0b0" stroke="#6a6252" stroke-width="1.5"/>' +
        '</g>'
    }),
    esfinge: () => sphinx(),
    colosso: () => colossus(),
    escaravelho: () => scarab()
  };

  /* ---------------- A MÃO DO REI MINOS (gigante) ----------------
     Chefe de Lust: uma mão colossal de pedra e carne, entrando pela
     direita da tela. A palma está aberta e os dedos apontam para V1.
     A referência é a mão do Rei Minos no Ultrakill: pele roxa/negra,
     veios brilhantes, anéis de pedra e arame farpado. */
  function mao() {
    return '<svg viewBox="0 0 430 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMax meet">' +
      defs + `
      <defs>
        <linearGradient id="g-mao-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#33243d"/>
          <stop offset=".38" stop-color="#1b1024"/>
          <stop offset=".72" stop-color="#0d0612"/>
          <stop offset="1" stop-color="#040106"/>
        </linearGradient>
        <linearGradient id="g-mao-skin2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4a3658"/>
          <stop offset=".45" stop-color="#271832"/>
          <stop offset="1" stop-color="#0a0410"/>
        </linearGradient>
        <linearGradient id="g-mao-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1a1220"/>
          <stop offset=".55" stop-color="#0b0610"/>
          <stop offset="1" stop-color="#020104"/>
        </linearGradient>
        <radialGradient id="g-mao-aura" cx=".55" cy=".48" r=".55">
          <stop offset="0" stop-color="#c64cff" stop-opacity=".22"/>
          <stop offset=".55" stop-color="#6a1a8a" stop-opacity=".08"/>
          <stop offset="1" stop-color="#c64cff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g-mao-palm-light" cx=".42" cy=".35" r=".6">
          <stop offset="0" stop-color="#a07ab0" stop-opacity=".22"/>
          <stop offset=".55" stop-color="#5a3a68" stop-opacity=".08"/>
          <stop offset="1" stop-color="#2a1a34" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g-mao-gem" cx=".4" cy=".35" r=".65">
          <stop offset="0" stop-color="#f4dcff"/>
          <stop offset=".28" stop-color="#d88cff"/>
          <stop offset=".7" stop-color="#8a2ac0"/>
          <stop offset="1" stop-color="#3a0a50"/>
        </radialGradient>
        <filter id="g-mao-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
        <filter id="g-mao-soft2" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4"/>
        </filter>
      </defs>

      <!-- aura violeta -->
      <ellipse cx="268" cy="132" rx="184" ry="126" fill="url(#g-mao-aura)"/>

      <!-- antebraço saindo da direita -->
      <path d="M330 58 C366 40 408 50 430 76 L430 246 C406 260 364 252 330 226 Z"
            fill="url(#g-mao-skin)" stroke="#050208" stroke-width="3"/>
      <path d="M330 58 C352 52 370 56 378 70 L378 236 C364 246 344 242 330 226 Z"
            fill="#08030c" opacity=".55"/>

      <!-- bracelete de pedra no pulso -->
      <g>
        <path d="M324 72 L352 60 L364 80 L364 220 L350 238 L324 226 Z"
              fill="url(#g-mao-stone)" stroke="#050208" stroke-width="2.4"/>
        <path d="M324 72 L352 60 L364 80 L336 94 Z" fill="#3a2a44" opacity=".65"/>
        <g stroke="#7a2aa0" stroke-width="1.2" opacity=".5">
          <path d="M330 108 L358 100"/><path d="M330 138 L360 130"/>
          <path d="M330 168 L358 160"/><path d="M330 198 L356 190"/>
        </g>
        <g fill="none" stroke="#000" stroke-width="1.1" opacity=".55">
          <path d="M332 84 L340 96 L334 110 L344 122"/>
          <path d="M350 134 L342 146 L350 158"/>
        </g>
        <g fill="none" stroke="#b45cff" stroke-width=".8" opacity=".35">
          <path d="M332 84 L340 96 L334 110 L344 122"/>
        </g>
      </g>

      <!-- dedos: indicador, médio, anelar e mindinho -->
      <g>
        <!-- mindinho -->
        <path d="M212 166 C184 172 152 182 124 196 C108 204 100 214 104 224 C108 234 122 236 136 228 C164 214 190 204 214 196 Z"
              fill="url(#g-mao-skin)" stroke="#050208" stroke-width="2.6"/>
        <!-- anelar -->
        <path d="M208 134 C168 136 118 144 68 158 C48 164 34 174 36 186 C38 198 54 204 72 200 C124 186 170 170 210 164 Z"
              fill="url(#g-mao-skin)" stroke="#050208" stroke-width="2.8"/>
        <!-- médio -->
        <path d="M210 98 C166 86 108 80 50 82 C28 82 12 90 12 104 C12 118 28 126 50 126 C108 128 166 136 210 146 Z"
              fill="url(#g-mao-skin)" stroke="#050208" stroke-width="3"/>
        <!-- indicador -->
        <path d="M206 70 C166 52 112 40 58 40 C36 40 22 48 22 60 C22 72 36 82 58 84 C112 88 166 102 206 116 Z"
              fill="url(#g-mao-skin)" stroke="#050208" stroke-width="2.8"/>
      </g>

      <!-- palma aberta -->
      <path d="M170 78 C196 46 248 38 292 54 C326 66 348 94 352 130 L352 174 C348 210 318 234 276 240 C238 246 204 232 184 208 C166 186 160 160 162 132 C162 110 164 92 170 78 Z"
            fill="url(#g-mao-skin)" stroke="#050208" stroke-width="3"/>
      <ellipse cx="246" cy="126" rx="92" ry="78" fill="url(#g-mao-palm-light)"/>
      <ellipse cx="240" cy="160" rx="58" ry="48" fill="#0a0410" opacity=".28"/>
      <ellipse cx="292" cy="204" rx="42" ry="30" fill="#1a1020" opacity=".55"/>
      <ellipse cx="230" cy="210" rx="46" ry="30" fill="#2a1a30" opacity=".42"/>

      <!-- polegar, por cima da palma -->
      <path d="M250 200 C218 208 186 220 160 236 C146 244 132 246 126 238 C120 230 130 220 146 212 C176 196 210 190 242 188 Z"
            fill="url(#g-mao-skin2)" stroke="#050208" stroke-width="2.8"/>

      <!-- vinco entre polegar e mindinho -->
      <path d="M226 196 C196 210 166 224 140 238" fill="none" stroke="#000" stroke-width="2.2" opacity=".65"/>

      <!-- nós dos dedos -->
      <g fill="#33243d" stroke="#050208" stroke-width="1.4" opacity=".72">
        <ellipse cx="196" cy="92" rx="18" ry="13"/>
        <ellipse cx="198" cy="122" rx="20" ry="14"/>
        <ellipse cx="198" cy="152" rx="19" ry="14"/>
        <ellipse cx="202" cy="182" rx="17" ry="13"/>
        <ellipse cx="234" cy="198" rx="22" ry="14"/>
      </g>

      <!-- dobras e articulações -->
      <g fill="none" stroke="#050208" stroke-width="1.8" opacity=".7">
        <path d="M150 54 Q144 68 150 82"/><path d="M104 48 Q100 62 106 76"/>
        <path d="M150 94 Q144 108 150 122"/><path d="M102 90 Q98 104 104 118"/>
        <path d="M150 140 Q144 154 150 168"/><path d="M102 150 Q98 164 104 178"/>
        <path d="M160 182 Q154 196 160 210"/>
        <path d="M182 224 Q174 234 180 242"/>
      </g>
      <g fill="none" stroke="#8a6a9a" stroke-width=".9" opacity=".22">
        <path d="M150 56 Q145 68 150 80"/><path d="M150 96 Q145 108 150 120"/>
        <path d="M150 142 Q145 154 150 166"/>
      </g>

      <!-- unhas escuras -->
      <g fill="#100818" stroke="#4a2a5a" stroke-width="1.2">
        <path d="M48 44 C36 44 28 50 28 60 C28 70 36 76 48 76 C56 76 60 70 58 62 C56 52 54 46 48 44 Z"/>
        <path d="M40 88 C28 88 20 94 20 104 C20 114 28 120 40 120 C48 120 52 114 50 106 C48 96 46 90 40 88 Z"/>
        <path d="M66 164 C54 166 48 174 50 184 C52 192 60 196 70 192 C78 188 80 180 74 172 Z"/>
        <path d="M126 200 C116 204 112 212 116 220 C120 228 130 228 138 222 C144 216 140 206 132 202 Z"/>
        <path d="M150 238 C140 242 136 248 140 254 C144 260 154 260 160 254 C166 248 162 240 156 238 Z"/>
      </g>
      <g fill="none" stroke="#a86ac0" stroke-width=".8" opacity=".45">
        <path d="M42 50 C36 52 34 58 36 64"/><path d="M34 96 C28 98 26 104 28 110"/>
        <path d="M60 172 C56 176 56 182 60 186"/><path d="M122 208 C118 212 118 218 122 222"/>
        <path d="M146 244 C142 248 142 252 146 255"/>
      </g>

      <!-- anel de pedra no dedo anelar -->
      <g transform="rotate(7 154 162)">
        <path d="M134 142 L164 148 L160 182 L130 176 Z" fill="url(#g-mao-stone)" stroke="#050208" stroke-width="2"/>
        <path d="M134 142 L164 148 L162 157 L132 151 Z" fill="#4a2a5a" opacity=".8"/>
        <circle cx="150" cy="163" r="13" fill="#8a2ac0" opacity=".45" filter="url(#g-mao-soft2)"/>
        <path d="M147 153 L159 157 L155 173 L143 169 Z" fill="url(#g-mao-gem)" stroke="#e0a0ff" stroke-width=".9"/>
        <path d="M149 157 L155 159 L153 168 L147 166 Z" fill="#f4dcff" opacity=".9"/>
      </g>

      <!-- placas de pedra incrustadas -->
      <g fill="url(#g-mao-stone)" stroke="#050208" stroke-width="1.6">
        <path d="M300 66 L332 58 L342 82 L316 92 Z"/>
        <path d="M322 150 L350 142 L356 172 L330 182 Z"/>
        <path d="M286 196 L316 188 L326 214 L298 224 Z"/>
      </g>
      <g fill="none" stroke="#7a2aa0" stroke-width=".9" opacity=".35">
        <path d="M304 70 L330 64"/><path d="M326 154 L350 148"/><path d="M290 200 L316 194"/>
      </g>

      <!-- rachaduras e veios brilhantes -->
      <g fill="none" stroke="#000" stroke-width="2.4" opacity=".6">
        <path d="M350 100 L330 116 L336 132 L318 146 L324 164"/>
        <path d="M300 86 L292 110 L300 126"/>
        <path d="M250 100 L244 124 L252 142"/>
        <path d="M220 170 L210 190 L218 206"/>
        <path d="M170 110 L160 128 L166 144"/>
        <path d="M150 60 L144 74 L150 88"/>
        <path d="M110 96 L104 110 L110 122"/>
        <path d="M100 160 L94 174 L100 186"/>
      </g>
      <g fill="none" stroke="#b45cff" stroke-width="2.2" opacity=".34" filter="url(#g-mao-soft)">
        <path d="M350 100 L330 116 L336 132 L318 146 L324 164"/>
        <path d="M300 86 L292 110 L300 126"/>
        <path d="M250 100 L244 124 L252 142"/>
        <path d="M220 170 L210 190 L218 206"/>
        <path d="M170 110 L160 128 L166 144"/>
        <path d="M150 60 L144 74 L150 88"/>
        <path d="M110 96 L104 110 L110 122"/>
        <path d="M100 160 L94 174 L100 186"/>
      </g>
      <g fill="none" stroke="#e0a0ff" stroke-width=".9" opacity=".62">
        <path d="M350 100 L330 116 L336 132 L318 146 L324 164"/>
        <path d="M300 86 L292 110 L300 126"/>
        <path d="M250 100 L244 124 L252 142"/>
        <path d="M220 170 L210 190 L218 206"/>
        <path d="M170 110 L160 128 L166 144"/>
        <path d="M150 60 L144 74 L150 88"/>
        <path d="M110 96 L104 110 L110 122"/>
        <path d="M100 160 L94 174 L100 186"/>
      </g>

      <!-- arame farpado no pulso -->
      <g fill="none" stroke="#4a3a52" stroke-width="1.7" opacity=".72">
        <path d="M330 90 C360 104 374 126 366 152 C358 178 334 192 312 186"/>
        <path d="M342 96 C364 110 372 130 364 152"/>
      </g>
      <g fill="none" stroke="#2a1a32" stroke-width="1.1" opacity=".85">
        <path d="M338 98 l-6 -6 M338 98 l6 -6"/>
        <path d="M354 114 l-6 -6 M354 114 l6 -6"/>
        <path d="M362 136 l-6 -6 M362 136 l6 -6"/>
        <path d="M356 160 l-6 -6 M356 160 l6 -6"/>
        <path d="M338 178 l-6 -6 M338 178 l6 -6"/>
      </g>

      <!-- luz de contorno violeta -->
      <g fill="none" stroke="#b45cff" stroke-width="4" opacity=".24" filter="url(#g-mao-soft)">
        <path d="M206 70 C166 52 112 40 58 40 C40 40 28 44 24 52"/>
        <path d="M210 98 C166 86 108 80 50 82 C34 82 20 86 14 94"/>
        <path d="M208 134 C168 136 118 144 68 158 C54 162 42 168 38 176"/>
        <path d="M212 166 C184 172 152 182 124 196 C112 202 104 208 102 216"/>
        <path d="M250 200 C218 208 186 220 160 236 C150 242 140 244 132 242"/>
        <path d="M170 78 C196 46 248 38 292 54"/>
        <path d="M330 58 C366 40 408 50 430 76"/>
      </g>
      <g fill="none" stroke="#e0a0ff" stroke-width="1" opacity=".5">
        <path d="M206 70 C166 52 112 40 58 40 C40 40 28 44 24 52"/>
        <path d="M210 98 C166 86 108 80 50 82 C34 82 20 86 14 94"/>
        <path d="M208 134 C168 136 118 144 68 158 C54 162 42 168 38 176"/>
        <path d="M212 166 C184 172 152 182 124 196 C112 202 104 208 102 216"/>
        <path d="M250 200 C218 208 186 220 160 236 C150 242 140 244 132 242"/>
        <path d="M170 78 C196 46 248 38 292 54"/>
        <path d="M330 58 C366 40 408 50 430 76"/>
      </g>

      <!-- sombra interna na base -->
      <path d="M184 208 C210 238 262 248 306 232 C330 224 344 210 350 194 L352 238 C330 254 280 258 238 244 C214 236 194 222 184 208 Z"
            fill="#020104" opacity=".55"/>
    ` + '</svg>';
  }

  function gabriel() {
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="70" ry="10" fill="#000" opacity=".5"/>
      <!-- asas -->
      <g opacity=".92">
        <path d="M66 92 L20 40 L34 96 L14 118 L60 130 Z" fill="url(#g-gold)" stroke="#4a3210" stroke-width="3"/>
        <path d="M134 92 L180 40 L166 96 L186 118 L140 130 Z" fill="url(#g-gold)" stroke="#4a3210" stroke-width="3"/>
        <path d="M64 98 L34 62 M60 110 L28 84 M136 98 L166 62 M140 110 L172 84" stroke="#7a5620" stroke-width="2" opacity=".7"/>
      </g>
      <!-- corpo -->
      <path d="M74 96 L126 96 L134 150 L124 202 L76 202 L66 150 Z" fill="url(#g-bone)" stroke="#6b6252" stroke-width="3"/>
      <path d="M88 100 L112 100 L114 140 L86 140 Z" fill="#c8a15a" opacity=".5"/>
      <rect x="72" y="150" width="56" height="9" fill="#c8a15a" opacity=".8"/>
      <path d="M74 202 L126 202 L132 236 L68 236 Z" fill="url(#g-bone)" stroke="#6b6252" stroke-width="3"/>
      <!-- cabeça -->
      <path d="M82 44 L118 44 L124 70 L116 92 L84 92 L76 70 Z" fill="url(#g-bone)" stroke="#6b6252" stroke-width="3"/>
      <path d="M84 62 L116 62 L114 70 L86 70 Z" fill="#1a1a22"/>
      <circle cx="93" cy="66" r="3" fill="#fff"/><circle cx="107" cy="66" r="3" fill="#fff"/>
      <path d="M90 78 L110 78" stroke="#8a8272" stroke-width="3"/>
      <!-- halo -->
      <ellipse cx="100" cy="34" rx="34" ry="10" fill="none" stroke="#ffb43c" stroke-width="5" opacity=".95"/>
      <ellipse cx="100" cy="34" rx="34" ry="10" fill="none" stroke="#fff0b0" stroke-width="2" opacity=".8"/>
      <!-- espada -->
      <g>
        <rect x="164" y="96" width="9" height="120" rx="3" fill="url(#g-gold)" stroke="#4a3210" stroke-width="2"/>
        <rect x="150" y="212" width="36" height="8" rx="3" fill="#4a3210"/>
        <rect x="164" y="220" width="9" height="22" rx="3" fill="#6b4a10"/>
      </g>
      <!-- braço -->
      <rect x="140" y="100" width="14" height="46" rx="5" fill="url(#g-bone)" stroke="#6b6252" stroke-width="2"/>
    `);
  }

  /* ---------------- HUSKS ---------------- */
  function huskBase(opts) {
    const o = Object.assign({ body:'#8d7a70', mask:'#efe7d6', bulk:1, blood:true, hood:false, chains:false, drip:true }, opts || {});
    const w = 26 * o.bulk, h = 40 * o.bulk;
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="${40 * o.bulk}" ry="8" fill="#000" opacity=".45"/>
      <g>
        <rect x="${86 - w / 2}" y="196" width="${w * 0.36}" height="${46}" fill="#4a3d38"/>
        <rect x="${114 - w / 2}" y="196" width="${w * 0.36}" height="${46}" fill="#4a3d38"/>
        <rect x="${80 - w / 2}" y="238" width="${w * 0.5}" height="10" rx="2" fill="#2e2521"/>
        <rect x="${110 - w / 2}" y="238" width="${w * 0.5}" height="10" rx="2" fill="#2e2521"/>
      </g>
      <path d="M${100 - w} 150 L${100 + w} 150 L${100 + w * 0.8} 202 L${100 - w * 0.8} 202 Z" fill="url(#g-flesh)" stroke="#3a2620" stroke-width="3"/>
      <rect x="${100 - w * 0.55}" y="158" width="${w * 1.1}" height="12" fill="#7a3a38" opacity=".55"/>
      <rect x="${100 - w * 1.05}" y="112" width="${w * 0.36}" height="46" rx="4" fill="url(#g-flesh)"/>
      <rect x="${100 + w * 0.7}" y="112" width="${w * 0.36}" height="46" rx="4" fill="url(#g-flesh)"/>
      <g>
        <ellipse cx="100" cy="82" rx="${26 * o.bulk}" ry="${28 * o.bulk}" fill="${o.body}"/>
        ${o.hood ? `<path d="M${100 - 30 * o.bulk} 88 q${30 * o.bulk} -${44 * o.bulk} ${60 * o.bulk} 0 q-${30 * o.bulk} ${12 * o.bulk} -${60 * o.bulk} 0 Z" fill="#241c1a"/>` : ''}
        <ellipse cx="100" cy="86" rx="${17 * o.bulk}" ry="${20 * o.bulk}" fill="${o.mask}"/>
        <rect x="${100 - 11 * o.bulk}" y="80" width="${8 * o.bulk}" height="4" fill="#160d10"/>
        <rect x="${100 + 3 * o.bulk}" y="80" width="${8 * o.bulk}" height="4" fill="#160d10"/>
        <rect x="${100 - 7 * o.bulk}" y="93" width="${14 * o.bulk}" height="3" fill="#6b3a38"/>
        ${o.drip ? `<path d="M${100 + 6 * o.bulk} 100 q3 12 0 18 q-3 -6 0 -18" fill="url(#g-blood)"/>` : ''}
      </g>
      ${o.chains ? `<g stroke="#7a6a58" stroke-width="3" fill="none">
        <path d="M${100 - w * 0.9} 128 q-14 18 -4 34"/><path d="M${100 + w * 0.9} 128 q14 18 4 34"/>
        <circle cx="${100 - w * 0.9 - 4}" cy="130" r="4"/><circle cx="${100 + w * 0.9 + 4}" cy="130" r="4"/>
      </g>` : ''}
    `);
  }

  const husks = {
    husk_gordo: () => huskBase({ body:'#9a7f6d', bulk:1.35, mask:'#efe7d6' }),
    husk_vomito: () => huskBase({ body:'#7d6a52', bulk:1.15, mask:'#d8cbb0', blood:true }),
    husk_penitente: () => huskBase({ body:'#4f4750', bulk:0.95, mask:'#cfc4ad', hood:true, chains:true }),
    husk: () => huskBase({ body:'#8d7a70', bulk:1 }),
  };

  /* ---------------- MÁQUINAS ---------------- */
  function machineBase(opts) {
    const o = Object.assign({ shell:'#5a6470', eye:'#ff9d2e', acid:false, heavy:false }, opts || {});
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="58" ry="9" fill="#000" opacity=".45"/>
      <g>
        <rect x="70" y="190" width="16" height="48" fill="#2b3138"/>
        <rect x="114" y="190" width="16" height="48" fill="#2b3138"/>
        <rect x="58" y="234" width="40" height="12" rx="3" fill="#1b1f24"/>
        <rect x="104" y="234" width="40" height="12" rx="3" fill="#1b1f24"/>
      </g>
      ${o.heavy ? `<rect x="52" y="140" width="96" height="58" rx="6" fill="${o.shell}" stroke="#12161a" stroke-width="3"/>
      <rect x="60" y="150" width="80" height="16" fill="#3d454e"/>` : ''}
      <path d="M62 108 L138 108 L146 152 L136 196 L64 196 L54 152 Z" fill="${o.shell}" stroke="#12161a" stroke-width="3"/>
      <rect x="74" y="118" width="52" height="26" rx="4" fill="#1b1f24"/>
      <circle cx="100" cy="131" r="10" fill="${o.eye}"/>
      <circle cx="100" cy="131" r="4" fill="#1b1f24"/>
      <rect x="76" y="158" width="48" height="10" fill="#3d454e"/>
      <rect x="40" y="112" width="20" height="60" rx="5" fill="${o.shell}" stroke="#12161a" stroke-width="3"/>
      <rect x="140" y="112" width="20" height="60" rx="5" fill="${o.shell}" stroke="#12161a" stroke-width="3"/>
      <rect x="34" y="166" width="30" height="20" rx="4" fill="#2b3138"/>
      <rect x="136" y="166" width="30" height="20" rx="4" fill="#2b3138"/>
      <g>
        <rect x="78" y="52" width="44" height="30" rx="4" fill="${o.shell}" stroke="#12161a" stroke-width="3"/>
        <rect x="86" y="62" width="28" height="8" rx="2" fill="${o.eye}" opacity=".95"/>
        <rect x="94" y="40" width="12" height="14" fill="#39424f"/>
      </g>
      ${o.acid ? `<g>
        <ellipse cx="100" cy="98" rx="26" ry="16" fill="#3d5a20" stroke="#1d2a10" stroke-width="3"/>
        <ellipse cx="100" cy="94" rx="20" ry="10" fill="url(#g-acid)"/>
      </g>` : ''}
    `);
  }

  const machines = {
    machine: () => machineBase({}),
    machine_acid: () => machineBase({ shell:'#4c5a48', eye:'#c8ff6a', acid:true }),
    machine_heavy: () => machineBase({ shell:'#4a5058', eye:'#ff5a3c', heavy:true }),
  };

  /* ---------------- CRIATURAS ---------------- */
  function beast() {
    return svg(defs + `
      <ellipse cx="100" cy="246" rx="66" ry="9" fill="#000" opacity=".45"/>
      <g>
        <rect x="58" y="196" width="14" height="42" fill="#3a2a26"/>
        <rect x="90" y="196" width="14" height="42" fill="#3a2a26"/>
        <rect x="122" y="196" width="14" height="42" fill="#3a2a26"/>
        <rect x="112" y="196" width="14" height="42" fill="#3a2a26"/>
      </g>
      <path d="M52 140 q30 -26 74 -12 q26 8 26 30 q0 26 -30 32 q-52 8 -70 -20 z" fill="url(#g-flesh)" stroke="#2e1d19" stroke-width="3"/>
      <path d="M62 132 l10 -18 l8 16 z M86 122 l10 -20 l8 18 z M110 118 l10 -18 l8 16 z" fill="#e2d9c6" opacity=".9"/>
      <g>
        <path d="M136 138 q28 -8 34 12 q-14 18 -34 14 z" fill="url(#g-flesh)" stroke="#2e1d19" stroke-width="3"/>
        <path d="M150 148 l16 6 l-16 6 z" fill="#f0e6d2"/>
        <circle cx="146" cy="136" r="4" fill="#ff5a3c"/>
      </g>
      <path d="M60 150 q10 12 4 24" stroke="url(#g-blood)" stroke-width="4" fill="none" opacity=".8"/>
    `);
  }

  function demon() {
    return svg(defs + `
      <ellipse cx="100" cy="250" rx="58" ry="9" fill="#000" opacity=".45"/>
      <g>
        <rect x="72" y="192" width="18" height="46" fill="#5a3a12"/>
        <rect x="112" y="192" width="18" height="46" fill="#5a3a12"/>
        <rect x="62" y="234" width="36" height="12" rx="3" fill="#3a2608"/>
        <rect x="104" y="234" width="36" height="12" rx="3" fill="#3a2608"/>
      </g>
      <path d="M64 106 L136 106 L146 156 L134 198 L66 198 L54 156 Z" fill="url(#g-wax)" stroke="#5a3a12" stroke-width="3"/>
      <path d="M78 116 q-6 24 2 40 q-10 -14 -2 -40" fill="#e8c46a" opacity=".8"/>
      <path d="M120 118 q8 20 0 36 q10 -12 0 -36" fill="#e8c46a" opacity=".7"/>
      <rect x="46" y="108" width="22" height="52" rx="6" fill="url(#g-wax)" stroke="#5a3a12" stroke-width="3"/>
      <rect x="132" y="108" width="22" height="52" rx="6" fill="url(#g-wax)" stroke="#5a3a12" stroke-width="3"/>
      <g>
        <ellipse cx="100" cy="76" rx="26" ry="28" fill="url(#g-wax)" stroke="#5a3a12" stroke-width="3"/>
        <path d="M78 54 q-10 -16 -2 -24 q10 8 12 22 z" fill="#e8c46a" stroke="#5a3a12" stroke-width="2"/>
        <path d="M122 54 q10 -16 2 -24 q-10 8 -12 22 z" fill="#e8c46a" stroke="#5a3a12" stroke-width="2"/>
        <ellipse cx="91" cy="76" rx="5" ry="6" fill="#ff5a3c"/>
        <ellipse cx="109" cy="76" rx="5" ry="6" fill="#ff5a3c"/>
        <path d="M88 92 q12 8 24 0" stroke="#5a3a12" stroke-width="3" fill="none"/>
      </g>
    `);
  }

  function heart() {
    return svg(defs + `
      <ellipse cx="100" cy="236" rx="46" ry="8" fill="#000" opacity=".4"/>
      <g stroke="#7a0f1c" stroke-width="7" fill="none" opacity=".9">
        <path d="M70 130 q-22 -26 -6 -44"/><path d="M130 130 q22 -26 6 -44"/>
        <path d="M100 122 q-14 -30 0 -46"/>
      </g>
      <path d="M100 236 C50 210 44 156 66 134 C82 118 100 128 100 140 C100 128 118 118 134 134 C156 156 150 210 100 236 Z"
            fill="url(#g-blood)" stroke="#5a0a14" stroke-width="4"/>
      <ellipse cx="86" cy="164" rx="9" ry="12" fill="#fff" opacity=".85"/>
      <circle cx="86" cy="164" r="5" fill="#1a0a0c"/>
      <path d="M112 186 q10 8 20 0" stroke="#5a0a14" stroke-width="3" fill="none"/>
    `);
  }

  function angel(kind) {
    const halo = kind === 'angel_watch';
    return svg(defs + `
      <ellipse cx="100" cy="248" rx="50" ry="9" fill="#000" opacity=".45"/>
      <g opacity=".9">
        <path d="M76 110 L40 66 L52 116 L70 132 Z" fill="url(#g-bone)" stroke="#6b6252" stroke-width="2"/>
        <path d="M124 110 L160 66 L148 116 L130 132 Z" fill="url(#g-bone)" stroke="#6b6252" stroke-width="2"/>
      </g>
      <path d="M78 104 L122 104 L128 158 L120 202 L80 202 L72 158 Z" fill="url(#g-bone)" stroke="#6b6252" stroke-width="3"/>
      <rect x="78" y="202" width="44" height="36" fill="url(#g-bone)" stroke="#6b6252" stroke-width="3"/>
      <rect x="60" y="106" width="16" height="46" rx="4" fill="url(#g-bone)" stroke="#6b6252" stroke-width="2"/>
      <rect x="124" y="106" width="16" height="46" rx="4" fill="url(#g-bone)" stroke="#6b6252" stroke-width="2"/>
      <g>
        <ellipse cx="100" cy="72" rx="22" ry="24" fill="url(#g-bone)" stroke="#6b6252" stroke-width="3"/>
        <rect x="86" y="66" width="28" height="8" rx="3" fill="#1a1a22"/>
        <circle cx="93" cy="70" r="2.5" fill="#fff"/><circle cx="107" cy="70" r="2.5" fill="#fff"/>
        ${halo ? `<g stroke="#c8a15a" stroke-width="3" fill="none"><ellipse cx="100" cy="40" rx="26" ry="7"/></g>
        <g fill="url(#g-gold)"><path d="M74 42 l-8 -12 l12 6 z"/><path d="M126 42 l8 -12 l-12 6 z"/></g>` : ''}
      </g>
      ${kind === 'angel_watch' ? `<g><rect x="146" y="120" width="8" height="96" rx="3" fill="url(#g-gold)"/></g>` : `<g><rect x="148" y="130" width="7" height="90" rx="3" fill="url(#g-gold)"/></g>`}
    `);
  }

  function motor() {
    return svg(defs + `
      <rect x="30" y="40" width="140" height="170" rx="10" fill="#1a2220" stroke="#2f6b4c" stroke-width="4"/>
      <rect x="42" y="52" width="116" height="86" rx="4" fill="#0b1512" stroke="#2f6b4c" stroke-width="2"/>
      <g fill="#57d68b" font-family="monospace" font-size="11">
        <text x="50" y="72">&gt; SISTEMA V1</text>
        <text x="50" y="90">&gt; SANGUE 00%</text>
        <text x="50" y="108">&gt; DESCENDO...</text>
        <text x="50" y="126">&gt; _</text>
      </g>
      <rect x="42" y="150" width="116" height="12" fill="#0b1512" stroke="#2f6b4c" stroke-width="2"/>
      <rect x="42" y="172" width="116" height="12" fill="#0b1512" stroke="#2f6b4c" stroke-width="2"/>
      <circle cx="60" cy="196" r="7" fill="#57d68b"/>
      <circle cx="82" cy="196" r="7" fill="#7a2a2a"/>
      <rect x="42" y="60" width="40" height="4" fill="#57d68b" opacity=".6"/>
    `);
  }

  /* ---------------- PORTRETES ---------------- */
  function portrait(kind) {
    if (kind === 'v2') return v2();
    if (kind === 'gabriel') return gabriel();
    if (kind === 'motor') return motor();
    if (kind === 'v1') return v1();
    return '';
  }

  /* ---------------- CENÁRIOS ---------------- */
  /* ---- LIMBO: vale ensolarado; à noite contra o V2 ---- */
  function sceneLimbo(night) {
    const c = night ? {
      sky1: '#060a20', sky2: '#16224a', sky3: '#2c3c66',
      glow1: '#eaf2ff', glow2: '#9db8e8', glow3: '#5a78b8',
      sun: '#eef4ff',
      far1: '#2a3a60', far2: '#1a2645',
      mid1: '#24424f', mid2: '#142b35',
      grass1: '#3a7a5c', grass2: '#173a2b',
      fg1: '#2f6b50', fg2: '#0f2a20',
      water1: '#4a7fb0', water2: '#24507c', water3: '#0f2846',
      shore: '#7f9f97', line: '#4d8f6a',
      cloud: '#c8d4ee', cloudOp: '.30',
      leaf: ['#1f4a44', '#2a5f54', '#163933'], trunk: '#2a2038',
      snow: '#cfdcff'
    } : {
      sky1: '#3f9ee0', sky2: '#8fd2f2', sky3: '#eaf7e3',
      glow1: '#fffbe2', glow2: '#ffe98a', glow3: '#ffd54a',
      sun: '#fff9d6',
      far1: '#b3d6e8', far2: '#7fa9c4',
      mid1: '#5a9b84', mid2: '#2d6656',
      grass1: '#7cc45c', grass2: '#2f6b2c',
      fg1: '#6ab84f', fg2: '#245c25',
      water1: '#9adcec', water2: '#4a9cba', water3: '#286a8c',
      shore: '#d5eab0', line: '#a8dd86',
      cloud: '#ffffff', cloudOp: '.92',
      leaf: ['#2f7a34', '#3f8f3e', '#2a6630'], trunk: '#4a2f18',
      snow: '#f4fbff'
    };

    function tree(x, y, s) {
      return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
        '<rect x="-4" y="-8" width="8" height="26" fill="' + c.trunk + '"/>' +
        '<circle cx="0" cy="-22" r="18" fill="' + c.leaf[0] + '"/>' +
        '<circle cx="-15" cy="-12" r="12" fill="' + c.leaf[1] + '"/>' +
        '<circle cx="15" cy="-12" r="12" fill="' + c.leaf[2] + '"/>' +
        '</g>';
    }

    const stars = night ? `
      <g fill="#e6efff" opacity=".9">
        <circle cx="64" cy="30" r="1.5"/><circle cx="130" cy="78" r="1.1"/><circle cx="206" cy="22" r="1.4"/>
        <circle cx="286" cy="58" r="1.2"/><circle cx="352" cy="26" r="1.6"/><circle cx="420" cy="70" r="1.1"/>
        <circle cx="494" cy="18" r="1.5"/><circle cx="560" cy="54" r="1.2"/><circle cx="736" cy="30" r="1.4"/>
        <circle cx="778" cy="86" r="1.1"/><circle cx="36" cy="102" r="1.2"/><circle cx="610" cy="96" r="1"/>
      </g>` : '';

    const birds = night ? '' : `
      <g stroke="#3d5a66" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round">
        <path d="M236 96 q7 -6 14 0 q7 -6 14 0"/>
        <path d="M292 74 q5 -5 10 0 q5 -5 10 0"/>
        <path d="M438 108 q6 -6 12 0 q6 -6 12 0"/>
        <path d="M700 128 q6 -6 12 0 q6 -6 12 0"/>
      </g>`;

    const ring = night ? '<circle cx="652" cy="64" r="42" fill="none" stroke="#cfdcff" stroke-width="1.5" opacity=".22"/>' : '';
    const fireflies = night ? `
      <g fill="#d8e88a" opacity=".85">
        <circle cx="176" cy="306" r="1.8"/><circle cx="248" cy="318" r="1.4"/>
        <circle cx="472" cy="300" r="1.6"/><circle cx="642" cy="312" r="1.5"/><circle cx="742" cy="304" r="1.3"/>
      </g>` : '';
    const glimmer = night ? `
      <g stroke="#dbe8ff" stroke-width="2" opacity=".4" fill="none" stroke-linecap="round">
        <path d="M638 306 h28"/><path d="M630 312 h44"/><path d="M642 318 h24"/>
      </g>` : '';

    return `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c.sky1}"/><stop offset=".5" stop-color="${c.sky2}"/><stop offset="1" stop-color="${c.sky3}"/>
        </linearGradient>
        <radialGradient id="lm-sun">
          <stop offset="0" stop-color="${c.glow1}"/><stop offset=".38" stop-color="${c.glow2}" stop-opacity=".9"/><stop offset="1" stop-color="${c.glow3}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="lm-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c.far1}"/><stop offset="1" stop-color="${c.far2}"/>
        </linearGradient>
        <linearGradient id="lm-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c.mid1}"/><stop offset="1" stop-color="${c.mid2}"/>
        </linearGradient>
        <linearGradient id="lm-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c.grass1}"/><stop offset="1" stop-color="${c.grass2}"/>
        </linearGradient>
        <linearGradient id="lm-fg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c.fg1}"/><stop offset="1" stop-color="${c.fg2}"/>
        </linearGradient>
        <linearGradient id="lm-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${c.water1}"/><stop offset=".45" stop-color="${c.water2}"/><stop offset="1" stop-color="${c.water3}"/>
        </linearGradient>
      </defs>

      <rect width="800" height="360" fill="url(#lm-sky)"/>
      ${stars}
      <circle cx="652" cy="64" r="104" fill="url(#lm-sun)"/>
      <circle cx="652" cy="64" r="27" fill="${c.sun}"/>
      ${ring}

      <g fill="${c.cloud}" opacity="${c.cloudOp}">
        <g opacity=".92">
          <ellipse cx="118" cy="62" rx="54" ry="15"/><ellipse cx="150" cy="52" rx="33" ry="17"/>
          <ellipse cx="90" cy="56" rx="27" ry="12"/><ellipse cx="132" cy="44" rx="22" ry="14"/>
        </g>
        <g opacity=".72">
          <ellipse cx="360" cy="40" rx="44" ry="11"/><ellipse cx="388" cy="33" rx="26" ry="13"/>
          <ellipse cx="338" cy="35" rx="20" ry="9"/>
        </g>
        <g opacity=".8">
          <ellipse cx="540" cy="122" rx="38" ry="10"/><ellipse cx="562" cy="116" rx="22" ry="11"/>
        </g>
        <g opacity=".55">
          <ellipse cx="262" cy="140" rx="30" ry="8"/><ellipse cx="280" cy="136" rx="18" ry="9"/>
        </g>
      </g>
      ${birds}

      <rect x="0" y="196" width="800" height="64" fill="${night ? '#8fa8d8' : '#ffffff'}" opacity="${night ? '.10' : '.18'}"/>

      <path d="M0 226 L58 156 L104 190 L168 112 L236 196 L300 150 L356 214 L430 128 L498 200 L556 158 L628 216 L700 140 L764 198 L800 168 L800 262 L0 262 Z" fill="url(#lm-far)"/>
      <g fill="${c.snow}" opacity=".95">
        <path d="M168 112 L192 140 L180 146 L168 136 L154 146 L146 140 Z"/>
        <path d="M430 128 L452 154 L440 160 L428 150 L416 160 L410 154 Z"/>
        <path d="M700 140 L722 166 L710 172 L698 162 L686 172 L680 166 Z"/>
      </g>
      <g fill="${c.snow}" opacity=".45">
        <path d="M58 156 L72 174 L64 176 L58 170 L50 176 L44 174 Z"/>
        <path d="M300 150 L314 168 L306 170 L300 164 L292 170 L286 168 Z"/>
      </g>

      <path d="M0 268 L72 208 L140 250 L216 196 L292 260 L370 210 L444 262 L520 206 L596 258 L672 214 L748 262 L800 232 L800 322 L0 322 Z" fill="url(#lm-mid)"/>
      <g stroke="${c.line}" stroke-width="2" opacity=".35" fill="none">
        <path d="M60 250 q40 -18 80 0"/><path d="M300 246 q46 -20 92 0"/><path d="M560 250 q44 -18 88 0"/>
      </g>

      <path d="M0 298 C110 268 190 296 290 288 C390 280 470 302 570 290 C660 279 740 294 800 284 L800 360 L0 360 Z" fill="url(#lm-grass)"/>
      <g stroke="${c.line}" stroke-width="2" opacity=".4" fill="none">
        <path d="M40 306 q30 -10 60 -2"/><path d="M340 300 q40 -10 80 -2"/><path d="M620 306 q36 -10 72 -2"/>
      </g>

      <path d="M0 302 C90 292 170 308 260 301 C370 293 460 311 570 304 C670 297 750 308 800 302 L800 328 C700 336 620 320 520 328 C420 336 320 322 220 330 C140 336 60 324 0 332 Z" fill="url(#lm-water)"/>
      <path d="M0 302 C90 292 170 308 260 301 C370 293 460 311 570 304 C670 297 750 308 800 302" fill="none" stroke="${c.shore}" stroke-width="4" opacity=".7"/>
      <g stroke="${night ? '#dbe8ff' : '#e6faff'}" stroke-width="2" opacity="${night ? '.3' : '.45'}" fill="none" stroke-linecap="round">
        <path d="M60 310 h44"/><path d="M154 314 h30"/><path d="M250 308 h52"/>
        <path d="M390 314 h38"/><path d="M500 306 h46"/><path d="M640 314 h36"/><path d="M722 308 h40"/>
      </g>
      ${glimmer}

      <path d="M0 312 C90 302 180 320 280 312 C390 304 500 322 610 314 C700 308 760 316 800 310 L800 360 L0 360 Z" fill="url(#lm-fg)"/>
      <path d="M0 312 C90 302 180 320 280 312 C390 304 500 322 610 314 C700 308 760 316 800 310" fill="none" stroke="${c.shore}" stroke-width="2" opacity=".35"/>
      <g stroke="${c.line}" stroke-width="2" opacity=".5" fill="none" stroke-linecap="round">
        <path d="M70 324 q7 -9 14 0"/><path d="M150 332 q6 -8 12 0"/><path d="M236 320 q7 -9 14 0"/>
        <path d="M330 336 q6 -8 12 0"/><path d="M430 328 q7 -9 14 0"/><path d="M540 338 q6 -8 12 0"/>
        <path d="M636 326 q7 -9 14 0"/><path d="M720 336 q6 -8 12 0"/>
      </g>
      <g fill="${night ? '#c9d8ff' : '#fff7c4'}" opacity=".8">
        <circle cx="110" cy="332" r="1.6"/><circle cx="196" cy="342" r="1.4"/>
        <circle cx="356" cy="330" r="1.5"/><circle cx="500" cy="344" r="1.4"/>
        <circle cx="610" cy="334" r="1.5"/><circle cx="700" cy="346" r="1.4"/>
      </g>
      ${fireflies}

      ${tree(120, 276, .75)}
      ${tree(212, 280, .9)}
      ${tree(486, 278, .7)}
      ${tree(566, 282, .85)}
      ${tree(430, 348, 1.1)}
      ${tree(28, 344, 1.35)}
      ${tree(772, 340, 1.5)}
    </svg>`;
  }

  /* ---- LUST: metrópole neon roxa/magenta ---- */
  function sceneLust() {
    return `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lu-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1e0433"/><stop offset=".38" stop-color="#5a0d80"/>
          <stop offset=".72" stop-color="#b31fb8"/><stop offset="1" stop-color="#ff4fc4"/>
        </linearGradient>
        <radialGradient id="lu-glow">
          <stop offset="0" stop-color="#ff7ae0" stop-opacity=".85"/><stop offset="1" stop-color="#ff2fb0" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="lu-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ff4fc4" stop-opacity="0"/><stop offset=".55" stop-color="#ff4fc4" stop-opacity=".38"/>
          <stop offset="1" stop-color="#ff8ae8" stop-opacity=".12"/>
        </linearGradient>
        <linearGradient id="lu-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#5e1a86"/><stop offset="1" stop-color="#170229"/>
        </linearGradient>
        <linearGradient id="lu-tower2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3f1058"/><stop offset="1" stop-color="#1d0430"/>
        </linearGradient>
        <pattern id="lu-win" width="12" height="16" patternUnits="userSpaceOnUse">
          <rect x="2" y="3" width="5" height="7" fill="#ff8ae8" opacity=".75"/>
          <rect x="9" y="4" width="2" height="2" fill="#7de8ff" opacity=".55"/>
        </pattern>
        <pattern id="lu-win2" width="10" height="12" patternUnits="userSpaceOnUse">
          <rect x="1" y="2" width="4" height="5" fill="#7de8ff" opacity=".6"/>
        </pattern>
        <linearGradient id="lu-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ff5ad0" stop-opacity="0"/><stop offset="1" stop-color="#ff5ad0" stop-opacity=".38"/>
        </linearGradient>
        <pattern id="lu-hazard" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="12" fill="#d8b25a" opacity=".5"/>
        </pattern>
      </defs>

      <rect width="800" height="360" fill="url(#lu-sky)"/>
      <circle cx="400" cy="262" r="196" fill="url(#lu-glow)" opacity=".7"/>
      <rect x="0" y="118" width="800" height="152" fill="url(#lu-haze)" opacity=".8"/>

      <g fill="#ffd6f6" opacity=".75">
        <circle cx="70" cy="34" r="1.6"/><circle cx="150" cy="58" r="1.2"/><circle cx="238" cy="26" r="1.5"/>
        <circle cx="330" cy="52" r="1.1"/><circle cx="470" cy="30" r="1.5"/><circle cx="562" cy="62" r="1.2"/>
        <circle cx="654" cy="24" r="1.6"/><circle cx="736" cy="48" r="1.2"/><circle cx="398" cy="88" r="1"/>
      </g>

      <g fill="#2a0a3f" opacity=".9">
        <rect x="0" y="188" width="34" height="172"/><rect x="40" y="206" width="26" height="154"/>
        <rect x="250" y="196" width="30" height="164"/><rect x="286" y="214" width="20" height="146"/>
        <rect x="430" y="192" width="34" height="168"/><rect x="470" y="212" width="22" height="148"/>
        <rect x="600" y="200" width="28" height="160"/><rect x="636" y="186" width="34" height="174"/>
        <rect x="760" y="206" width="40" height="154"/>
      </g>

      <g>
        <rect x="20" y="42" width="82" height="318" fill="url(#lu-tower)" stroke="#ff5ad0" stroke-opacity=".45"/>
        <rect x="23" y="45" width="76" height="312" fill="url(#lu-win)" opacity=".5"/>
        <rect x="20" y="42" width="82" height="5" fill="#ff5ad0" opacity=".6"/>

        <rect x="112" y="116" width="58" height="244" fill="url(#lu-tower2)" stroke="#ff5ad0" stroke-opacity=".3"/>
        <rect x="115" y="119" width="52" height="238" fill="url(#lu-win2)" opacity=".45"/>
        <rect x="112" y="116" width="58" height="4" fill="#7de8ff" opacity=".5"/>

        <rect x="196" y="74" width="72" height="286" fill="url(#lu-tower)" stroke="#ff5ad0" stroke-opacity=".4"/>
        <rect x="199" y="77" width="66" height="280" fill="url(#lu-win)" opacity=".42"/>
        <rect x="196" y="74" width="72" height="5" fill="#ff5ad0" opacity=".55"/>

        <rect x="300" y="132" width="62" height="228" fill="url(#lu-tower2)" stroke="#c46bff" stroke-opacity=".35"/>
        <rect x="303" y="135" width="56" height="222" fill="url(#lu-win2)" opacity=".4"/>

        <rect x="396" y="58" width="90" height="302" fill="url(#lu-tower)" stroke="#ff5ad0" stroke-opacity=".45"/>
        <rect x="399" y="61" width="84" height="296" fill="url(#lu-win)" opacity=".5"/>
        <rect x="396" y="58" width="90" height="6" fill="#ff5ad0" opacity=".6"/>
        <rect x="432" y="40" width="18" height="18" fill="#2a0a3f" stroke="#ff5ad0" stroke-opacity=".5"/>

        <rect x="498" y="108" width="66" height="252" fill="url(#lu-tower2)" stroke="#c46bff" stroke-opacity=".35"/>
        <rect x="501" y="111" width="60" height="246" fill="url(#lu-win2)" opacity=".42"/>

        <rect x="580" y="66" width="80" height="294" fill="url(#lu-tower)" stroke="#ff5ad0" stroke-opacity=".4"/>
        <rect x="583" y="69" width="74" height="288" fill="url(#lu-win)" opacity=".48"/>

        <rect x="676" y="126" width="54" height="234" fill="url(#lu-tower2)" stroke="#c46bff" stroke-opacity=".3"/>
        <rect x="679" y="129" width="48" height="228" fill="url(#lu-win2)" opacity=".45"/>

        <rect x="742" y="88" width="58" height="272" fill="url(#lu-tower)" stroke="#ff5ad0" stroke-opacity=".4"/>
        <rect x="745" y="91" width="52" height="266" fill="url(#lu-win)" opacity=".45"/>
      </g>

      <g fill="#1a0428" stroke="#ff8ae8" stroke-width="1" opacity=".85">
        <rect x="130" y="222" width="210" height="60"/>
        <rect x="470" y="236" width="180" height="52"/>
      </g>
      <g stroke="#ff5ad0" stroke-width="1.4" opacity=".55">
        <path d="M130 238 h210"/><path d="M130 254 h210"/><path d="M130 270 h210"/>
        <path d="M470 250 h180"/><path d="M470 264 h180"/>
      </g>
      <g fill="#7de8ff" opacity=".5">
        <rect x="140" y="228" width="7" height="5"/><rect x="160" y="228" width="7" height="5"/><rect x="180" y="228" width="7" height="5"/>
        <rect x="200" y="228" width="7" height="5"/><rect x="220" y="228" width="7" height="5"/><rect x="240" y="228" width="7" height="5"/>
        <rect x="260" y="228" width="7" height="5"/><rect x="280" y="228" width="7" height="5"/><rect x="300" y="228" width="7" height="5"/>
        <rect x="480" y="242" width="7" height="5"/><rect x="502" y="242" width="7" height="5"/><rect x="524" y="242" width="7" height="5"/>
        <rect x="546" y="242" width="7" height="5"/><rect x="568" y="242" width="7" height="5"/><rect x="590" y="242" width="7" height="5"/>
      </g>

      <g stroke="#9a86c0" stroke-width="4" opacity=".95">
        <path d="M102 158 H268"/><path d="M330 190 H396"/><path d="M486 148 H640"/>
      </g>
      <g stroke="#6d5a8f" stroke-width="2" opacity=".75">
        <path d="M112 158 V170 M132 158 V170 M152 158 V170 M172 158 V170 M192 158 V170 M212 158 V170 M232 158 V170 M252 158 V170"/>
        <path d="M340 190 V202 M358 190 V202 M376 190 V202"/>
        <path d="M496 148 V160 M520 148 V160 M544 148 V160 M568 148 V160 M592 148 V160 M616 148 V160"/>
      </g>

      <g stroke="#c7b3e8" stroke-width="1.4" opacity=".65">
        <path d="M330 56 V258"/><path d="M392 56 V258"/>
        <path d="M540 92 V292"/><path d="M596 92 V292"/>
        <path d="M674 140 V276"/>
      </g>
      <g fill="#4a3559" stroke="#a48ac4" stroke-width="1.5">
        <rect x="312" y="258" width="108" height="8"/>
        <rect x="522" y="292" width="92" height="8"/>
        <rect x="652" y="276" width="44" height="7"/>
      </g>
      <g stroke="#7f68a4" stroke-width="2" opacity=".85">
        <path d="M320 266 V282 M336 266 V282 M352 266 V282 M368 266 V282 M384 266 V282 M400 266 V282"/>
        <path d="M530 300 V314 M548 300 V314 M566 300 V314 M584 300 V314 M602 300 V314"/>
      </g>

      <g stroke="#8a76b0" stroke-width="3" fill="none" opacity=".8">
        <path d="M706 300 V152"/><path d="M706 152 H786"/><path d="M706 152 L750 300"/>
        <path d="M742 152 V196"/>
      </g>
      <rect x="734" y="196" width="16" height="11" fill="#5a4570" stroke="#a48ac4"/>

      <g fill="#ff5ad0" opacity=".85">
        <circle cx="134" cy="234" r="2.5"/><circle cx="474" cy="248" r="2.5"/><circle cx="238" cy="80" r="2.2"/>
      </g>
      <g fill="#7de8ff" opacity=".8"><circle cx="308" cy="138" r="2.2"/><circle cx="680" cy="132" r="2"/></g>

      <g fill="#ff4fd8" opacity=".85">
        <rect x="18" y="58" width="3" height="302"/>
        <rect x="392" y="72" width="3" height="288"/>
        <rect x="576" y="80" width="3" height="280"/>
        <rect x="738" y="102" width="3" height="258"/>
      </g>
      <g fill="#7de8ff" opacity=".7">
        <rect x="108" y="130" width="2" height="230"/>
        <rect x="494" y="122" width="2" height="238"/>
      </g>
      <g fill="#ff8ae8" opacity=".9">
        <rect x="212" y="152" width="6" height="24" rx="2"/>
        <rect x="512" y="176" width="6" height="20" rx="2"/>
        <rect x="600" y="96" width="5" height="30" rx="2"/>
      </g>

      <rect x="0" y="286" width="800" height="74" fill="url(#lu-fog)" opacity=".8"/>

      <!-- plataforma suspensa: cabos e guarda-corpo -->
      <g stroke="#c7b3e8" stroke-width="1.4" opacity=".45">
        <path d="M118 0 V296"/><path d="M282 0 V296"/><path d="M518 0 V296"/><path d="M682 0 V296"/>
        <path d="M40 96 L118 300"/><path d="M760 96 L682 300"/>
      </g>
      <g stroke="#9a86c0" stroke-width="2.5" opacity=".9">
        <path d="M32 296 V312 M92 296 V312 M152 296 V312 M212 296 V312 M272 296 V312 M332 296 V312 M392 296 V312 M452 296 V312 M512 296 V312 M572 296 V312 M632 296 V312 M692 296 V312 M752 296 V312"/>
        <path d="M32 298 H332 M32 306 H332 M452 298 H768 M452 306 H768"/>
      </g>

      <!-- deck industrial -->
      <path d="M-20 310 L820 310 L806 332 L14 332 Z" fill="#2b1b3d" stroke="#a48ac4" stroke-width="2"/>
      <path d="M14 332 L806 332 L800 350 L20 350 Z" fill="#1a1026" stroke="#7f68a4" stroke-width="1.5"/>
      <path d="M-20 310 L820 310" stroke="#ff8ae8" stroke-width="2" opacity=".45"/>
      <g stroke="#4a3559" stroke-width="1.4" opacity=".9">
        <path d="M30 317 H780"/><path d="M24 324 H786"/>
        <path d="M70 310 V331 M150 310 V331 M230 310 V331 M310 310 V331 M390 310 V331 M470 310 V331 M550 310 V331 M630 310 V331 M710 310 V331"/>
      </g>
      <rect x="18" y="332" width="46" height="17" fill="url(#lu-hazard)"/>
      <rect x="736" y="332" width="46" height="17" fill="url(#lu-hazard)"/>
      <g fill="#8f76ab" opacity=".9">
        <circle cx="90" cy="341" r="2"/><circle cx="160" cy="341" r="2"/><circle cx="230" cy="341" r="2"/>
        <circle cx="300" cy="341" r="2"/><circle cx="370" cy="341" r="2"/><circle cx="440" cy="341" r="2"/>
        <circle cx="510" cy="341" r="2"/><circle cx="580" cy="341" r="2"/><circle cx="650" cy="341" r="2"/><circle cx="720" cy="341" r="2"/>
      </g>
      <g fill="#ff5ad0" opacity=".85">
        <circle cx="108" cy="306" r="2.4"/><circle cx="300" cy="306" r="2.2"/><circle cx="500" cy="306" r="2.2"/><circle cx="688" cy="306" r="2.4"/>
      </g>
      <g stroke="#6d5a8f" stroke-width="4" fill="none" opacity=".9">
        <path d="M150 350 V360 M150 354 L196 360 M196 350 V360"/>
        <path d="M604 350 V360 M604 354 L650 360 M650 350 V360"/>
      </g>
    </svg>`;
  }

  /* ---- GLUTTONY: carne exposta, ácido e bile ---- */
  function sceneGluttony(noAcid) {
    const puddles = noAcid ? '' : `
      <g>
        <ellipse cx="220" cy="322" rx="46" ry="11" fill="#5e8018" opacity=".5"/>
        <ellipse cx="220" cy="320" rx="44" ry="10" fill="url(#gl-acid)"/>
        <circle cx="220" cy="320" r="46" fill="url(#gl-bile)" opacity=".45"/>
        <ellipse cx="402" cy="332" rx="30" ry="8" fill="#5e8018" opacity=".45"/>
        <ellipse cx="402" cy="330" rx="28" ry="7" fill="url(#gl-acid)"/>
        <ellipse cx="566" cy="320" rx="38" ry="9" fill="#5e8018" opacity=".45"/>
        <ellipse cx="566" cy="318" rx="36" ry="8" fill="url(#gl-acid)"/>
        <circle cx="566" cy="318" r="38" fill="url(#gl-bile)" opacity=".35"/>
        <g fill="#eaf77e" opacity=".65">
          <circle cx="206" cy="319" r="2.2"/><circle cx="234" cy="323" r="1.5"/>
          <circle cx="398" cy="329" r="1.7"/><circle cx="560" cy="317" r="2"/><circle cx="578" cy="321" r="1.4"/>
        </g>
        <g stroke="#f2ffb0" stroke-width="1.5" opacity=".5" fill="none" stroke-linecap="round">
          <path d="M198 318 q10 -4 20 0"/><path d="M548 316 q12 -4 24 0"/>
        </g>
      </g>`;
    return `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="gl-bg" cx=".5" cy=".45" r=".72">
          <stop offset="0" stop-color="#4e1612"/><stop offset=".62" stop-color="#240706"/><stop offset="1" stop-color="#0d0303"/>
        </radialGradient>
        <linearGradient id="gl-muscle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#a83a30"/><stop offset=".55" stop-color="#7a2019"/><stop offset="1" stop-color="#4a0e0b"/>
        </linearGradient>
        <linearGradient id="gl-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7d211a"/><stop offset="1" stop-color="#3a0a08"/>
        </linearGradient>
        <linearGradient id="gl-acid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e2ef72"/><stop offset=".55" stop-color="#b3d13c"/><stop offset="1" stop-color="#5e8018"/>
        </linearGradient>
        <radialGradient id="gl-bile">
          <stop offset="0" stop-color="#f4ffa6" stop-opacity=".5"/><stop offset="1" stop-color="#e8f57a" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="800" height="360" fill="url(#gl-bg)"/>

      <ellipse cx="400" cy="158" rx="128" ry="80" fill="#2e0907" opacity=".8"/>
      <ellipse cx="400" cy="158" rx="92" ry="58" fill="#3f0d0a" stroke="#8a2a22" stroke-width="10"/>
      <ellipse cx="400" cy="158" rx="56" ry="34" fill="#0e0202" stroke="#b03a30" stroke-width="6"/>
      <ellipse cx="400" cy="158" rx="38" ry="22" fill="url(#gl-bile)"/>

      <path d="M0 0 H800 V34 C716 68 648 20 560 46 C470 74 400 16 306 48 C216 78 130 26 44 58 C26 64 12 52 0 62 Z" fill="url(#gl-muscle)" stroke="#2c0806" stroke-width="3"/>
      <g stroke="#c25a48" stroke-width="2" fill="none" opacity=".4">
        <path d="M18 20 C120 46 186 12 286 32"/>
        <path d="M300 34 C392 56 456 18 548 34"/>
        <path d="M556 34 C650 52 712 18 792 38"/>
        <path d="M76 46 C150 62 196 36 256 50"/>
        <path d="M330 52 C410 68 470 40 530 52"/>
      </g>

      <path d="M0 40 C38 122 22 212 48 302 C22 322 8 342 0 358 Z" fill="url(#gl-muscle)" opacity=".95"/>
      <path d="M800 40 C762 122 778 212 752 302 C778 322 792 342 800 358 Z" fill="url(#gl-muscle)" opacity=".95"/>

      <g stroke="#d9b39a" stroke-width="7" fill="none" opacity=".2">
        <path d="M96 0 C120 74 112 140 96 206"/>
        <path d="M704 0 C680 74 688 140 704 206"/>
        <path d="M180 12 C220 60 220 118 196 168"/>
        <path d="M620 12 C580 60 580 118 604 168"/>
      </g>

      <g stroke="#5e120e" stroke-width="3" fill="none" opacity=".55">
        <path d="M28 90 C46 150 30 220 52 292"/>
        <path d="M60 74 C78 140 62 212 84 286"/>
        <path d="M772 90 C754 150 770 220 748 292"/>
        <path d="M740 74 C722 140 738 212 716 286"/>
      </g>
      <g stroke="#c03028" stroke-width="2" fill="none" opacity=".35">
        <path d="M44 96 C58 156 44 222 62 288"/>
        <path d="M756 96 C742 156 756 222 738 288"/>
      </g>

      <path d="M0 300 C120 284 220 306 330 296 C460 284 560 308 680 296 C740 290 776 296 800 292 L800 360 L0 360 Z" fill="url(#gl-floor)"/>
      <g stroke="#3d0a08" stroke-width="2" opacity=".55" fill="none">
        <path d="M40 316 q80 -12 160 0"/><path d="M280 324 q90 -12 180 0"/><path d="M540 312 q80 -10 160 0"/>
      </g>
      <g stroke="#a83a30" stroke-width="2" opacity=".3" fill="none">
        <path d="M120 306 q60 10 120 0"/><path d="M420 310 q60 10 120 0"/>
      </g>

      <ellipse cx="400" cy="334" rx="320" ry="42" fill="url(#gl-bile)" opacity="${noAcid ? '.20' : '.14'}"/>
      ${puddles}

      <g stroke="#c03028" stroke-width="3" fill="none" opacity=".5">
        <path d="M96 206 q18 40 4 84"/><path d="M704 206 q-18 40 -4 84"/>
      </g>
      <g fill="#f2ffa0" opacity=".18">
        <circle cx="240" cy="120" r="2"/><circle cx="560" cy="104" r="2"/><circle cx="640" cy="150" r="1.6"/>
      </g>
    </svg>`;
  }

  /* ---- GREED: pirâmides colossais, templos e colunatas no deserto ---- */
  function sceneGreed() {
    return `<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3d1720"/><stop offset=".42" stop-color="#c25a2c"/>
          <stop offset=".74" stop-color="#f2a14e"/><stop offset="1" stop-color="#ffe0a0"/>
        </linearGradient>
        <radialGradient id="gr-sun">
          <stop offset="0" stop-color="#fff8d6"/><stop offset=".35" stop-color="#ffdf8a" stop-opacity=".9"/>
          <stop offset="1" stop-color="#ff9d2e" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="gr-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c9834a"/><stop offset="1" stop-color="#7a3e1c"/>
        </linearGradient>
        <linearGradient id="gr-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e8b766"/><stop offset="1" stop-color="#9a5a28"/>
        </linearGradient>
        <linearGradient id="gr-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d8b07a"/><stop offset="1" stop-color="#8a5a32"/>
        </linearGradient>
        <linearGradient id="gr-column" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#e8c48a"/><stop offset=".5" stop-color="#c8a15a"/><stop offset="1" stop-color="#7a4a26"/>
        </linearGradient>
        <linearGradient id="gr-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe0a0" stop-opacity="0"/><stop offset=".55" stop-color="#ffd27a" stop-opacity=".34"/>
          <stop offset="1" stop-color="#ffb45a" stop-opacity=".08"/>
        </linearGradient>
        <pattern id="gr-meander" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M2 14 V4 H14 V10 H8 V8" fill="none" stroke="#c8a15a" stroke-width="1.5" opacity=".65"/>
        </pattern>
      </defs>

      <rect width="800" height="360" fill="url(#gr-sky)"/>
      <circle cx="640" cy="70" r="112" fill="url(#gr-sun)"/>
      <circle cx="640" cy="70" r="30" fill="#fff3c4"/>
      <g fill="#ffdca0" opacity=".45">
        <ellipse cx="180" cy="64" rx="90" ry="10"/><ellipse cx="250" cy="52" rx="54" ry="7"/>
        <ellipse cx="460" cy="90" rx="74" ry="8"/>
      </g>
      <g stroke="#3a2418" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round">
        <path d="M208 118 q8 -7 16 0 q8 -7 16 0"/>
        <path d="M302 88 q6 -6 12 0 q6 -6 12 0"/>
        <path d="M484 128 q6 -6 12 0 q6 -6 12 0"/>
      </g>

      <!-- pirâmides colossais -->
      <g>
        <path d="M-20 254 L150 58 L330 254 Z" fill="url(#gr-far)"/>
        <path d="M150 58 L330 254 L238 254 Z" fill="#7a3e1c" opacity=".55"/>
        <path d="M150 58 L150 254" stroke="#e8b766" stroke-width="2" opacity=".45"/>
        <path d="M286 254 L420 120 L560 254 Z" fill="url(#gr-far)" opacity=".82"/>
        <path d="M420 120 L560 254 L492 254 Z" fill="#6e3518" opacity=".45"/>
        <path d="M520 254 L650 148 L790 254 Z" fill="url(#gr-far)" opacity=".68"/>
        <path d="M650 148 L790 254 L718 254 Z" fill="#5e2e14" opacity=".4"/>
        <g fill="#ffe0a0" opacity=".3">
          <path d="M150 58 L170 88 L150 92 Z"/><path d="M420 120 L436 142 L420 146 Z"/>
        </g>
      </g>

      <rect x="0" y="170" width="800" height="112" fill="url(#gr-haze)"/>

      <!-- templo egípcio colossal, à esquerda -->
      <g>
        <path d="M-30 302 V146 L40 126 L96 140 L96 302 Z" fill="url(#gr-stone)" stroke="#5a3a1a" stroke-width="2"/>
        <path d="M96 140 L180 160 L180 302 L96 302 Z" fill="#8a4e28" stroke="#4a2a12" stroke-width="2"/>
        <path d="M-30 146 L40 126 L96 140 L180 160 L180 174 L96 154 L-30 160 Z" fill="#d8b07a" stroke="#5a3a1a" stroke-width="2"/>
        <g stroke="#c8a15a" opacity=".6" stroke-width="2">
          <path d="M-20 184 H86 M-20 200 H86 M-20 216 H86 M-20 232 H86 M-20 248 H86"/>
          <path d="M108 190 H168 M108 206 H168 M108 222 H168 M108 238 H168"/>
        </g>
        <g fill="#4a2a12" opacity=".82">
          <rect x="4" y="238" width="40" height="64"/>
          <path d="M24 238 L24 220 L32 220 L32 238 Z"/>
        </g>
        <g fill="#c8a15a" opacity=".55">
          <circle cx="34" cy="172" r="4"/><path d="M28 196 l6 -12 l6 12 z"/><path d="M48 194 h12 M54 188 v12"/>
          <circle cx="132" cy="178" r="4"/><path d="M122 198 h20 M132 188 v20"/>
        </g>
        <path d="M-30 302 H190 L190 318 H-30 Z" fill="#b9854a" stroke="#5a3a1a" stroke-width="2"/>
      </g>

      <!-- obelisco -->
      <g>
        <path d="M218 302 L234 126 L250 302 Z" fill="url(#gr-column)" stroke="#4a2a12" stroke-width="2"/>
        <path d="M234 126 L250 302 L242 302 Z" fill="#7a4a26" opacity=".6"/>
        <path d="M234 126 L241 104 L248 126 Z" fill="#e8c46a" stroke="#7a5620" stroke-width="2"/>
        <g stroke="#c8a15a" stroke-width="1.5" opacity=".65">
          <path d="M228 160 h12 M226 190 h16 M225 220 h18 M223 250 h20 M221 280 h22"/>
        </g>
      </g>

      <!-- colunata greco-romana colossal, à direita -->
      <g>
        <path d="M530 302 V74 H800 V302 Z" fill="#3a2418" opacity=".32"/>
        <path d="M520 84 H800 V104 H520 Z" fill="url(#gr-stone)" stroke="#4a2a12" stroke-width="2"/>
        <path d="M520 104 H800 V116 H520 Z" fill="url(#gr-meander)"/>
        <path d="M520 116 H800 V126 H520 Z" fill="#a87642" stroke="#4a2a12" stroke-width="1.5"/>
        <g fill="url(#gr-column)" stroke="#4a2a12" stroke-width="2">
          <path d="M542 126 H574 L580 274 H536 Z"/>
          <path d="M614 126 H646 L652 274 H608 Z"/>
          <path d="M686 126 H718 L724 274 H680 Z"/>
          <path d="M758 126 H790 L796 274 H752 Z"/>
        </g>
        <g fill="#d8b07a" stroke="#4a2a12" stroke-width="2">
          <path d="M536 126 H580 L574 138 H542 Z"/>
          <path d="M608 126 H652 L646 138 H614 Z"/>
          <path d="M680 126 H724 L718 138 H686 Z"/>
          <path d="M752 126 H796 L790 138 H758 Z"/>
        </g>
        <g stroke="#5a3a1a" stroke-width="2" opacity=".7">
          <path d="M548 142 V268 M558 142 V268 M568 142 V268"/>
          <path d="M620 142 V268 M630 142 V268 M640 142 V268"/>
          <path d="M692 142 V268 M702 142 V268 M712 142 V268"/>
          <path d="M764 142 V268 M774 142 V268 M784 142 V268"/>
        </g>
        <g fill="#c8a15a" opacity=".5">
          <rect x="552" y="172" width="12" height="2"/><rect x="624" y="196" width="12" height="2"/>
          <rect x="696" y="158" width="12" height="2"/>
        </g>
        <path d="M520 274 H800 V302 H520 Z" fill="#8a5a32" stroke="#4a2a12" stroke-width="2"/>
      </g>

      <!-- estátua colossal quebrada no centro -->
      <g opacity=".92">
        <path d="M360 302 L360 238 Q360 218 380 218 L430 218 Q450 218 450 238 L450 302 Z"
              fill="#9a6a3a" stroke="#4a2a12" stroke-width="2"/>
        <path d="M374 222 Q374 190 400 184 Q426 190 426 222 L418 230 H382 Z"
              fill="#b9854a" stroke="#4a2a12" stroke-width="2"/>
        <path d="M382 190 L370 160 L390 172 L400 152 L410 172 L430 160 L418 190 Z"
              fill="#8a5a32" stroke="#4a2a12" stroke-width="2"/>
        <g fill="#ffcf5a" opacity=".75"><circle cx="391" cy="202" r="2.5"/><circle cx="409" cy="202" r="2.5"/></g>
        <path d="M352 244 q-22 18 -8 34 M458 244 q22 18 8 34" stroke="#8a5a32" stroke-width="5" fill="none"/>
        <g stroke="#5a3a1a" stroke-width="1.5" opacity=".6" fill="none">
          <path d="M372 252 l12 16 l-8 12"/><path d="M428 246 l-10 14"/>
        </g>
      </g>

      <!-- dunas -->
      <path d="M0 276 C120 254 210 286 320 272 C440 256 540 284 650 268 C720 258 770 270 800 262 L800 360 L0 360 Z"
            fill="url(#gr-sand)"/>
      <path d="M0 292 C110 276 190 300 300 288 C430 274 540 302 660 290 C730 283 776 290 800 286"
            fill="none" stroke="#f2cd8a" stroke-width="2" opacity=".5"/>
      <g stroke="#b97a42" stroke-width="1.6" opacity=".5" fill="none">
        <path d="M40 312 q60 -12 120 0"/><path d="M260 320 q70 -12 140 0"/>
        <path d="M520 308 q70 -10 140 0"/><path d="M660 332 q50 -8 100 0"/>
      </g>

      <!-- terraço de arenito em primeiro plano -->
      <path d="M0 316 H800 V360 H0 Z" fill="url(#gr-stone)"/>
      <path d="M0 316 H800" stroke="#e0b878" stroke-width="2" opacity=".7"/>
      <g stroke="#6e4424" stroke-width="1.5" opacity=".55">
        <path d="M0 330 H800 M0 346 H800"/>
        <path d="M70 316 V360 M210 316 V360 M350 316 V360 M490 316 V360 M630 316 V360 M770 316 V360"/>
      </g>
      <g stroke="#5a3a1a" stroke-width="2" opacity=".7" fill="none">
        <path d="M116 320 l18 12 l-10 16"/><path d="M438 322 l-14 12 l16 10"/><path d="M690 320 l12 14 l-8 12"/>
      </g>

      <!-- tambor de coluna caído -->
      <g>
        <ellipse cx="90" cy="326" rx="34" ry="11" fill="#8a5a32" stroke="#4a2a12" stroke-width="2"/>
        <ellipse cx="90" cy="322" rx="34" ry="11" fill="#c8a15a" stroke="#4a2a12" stroke-width="2"/>
        <ellipse cx="90" cy="320" rx="18" ry="6" fill="#9a6a3a"/>
        <path d="M56 322 H124" stroke="#7a4a26" stroke-width="2" opacity=".7"/>
      </g>

      <g fill="#ffe6a0" opacity=".5">
        <circle cx="180" cy="286" r="1.6"/><circle cx="320" cy="276" r="1.2"/><circle cx="540" cy="284" r="1.4"/>
        <circle cx="700" cy="272" r="1.2"/><circle cx="260" cy="300" r="1"/><circle cx="620" cy="306" r="1.3"/>
      </g>
      <g stroke="#ffe6a0" stroke-width="1.4" opacity=".28" fill="none" stroke-linecap="round">
        <path d="M96 280 q22 -8 44 0"/><path d="M456 270 q24 -8 48 0"/><path d="M656 296 q22 -6 44 0"/>
      </g>
    </svg>`;
  }

  function arena(theme, opts) {
    opts = opts || {};
    if (theme === 'limbo') return sceneLimbo(!!opts.night);
    if (theme === 'lust') return sceneLust();
    if (theme === 'gluttony') return sceneGluttony(!!opts.noAcid);
    if (theme === 'greed') return sceneGreed();
    const a = theme.a, b = theme.b, c = theme.c;
    return '<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${b}"/><stop offset=".62" stop-color="${a}" stop-opacity=".85"/><stop offset="1" stop-color="#0a0708"/>
      </linearGradient></defs>` +
      `<rect width="800" height="360" fill="url(#sky)"/>` +
      `<g fill="#000" opacity=".45">
        <rect x="0" y="210" width="800" height="150"/>
        <path d="M40 210 L70 120 L100 210 Z"/><path d="M140 210 L175 96 L210 210 Z"/>
        <path d="M300 210 L330 140 L360 210 Z"/><path d="M600 210 L640 110 L680 210 Z"/>
        <rect x="420" y="150" width="60" height="60"/>
      </g>` +
      `<g stroke="${c}" stroke-width="2" opacity=".35" fill="none">
        <path d="M0 250 Q200 210 400 250 T800 240"/><path d="M0 285 Q200 250 400 285 T800 275"/>
      </g>` +
      `<g fill="${c}" opacity=".18">
        <circle cx="120" cy="70" r="2"/><circle cx="300" cy="40" r="2"/><circle cx="520" cy="80" r="2"/>
        <circle cx="660" cy="50" r="2"/><circle cx="220" cy="110" r="2"/><circle cx="740" cy="120" r="2"/>
      </g>` +
      `</svg>`;
  }

  /* ---------------- ARTES DOS ATOS ---------------- */
  function actArt(id) {
    if (id === 'act1') {
      return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="240" height="120" fill="#170a10"/>' +
        '<g stroke="#4a1018" stroke-width="10" opacity=".85"><path d="M120 60 L0 -6"/><path d="M120 60 L240 -6"/><path d="M120 60 L0 126"/><path d="M120 60 L240 126"/></g>' +
        '<circle cx="95" cy="58" r="30" fill="none" stroke="#d81f3a" stroke-width="6" opacity=".95"/>' +
        '<circle cx="145" cy="58" r="30" fill="none" stroke="#d81f3a" stroke-width="6" opacity=".95"/>' +
        '<g fill="#e8dcc8"><circle cx="120" cy="46" r="17"/><rect x="111" y="56" width="18" height="11" rx="3"/></g>' +
        '<g fill="#170a10"><circle cx="113" cy="44" r="4.5"/><circle cx="127" cy="44" r="4.5"/></g>' +
        '<g fill="#7a1424" opacity=".7"><circle cx="30" cy="24" r="3"/><circle cx="212" cy="30" r="3"/><circle cx="196" cy="96" r="2.5"/></g>' +
        '</svg>';
    }
    if (id === 'act2') {
      return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="240" height="120" fill="#0d1418"/>' +
        '<circle cx="95" cy="58" r="30" fill="none" stroke="#37505c" stroke-width="6" stroke-dasharray="52 34"/>' +
        '<circle cx="145" cy="58" r="30" fill="none" stroke="#37505c" stroke-width="6" stroke-dasharray="30 56"/>' +
        '<g fill="#37505c" opacity=".45"><circle cx="120" cy="46" r="17"/></g>' +
        '</svg>';
    }
    return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="240" height="120" fill="#12100f"/>' +
      '<circle cx="95" cy="58" r="30" fill="none" stroke="#3b3630" stroke-width="6" stroke-dasharray="20 30"/>' +
      '<circle cx="145" cy="58" r="30" fill="none" stroke="#3b3630" stroke-width="6" stroke-dasharray="14 36"/>' +
      '<text x="120" y="70" text-anchor="middle" font-size="40" fill="#3b3630">?</text>' +
      '</svg>';
  }

  /* ---------------- ARTES DAS CAMADAS ---------------- */
  function layerArt(id) {
    if (id === 'limbo') {
      return `<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lma-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#3f9ee0"/><stop offset=".6" stop-color="#9ad8f5"/><stop offset="1" stop-color="#eaf7e3"/>
          </linearGradient>
          <linearGradient id="lma-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#8fd4e4"/><stop offset="1" stop-color="#286a8c"/>
          </linearGradient>
        </defs>
        <rect width="240" height="120" fill="url(#lma-sky)"/>
        <circle cx="196" cy="22" r="30" fill="#fff6c0" opacity=".45"/>
        <circle cx="196" cy="22" r="12" fill="#fff9d6"/>
        <g fill="#fff" opacity=".85">
          <ellipse cx="42" cy="20" rx="20" ry="6"/><ellipse cx="52" cy="16" rx="12" ry="7"/>
          <ellipse cx="120" cy="14" rx="16" ry="5"/>
        </g>
        <path d="M0 78 L30 46 L54 66 L86 34 L120 72 L152 44 L186 74 L212 52 L240 70 L240 92 L0 92 Z" fill="#a9cfe2"/>
        <path d="M86 34 L98 50 L92 53 L86 47 L79 53 L74 50 Z" fill="#f4fbff"/>
        <path d="M152 44 L162 58 L157 60 L152 55 L146 60 L142 58 Z" fill="#f4fbff" opacity=".85"/>
        <path d="M0 84 C40 74 70 88 110 82 C150 76 186 88 240 80 L240 120 L0 120 Z" fill="#4d9c44"/>
        <path d="M0 92 C60 88 120 98 180 92 C206 89 226 93 240 90 L240 106 C216 109 198 104 174 107 C118 113 56 104 0 106 Z" fill="url(#lma-water)"/>
        <path d="M0 92 C60 88 120 98 180 92 C206 89 226 93 240 90" fill="none" stroke="#d5eab0" stroke-width="2" opacity=".8"/>
        <g stroke="#e6faff" stroke-width="1.2" opacity=".5">
          <path d="M30 98 h18"/><path d="M100 102 h22"/><path d="M170 96 h18"/>
        </g>
        <path d="M0 104 C50 98 100 110 150 104 C190 99 220 106 240 102 L240 120 L0 120 Z" fill="#3f8a3a"/>
        <g stroke="#79c45e" stroke-width="1.2" opacity=".6">
          <path d="M24 112 q4 -5 8 0"/><path d="M120 116 q4 -5 8 0"/><path d="M206 110 q4 -5 8 0"/>
        </g>
        <g transform="translate(60,108)">
          <rect x="-2" y="-6" width="4" height="14" fill="#4a2f18"/>
          <circle cx="0" cy="-12" r="10" fill="#2f7a34"/><circle cx="-8" cy="-7" r="6" fill="#3f8f3e"/><circle cx="8" cy="-7" r="6" fill="#2a6630"/>
        </g>
        <g transform="translate(212,110) scale(1.2)">
          <rect x="-2" y="-6" width="4" height="14" fill="#4a2f18"/>
          <circle cx="0" cy="-12" r="10" fill="#2b6f30"/><circle cx="-8" cy="-7" r="6" fill="#3a8a3a"/><circle cx="8" cy="-7" r="6" fill="#245e2b"/>
        </g>
      </svg>`;
    }
    if (id === 'lust') {
      return `<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lua-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#14021f"/><stop offset=".5" stop-color="#3d0a5c"/><stop offset="1" stop-color="#c02a92"/>
          </linearGradient>
          <linearGradient id="lua-tower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#3f1258"/><stop offset="1" stop-color="#11011b"/>
          </linearGradient>
          <pattern id="lua-win" width="8" height="10" patternUnits="userSpaceOnUse">
            <rect x="1" y="2" width="3" height="4" fill="#ff8ae8" opacity=".8"/>
          </pattern>
          <linearGradient id="lua-fog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ff5ad0" stop-opacity="0"/><stop offset="1" stop-color="#ff5ad0" stop-opacity=".45"/>
          </linearGradient>
        </defs>
        <rect width="240" height="120" fill="url(#lua-sky)"/>
        <ellipse cx="120" cy="92" rx="80" ry="40" fill="#ff7ae0" opacity=".28"/>
        <g fill="#2a0a3f">
          <rect x="0" y="62" width="14" height="58"/><rect x="18" y="70" width="10" height="50"/>
          <rect x="78" y="66" width="12" height="54"/><rect x="150" y="68" width="12" height="52"/>
          <rect x="206" y="60" width="14" height="60"/><rect x="224" y="72" width="16" height="48"/>
        </g>
        <rect x="30" y="30" width="30" height="90" fill="url(#lua-tower)" stroke="#ff5ad0" stroke-opacity=".5"/>
        <rect x="32" y="32" width="26" height="88" fill="url(#lua-win)" opacity=".55"/>
        <rect x="92" y="14" width="36" height="106" fill="url(#lua-tower)" stroke="#ff5ad0" stroke-opacity=".5"/>
        <rect x="94" y="16" width="32" height="104" fill="url(#lua-win)" opacity=".6"/>
        <rect x="92" y="14" width="36" height="3" fill="#ff5ad0" opacity=".7"/>
        <rect x="160" y="40" width="28" height="80" fill="url(#lua-tower)" stroke="#ff5ad0" stroke-opacity=".45"/>
        <rect x="162" y="42" width="24" height="78" fill="url(#lua-win)" opacity=".5"/>
        <g stroke="#9a86c0" stroke-width="2">
          <path d="M60 66 H92"/><path d="M128 52 H160"/>
        </g>
        <g stroke="#c7b3e8" stroke-width=".9" opacity=".6">
          <path d="M66 34 V92"/><path d="M148 58 V104"/>
        </g>
        <g fill="#4a3559" stroke="#a48ac4" stroke-width="1">
          <rect x="62" y="92" width="20" height="3"/>
          <rect x="144" y="104" width="18" height="3"/>
        </g>
        <rect x="0" y="98" width="240" height="22" fill="url(#lua-fog)"/>
        <g stroke="#c7b3e8" stroke-width=".7" opacity=".45">
          <path d="M60 0 V106"/><path d="M180 0 V106"/>
          <path d="M24 40 L60 106"/><path d="M216 40 L180 106"/>
        </g>
        <path d="M-4 108 L244 108 L240 114 L0 114 Z" fill="#2b1b3d" stroke="#a48ac4" stroke-width=".8"/>
        <path d="M0 114 L240 114 L238 118 L2 118 Z" fill="#1a1026"/>
        <g fill="#8f76ab" opacity=".9">
          <circle cx="30" cy="116" r="1"/><circle cx="90" cy="116" r="1"/><circle cx="150" cy="116" r="1"/><circle cx="210" cy="116" r="1"/>
        </g>
      </svg>`;
    }
    if (id === 'gluttony') {
      return `<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gla-muscle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#a83a30"/><stop offset=".6" stop-color="#7a2019"/><stop offset="1" stop-color="#4a0e0b"/>
          </linearGradient>
          <linearGradient id="gla-acid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e2ef72"/><stop offset="1" stop-color="#5e8018"/>
          </linearGradient>
          <radialGradient id="gla-bile">
            <stop offset="0" stop-color="#f4ffa6" stop-opacity=".55"/><stop offset="1" stop-color="#e8f57a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="240" height="120" fill="#1d0605"/>
        <ellipse cx="120" cy="52" rx="42" ry="26" fill="#2e0907"/>
        <ellipse cx="120" cy="52" rx="30" ry="19" fill="#3f0d0a" stroke="#8a2a22" stroke-width="4"/>
        <ellipse cx="120" cy="52" rx="18" ry="11" fill="#0e0202" stroke="#b03a30" stroke-width="2.5"/>
        <path d="M0 0 H240 V12 C214 26 194 6 168 16 C140 28 120 4 92 18 C64 30 40 8 14 22 C8 24 4 20 0 24 Z" fill="url(#gla-muscle)" stroke="#2c0806" stroke-width="2"/>
        <path d="M0 14 C10 44 6 74 14 104 C6 110 3 114 0 118 Z" fill="url(#gla-muscle)"/>
        <path d="M240 14 C230 44 234 74 226 104 C234 110 237 114 240 118 Z" fill="url(#gla-muscle)"/>
        <g stroke="#d9b39a" stroke-width="3" fill="none" opacity=".22">
          <path d="M34 2 C44 26 40 48 34 70"/><path d="M206 2 C196 26 200 48 206 70"/>
        </g>
        <g stroke="#c25a48" stroke-width="1.4" fill="none" opacity=".45">
          <path d="M8 10 C40 20 60 6 92 14"/><path d="M140 16 C170 24 196 10 228 18"/>
        </g>
        <path d="M0 100 C40 94 74 104 112 98 C152 92 190 104 240 96 L240 120 L0 120 Z" fill="#6f1a15"/>
        <ellipse cx="78" cy="110" rx="30" ry="7" fill="url(#gla-acid)"/>
        <ellipse cx="170" cy="114" rx="24" ry="6" fill="url(#gla-acid)"/>
        <circle cx="78" cy="110" r="30" fill="url(#gla-bile)" opacity=".5"/>
        <circle cx="170" cy="114" r="24" fill="url(#gla-bile)" opacity=".4"/>
        <g fill="#eaf77e" opacity=".6">
          <circle cx="70" cy="110" r="1.6"/><circle cx="88" cy="112" r="1.2"/><circle cx="164" cy="114" r="1.4"/>
        </g>
        <g stroke="#c03028" stroke-width="1.6" fill="none" opacity=".5">
          <path d="M34 70 q6 14 2 28"/><path d="M206 70 q-6 14 -2 28"/>
        </g>
      </svg>`;
    }
    if (id === 'greed') {
      return `<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lga-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#421722"/><stop offset=".44" stop-color="#c25a2c"/>
            <stop offset=".76" stop-color="#f2a14e"/><stop offset="1" stop-color="#ffe0a0"/>
          </linearGradient>
          <linearGradient id="lga-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e8b766"/><stop offset="1" stop-color="#9a5a28"/>
          </linearGradient>
          <linearGradient id="lga-stone" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#e8c48a"/><stop offset=".55" stop-color="#c8a15a"/><stop offset="1" stop-color="#7a4a26"/>
          </linearGradient>
        </defs>
        <rect width="240" height="120" fill="url(#lga-sky)"/>
        <circle cx="192" cy="26" r="32" fill="#ffe6a0" opacity=".25"/>
        <circle cx="192" cy="26" r="12" fill="#fff3c4"/>
        <path d="M-8 94 L62 22 L142 94 Z" fill="#b97842"/>
        <path d="M62 22 L142 94 L102 94 Z" fill="#7a3e1c" opacity=".55"/>
        <path d="M116 94 L170 50 L228 94 Z" fill="#a86434" opacity=".88"/>
        <path d="M170 50 L228 94 L198 94 Z" fill="#6e3518" opacity=".48"/>
        <path d="M0 94 C34 86 64 100 100 92 C142 84 186 100 240 90 L240 120 L0 120 Z" fill="url(#lga-sand)"/>
        <g>
          <rect x="150" y="58" width="88" height="8" fill="url(#lga-stone)"/>
          <path d="M146 58 L160 50 L232 50 L242 58 Z" fill="#d8b07a"/>
          <g fill="url(#lga-stone)">
            <rect x="156" y="66" width="9" height="38"/>
            <rect x="176" y="66" width="9" height="38"/>
            <rect x="196" y="66" width="9" height="38"/>
            <rect x="216" y="66" width="9" height="38"/>
          </g>
          <g fill="#d8b07a">
            <rect x="152" y="66" width="17" height="5"/><rect x="172" y="66" width="17" height="5"/>
            <rect x="192" y="66" width="17" height="5"/><rect x="212" y="66" width="17" height="5"/>
          </g>
          <rect x="150" y="102" width="88" height="5" fill="#8a5a32"/>
        </g>
        <g>
          <path d="M-8 100 V62 L10 54 L38 62 V100 Z" fill="#a86a3a"/>
          <path d="M-8 62 L10 54 L38 62 L38 68 L10 60 L-8 68 Z" fill="#d8b07a"/>
          <g fill="#4a2a12" opacity=".75"><rect x="2" y="82" width="15" height="18"/></g>
          <g stroke="#c8a15a" stroke-width="1" opacity=".6"><path d="M0 72 H30 M0 78 H30"/></g>
        </g>
        <g>
          <path d="M82 104 V58 L100 50 L118 58 V104 Z" fill="#8a5a32" stroke="#4a2a12" stroke-width="1.5"/>
          <path d="M82 58 L100 50 L118 58 L118 64 L100 56 L82 64 Z" fill="#d8b07a"/>
          <g stroke="#c8a15a" stroke-width="1" opacity=".55"><path d="M88 72 H112 M88 80 H112 M88 88 H112"/></g>
        </g>
        <g fill="#ffe6a0" opacity=".55">
          <circle cx="44" cy="98" r="1.4"/><circle cx="128" cy="102" r="1.2"/><circle cx="214" cy="98" r="1.1"/>
        </g>
      </svg>`;
    }
    return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="120" fill="#1a1013"/></svg>';
  }


  /* ---------------- MAPA DE SPRITES ---------------- */
  const registry = Object.assign({
    v1, v2, gabriel, motor, mao: function () { return mao(); },
  }, INIMIGOS);
  const _reg = {
    husk_gordo: husks.husk_gordo,
    husk_vomito: husks.husk_vomito,
    husk_penitente: husks.husk_penitente,
    husk: husks.husk,
    machine: machines.machine,
    machine_acid: machines.machine_acid,
    machine_heavy: machines.machine_heavy,
    beast, demon, heart,
    angel_small: () => angel('angel_small'),
    angel_watch: () => angel('angel_watch'),
  };

  return {
    get(name, accent) {
      const fn = registry[name] || registry.husk;
      return fn(accent);
    },
    v1, v2, v1Svg, v2Svg, fallbackV1, fallbackV2, gabriel, motor, mao, portrait, arena, layerArt, actArt,
    INIMIGOS,
    armSprite, legSprite, chassisSprite, itemSprite, scrapSprite, coreSprite
  };
})();
