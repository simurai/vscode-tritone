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
      "activityBar.activeBorder": uno[0],
      "activityBar.background": color.bg,
      "activityBar.border": color.bd,
      "activityBar.foreground": color.fg,
      "activityBar.inactiveForeground": color.fg2d,
      "activityBarBadge.foreground": color.bg,
      "activityBarBadge.background": uno[0],

      "badge.foreground": color.bg,
      "badge.background": uno[0],

      "button.background": duo[2],
      "button.foreground": color.fg1u,
      "button.hoverBackground": chroma(duo[2]).brighten(0.1).hex(),

      "checkbox.background": color.bg1d,
      "checkbox.border": color.bg3u,
      "checkbox.foreground": color.fg1u,

      "descriptionForeground": color.fg1d,

      "dropdown.background": color.bg1u,
      "dropdown.border": color.bg2u,
      "dropdown.foreground": color.fg,
      "dropdown.listBackground": color.bg1d,

      "editor.background": color.bg,
      "editor.foreground": tri[0],
      "editorGroupHeader.tabsBackground": color.bg2d,
      "editorIndentGuide.activeBackground": color.bg2u,
      "editorIndentGuide.background": color.bg1u,
      "editorLineNumber.activeForeground"  : tri[1],
      "editorLineNumber.foreground": tri[4],
      "errorForeground": uno[0],

      "focusBorder": duo[0],
      "foreground": color.fg,

      "input.background": color.bg1d,
      "input.border": color.bg1u,
      "input.foreground": color.fg,
      "input.placeholderForeground": color.fg2d,

      "list.activeSelectionBackground": color.bg1u,
      "list.activeSelectionForeground": color.fg1u,
      "list.focusBackground": chroma.mix(color.bg2d, duo[1], 0.075).hex(),
      "list.hoverBackground": color.bg,
      "list.hoverForeground": color.fg2d,
      "list.inactiveFocusBackground": chroma.mix(color.bg2d, duo[1], 0.05).hex(),
      "list.inactiveSelectionBackground": color.bg,
      "list.inactiveSelectionForeground": color.fg,

      "panel.background": color.bg2d,
      "panel.border": color.bd,

      "progressBar.background": uno[0],

      "sideBar.background": color.bg2d,
      "sideBar.border": color.bd,
      "sideBar.foreground": color.fg2d,
      "sideBarSectionHeader.background": color.bg2d,
      "sideBarSectionHeader.border": color.bd,
      "sideBarSectionHeader.foreground": color.fg1d,
      "sideBarTitle.foreground": color.fg2d,

      "statusBar.background": color.bg,
      "statusBar.border": color.bd,
      "statusBar.foreground" : color.fg1d,

      "tab.activeBackground": color.bg,
      "tab.activeBorderTop": uno[0],
      "tab.activeForeground": color.fg1u,
      "tab.border": color.bd,
      "tab.inactiveBackground": color.bg2d,
      "tab.inactiveForeground": color.fg2d,

      "textBlockQuote.background": color.bg1d,
      "textBlockQuote.border": color.bg1u,
      "textCodeBlock.background": color.bg1u,
      "textLink.activeForeground": chroma(tri[2]).brighten(0.33).hex(),
      "textLink.foreground": tri[2],
      "textPreformat.foreground": color.fg1d,
      "textSeparator.foreground": color.fg2d,

      "titleBar.activeBackground": color.bg,
      "titleBar.activeForeground": color.fg,
      "titleBar.border": color.bd,
      "titleBar.inactiveBackground": color.bg,
      "titleBar.inactiveForeground": color.fg2d,

      "tree.indentGuidesStroke": chroma(color.fg).alpha(0.075).hex(),
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
