const fs = require("fs").promises;
const buildTheme = require("./theme");

// Example
// const darkTheme = buildTheme({
//   name         : 'TriTone Dark',
//   accent1Color : 'hsl(190, 88%, 70%)',
//   accent2Color : 'hsl(159, 99%, 68%)',
//   bgColor      : 'hsl(249, 13%, 19%)',
//   fgSaturate   : 0.5,
//   fgContrast   : 0.5,
//   bgContrast   : 0.5,
// });

const deepsea = buildTheme({
  name         : 'TriTone DeepSea',
  accent1Color : 'hsl(159, 99%, 68%)',
  accent2Color : 'hsl(190, 88%, 70%)',
  bgColor      : 'hsl(210, 24%, 15%)',
});

const dark = buildTheme({
  name         : 'TriTone Dark',
  accent1Color : 'hsl(29, 87%, 63%)',
  accent2Color : 'hsl(50, 92%, 66%)',
  bgColor      : 'hsl(249, 13%, 19%)',
});

const light = buildTheme({
  name         : 'TriTone Light',
  accent1Color : 'hsl(240, 99%, 25%)',
  accent2Color : 'hsl(150, 99%, 30%)',
  bgColor      : 'hsl(200, 100%, 99%)',
});

fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/deepsea.json", JSON.stringify(deepsea, null, 2)),
    fs.writeFile("./themes/dark.json", JSON.stringify(dark, null, 2)),
    fs.writeFile("./themes/light.json", JSON.stringify(light, null, 2)),
  ]))
  .catch(() => process.exit(1))
