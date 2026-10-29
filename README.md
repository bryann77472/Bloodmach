# BLOODMACH — Infinity Hyperdeath // Imperfect Hatred

Jogo de **batalhas por turnos** em HTML + CSS + JavaScript puro.
Inspirado em **Ultrakill** (parry, sangue, estilo, violência mecânica) e na
estrutura de batalhas de **Pokémon** (menu de 4 movimentos, HP, itens, níveis).

**Sem armas. Sem build. Sem dependências.** Abra o `index.html` e jogue.

---

## Como jogar

Abra `index.html` no navegador (duplo clique). Funciona em `file://`, sem servidor,
sem instalar nada. O progresso é salvo em `localStorage` automaticamente.

### Controles
| Ação | Tecla |
|---|---|
| Movimentos 1–4 | `1` `2` `3` `4` |
| Parry | `Espaço` (ou clique na barra) |
| Avançar diálogo | `Espaço` / `Enter` / clique |
| Voltar | `Esc` |

---

## O que tem no jogo

### Campanha
A **Oficina** tem **Atos** (coluna esquerda, acima das camadas). Cada ato tem um card
com **número, status, nome, arte, descrição e botão de entrada** — igual aos cards de
camada. O **Ato I — Infinity Hyperdeath** está liberado. O **Ato II — Imperfect
Hatred** abre depois que as **3 camadas do Ato I** forem concluídas; o Ato III mostra
*WORK IN PROGRESS*. O Ato II tem **3 camadas jogáveis: Greed, Wrath e Heresy**.

**Ato I** tem **3 camadas**, com **6 inimigos + 1 chefe** cada:

| Camada | Ambiente | Modificador | Chefe |
|---|---|---|---|
| **1. Limbo** | Vale ensolarado: céu azul, montanhas, árvores, grama e água (anoitece contra o V2) | *Maré Morta* — dano recebido +10% | **V2** (ele **foge**) |
| **2. Lust** | Metrópole neon de arranha-céus, com plataforma suspensa sobre o vazio | *Luxúria* — inimigos golpeiam 18% mais forte | **A Mão do Rei Minos** (gigante) |
| **3. Gluttony** | Estômago de carne exposta, pequenas poças de ácido e bile | *Digestão Ácida* — toda cura 30% menor | **Gabriel** |

**Ato II — Imperfect Hatred** tem **3 camadas**:

| Camada | Ambiente | Modificador | Chefe |
|---|---|---|---|
| **1. Greed** | Deserto incandescente com pirâmides colossais, templos egípcios e colunatas greco-romanas | *Sol Impiedoso* — dano recebido +15% | **V2 — Ascensão** (não foge: **morre**) |
| **2. Wrath** | Mar escuro sob tempestade, pontes de ferro, torres góticas afogadas e cascos de navios | *Maré de Ferro* — dano recebido +12% | **Ferryman** (arena no convés de um navio) |
| **3. Heresy** | Cidade de Dis: catedrais em ruínas, sepulcros de ferro incandescente e abismos de lava e sangue | *Fogo Eterno* — ataque dos inimigos +20% | **Gabriel — Heresia** (mais forte que o do Ato I) |

Cada camada é mais dura que a anterior: inimigos com **mais HP e mais ATQ** (a base de
escala junto com o seu nível). **A camada só abre quando a anterior do mesmo ato é
concluída** — finishar Limbo abre Lust, finishar Lust abre Gluttony. **O Ato II só
abre depois que as 3 camadas do Ato I forem concluídas**; Greed, Wrath e Heresy foram
balanceadas para o **nível 20**.

**Cenários** — cada camada tem arte vetorial própria, usada na arena de batalha, no
mapa da camada e no card da Oficina:
- **Limbo — O Vale Ensolarado:** céu azul de verão com sol alto e nuvens, montanhas
  colossais com neve no topo, árvores, grama verdejante e um lago cercado de grama —
  os lutadores ficam sempre em terra firme. **Contra o V2 a camada anoitece**: lua,
  estrelas, vaga-lumes e o reflexo da lua na água.
