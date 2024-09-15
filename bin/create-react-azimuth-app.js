#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const projectName = process.argv[2] || "azimuth-app";

console.log(`Creating a new React Azimuth app in ${projectName}...`);

execSync(
  `git clone https://github.com/shawntobin/create-azimuth-app.git ${projectName}`,
  { stdio: "inherit" }
);

execSync(`cd ${projectName} && yarn install`, { stdio: "inherit" });

console.log("Your React Azimuth app is ready! To start, run:");
console.log(`\n  cd ${projectName}`);
console.log("  yarn dev:mainnet");
console.log("Check the readme file for more information");
