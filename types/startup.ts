'use strict';

(function(options) {
  var configs = {
    urlArgs: options.urlArgs,
    paths: {
      'es5-shim': '/bower_components/es5-shim/es5-shim.min',
      'es5-sham': '/bower_components/es5-shim/es5-sham.min',
      html5shiv: '/bower_components/html5shiv/dist/html5shiv.min',
      json2: '/bower_components/json2/json2',
      respond: '/bower_components/respond/dest/respond.min'
    },
    shim: {
      html5shiv: {
        deps: ['html5shiv']
      }
    },
    map: options.map
  };
  var references = options['references'];
  var requires = ['app/application'];

  for (var name in references) {
    var reference = references[name];
    var referenceType = Object.prototype.toString.call(reference);
    if (referenceType === '[object Object]') {
      configs.paths[name] = reference.path;
      if (reference.shim) configs.shim[name] = reference.shim;
      if (reference.required) {
        requires.push(name);
      }
    } else if (referenceType === '[object String]') {
      configs.paths[name] = reference;
    }
  }

  if (
    document.getElementsByTagName('html')[0].getAttribute('data-html-type') ===
    'no-js lte-ie8'
  ) {
    for (var path in configs.paths) {
      configs.shim[path] = configs.shim[path] || {};
      configs.shim[path].deps = configs.shim[path].deps || {};
      configs.shim[path].deps = configs.shim[path].deps.concat([
        'es5-shim',
        'es5-sham',
        'html5shiv',
        'json2',
        'respond'
      ]);
    }
  }

  require.config(configs);
  require(requires.concat(options['requires']), function() {
    define('angular', function() {
      return window['angular'];
    });
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['app.application']);
      angular
        .element(document)
        .find('html')
        .addClass('ng-app');
    });
  });
})(window['configs']);
