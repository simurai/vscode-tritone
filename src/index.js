const fs = require("fs").promises;
const buildTheme = require("./theme");

const DarkDimmed = buildTheme({
  name         : 'TriTone DarkDimmed',
  accent1Color : 'hsl(5, 100%, 80%)',
  accent2Color : 'hsl(208, 100%, 74%)',
  bgColor      : 'hsl(215, 21%, 11%)',
  fgSaturate   : 0.4,
  fgContrast   : 0.5,
  bgContrast   : 0.5,
});

const Dark = buildTheme({
  name         : 'TriTone Dark',
  accent1Color : '#FFA198',
  accent2Color : '#79C0FF',
  bgColor      : '#0D1117',
  fgSaturate   : 0.6,
  fgContrast   : 0.5,
  bgContrast   : 0.39,
});

const Light = buildTheme({
  name         : 'TriTone Light',
  accent1Color : 'hsl(212, 94%, 20%)',
  accent2Color : 'hsl(354, 66%, 54%)',
  bgColor      : 'hsl(210, 100%, 99.99%)',
  fgSaturate   : 0.3,
  fgContrast   : 0.6,
  bgContrast   : 0.35,
});

fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/dark-dimmed.json", JSON.stringify(DarkDimmed, null, 2)),
    fs.writeFile("./themes/dark.json", JSON.stringify(Dark, null, 2)),
    fs.writeFile("./themes/light.json", JSON.stringify(Light, null, 2)),
  ]))
  .catch(() => process.exit(1))
