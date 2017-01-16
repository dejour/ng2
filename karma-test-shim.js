/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/*global jasmine, __karma__, window*/
Error.stackTraceLimit = 5;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

__karma__.loaded = function() {};

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return path.slice(-7) == 'spec.js';
}
function onlyAppFiles(filePath) {
    return /\/base\/dist\/(?!.*\.spec\.js$).*\.js$/.test(filePath);
}
function isBuiltFile(path) {
  var builtPath = '/base/dist/';
  return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}
var allSpecFiles = Object.keys(window.__karma__.files).filter(isSpecFile).filter(isBuiltFile);

// Load our SystemJS configuration.
System.config({
  baseURL: '/base',
  defaultJSExtensions: 'true'
});
System.config({
  map: Object.keys(window.__karma__.files).filter(onlyAppFiles).reduce(createPathRecords, {})
});

function createPathRecords(pathsMapping, appPath) {
    // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
    // './vg-player/vg-player':
    // '/base/dist/vg-player/vg-player.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
    var pathParts = appPath.split('/');
    var moduleName = './' + pathParts.slice(Math.max(pathParts.length - 2, 1)).join('/');
    moduleName = moduleName.replace(/\.js$/, '');
    pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
    return pathsMapping;
}

Promise.all(allSpecFiles.map(function(moduleName) { return System.import(moduleName); }))
    .then(__karma__.start, __karma__.error)