const chroma = require("chroma-js");

const colorMode = 'lab';

function buildTheme({ ...args }) {

  // Config
  const accent1Color = args.accent1Color || 'hsl(120, 88%, 84%)'; // Accent 1
  const accent2Color = args.accent2Color || 'hsl(320, 88%, 80%)'; // Accent 2
  const bgColor      = args.bgColor      || 'hsl(200, 3%, 16%)'; // Background
  const fgSaturate   = args.fgSaturate   || 0.5;
  const fgContrast   = args.fgContrast   || 0.5;
  const bgContrast   = args.bgContrast   || 0.5;

  // Theme type
  const mode = chroma(bgColor).luminance() > 0.5 ? 'light' : 'dark';

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
  const unoColor  = accent1Color; // Accent 1
  const duoColor  = accent2Color; // Accent 2
  const triColor  = fgColor.saturate(fgSaturate * 2); // Main

  const uno = chroma.scale([ unoColor, bgColor ]).padding([fgContrastPadding, 0.4]).mode(colorMode).colors(3);
  const duo = chroma.scale([ duoColor, bgColor ]).padding([fgContrastPadding, 0.4]).mode(colorMode).colors(3);
  const tri = chroma.scale([ fg[0], triColor, bgColor ]).correctLightness().padding([fgContrastPadding, 0.25]).mode(colorMode).colors(5);

  // UI Scale
  const color = {
    'fg1u' : fg[0], // 1 up
    'fg'   : fg[1], // foreground
    'fg1d' : fg[2], // 1 down
    'fg2d' : fg[3], // 2 down

    'bg3u' : bg[0], // 3 up
    'bg2u' : bg[1], // 2 up
    'bg1u' : bg[2], // 1 up
    'bg'   : bg[3], // background
    'bg1d' : bg[4], // 1 down
    'bg2d' : bg[5], // 2 down

    'bd'   : bg[bdScale], // border (6 or 0)
  }

  // Output -------------------------------------------------------------

  return {
    name: args.name,
    type: mode,
    colors: {

      // fg1u
      "tab.activeForeground": color.fg1u,

      // fg
      "foreground": color.fg,
      "titleBar.activeForeground": color.fg,
      "activityBar.foreground": color.fg,
      "input.foreground": color.fg,
      "dropdown.foreground": color.fg,

      // fg1d
      "sideBarSectionHeader.foreground": color.fg1d,
      "statusBar.foreground" : color.fg1d,
      "descriptionForeground": color.fg1d,

      // fg2d
      "sideBar.foreground": color.fg2d,
      "input.placeholderForeground": color.fg2d,
      "activityBar.inactiveForeground": color.fg2d,
      "tab.inactiveForeground": color.fg2d,

      // bg3u

      // bg2u
      "editorIndentGuide.activeBackground": color.bg2u,
      "dropdown.border": color.bg2u,

      // bg1u
      "list.activeSelectionBackground": color.bg1u,
      "editorIndentGuide.background": color.bg1u,
      "input.border": color.bg1u,
      "dropdown.background": color.bg1u,

      // bg
      "titleBar.activeBackground": color.bg,
      "titleBar.inactiveBackground": color.bg,
      "activityBar.background": color.bg,
      "tab.activeBackground": color.bg,
      "tree.indentGuidesStroke": color.bg,
      "list.inactiveSelectionBackground": color.bg,
      "list.hoverBackground": color.bg,
      "statusBar.background": color.bg,
      "editor.background": color.bg,

      // bg1d
      "input.background": color.bg1d,
      "dropdown.listBackground": color.bg1d,

      // bg2d
      "tab.inactiveBackground": color.bg2d,
      "panel.background": color.bg2d,
      "editorGroupHeader.tabsBackground": color.bg2d,
      "sideBar.background": color.bg2d,
      "sideBarSectionHeader.background": color.bg2d,

      // bd
      "titleBar.border": color.bd,
      "activityBar.border": color.bd,
      "tab.border": color.bd,
      "panel.border": color.bd,
      "statusBar.border": color.bd,
      "sideBarSectionHeader.border": color.bd,
      "sideBar.border": color.bd,

      // uno
      "activityBar.activeBorder": uno[0],
      "tab.activeBorderTop": uno[0],

      // duo
      "textLink.foreground": duo[0],

      // tri
      "editor.foreground": tri[0],
      "editorLineNumber.activeForeground"  : tri[1],
      "editorLineNumber.foreground": tri[4],
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: "variable",
        settings: { foreground: uno[0] }
      },
      {
        scope: "string",
        settings: { foreground: duo[0] }
      },
      {
        scope: "keyword",
        settings: { foreground: tri[2] }
      },
      {
        scope: "comment",
        settings: { foreground: tri[4] }
      },
    ],
  };
}

module.exports = buildTheme;
