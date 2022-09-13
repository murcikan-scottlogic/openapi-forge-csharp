const fs = require("fs");
const shell = require("shelljs");

// Extract cl arguments
const clArgs = process.argv.slice(2);

// Retrieve the path to feature paths from cl arguments of 'npm test', use default value if none given
const featurePath = clArgs[0] || "..\\..\\..\\openapi-forge\\features\\\*.feature";

const projectPath = "./tests/FeaturesTests/FeaturesTests.csproj";

const originalFile = fs.readFileSync(projectPath, "utf-8");

// Replace file path to .feature files in .csproj file, use handlebars style to help make the search value unique
fs.writeFileSync(projectPath, originalFile.replace("{{FEATURE_PATH}}", featurePath));

shell.exec(`dotnet test ${projectPath}`);

// Revert .csproj file back to original
fs.writeFileSync(projectPath, originalFile);