const fs = require("fs").promises;
const buildTheme = require("./theme");

const darkTheme = buildTheme({
  theme: "dark",
  name: "TriTone Dark",
});


fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/dark.json", JSON.stringify(darkTheme, null, 2)),
  ]))
  .catch(() => process.exit(1))