- **Lust — A Metrópole Desejada:** céu roxo neon com uma paleta intensa de roxos e
  magentas, arranha-céus colossais, complexos habitacionais modernos, passarelas
  metálicas e andaimes suspensos no vazio — a camada mais tecnológica. A luta acontece
  sobre uma **plataforma industrial suspensa**, com deck de metal, guarda-corpo,
  cabos e faixas de perigo.
- **Gluttony — O Estômago do Mundo:** paredes, teto e chão de músculo vermelho exposto,
  apenas **algumas poças pequenas de ácido**, tudo iluminado fracamente pelo brilho
  amarelado da bile. **Contra o Gabriel não há ácido algum** no cenário.
- **Greed — O Deserto dos Reis:** céu incandescente, sol colossal, pirâmides gigantes,
  templo egípcio, obelisco, estátua quebrada, colunata greco-romana e dunas de areia.
  A luta acontece num terraço de arenito, com o deserto ao fundo.
- **Wrath — O Mar dos Afogados:** água escura e cinzenta, céu de tempestade cortado por
  relâmpagos, pontes de ferro, torres góticas submersas e cascos de navios abandonados.
  Contra o **Ferryman**, a arena vira o **convés de um navio**, com mastro, cordas e
  lanterna.
- **Heresy — A Cidade de Dis:** catedrais góticas em ruínas, sepulcros de ferro
  incandescente, brasas no ar e abismos de lava e sangue fervente. A paleta é dominada
  por **vermelho-sangue, carvão e amarelo-fogo**.
- Modificadores de camada: *Maré Morta* (dano +10%), *Luxúria* (inimigos +18% ATQ),
  *Digestão Ácida* (cura −30%), *Sol Impiedoso* (dano recebido +15%), *Maré de Ferro*
  (dano recebido +12%) e *Fogo Eterno* (inimigos +20% ATQ).
- **V2** é o chefe de Limbo: copia seus 2 braços e seus 4 movimentos, usa parry… e **foge**
  quando é derrotado — a fuga conta como derrota, conclui a camada e libera o **Whiplash**.
- **V2 — Ascensão** é o chefe de Greed: uma versão **mais forte**, dourada, com mais HP,
  cópias do seu arsenal e a técnica inevitável `ASCENSÃO`. **Ele não foge**: quando cai,
  a camada termina e uma cutscene mostra o corpo desligando no deserto.
- **Ferryman** é o chefe de Wrath: um barqueiro gigante com remo, lanterna e correntes
  de almas, enfrentado no convés de um navio. Ele usa a inevitável `SENTENÇA DO
  BARQUEIRO`; ao cair, o navio afunda e as águas se aquietam.
- **Gabriel — Heresia** é o chefe de Heresy: a versão mais forte do anjo, com **1400 de
  HP**, mais ataque e defesa que o Gabriel de Gluttony, asas de brasa e a inevitável
  `SENTENÇA FINAL`. O nó do chefe abre o **portão de Dis**; ele só se abre **quando
  você clica nele**. Depois, uma tela preta mostra as falas de Gabriel antes da luta.
- **Morte de Gabriel em Heresy:** depois da vitória, uma cutscene mostra o anjo
  queimando e desintegrando. As falas da cutscene avançam com **clique ou Espaço**.
  Em seguida, a tela preta mostra as últimas palavras e só então aparece o resultado
  da camada. A **música de desligamento continua tocando na tela de rank** de Heresy,
  sem trocar para a música de chefe da fase.
- **A Mão do Rei Minos** é o chefe de Lust: uma mão colossal de pedra e carne que
  entra pela direita da tela, aberta, com os dedos apontando para V1. Ela tem veios
  violetas, placas de pedra, um anel de pedra e arame farpado no pulso.
- O painel de vida do chefe fica no mesmo lugar do painel de qualquer inimigo — à
  esquerda do lutador —, mas acima da camada da mão. O sprite gigante não empurra
  nem reposiciona a caixa de vida.
- Quando a mão é derrotada, uma cutscene mostra a pedra rachando, o brilho violeta
  tomando conta dela e a mão se desintegrando em cacos e pó antes do diálogo final.
- **Cutscene só dos chefes**: antes de encarar um chefe, ele aparece em tela cheia com
  o nome e a facção (sem falar, como no original) e a luta começa quando você clica.
  Os **inimigos comuns entram direto na luta**, sem cutscene.
