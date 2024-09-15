#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const projectName = process.argv[2] || "azimuth-app";

console.log(`Creating a new React Azimuth app in ${projectName}...`);

execSync(
  `git clone https://github.com/shawntobin/create-azimuth-app.git ${projectName}`,
  { stdio: "inherit" }
);

execSync(`cd ${projectName}`, { stdio: "inherit" });

console.log("Your React Azimuth app is ready!");
console.log(`\n  cd ${projectName}`);
console.log("  yarn install (or npm install)");
console.log("  yarn dev:local (or npm run dev:local)");
console.log(
  "\n Make sure to add your Infura ID to the .env file when using mainnet or sepolia."
);
console.log("\n Check the readme for more information.");
console.log("\n ");
