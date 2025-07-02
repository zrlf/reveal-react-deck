#!/usr/bin/env node

// src/index.ts
import enquirer from "enquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
var { prompt } = enquirer;
async function run() {
  const { projectName } = await prompt({
    type: "input",
    name: "projectName",
    message: "Project name",
    initial: "my-deck"
  });
  const target = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(target)) {
    console.error(`\u274C  Directory \u201C${projectName}\u201D already exists`);
    process.exit(1);
  }
  const __filename = fileURLToPath(import.meta.url);
  const templateDir = path.resolve(path.dirname(__filename), "../template");
  await fs.copy(templateDir, target);
  const pkgPath = path.join(target, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
  execSync("pnpm install", { cwd: target, stdio: "inherit" });
  console.log(`
\u2714  Project ready!  cd ${projectName}`);
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
