// tiny js file to convert languages.yml to a languages.json file for frontend app

const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
  const doc = yaml.safeLoad(fs.readFileSync('languages.yml', 'utf8'));

console.log(Object.keys(doc))
fs.writeFileSync("languages.json", JSON.stringify(Object.keys(doc)));
