const chroma = require("chroma-js");

// Theme ----------------------------------------------------------

const mode = 'dark';
const saturation = 0.6;
const contrast = 0.6;
const hue = 220;
const hueRotate = 60;

// Config ----------------------------------------------------------

const colorMode = 'lab';

// Colors ----------------------------------------------------------

const hue1 = hue;
const hue2 = hue1 + hueRotate;
const hue3 = hue2 + hueRotate;

const unoColor  = chroma.hsl(hue1, 0.7, 0.7); // Syntax 1
const duoColor  = chroma.hsl(hue2, 0.7, 0.7); // Syntax 2
const triColor  = chroma.hsl(hue3, 0.7, 0.7); // Syntax 3 + accent color

// UI -------------------------------------------------------------


const scale = chroma.scale([ 'white', unoColor, 'black' ]).padding([0.05, 0.05]).mode(colorMode).colors(6);
const bg = chroma.scale([  scale[4], scale[5] ]).mode(colorMode).colors(7);
const fg = chroma.scale([ scale[0], bg[3] ]).mode(colorMode).colors(6);

const color = {
  'fgU1' : fg[0],
  'fg'   : fg[1],
  'fgD1' : fg[2],
  'fgD2' : fg[3],

  'bgU3' : bg[0],
  'bgU2' : bg[1],
  'bgU1' : bg[2],
  'bg'   : bg[3],
  'bgD1' : bg[4],
  'bgD2' : bg[5],

  'bd'   : bg[6],
}

// Syntax -------------------------------------------------------------

const uno = chroma.scale([ fg[0], bg[3] ]).mode(colorMode).colors(5);
const duo = chroma.scale([ duoColor, bg[3] ]).mode(colorMode).colors(5);
const tri = chroma.scale([ triColor, bg[3] ]).mode(colorMode).colors(5);

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

      "tab.activeForeground": color.fg,
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
      "editorLineNumber.foreground"       : color.fgD2,
      "editorLineNumber.activeForeground" : color.fg,
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
          foreground: uno[2],
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
          foreground: uno[1],
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
