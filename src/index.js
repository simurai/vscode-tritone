const fs = require("fs").promises;
const buildTheme = require("./theme");

const Test = buildTheme({
  name         : 'TriTone Test',
  accent1Color : 'hsl(240, 99%, 30%)',
  accent2Color : 'hsl(150, 99%, 40%)',
  fgColor      : 'hsl(200, 30%, 40%)',
  bgColor      : 'hsl(200, 100%, 99%)',
  fgContrast   : 0.5,
  bgContrast   : 0.33,
});

const DarkForest = buildTheme({
  name         : 'TriTone DarkForest',
  accent1Color : 'hsl(70, 88%, 77%)',
  accent2Color : 'hsl(178, 99%, 60%)',
  fgColor      : 'hsl(120, 9%, 50%)',
  bgColor      : 'hsl(120, 3%, 17%)',
});

const DarkEarth = buildTheme({
  name         : 'TriTone DarkEarth',
  accent1Color : 'hsl(41, 98%, 68%)',
  accent2Color : 'hsl(70, 88%, 70%)',
  fgColor      : 'hsl(12, 20%, 55%)',
  bgColor      : 'hsl(27, 10%, 18%)',
});

const DarkSpace = buildTheme({
  name         : 'TriTone DarkSpace',
  accent1Color : 'hsl(19, 96%, 67%)',
  accent2Color : 'hsl(330, 88%, 70%)',
  fgColor      : 'hsl( 20, 22%, 50%)',
  bgColor      : 'hsl(240, 12%, 16%)',
  fgContrast   : 0.3,
  bgContrast   : 0.6,
});

const DarkSea = buildTheme({
  name         : 'TriTone DarkSea',
  accent1Color : 'hsl(160, 97%, 75%)',
  accent2Color : 'hsl(185, 99%, 50%)',
  fgColor      : 'hsl(190, 33%, 50%)',
  bgColor      : 'hsl(210, 24%, 15%)',
  fgContrast   : 0.4,
  bgContrast   : 0.15,
});

const DarkSky = buildTheme({
  name         : 'TriTone DarkSky',
  accent1Color : 'hsl(60, 92%, 76%)',
  accent2Color : 'hsl(10, 98%, 72%)',
  fgColor      : 'hsl(270, 33%, 66%)',
  bgColor      : 'hsl(249, 13%, 19%)',
  fgContrast   : 0.5,
  bgContrast   : 0.4,
});

const Light = buildTheme({
  name         : 'TriTone Light',
  accent1Color : 'hsl(240, 99%, 25%)',
  accent2Color : 'hsl(150, 99%, 30%)',
  bgColor      : 'hsl(200, 100%, 99%)',
});

fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/test.json", JSON.stringify(Test, null, 2)),
    fs.writeFile("./themes/dark-forest.json", JSON.stringify(DarkForest, null, 2)),
    fs.writeFile("./themes/dark-earth.json", JSON.stringify(DarkEarth, null, 2)),
    fs.writeFile("./themes/dark-space.json", JSON.stringify(DarkSpace, null, 2)),
    fs.writeFile("./themes/dark-sea.json", JSON.stringify(DarkSea, null, 2)),
    fs.writeFile("./themes/dark-sky.json", JSON.stringify(DarkSky, null, 2)),
    fs.writeFile("./themes/light.json", JSON.stringify(Light, null, 2)),
  ]))
  .catch(() => process.exit(1))
