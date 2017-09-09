(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                              'Code',
    'rxjs':                             'node_modules/rxjs',
    '@angular/common':                  "node_modules/@angular/common/bundles/common.umd.js",
    '@angular/compiler': 				"node_modules/@angular/compiler/bundles/compiler.umd.js",
    '@angular/core': 					"node_modules/@angular/core/bundles/core.umd.js",
    '@angular/http': 					"node_modules/@angular/http/bundles/http.umd.js",
    '@angular/forms': 					"node_modules/@angular/forms/bundles/forms.umd.js",
    '@angular/platform-browser': 		"node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
    '@angular/platform-browser-dynamic':'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/router': 					"node_modules/@angular/router/bundles/router.umd.js",
    '@angular/testing': 				"node_modules/@angular/testing/bundles/testing.umd.js",
    '@angular/upgrade': 				"node_modules/@angular/upgrade/bundles/upgrade.umd.js",
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                  { main: 'app.js', defaultExtension: 'js' },
    'rxjs':                 { defaultExtension: 'js' },
    //'promise.prototype.finally':                    { main: 'index', defaultExtension: 'js' },
  };

  //var packageNames = [
  //  '@angular/common',
  //  '@angular/compiler',
  //  '@angular/core',
  //  '@angular/http',
  //  '@angular/platform-browser',
  //  '@angular/platform-browser-dynamic',
  //  '@angular/router',
  //  '@angular/router-deprecated',
  //  '@angular/testing',
  //  '@angular/upgrade',
  //];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  //packageNames.forEach(function(pkgName) {
  //  packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  //});

  var config = {
    map: map,
    packages: packages,
    baseURL: '/'
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) {
	global.filterSystemConfig(config);
  }

  System.config(config);

})(this);
