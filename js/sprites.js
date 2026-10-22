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
  const gMinos = { carn: '#3a1442', carn2: '#1a0722', osso: '#c9b8d8', olho: '#ffe9ff', brilho: '#d24cff', sombra: '#12040f' };

  /* casca genérica: máscara branca, corpo magro */
  function casca(c, opt) {
    const o = Object.assign({ h: 1, mask: true, arma: '', cor: c.pele }, opt || {});
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
        <ellipse cx="100" cy="92" rx="${24 * s}" ry="${26 * s}" fill="${c.pele}"/>
        ${o.mask ? `<ellipse cx="100" cy="94" rx="${17 * s}" ry="${20 * s}" fill="${c.mascara}"/>
        <rect x="${100 - 11 * s}" y="89" width="${8 * s}" height="4" fill="#140d10"/>
        <rect x="${100 + 3 * s}" y="89" width="${8 * s}" height="4" fill="#140d10"/>
        <rect x="${100 - 6 * s}" y="102" width="${12 * s}" height="3" fill="#6b3a38"/>` : ''}
        <path d="M${100 - 14 * s} 70 q${14 * s} ${-12 * s} ${28 * s} 0" stroke="${c.sombra}" stroke-width="4" fill="none"/>
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
    })
  };

  /* ---------------- CORPO DE MINOS (gigante) ----------------
     Referência: REF-CORPSE-MINOS-IN-GAME — a cavidade do tórax
     vista do ponto de vista do V1, com o crânio e os dois olhos. */
  function minos() {
    return svg(defs + `
      <defs>
        <radialGradient id="g-cavity" cx=".5" cy=".42" r=".65">
          <stop offset="0" stop-color="#5a1a68"/><stop offset=".45" stop-color="#2a0836"/><stop offset="1" stop-color="#0d0312"/>
        </radialGradient>
        <radialGradient id="g-eyeM" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#ffd6ff"/><stop offset="1" stop-color="#c64cff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="g-rib" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#6a3a78"/><stop offset=".5" stop-color="#3c1848"/><stop offset="1" stop-color="#1d0a26"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="250" rx="96" ry="12" fill="rgba(0,0,0,.55)"/>
      <!-- cavidade do tórax -->
      <path d="M100 24 C160 40 190 110 184 190 C176 236 140 252 100 252 C60 252 24 236 16 190 C10 110 40 40 100 24 Z"
            fill="url(#g-cavity)" stroke="#0d0312" stroke-width="4"/>
      <!-- costelas -->
      <g stroke="url(#g-rib)" stroke-width="13" fill="none" stroke-linecap="round">
        <path d="M40 66 C74 58 126 58 160 66"/>
        <path d="M28 100 C70 90 130 90 172 100"/>
        <path d="M20 138 C68 126 132 126 180 138"/>
        <path d="M18 176 C68 162 132 162 182 176"/>
        <path d="M24 212 C72 198 128 198 176 212"/>
      </g>
      <g stroke="#7d4a8c" stroke-width="3" fill="none" opacity=".55">
        <path d="M40 66 C74 58 126 58 160 66"/><path d="M20 138 C68 126 132 126 180 138"/>
      </g>
      <!-- mãos de dedos cruzados sobre o peito -->
      <g stroke="#4a2058" stroke-width="9" fill="none" stroke-linecap="round">
        <path d="M62 150 q22 12 38 30"/><path d="M138 150 q-22 12 -38 30"/>
        <path d="M74 146 q18 10 26 26"/><path d="M126 146 q-18 10 -26 26"/>
      </g>
      <!-- crânio com a coroa -->
      <g>
        <path d="M78 74 L122 74 L128 100 L120 124 L80 124 L72 100 Z" fill="#241033" stroke="#0d0312" stroke-width="3"/>
        <path d="M80 86 L120 86 L118 94 L82 94 Z" fill="#0a020e"/>
        <ellipse cx="92" cy="90" rx="11" ry="9" fill="url(#g-eyeM)"/>
        <ellipse cx="108" cy="90" rx="11" ry="9" fill="url(#g-eyeM)"/>
        <circle cx="92" cy="90" r="3.4" fill="#fff"/>
        <circle cx="108" cy="90" r="3.4" fill="#fff"/>
        <path d="M88 108 L112 108 L108 118 L92 118 Z" fill="#0a020e"/>
        <path d="M92 108 l2 10 M98 108 l2 10 M104 108 l2 10" stroke="#4a2058" stroke-width="2"/>
        <!-- coroa -->
        <path d="M80 70 L76 40 L88 56 L96 32 L104 56 L116 40 L120 70 Z" fill="#2a1036" stroke="#0d0312" stroke-width="3"/>
        <circle cx="96" cy="30" r="4" fill="#c64cff" opacity=".8"/>
        <circle cx="116" cy="40" r="3" fill="#c64cff" opacity=".6"/>
      </g>
      <!-- brilho geral -->
      <ellipse cx="100" cy="86" rx="52" ry="40" fill="#c64cff" opacity=".10"/>
    `);
  }

  /* ---------------- GABRIEL ---------------- */
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
  function arena(theme) {
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
      return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="240" height="120" fill="#0c1a20"/>' +
        '<g stroke="#2b5a6b" stroke-width="6" fill="none" opacity=".9">' +
        '<path d="M0 20 h60 v26 h44 v-26 h60 v22 h76"/></g>' +
        '<g fill="#16404e">' +
        '<rect x="18" y="52" width="34" height="68"/><rect x="96" y="46" width="30" height="74"/>' +
        '<rect x="168" y="58" width="40" height="62"/></g>' +
        '<g fill="#7fd4e8" opacity=".45"><circle cx="40" cy="34" r="5"/><circle cx="150" cy="30" r="4"/><circle cx="210" cy="44" r="5"/></g>' +
        '<g stroke="#3f7f92" stroke-width="2" opacity=".6"><path d="M0 92 q60 -14 120 0 t120 -4"/></g>' +
        '</svg>';
    }
    if (id === 'lust') {
      return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="240" height="120" fill="#1c0a16"/>' +
        '<g fill="#7a2a5a">' +
        '<path d="M0 120 q18 -50 40 -20 q14 22 30 4 q20 -26 34 6 q16 34 40 2 q22 -30 38 4 q18 30 58 -2 v102 z"/></g>' +
        '<g fill="none" stroke="#e0a0d0" stroke-width="3" opacity=".55">' +
        '<path d="M40 120 q10 -44 30 -12"/><path d="M120 120 q12 -40 30 -10"/><path d="M186 120 q10 -38 28 -10"/></g>' +
        '<g fill="#e0a0d0" opacity=".5"><circle cx="60" cy="24" r="6"/><circle cx="150" cy="18" r="5"/><circle cx="210" cy="34" r="4"/></g>' +
        '</svg>';
    }
    if (id === 'gluttony') {
      return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="240" height="120" fill="#2a0d0a"/>' +
        '<g fill="#7d1f16" opacity=".9">' +
        '<path d="M0 120 q30 -60 60 -20 q20 26 44 6 q26 -22 46 10 q24 38 46 4 q22 -34 44 0 v20 z"/></g>' +
        '<g fill="#c8a15a" opacity=".6"><circle cx="60" cy="30" r="5"/><circle cx="140" cy="22" r="4"/><circle cx="200" cy="36" r="6"/></g>' +
        '<g stroke="#4a1008" stroke-width="5" fill="none"><path d="M18 120 v-40"/><path d="M222 120 v-52"/><path d="M200 68 h40"/></g>' +
        '</svg>';
    }
    return '<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="120" fill="#1a1013"/></svg>';
  }


  /* ---------------- MAPA DE SPRITES ---------------- */
  const registry = Object.assign({
    v1, v2, gabriel, motor, minos: function () { return minos(); },
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
    v1, v2, v1Svg, v2Svg, fallbackV1, fallbackV2, gabriel, motor, minos, portrait, arena, layerArt, actArt,
    INIMIGOS,
    armSprite, legSprite, chassisSprite, itemSprite, scrapSprite, coreSprite
  };
})();