- Chefe final de Gluttony: **Gabriel** — 2 fases, com `SENTENÇA` inevitável.
- Depois de derrotá-lo, **Gabriel sangra**, **foge** em brasa e só então aparece a tela de desligamento do V1.
- **Morte de V2 em Greed:** a luta não tem fuga. Depois do resultado da camada, uma
  cutscene mostra V2 desligando no deserto, o núcleo sendo recuperado e o **Hellwhip**
  e as **peças de Fibra** liberados para compra na loja.
- **Dentro da camada não há saída**: ao entrar, só se avança para o próximo inimigo.
  A saída e a troca de loadout só existem na **Oficina**, antes de começar.
- **Sem checkpoint.** Se o V1 morre, tem uma cutscene dele **desligando e caindo**
  (com a música *power off v1*), depois **GAME OVER**: a camada recomeça do primeiro inimigo
  e todos precisam cair de novo. Só o **Kit de Reparto** (item) salva: revive o V1 com 30%
  de HP e a luta continua.
- **Cortar a camada:** o botão **DESISTIR** no mapa abre uma confirmação. Os recursos
  coletados na camada são perdidos e o V1 volta à oficina com a mesma quantidade de
  Sucata e XP que tinha antes de entrar.
- **Recursos só entram na mochila ao concluir a camada.** Durante a camada, a Sucata e a
  XP ficam **acumuladas** (aparecem na tela de resultado de cada luta). Se você morrer ou
  desistir, tudo se perde; se terminar a camada, o total é entregue com o rank.
- **Final:** depois de Gabriel, V1 pode **se desligar**. Um final escolhido, não uma fuga.

### Dificuldade e saves
Cada dificuldade tem o **seu próprio save** (Lenient, Standard e Violent são três
progressos independentes). Ao clicar em **Jogar** na tela de título você escolhe em
qual dos três quer jogar — o cartão mostra se já existe save e até onde você chegou.

| Dificuldade | Vida dos inimigos | Ataque | Janela do parry | Dano no V1 | Sucata |
|---|---|---|---|---|---|
| **Lenient** (fácil) | ×0,78 | ×0,72 | 1500 ms | ×0,80 | ×0,9 |
| **Standard** (normal) | ×1,00 | ×1,00 | 1050 ms | ×1,00 | ×1,0 |
| **Violent** (difícil) | ×1,35 | ×1,28 | 820 ms | ×1,22 | ×1,4 |

Além da vida e do dano, os inimigos ficam **mais imprecisos no Lenient** e mais
certeiros no Violent. O **Lenient dá 1 núcleo por camada concluída**; Standard e
Violent dão **2 núcleos**.

### Rank da camada
No fim de cada camada o jogo avalia três categorias:

| Categoria | S |
|---|---|
| **Tempo** | dentro do alvo da camada (540s / 600s / 660s / 720s / 780s / 840s) |
| **Vida perdida** | até 10% do HP máximo |
| **Estilo** | 320+ pontos |

O rank final é **o pior** entre os três (D → C → B → A → S).
Se **os três forem S**, o resultado é **P (perfeito)** e você ganha um bônus de
Sucata e um Núcleo.

### Combate
- **4 movimentos** por batalha. Sem PP — cada técnica tem **recarga em turnos**.
- Você equipa **2 braços** (8 movimentos) e escolhe **4**. Se vierem de braços
  diferentes, você está usando **4 braços** e ganha as passivas de cada um.
- **Sangue = cura**: técnicas marcadas `+X% SANGUE` curam quando acertam.
- **Parry** (só com o Feedbacker equipado): uma **circunferência aparece em um ponto
  aleatório da tela** e encolhe até o fim da janela. Você só para o golpe **clicando
  dentro do círculo** — não existe mais barra nem tecla espaço. Só existe **uma
  circunferência ativa por vez**, mesmo que dois golpes sejam resolvidos juntos.
  O anel fica **verde** na zona perfeita (anula, reflete, atordoa) e **amarelo** na
  zona boa (metade do dano). As duas zonas são **pequenas**: o verde é só os últimos
  12% da janela e o amarelo os 24% anteriores.
  **Duas falhas seguidas** (o círculo fecha sem você clicar) **perdem o parry**: o
  Feedbacker quebra pelo resto da luta, o golpe seguinte entra 30% mais fundo e a
  falha é contada como **erro de parry**.
