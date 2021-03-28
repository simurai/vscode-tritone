const fs = require("fs").promises;
const buildTheme = require("./theme");

// Test

const Test = buildTheme({
  name: "TriTone Test",
  accent1Color: "hsl(210, 99%, 70%)",
  accent2Color: "hsl(340, 70%, 55%)",
  fgColor: "hsl(290, 16%, 40%)",
  bgColor: "hsl(260, 16%, 15%)",
  fgContrast: 0.55,
  bgContrast: 0.3,
});

// Dark

const DarkForest = buildTheme({
  name: "TriTone DarkForest",
  accent1Color: "hsl(120, 99%, 82%)",
  accent2Color: "hsl(40, 88%, 40%)",
  fgColor: "hsl(80, 9%, 38%)",
  bgColor: "hsl(160, 12%, 16%)",
  fgContrast: 0.4,
  bgContrast: 0.3,
});

const DarkEarth = buildTheme({
  name: "TriTone DarkEarth",
  accent1Color: "hsl(36, 99%, 68%)",
  accent2Color: "hsl(16, 66%, 50%)",
  fgColor: "hsl(270, 8%, 38%)",
  bgColor: "hsl(27, 0%, 16%)",
  fgContrast: 0.5,
  bgContrast: 0.2,
});

const DarkSpace = buildTheme({
  name: "TriTone DarkSpace",
  accent1Color: "hsl(210, 99%, 70%)",
  accent2Color: "hsl(340, 70%, 55%)",
  fgColor: "hsl(290, 16%, 40%)",
  bgColor: "hsl(260, 16%, 15%)",
  fgContrast: 0.55,
  bgContrast: 0.3,
});

const DarkSea = buildTheme({
  name: "TriTone DarkSea",
  accent1Color: "hsl(150, 97%, 75%)",
  accent2Color: "hsl(190, 70%, 50%)",
  fgColor: "hsl(180, 24%, 50%)",
  bgColor: "hsl(210, 32%, 14%)",
  fgContrast: 0.4,
  bgContrast: 0.25,
});

const DarkSky = buildTheme({
  name: "TriTone DarkSky",
  accent1Color: "hsl(10, 99%, 78%)",
  accent2Color: "hsl(200, 50%, 60%)",
  fgColor: "hsl(330, 10%, 40%)",
  bgColor: "hsl(225, 20%, 14%)",
  fgContrast: 0.45,
  bgContrast: 0.15,
});

// Light

const LightSnow = buildTheme({
  name: "TriTone LightSnow",
  accent1Color: "hsl(230, 99%, 40%)",
  accent2Color: "hsl(200, 99%, 40%)",
  fgColor: "hsl(220, 10%, 33%)",
  bgColor: "hsl(220, 100%, 99%)",
  fgContrast: 0.6,
  bgContrast: 0.25,
});

const LightMoss = buildTheme({
  name: "TriTone LightMoss",
  accent1Color: "hsl(100, 99%, 28%)",
  accent2Color: "hsl(200, 99%, 32%)",
  fgColor: "hsl(180, 30%, 42%)",
  bgColor: "hsl(160, 100%, 99%)",
  fgContrast: 0.6,
  bgContrast: 0.36,
});

const LightSun = buildTheme({
  name: "TriTone LightSun",
  accent1Color: "hsl(350, 99%, 50%)",
  accent2Color: "hsl(190, 99%, 40%)",
  fgColor: "hsl(240, 12%, 44%)",
  bgColor: "hsl(40, 100%, 99%)",
  fgContrast: 0.44,
  bgContrast: 0.33,
});

fs.mkdir("./themes", { recursive: true })
  .then(() =>
    Promise.all([
      fs.writeFile("./themes/test.json", JSON.stringify(Test, null, 2)),
      
      fs.writeFile(
        "./themes/dark-forest.json",
        JSON.stringify(DarkForest, null, 2)
      ),
      fs.writeFile(
        "./themes/dark-earth.json",
        JSON.stringify(DarkEarth, null, 2)
      ),
      fs.writeFile(
        "./themes/dark-space.json",
        JSON.stringify(DarkSpace, null, 2)
      ),
      fs.writeFile(
        "./themes/dark-sea.json",
        JSON.stringify(DarkSea, null, 2)
      ),
      fs.writeFile(
        "./themes/dark-sky.json",
        JSON.stringify(DarkSky, null, 2)
      ),
      
      fs.writeFile(
        "./themes/light-snow.json",
        JSON.stringify(LightSnow, null, 2)
      ),
      fs.writeFile(
        "./themes/light-moss.json",
        JSON.stringify(LightMoss, null, 2)
      ),
      fs.writeFile(
        "./themes/light-sun.json",
        JSON.stringify(LightSun, null, 2)
      ),
    ])
  )
  .catch(() => process.exit(1));
