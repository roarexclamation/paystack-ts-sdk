#!/usr/bin/env node

/**
 * Pre-publish checklist to ensure everything is ready for NPM publishing
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 Running pre-publish checklist...\n");

let allChecks = true;

function checkPass(message) {
  console.log(`✅ ${message}`);
}

function checkFail(message) {
  console.log(`❌ ${message}`);
  allChecks = false;
}

function checkWarn(message) {
  console.log(`⚠️  ${message}`);
}

// Check 1: Package.json validation
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

  if (pkg.name && pkg.name.startsWith("@roarexclamation/")) {
    checkPass("Package name is properly scoped");
  } else {
    checkFail("Package name should be properly scoped");
  }

  if (pkg.version && /^\d+\.\d+\.\d+/.test(pkg.version)) {
    checkPass(`Version is valid: ${pkg.version}`);
  } else {
    checkFail("Version is not valid semver");
  }

  if (pkg.main && pkg.types && pkg.module) {
    checkPass("Package has all required entry points (main, types, module)");
  } else {
    checkFail("Missing required entry points in package.json");
  }
} catch (error) {
  checkFail("Could not read or parse package.json");
}

// Check 2: Build outputs exist
const requiredFiles = [
  "dist/src/index.js",
  "dist/src/index.d.ts",
  "dist/src/utils.js",
  "dist/src/utils.d.ts",
];

let buildFilesExist = true;
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    checkPass(`Build file exists: ${file}`);
  } else {
    checkFail(`Missing build file: ${file}`);
    buildFilesExist = false;
  }
});

// Check 3: Generated files exist
if (fs.existsSync("generated/src/apis/index.ts")) {
  checkPass("Generated API files exist");
} else {
  checkFail("Generated API files missing - run npm run generate");
}

// Check 4: Tests pass
try {
  console.log("\n🧪 Running tests...");
  execSync("npm test", { stdio: "pipe" });
  checkPass("All tests pass");
} catch (error) {
  checkFail("Tests are failing");
}

// Check 5: TypeScript compilation
try {
  console.log("🔨 Checking TypeScript compilation...");
  execSync("npx tsc --noEmit", { stdio: "pipe" });
  checkPass("TypeScript compilation successful");
} catch (error) {
  checkFail("TypeScript compilation errors detected");
}

// Check 6: Lint checks
try {
  console.log("🔍 Running linter...");
  execSync("npm run lint", { stdio: "pipe" });
  checkPass("Linting passed");
} catch (error) {
  checkWarn("Linting issues detected - consider fixing before publishing");
}

// Check 7: README and LICENSE exist
if (fs.existsSync("README.md")) {
  checkPass("README.md exists");
} else {
  checkFail("README.md is missing");
}

if (fs.existsSync("LICENSE")) {
  checkPass("LICENSE file exists");
} else {
  checkFail("LICENSE file is missing");
}

// Check 8: NPM ignore file
if (fs.existsSync(".npmignore")) {
  checkPass(".npmignore exists");
} else {
  checkWarn(".npmignore missing - all files will be published");
}

// Final summary
console.log("\n" + "=".repeat(50));
if (allChecks) {
  console.log("🎉 All checks passed! Ready to publish.");
  console.log("\nTo publish:");
  console.log("1. npm run build  # Ensure latest build");
  console.log("2. npm publish   # Publish to NPM");
  console.log("3. git tag v$(node -p \"require('./package.json').version\")");
  console.log("4. git push --tags");
} else {
  console.log("❌ Some checks failed. Please fix issues before publishing.");
  process.exit(1);
}