- **Reflexo 50%** contra ataques **imparáveis**, ajustado pelo **peso total**
  (pernas + carcaça): leve 70% → médio 50% → pesado 30%.
- **Distância** Perto / Médio / Longe muda dano de corpo a corpo e de projétil.
- **Estilo** D → SSS durante a luta.
- Status: Sangramento, Derretido, Ferrugem, Coágulo, Atordoado, Exposto, Postura.

**Sem hit-kill:** nenhum movimento pode tirar mais de 45% (chefe) ou 60% (comum)
do HP máximo do alvo, o multiplicador ATQ/DEF é limitado e o HP dos inimigos
escala com o seu nível. Nível 20 não mata o Gabriel em um golpe.

**Ritmo de luta:** o dano do V1 é escalado para baixo e o dos inimigos para cima, e os
inimigos ajustam HP e ATQ junto com o seu nível. Uma luta comum dura **6 a 14 turnos**
e um chefe **12 a 18**. Uma camada inteira (6 inimigos + chefe) leva cerca de
**10 minutos** de jogo.

### Elenco (36 inimigos + 6 chefes, sprites próprios)
Baseado nos inimigos **originais de Ultrakill** — os que não existem no jogo foram
removidos (Vulture, Crawler, Glutton, Bloated Husk, Glutton Arm, Plagueborn).
- **Limbo**: Husk, Stray, Wretch, Caged Thing, **Drone**, **Ceremoniar**
- **Lust**: Enthusiast, Corporal, Journeyman, Husk Fanatic, Lustful Husk, **Ceremoniar II**
- **Gluttony**: Soothsayer, Filet Machine, **Big John**, **Tallow Golem**, **Drone II**, **Ceremoniar III**
- **Greed**: Chacal de Anúbis, Múmia Real, Legionário de Bronze, Esfinge de Ouro,
  Colosso de Marfim, Escaravelho Solar
- **Wrath**: Afogado, Gárgula de Ferro, Barqueiro Menor, Noiva Afogada, Tempestade Viva,
  Corsário Morto
- **Heresy**: Herege, Fornalha Viva, Serpente de Lava, Carrasco de Dis, Alma Queimada,
  Cavaleiro de Ferro
- **Chefes**: V2 (Limbo), A Mão do Rei Minos (Lust), Gabriel (Gluttony), V2 — Ascensão
  (Greed), Ferryman (Wrath), Gabriel — Heresia (Heresy)
- **Nenhum inimigo se cura** — não existe golpe de cura no elenco, e o modificador de
  cura da Lust foi trocado por um de ataque.

### Música
São **duas trilhas de camada** que se revezam entre as camadas e duas de chefe:

| Camada | Trilha | Chefe |
|---|---|---|
| **1. Limbo** | music 1 | music 1 boss |
| **2. Lust** | music 2 | music 2 boss |
| **3. Gluttony** | music 1 | music 1 boss |
| **4. Greed** | music 2 | music 2 boss |
| **5. Wrath** | music 1 | music 1 boss |
| **6. Heresy** | music 2 | music 2 boss |

A regra é a alternância por número da camada: ímpar → *music 1*, par → *music 2*.
No nó de **Gabriel — Heresia**, a música para no clique; o portão de Dis e o diálogo
em tela preta ficam em silêncio, e a faixa de chefe só começa quando a batalha começa.
A **loja** e a tela de **ajustar movimentos** usam a mesma faixa (sem reiniciar a música
ao trocar de uma para a outra).

| Arquivo | Uso |
|---|---|
| `assets/music/music-1.mp3` | camadas ímpares |
| `assets/music/music-1-boss.mp3` | chefes das camadas ímpares |
| `assets/music/music-2.mp3` | camadas pares |
| `assets/music/music-2-boss.mp3` | chefes das camadas pares |
| `assets/music/lobby-title.mp3` | título e oficina |
| `assets/music/shop.mp3` | loja e ajuste de movimentos |
| `assets/music/power-off-v1.mp3` | desligamento do V1 (final e toda morte) |

