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
  const fg = chroma.scale([ modeColor, fgColor, bgColor ]).padding([0.02 + fgContrastPadding, 0.4]).mode(colorMode).colors(5); // padding cuts off the edges
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
    'fg3d' : fg[4], // 3 down

    'bg3u' : bg[0], // 3 up
    'bg2u' : bg[1], // 2 up
    'bg1u' : bg[2], // 1 up
    'bg'   : bg[3], // background
    'bg1d' : bg[4], // 1 down
    'bg2d' : bg[5], // 2 down

    'bd'   : bg[bdScale], // border (6 or 0),

    'green' : chroma('hsl(150, 100%, 40%)').hex(), // addition/success
    'red'   : chroma('hsl(355, 100%, 70%)').hex(), // deletion/danger
    'orange': chroma('hsl(40, 100%, 45%)').hex(), // warning
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

      "breadcrumb.foreground": color.fg2d,
      "breadcrumb.focusForeground": color.fg1d,
      "breadcrumb.activeSelectionForeground": color.fg,
      "breadcrumbPicker.background": color.bg1u,

      "checkbox.background": color.bg1d,
      "checkbox.border": color.bg3u,
      "checkbox.foreground": color.fg1u,

      "descriptionForeground": color.fg1d,

      "diffEditor.insertedTextBackground": chroma.mix(tri[3], color.green, 0.66).alpha(0.1).hex(),
      "diffEditor.removedTextBackground": chroma.mix(tri[3], color.red, 0.66).alpha(0.1).hex(),

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
      "editorGroupHeader.tabsBorder": color.bg,
      "editorGroup.border": color.bd,
      "editorWidget.background": color.bg2u,
      "editor.foldBackground": color.bg1u,
      "editor.lineHighlightBackground": chroma.mix(color.bg, uno[0], 0.0075).hex(),
      "editorWhitespace.foreground": tri[4],
      "editorCursor.foreground": uno[0],

      "editor.findMatchBackground"          : chroma(uno[0]).alpha(0.3).hex(),
      "editor.findMatchHighlightBackground" : chroma(uno[0]).alpha(0.15).hex(),
      "editor.inactiveSelectionBackground"  : chroma(tri[2]).alpha(0.1).hex(),
      "editor.selectionBackground"          : chroma(tri[2]).alpha(0.2).hex(),
      "editor.selectionHighlightBackground" : chroma(tri[2]).alpha(0.2).hex(),
      "editor.selectionHighlightBorder"     : chroma(tri[2]).alpha(0).hex(),
      "editor.wordHighlightBackground"      : chroma(uno[0]).alpha(0).hex(),
      "editor.wordHighlightStrongBackground": chroma(uno[0]).alpha(0).hex(),
      "editor.wordHighlightBorder"          : chroma(uno[0]).alpha(0.4).hex(),
      "editor.wordHighlightStrongBorder"    : chroma(uno[0]).alpha(0.2).hex(),
      "editorBracketMatch.background"       : chroma(duo[0]).alpha(0.3).hex(),
      "editorBracketMatch.border"           : chroma(duo[0]).alpha(0).hex(),

      "editorGutter.modifiedBackground": tri[3],
      "editorGutter.addedBackground": chroma.mix(tri[3], color.green, 0.5).hex(),
      "editorGutter.deletedBackground": chroma.mix(tri[3], color.red, 0.5).hex(),

      "focusBorder": duo[0],
      "foreground": color.fg,

      "gitDecoration.untrackedResourceForeground": chroma.mix(tri[2], color.green, 0.5).hex(),
      "gitDecoration.addedResourceForeground": chroma.mix(tri[2], color.green, 0.5).hex(),
      "gitDecoration.deletedResourceForeground": chroma.mix(tri[2], color.red, 0.5).hex(),
      "gitDecoration.conflictingResourceForeground": chroma.mix(tri[2], color.red, 0.5).hex(),
      "gitDecoration.modifiedResourceForeground": tri[2],
      "gitDecoration.ignoredResourceForeground": color.fg3d,
      "gitDecoration.submoduleResourceForeground": color.fg3d,

      "input.background": color.bg1d,
      "input.border": color.bg1u,
      "input.foreground": color.fg,
      "input.placeholderForeground": color.fg2d,

      "list.activeSelectionForeground": color.fg1u,
      "list.inactiveSelectionForeground": color.fg,

      "list.hoverBackground": chroma(color.fg).alpha(0.05).hex(),
      "list.activeSelectionBackground": chroma(color.fg).alpha(0.12).hex(),
      "list.inactiveSelectionBackground": chroma(color.fg).alpha(0.1).hex(),
      "list.focusBackground": chroma(color.fg).alpha(0.12).hex(),
      "list.inactiveFocusBackground": chroma(color.fg).alpha(0.075).hex(),
      "list.errorForeground": chroma.mix(tri[2], color.red, 0.66).hex(),
      "list.warningForeground": chroma.mix(tri[2], color.orange, 0.66).hex(),

      "notificationCenterHeader.foreground": color.fg1d,
      "notificationCenterHeader.background": color.bg,
      "notifications.foreground": color.fg,
      "notifications.background": color.bg1u,
      "notifications.border": color.bd,
      "notificationsErrorIcon.foreground": uno[0],
      "notificationsWarningIcon.foreground": duo[0],
      "notificationsInfoIcon.foreground": tri[2],

      "panel.background": color.bg2d,
      "panel.border": color.bd,
      "panelTitle.activeBorder": uno[0],
      "panelTitle.activeForeground": color.fg1d,
      "panelTitle.inactiveForeground": color.fg2d,
      "panelInput.border": color.bd,

      "peekViewEditor.matchHighlightBackground": chroma(uno[0]).alpha(0.3).hex(),
      "peekViewResult.matchHighlightBackground": chroma(uno[0]).alpha(0.3).hex(),
      "peekViewEditor.background": color.bg1d,
      "peekViewResult.background": color.bg1d,
      "peekView.border": color.bg3u,
      "peekViewTitle.background": color.bg1u,
      "peekViewTitleDescription.foreground": color.fg2d,
      "peekViewTitleLabel.foreground": color.fg,

      "pickerGroup.border": color.bd,
      "pickerGroup.foreground": color.fg,

      "progressBar.background": uno[0],

      "quickInput.background": color.bg1u,
      "quickInput.foreground": color.fg,

      "scrollbar.shadow": color.bd,
      "scrollbarSlider.background": chroma(color.fg).alpha(0.075).hex(),
      "scrollbarSlider.hoverBackground": chroma(color.fg).alpha(0.08).hex(),
      "scrollbarSlider.activeBackground": chroma(color.fg).alpha(0.1).hex(),
      "editorOverviewRuler.border": color.bd,

      "settings.headerForeground": color.fg1u,
      "settings.modifiedItemIndicator": color.bg3u,
      "settings.focusedRowBackground": color.bg,
      "notebook.focusedRowBorder": color.bg,

      "sideBar.background": color.bg2d,
      "sideBar.border": color.bd,
      "sideBar.foreground": color.fg2d,
      "sideBarSectionHeader.background": color.bg2d,
      "sideBarSectionHeader.border": color.bd,
      "sideBarSectionHeader.foreground": color.fg1d,
      "sideBarTitle.foreground": color.fg2d,

      "statusBar.foreground": color.fg1d,
      "statusBar.background": color.bg,
      "statusBar.border": color.bd,
      "statusBar.noFolderBackground": color.bg,
      "statusBar.debuggingBackground": tri[4],
      "statusBar.debuggingForeground": color.fg1u,
      "statusBarItem.prominentBackground": color.bg1u,

      "tab.activeBackground": color.bg,
      "tab.activeBorderTop": uno[0],
      "tab.activeForeground": color.fg1u,
      "tab.border": color.bd,
      "tab.inactiveBackground": color.bg2d,
      "tab.inactiveForeground": color.fg2d,
      "tab.hoverBackground": color.bg,
      "tab.unfocusedHoverBackground": color.bg1d,
      "tab.unfocusedActiveBorderTop": color.bg,
      "tab.unfocusedActiveBorder": color.bg,

      "terminal.foreground": color.fg1d,

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

      "welcomePage.buttonBackground": color.bg1u,
      "welcomePage.buttonHoverBackground": chroma(color.bg1u).brighten(0.1).hex(),
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
