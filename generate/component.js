/* *************************************
  Generate Components
    - Generates Component files and contents
**************************************** */

var ejs = require('ejs');
var fs = require('fs-extra');
var FSUtils = require('../utils/virtualFS');
var generateActionBlock = require('./actionBlock');

module.exports.generateFile = function(testData, fileStructure, rootPath) {

  fileStructure.push({path: rootPath.concat("components.js"), content: "~~~"})

  var driverString = fs.readFileSync(`${__dirname}/../templates/components.js`, 'utf8');

  var rendered = ejs.render(driverString, {
    components: testData.components.map((component) => ({
      name: component.name,
      variables: component.variables,
      generateActionBlock: (indent, indentChar) =>  generateActionBlock(component, testData, indent, indentChar)
    }))
  });

  fileStructure.push({path: rootPath.concat("components.js"), content: rendered})

};
