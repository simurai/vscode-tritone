const chroma = require("chroma-js");


// Config ----------------------------------------------------------

const colorMode = 'lab';

// Theme ----------------------------------------------------------

const mode = 'dark';

const monoColor = 'hsl(290, 44%, 60%)';
const unoColor  = 'hsl(320, 99%, 88%)';
const duoColor  = 'hsl(120, 88%, 66%)';
const triColor  = 'hsl( 50, 99%, 66%)';

// UI -------------------------------------------------------------

const fg = chroma.scale([ 'white', monoColor, ]).mode(colorMode).colors(9);
const bg = chroma.scale([  monoColor, 'black' ]).mode(colorMode).colors(9);

const color = {
  'fg'   : fg[2],
  'fgD1' : fg[4],
  'fgD2' : fg[6],

  'bgU2' : bg[4],
  'bgU1' : bg[5],
  'bg'   : bg[6],
  'bgD1' : bg[7],

  'bd'   : bg[8],
}

// Syntax -------------------------------------------------------------

const uno = chroma.scale([ unoColor, bg[4] ]).mode(colorMode).colors(5);
const duo = chroma.scale([ duoColor, bg[4] ]).mode(colorMode).colors(5);
const tri = chroma.scale([ triColor, bg[4] ]).mode(colorMode).colors(5);

// Theme -------------------------------------------------------------

function buildTheme({ name }) {
  return {
    name: name,
    colors: {
      foreground           : color.fg,
      descriptionForeground: color.fgD1,

      "textLink.foreground": duo[0],

      "titleBar.activeForeground"  : color.fg,
      "titleBar.activeBackground"  : color.bgD1,
      "titleBar.border"            : color.bd,

      "activityBar.foreground"        : color.fg,
      "activityBar.inactiveForeground": color.fgD2,
      "activityBar.background"        : color.bg,
      "activityBar.border"            : color.bd,
      "activityBar.activeBorder"      : tri[0],

      "tab.activeForeground": color.fgD1,
      "tab.inactiveForeground": color.fgD2,
      "tab.inactiveBackground": color.bgD1,
      "tab.activeBackground": color.bg,
      "tab.border": color.bd,
      "tab.activeBorderTop": tri[0],
      "editorGroupHeader.tabsBackground": color.bgD1,

      "tree.indentGuidesStroke"         : color.bgU1,
      "list.inactiveSelectionBackground": color.bgU1,
      "list.activeSelectionBackground"  : color.bgU2,
      "list.hoverBackground"            : color.bgU1,

      "sideBar.foreground"             : color.fgD1,
      "sideBar.background"             : color.bgD1,
      "sideBar.border"                 : color.bd,
      "sideBarSectionHeader.background": color.bgD1,
      "sideBarSectionHeader.border": color.bd,

      "statusBar.foreground"             : color.fgD1,
      "statusBar.background"             : color.bg,
      "statusBar.border"                 : color.bd,

      "editor.foreground"                 : uno[0],
      "editor.background"                 : color.bg,
      "editorIndentGuide.background":       color.bgU1,
      "editorIndentGuide.activeBackground": color.bgU2,

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
