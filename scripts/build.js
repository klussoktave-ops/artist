const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outDir = path.join(root, "public");
const filesToCopy = ["index.html", "styles.css", "script.js"];
const directoriesToCopy = ["images"];

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of filesToCopy) {
  const source = path.join(root, file);
  const destination = path.join(outDir, file);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing required file: ${file}`);
  }

  fs.copyFileSync(source, destination);
}

for (const dir of directoriesToCopy) {
  const sourceDir = path.join(root, dir);
  const destinationDir = path.join(outDir, dir);

  if (fs.existsSync(sourceDir)) {
    fs.cpSync(sourceDir, destinationDir, { recursive: true });
  }
}

console.log("Build complete. Static files generated in /public.");