O volume da música fica em *Opções*. Se um arquivo faltar, o jogo continua
funcionando com o ambiente sintetizado. As faixas são **mono 48 kbps** para o
repositório não pesar (8 MB no total).

---

### Equipamento e desbloqueios
O V1 começa com o **Feedbacker** e o **Knuckleblaster** (grátis) e já entra em campo com
**3 golpes do Feedbacker + 1 do Knuckleblaster**. O resto do hardware é liberado pelo
progresso e depois **comprado na loja**:

| Peça | Cor | Preço | Liberada quando |
|---|---|---|---|
| **Feedbacker** | Azul | — | já vem com o V1 |
| **Knuckleblaster** | Vermelho | — | **livre**: já vem com o V1 |
| **Whiplash** | Verde | 400 ◆ | **derrotar o V2** (Limbo) |
| **Bloodreaver** | Carmim | 600 ◆ | **derrotar o Gabriel** (Gluttony) |
| **Hellwhip** | Laranja | 600 ◆ | **derrotar V2 — Ascensão** (Greed) |
| **Thunderfist** | Amarelo | 450 ◆ | **derrotar Gabriel — Heresia** (Heresy) |
| **Venomclaw** | Verde | 500 ◆ | camada 2 — *em desenvolvimento* |
| **Soulreaver** | Branco | 550 ◆ | camada 2 — *em desenvolvimento* |
| **Voidgrip** | Preto | 700 ◆ | camada 2 — *em desenvolvimento* |
| **Gravityhook** | Roxo | 600 ◆ | camada 2 — *em desenvolvimento* |
| **Pernas de Ignição** | — | 300 ◆ | **derrotar o V2** (Limbo, Ato I) |
| **Carcaça de Forja** | — | 350 ◆ | **derrotar o V2** (Limbo, Ato I) |
| **Pernas de Fibra** | — | 250 ◆ | **derrotar V2 — Ascensão** (Greed, Ato II) |
| **Carcaça de Fibra** | — | 250 ◆ | **derrotar V2 — Ascensão** (Greed, Ato II) |
| **Pernas Shadow Step** | Branca | 300 ◆ | **derrotar Gabriel — Heresia** (Heresy) |
| **Pernas Berserk Springs** | Verde | 300 ◆ | camada 2 — *em desenvolvimento* |
| **Carcaça Titan Husk** | Cinza | 400 ◆ | camada 2 — *em desenvolvimento* |
| **Carcaça Bloodforge** | Vermelha | 400 ◆ | **derrotar Gabriel — Heresia** (Heresy) |

As peças listadas como *camada 2* (Venomclaw, Soulreaver, Voidgrip, Gravityhook,
Berserk Springs e Titan Husk) ficam **bloqueadas e impossíveis de usar** enquanto a
camada 2 não existir. O conteúdo delas já está pronto no jogo (movimentos, passivas e
sprites) e entra assim que a camada for liberada. **Thunderfist**, **Pernas Shadow
Step** e **Carcaça Bloodforge** saíram dessa lista: agora são liberados ao derrotar
**Gabriel — Heresia** em Heresy. O **Hellwhip** é liberado ao derrotar **V2 —
Ascensão** em Greed. As **Pernas de Fibra** e a **Carcaça de Fibra** também exigem o
**V2 — Ascensão**.

**As novas peças, quando liberadas:**

| Peça | O que faz |
|---|---|
| **Thunderfist** | Golpes que **paralisam** o alvo (1 a 2 turnos); 20% de chance extra por golpe |
| **Venomclaw** | Golpes que **envenenam** (4% do HP por turno); +1 turno extra de veneno |
| **Soulreaver** | Cada golpe acumulado reduz em até **20%** o dano que o inimigo causa |
| **Voidgrip** | **Não causa dano**: cancela o ataque do inimigo e cura (12% a 25% do HP) |
| **Gravityhook** | **Puxa e paralisa** (2 turnos) — mas o inimigo volta batendo **30% mais forte** |
| **Pernas Shadow Step** | Peso +1: depois de **esquivar**, o próximo golpe causa **50% menos dano** |
| **Pernas Berserk Springs** | Quanto menos vida, mais velocidade e esquiva (até **+40%**) |
| **Carcaça Titan Husk** | Vida 150%, vel 70%, peso +2: quanto menos vida, mais resistência (até **30%**) |
| **Carcaça Bloodforge** | Vida 120%, vel 90%, peso +1: regenera **20% da vida** a cada 3 turnos |

