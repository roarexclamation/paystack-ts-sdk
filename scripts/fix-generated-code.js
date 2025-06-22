#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Post-generation script to fix common issues with OpenAPI generated TypeScript code
 */

const generatedSrcPath = path.join(__dirname, "..", "generated", "src");

console.log("🔧 Fixing generated code issues...");

// 1. Fix missing objectToJSON function in runtime.ts
function fixRuntimeFile() {
  const runtimePath = path.join(generatedSrcPath, "runtime.ts");

  if (!fs.existsSync(runtimePath)) {
    console.log("⚠️  runtime.ts not found, skipping runtime fixes");
    return;
  }

  let content = fs.readFileSync(runtimePath, "utf8");

  // Check if objectToJSON is already defined
  if (content.includes("export function objectToJSON")) {
    console.log("✅ objectToJSON already exists in runtime.ts");
    return;
  }

  // Add objectToJSON function
  const objectToJSONFunction = `
/**
 * Convert an object to JSON, handling special cases
 */
export function objectToJSON(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(objectToJSON);
  }
  
  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = objectToJSON(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
}
`;

  // Insert the function before the last export or at the end
  content = content + "\n" + objectToJSONFunction;

  fs.writeFileSync(runtimePath, content);
  console.log("✅ Added objectToJSON function to runtime.ts");
}

// 2. Fix API files that use objectToJSON
function fixAPIFiles() {
  const apisPath = path.join(generatedSrcPath, "apis");

  if (!fs.existsSync(apisPath)) {
    console.log("⚠️  apis directory not found, skipping API fixes");
    return;
  }

  const apiFiles = fs
    .readdirSync(apisPath)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts");

  apiFiles.forEach((file) => {
    const filePath = path.join(apisPath, file);
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Check if file uses objectToJSON but doesn't import it
    if (content.includes("objectToJSON(")) {
      // Check if it uses "import * as runtime" pattern
      if (content.includes("import * as runtime from '../runtime'")) {
        // Replace objectToJSON calls with runtime.objectToJSON
        if (!content.includes("runtime.objectToJSON")) {
          content = content.replace(/objectToJSON\(/g, "runtime.objectToJSON(");
          modified = true;
          console.log(`   - Fixed objectToJSON calls in ${file}`);
        }
      }
      // Check if it has explicit imports from runtime
      else if (content.includes("} from '../runtime'")) {
        const runtimeImportRegex =
          /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]\.\.\/runtime['"]/;
        const match = content.match(runtimeImportRegex);

        if (match) {
          const imports = match[1].split(",").map((imp) => imp.trim());
          if (!imports.includes("objectToJSON")) {
            imports.push("objectToJSON");
            const newImport = `import { ${imports.join(
              ", "
            )} } from '../runtime'`;
            content = content.replace(runtimeImportRegex, newImport);
            modified = true;
            console.log(`   - Added objectToJSON import to ${file}`);
          }
        }
      }
    }

    // Fix channels type issue - replace 'never' with 'string[]' for channels
    if (content.includes("requestParameters.channels.join")) {
      content = content.replace(
        /requestParameters\.channels\.join\(/g,
        "(requestParameters.channels as string[]).join("
      );
      modified = true;
      console.log(`   - Fixed channels type in ${file}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file}`);
    }
  });
}

// 3. Fix duplicate exports in index.ts
function fixIndexFile() {
  const indexPath = path.join(generatedSrcPath, "index.ts");

  if (!fs.existsSync(indexPath)) {
    console.log("⚠️  index.ts not found, skipping index fixes");
    return;
  }

  console.log("🔧 Generating dynamic exports for index.ts...");

  // Read the actual generated model files
  const modelsPath = path.join(generatedSrcPath, "models");
  const modelFiles = fs
    .readdirSync(modelsPath)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(".ts", ""))
    .sort();

  // Find API conflicts by checking what interfaces are defined in API files
  const apisPath = path.join(generatedSrcPath, "apis");
  const apiConflicts = new Set();

  if (fs.existsSync(apisPath)) {
    const apiFiles = fs
      .readdirSync(apisPath)
      .filter((file) => file.endsWith(".ts") && file !== "index.ts");

    for (const apiFile of apiFiles) {
      const content = fs.readFileSync(path.join(apisPath, apiFile), "utf8");
      // Look for interface exports that might conflict with models
      const interfaceMatches = content.match(/export interface (\w+)/g);
      if (interfaceMatches) {
        interfaceMatches.forEach((match) => {
          const interfaceName = match.replace("export interface ", "");
          if (modelFiles.includes(interfaceName)) {
            apiConflicts.add(interfaceName);
          }
        });
      }
    }
  }

  console.log(`📋 Found ${modelFiles.length} model files to export`);
  console.log(
    `⚠️  Found ${apiConflicts.size} API conflicts: ${Array.from(
      apiConflicts
    ).join(", ")}`
  );

  // Generate exports for all models, with special handling for conflicts
  const modelExports = modelFiles
    .map((modelName) => {
      if (modelName === "CustomerRiskAction") {
        return `// Export only the interface to avoid enum conflict
export { CustomerRiskAction } from './models/CustomerRiskAction';`;
      } else if (apiConflicts.has(modelName)) {
        return `// Skip ${modelName} - conflicts with API interface
// export * from './models/${modelName}';`;
      }
      return `export * from './models/${modelName}';`;
    })
    .join("\n");

  const newContent = `/* tslint:disable */
/* eslint-disable */
export * from './runtime';

// Export all APIs first
export * from './apis/index';

// Export all models dynamically (excluding API conflicts)
${modelExports}
`;

  fs.writeFileSync(indexPath, newContent);
  console.log("✅ Applied dynamic exports to index.ts");
  console.log("✅ Fixed duplicate exports in index.ts");
}

// 4. Fix APIs index file
function fixApisIndexFile() {
  const apisIndexPath = path.join(generatedSrcPath, "apis", "index.ts");

  if (!fs.existsSync(apisIndexPath)) {
    console.log("⚠️  apis/index.ts not found, skipping APIs index fixes");
    return;
  }

  let content = fs.readFileSync(apisIndexPath, "utf8");

  // Remove any incorrect import paths and fix them
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/([^'"]+)['"]/g,
    "from '../$1'"
  );
  content = content.replace(
    /from\s+['"]\.\.\/configuration['"]/g,
    "from '../runtime'"
  );
  content = content.replace(/from\s+['"]\.\.\/api['"]/g, "from './index'");

  fs.writeFileSync(apisIndexPath, content);
  console.log("✅ Fixed APIs index.ts import paths");
}

// Run all fixes
try {
  fixRuntimeFile();
  fixAPIFiles();
  fixIndexFile();
  fixApisIndexFile();
  console.log("🎉 All fixes applied successfully!");
} catch (error) {
  console.error("❌ Error applying fixes:", error);
  process.exit(1);
}
