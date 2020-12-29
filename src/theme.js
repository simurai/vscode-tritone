const chroma = require("chroma-js");

const mode = 'lab';

// 3 accent colors -------------------------------------------------------------

const unoC = 'hsl(212, 88%, 88%)';
const duoC = 'hsl(360, 88%, 77%)';
const triC = 'hsl( 40, 99%, 77%)';

const fgC  = 'hsl(280, 66%, 88%)';
const bgC  = 'hsl(280, 33%, 20%)';

// Chroma -------------------------------------------------------------

const fg = chroma.scale([ 'white', fgC, 'black' ]).mode(mode).colors(9);
const bg = chroma.scale([ 'white', bgC, 'black' ]).mode(mode).colors(9);

const uno = chroma.scale([ unoC, bgC ]).mode(mode).colors(5);
const duo = chroma.scale([ duoC, bgC ]).mode(mode).colors(5);
const tri = chroma.scale([ triC, bgC ]).mode(mode).colors(5);

// Colors -------------------------------------------------------------

const color = {
  'fg'   : fg[3],
  'fgD1' : fg[5],
  'bg'   : bg[5],
  'bgD1' : bg[6],
  'bd'   : bg[8],
}

// Theme -------------------------------------------------------------

function buildTheme({ name }) {
  return {
    name: name,
    colors: {
      foreground           : color.fg,
      descriptionForeground: color.fgD1,

      "titleBar.activeForeground"  : color.fg,
      "titleBar.activeBackground"  : color.bgD1,
      "titleBar.border"            : color.bd,

      "activityBar.foreground"        : color.fg,
      "activityBar.background"        : color.bg,
      "activityBar.border"            : color.bd,

      "sideBar.foreground"             : color.fgD1,
      "sideBar.background"             : color.bgD1,
      "sideBar.border"                 : color.bd,

      "statusBar.foreground"             : color.fgD1,
      "statusBar.background"             : color.bg,
      "statusBar.border"                 : color.bd,

      "editor.foreground"                 : color.fg,
      "editor.background"                 : color.bg,

      "panel.background"             : color.bgD1,
      "panel.border"                 : color.bd,
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: "comment",
        settings: {
          foreground: uno[3],
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: tri[0],
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
          foreground: duo[0],
        },
      },
    ],
  };
}

module.exports = buildTheme;