**Pernas** (1 slot): *de Serviço* (média, tem **Dash**) · *de Ignição* (pesada, tem
**Arranque Explosivo**) · *de Fibra* (leve, veloz, +esquiva/fuga, sem habilidade).

**Carcaças** (1 slot): *V1* (equilibrada) · *de Fibra* (vida baixa, rápida) ·
*de Forja* (vida alta, lenta).

### Loja e itens
- No **título**, logo abaixo do botão **Jogar**.
- No **lobby/Oficina**, num terminal, antes de entrar na camada.
- Vende braços, pernas, carcaças e consumíveis, com **Sucata** e **Núcleos**.
  O saldo da carteira é atualizado a cada compra.
- A tela de **ajustar movimentos** tem botão para **abrir a loja** e **voltar à
  oficina** — e usa a mesma trilha da loja (trocar entre as duas não reinicia a música).

**Consumíveis iniciais** (disponíveis desde o começo): *Bolsa de Sangue* e
*Adrenalina*. *Moeda*, *Bomba* e *Kit de Reparo* exigem **nível**.

**10 itens novos**:

| Item | Preço | Efeito |
|---|---|---|
| **Sangue Frio** | 3 ✷ | Cura 55% do HP e o próximo golpe bate 50% mais forte |
| **Adrenalina Forte** | 2 ✷ | Limpa os status e os próximos 2 golpes batem 50% mais forte |
| **Carvão Vivo** | 2 ✷ | Aplica Derretido por 4 turnos |
| **Estilhaço Sangrento** | 4 ✷ | 150 de dano ignorando DEF + Sangramento |
| **Reator de Emergência** | 3 ✷ | Revive com 60% do HP e limpa os status |
| **Bolsa Fria** | 150 ◆ | Cura 12% do HP por turno durante 3 turnos |
| **Moeda Gasta** | 140 ◆ | Crítico garantido com +30% de dano |
| **Bomba Fundida** | 220 ◆ | 120 de dano ignorando DEF + Sangramento |
| **Tônico de Combustão** | 260 ◆ | +30% de ATQ por 3 turnos |
| **Kit Avançado** | 300 ◆ | Revive com 50% do HP e foco no próximo golpe |

Os itens de **núcleo** (✷) só podem ser comprados com os núcleos ganhos ao concluir
uma camada — e ainda exigem nível mínimo.

## Estrutura

```
index.html
assets/
  music/      → faixas .mp3
  sprites/    → v1.webp / v2.webp (referência da arte original)
css/    base.css  title.css  battle.css  shop.css
js/     data.js     braços, pernas, carcaças, itens, inimigos, camadas, história, rank
        sprites.js  V1/V2 (arte real) + inimigos e cenários vetoriais
        audio.js    efeitos WebAudio + música MP3 com crossfade
        save.js     saves por dificuldade, inventário, progressão e preferências
        battle.js   combate, parry, reflexo, esquiva, itens e IA inimiga
        ui.js       todas as telas
        main.js     fluxo do jogo
```

Todo o jogo é **vetorial**: V1, V2, Gabriel, inimigos, cenários e os itens da
loja são desenhados em SVG no mesmo estilo (os PNGs do V1/V2 serviram de
referência para a recriação). O **V2 é o V1 em laranja-vermelho**, com o mesmo
desenho e cores trocadas. A loja tem sprite próprio para cada braço, perna,
carcaça, consumível, sucata e núcleo. Todo o som é sintetizado ou tocado de
arquivos MP3. Nenhuma dependência, nenhum build.

---

## Notas

- Projeto de fã. V1, V2, Gabriel e as camadas vêm de *Ultrakill* (Arsenic Games).
  Sem fins lucrativos.
- Dificuldade, volume, tremor de tela e **assistência de parry** ficam em *Opções*.
- O save é apagado com o botão *Apagar Save* no lobby.
