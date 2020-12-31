const chroma = require("chroma-js");

// Theme ----------------------------------------------------------

const bgColor      = 'hsl(210, 24%, 15%)'; // Background
const accent1Color = 'hsl(190, 88%, 70%)'; // Accent 1
const accent2Color = 'hsl(159, 99%, 68%)'; // Accent 2

const bgContrast = 0.5;

// Config ----------------------------------------------------------

const colorMode = 'lab';

// UI -------------------------------------------------------------

const bgUColor = chroma(bgColor).brighten(bgContrast);
const bgDColor = chroma(bgColor).darken(bgContrast);

const fg = chroma.scale([ 'white', bgColor ]).padding([0.01, 0.4]).mode(colorMode).colors(4); // padding cuts off the edges
const bg = chroma.scale([ bgUColor, bgColor, bgDColor ]).mode(colorMode).colors(7);

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

const unoColor  = chroma(fg[2]).saturate(.8); // Based on background
const duoColor  = accent1Color; // Accent 1
const triColor  = accent2Color; // Accent 2

const uno = chroma.scale([ fg[0], unoColor, bgColor ]).correctLightness().padding([0, 0.25]).mode(colorMode).colors(5);
const duo = chroma.scale([ duoColor, bgColor ]).padding([0, 0.4]).mode(colorMode).colors(3);
const tri = chroma.scale([ triColor, bgColor ]).padding([0, 0.4]).mode(colorMode).colors(3);

// Theme -------------------------------------------------------------

function buildTheme({ name }) {
  return {
    name: name,
    colors: {
      foreground           : color.fg,
      descriptionForeground: color.fgD1,

      "textLink.foreground": duo[0],

      "titleBar.activeForeground"  : color.fg,
      "titleBar.activeBackground"  : color.bgD2,
      "titleBar.border"            : color.bd,

      "activityBar.foreground"        : color.fg,
      "activityBar.inactiveForeground": color.fgD2,
      "activityBar.background"        : color.bg,
      "activityBar.border"            : color.bd,
      "activityBar.activeBorder"      : tri[0],

      "tab.activeForeground": color.fgU1,
      "tab.inactiveForeground": color.fgD2,
      "tab.inactiveBackground": color.bgD2,
      "tab.activeBackground": color.bg,
      "tab.border": color.bd,
      "tab.activeBorderTop": tri[0],
      "editorGroupHeader.tabsBackground": color.bgD2,

      "tree.indentGuidesStroke"         : color.bg,
      "list.inactiveSelectionBackground": color.bg,
      "list.activeSelectionBackground"  : color.bgU1,
      "list.hoverBackground"            : color.bg,

      "sideBar.foreground"             : color.fgD2,
      "sideBar.background"             : color.bgD2,
      "sideBar.border"                 : color.bd,
      "sideBarSectionHeader.foreground": color.fgD1,
      "sideBarSectionHeader.background": color.bgD2,
      "sideBarSectionHeader.border": color.bd,

      "statusBar.foreground"             : color.fgD1,
      "statusBar.background"             : color.bg,
      "statusBar.border"                 : color.bd,

      "editor.foreground"                 : uno[0],
      "editor.background"                 : color.bg,
      "editorLineNumber.foreground"       : uno[4],
      "editorLineNumber.activeForeground" : uno[1],
      "editorIndentGuide.background":       color.bgU1,
      "editorIndentGuide.activeBackground": color.bgU2,

      "panel.background"             : color.bgD2,
      "panel.border"                 : color.bd,

      "dropdown.background"     : color.bgU1,
      "dropdown.border"         : color.bgU2,
      "dropdown.foreground"     : color.fg,
      "dropdown.listBackground" : color.bgD1,

      "input.background"            : color.bgD1,
      "input.border"                : color.bgU1,
      "input.foreground"            : color.fg,
      "input.placeholderForeground" : color.fgD2,
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
