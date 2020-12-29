const chroma = require("chroma-js");

// 3 accent colors -------------------------------------------------------------

const unoC = 'hsl(212, 66%, 70%)';
const duoC = 'hsl(160, 88%, 66%)';
const triC = 'hsl(120, 99%, 77%)';
const bgC  = 'hsl(240, 20%, 20%)';

// UI -------------------------------------------------------------

const bg = chroma(bgC);
const bgD1 = chroma(bg).darken(0.15);

const fg = chroma.mix('white', bg, 0.2);
const fgD1 = chroma.mix(fg, bg, 0.2);
const fgD2 = chroma.mix(fg, bg, 0.4);

const bd = chroma.mix(bg, 'black', 0.5);

// Syntax -------------------------------------------------------------

const uno = chroma.scale([ fg, unoC, bg ]).mode('lch').colors(5);
const duo = chroma.scale([ duoC, bg ]).mode('lch').colors(3);
const tri = chroma.scale([ triC, bg ]).mode('lch').colors(3);

// Theme -------------------------------------------------------------

function buildTheme({ name }) {
  return {
    name: name,
    colors: {
      foreground           : fg.hex(),
      descriptionForeground: fgD1.hex(),

      "titleBar.activeForeground"  : fg.hex(),
      "titleBar.activeBackground"  : bgD1.hex(),
      "titleBar.border"            : bd.hex(),

      "activityBar.foreground"        : fg.hex(),
      "activityBar.background"        : bg.hex(),
      "activityBar.border"            : bd.hex(),

      "sideBar.foreground"             : fgD1.hex(),
      "sideBar.background"             : bgD1.hex(),
      "sideBar.border"                 : bd.hex(),

      "statusBar.foreground"             : fgD1.hex(),
      "statusBar.background"             : bg.hex(),
      "statusBar.border"                 : bd.hex(),

      "editor.foreground"                 : uno[0],
      "editor.background"                 : bg.hex(),

      "panel.background"             : bgD1.hex(),
      "panel.border"                 : bd.hex(),
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: "comment",
        settings: {
          foreground: uno[4],
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: duo[0],
        },
      },
      {
        scope: "keyword",
        settings: {
          foreground: uno[2],
        },
      },
      {
        scope: "string",
        settings: {
          foreground: tri[0],
        },
      },
    ],
  };
}

module.exports = buildTheme;
