#!/usr/bin/env node
import enquirer from "enquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const { prompt } = enquirer;

async function run() {
  // ── 1. ask for the project name ──────────────────────────────────────────────
  const { projectName } = await prompt<{ projectName: string }>({
    type: "input",
    name: "projectName",
    message: "Project name",
    initial: "my-deck",
  });

  const target = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(target)) {
    console.error(`❌  Directory “${projectName}” already exists`);
    process.exit(1);
  }

  // ── 2. locate template dir (./template next to the CLI root) ────────────────
  const __filename = fileURLToPath(import.meta.url);
  const templateDir = path.resolve(path.dirname(__filename), "../template");

  // ── 3. copy template, then patch its package.json ───────────────────────────
  await fs.copy(templateDir, target);

  const pkgPath = path.join(target, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  // ── 4. install deps and done ────────────────────────────────────────────────
  execSync("pnpm install", { cwd: target, stdio: "inherit" });
  console.log(`\n✔  Project ready!  cd ${projectName}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
