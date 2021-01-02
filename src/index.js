const fs = require("fs").promises;
const buildTheme = require("./theme");

const DarkForest = buildTheme({
  name         : 'TriTone DarkForest',
  accent1Color : 'hsl(70, 88%, 77%)',
  accent2Color : 'hsl(178, 99%, 60%)',
  bgColor      : 'hsl(120, 3%, 17%)',
  fgSaturate   : 0.5,
  fgContrast   : 0.4,
  bgContrast   : 0.2,
});

const DarkEarth = buildTheme({
  name         : 'TriTone DarkEarth',
  accent1Color : 'hsl(41, 98%, 68%)',
  accent2Color : 'hsl(70, 88%, 70%)',
  bgColor      : 'hsl(27, 10%, 18%)',
});

const DarkSpace = buildTheme({
  name         : 'TriTone DarkSpace',
  accent1Color : 'hsl(19, 96%, 67%)',
  accent2Color : 'hsl(330, 88%, 70%)',
  bgColor      : 'hsl(240, 12%, 16%)',
  fgSaturate   : 0.8,
  fgContrast   : 0.5,
  bgContrast   : 0.6,
});

const DarkSea = buildTheme({
  name         : 'TriTone DarkSea',
  accent1Color : 'hsl(160, 97%, 71%)',
  accent2Color : 'hsl(190, 88%, 70%)',
  bgColor      : 'hsl(210, 24%, 15%)',
});

const DarkSky = buildTheme({
  name         : 'TriTone DarkSky',
  accent1Color : 'hsl(30, 98%, 84%)',
  accent2Color : 'hsl(60, 92%, 66%)',
  bgColor      : 'hsl(249, 13%, 19%)',
  fgSaturate   : 0.7,
  fgContrast   : 0.6,
  bgContrast   : 0.2,
});

const Light = buildTheme({
  name         : 'TriTone Light',
  accent1Color : 'hsl(240, 99%, 25%)',
  accent2Color : 'hsl(150, 99%, 30%)',
  bgColor      : 'hsl(200, 100%, 99%)',
});

fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/dark-forest.json", JSON.stringify(DarkForest, null, 2)),
    fs.writeFile("./themes/dark-earth.json", JSON.stringify(DarkEarth, null, 2)),
    fs.writeFile("./themes/dark-space.json", JSON.stringify(DarkSpace, null, 2)),
    fs.writeFile("./themes/dark-sea.json", JSON.stringify(DarkSea, null, 2)),
    fs.writeFile("./themes/dark-sky.json", JSON.stringify(DarkSky, null, 2)),
    fs.writeFile("./themes/light.json", JSON.stringify(Light, null, 2)),
  ]))
  .catch(() => process.exit(1))
