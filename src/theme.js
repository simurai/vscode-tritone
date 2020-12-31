const chroma = require("chroma-js");

// Theme ----------------------------------------------------------

// Dark mode
const bgColor      = 'hsl(249, 13%, 19%)'; // Background
// const bgColor      = 'hsl(210, 24%, 15%)'; // Background
// const bgColor      = 'hsl(240, 12%, 16%)'; // Background
// const bgColor      = 'hsl(27, 10%, 18%)'; // Background
// const bgColor      = 'hsl(120, 3%, 17%)'; // Background

const accent1Color = 'hsl(190, 88%, 70%)'; // Accent 1
const accent2Color = 'hsl(159, 99%, 68%)'; // Accent 2

// Light mode
// const bgColor      = 'hsl(200, 100%, 99%)'; // Background white
// const accent1Color = 'hsl(150, 99%, 30%)'; // Accent 1
// const accent2Color = 'hsl(240, 99%, 25%)'; // Accent 2

const fgSaturate = 0.5;
const fgContrast = 0.5;
const bgContrast = 0.5;

// Config ----------------------------------------------------------

const colorMode = 'lab';
const mode = chroma(bgColor).luminance() > 0.5 ? 'light' : 'dark';

// Color modes ----------------------------------------------------------

if (mode == 'light') {
  var modeColor = 'black';
  var bdScale = 6;
  var fgContrastPadding = 0.5 - fgContrast; // Adjust range of the scale
  var fgColor = chroma.mix(bgColor, modeColor, 0.25 + fgContrast).saturate(fgSaturate); // Based on background
  var bgUColor = chroma(bgColor).darken(bgContrast); // darken both directions
  var bgDColor = chroma(bgColor).darken(bgContrast);

} else if (mode == 'dark') {
  var modeColor = 'white';
  var bdScale = bgContrast < 0.4 ? 0 : 6;
  var fgContrastPadding = 0.5 - fgContrast; // Adjust range of the scale
  var fgColor = chroma.mix(bgColor, modeColor, fgContrast).saturate(fgSaturate); // Based on background
  var bgUColor = chroma(bgColor).brighten(bgContrast);
  var bgDColor = chroma(bgColor).darken(bgContrast);
}

// UI

const fg = chroma.scale([ modeColor, fgColor, bgColor ]).padding([0.02 + fgContrastPadding, 0.4]).mode(colorMode).colors(4); // padding cuts off the edges
const bg = chroma.scale([ bgUColor, bgColor, bgDColor ]).mode(colorMode).colors(7);

// Syntax

const unoColor  = fgColor.saturate(fgSaturate * 2); // increased saturation
const duoColor  = accent1Color; // Accent 1
const triColor  = accent2Color; // Accent 2

const uno = chroma.scale([ fg[0], unoColor, bgColor ]).correctLightness().padding([fgContrastPadding, 0.25]).mode(colorMode).colors(5);
const duo = chroma.scale([ duoColor, bgColor ]).padding([fgContrastPadding, 0.4]).mode(colorMode).colors(3);
const tri = chroma.scale([ triColor, bgColor ]).padding([fgContrastPadding, 0.4]).mode(colorMode).colors(3);

// UI Scale -------------------------------------------------------------

const color = {
  'fg1u' : fg[0],
  'fg'   : fg[1],
  'fg1d' : fg[2],
  'fg2d' : fg[3],

  'bg3u' : bg[0],
  'bg2u' : bg[1],
  'bg1u' : bg[2],
  'bg'   : bg[3],
  'bg1d' : bg[4],
  'bg2d' : bg[5],

  'bd'   : bg[bdScale], // 6 or 0
}

// Theme -------------------------------------------------------------

function buildTheme({ name }) {
  return {
    name: name,
    colors: {
      foreground           : color.fg,
      descriptionForeground: color.fg1d,

      "textLink.foreground": duo[0],

      "titleBar.activeForeground"  : color.fg,
      "titleBar.activeBackground"  : color.bg2d,
      "titleBar.border"            : color.bd,

      "activityBar.foreground"        : color.fg,
      "activityBar.inactiveForeground": color.fg2d,
      "activityBar.background"        : color.bg,
      "activityBar.border"            : color.bd,
      "activityBar.activeBorder"      : tri[0],

      "tab.activeForeground": color.fg1u,
      "tab.inactiveForeground": color.fg2d,
      "tab.inactiveBackground": color.bg2d,
      "tab.activeBackground": color.bg,
      "tab.border": color.bd,
      "tab.activeBorderTop": tri[0],
      "editorGroupHeader.tabsBackground": color.bg2d,

      "tree.indentGuidesStroke"         : color.bg,
      "list.inactiveSelectionBackground": color.bg,
      "list.activeSelectionBackground"  : color.bg1u,
      "list.hoverBackground"            : color.bg,

      "sideBar.foreground"             : color.fg2d,
      "sideBar.background"             : color.bg2d,
      "sideBar.border"                 : color.bd,
      "sideBarSectionHeader.foreground": color.fg1d,
      "sideBarSectionHeader.background": color.bg2d,
      "sideBarSectionHeader.border": color.bd,

      "statusBar.foreground"             : color.fg1d,
      "statusBar.background"             : color.bg,
      "statusBar.border"                 : color.bd,

      "editor.foreground"                 : uno[0],
      "editor.background"                 : color.bg,
      "editorLineNumber.foreground"       : uno[4],
      "editorLineNumber.activeForeground" : uno[1],
      "editorIndentGuide.background":       color.bg1u,
      "editorIndentGuide.activeBackground": color.bg2u,

      "panel.background"             : color.bg2d,
      "panel.border"                 : color.bd,

      "dropdown.background"     : color.bg1u,
      "dropdown.border"         : color.bg2u,
      "dropdown.foreground"     : color.fg,
      "dropdown.listBackground" : color.bg1d,

      "input.background"            : color.bg1d,
      "input.border"                : color.bg1u,
      "input.foreground"            : color.fg,
      "input.placeholderForeground" : color.fg2d,
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
