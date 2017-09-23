(function (options) {
    'use strict';

    var requires = ['app/application'],
        config = {
            urlArgs: app.getAttribute('data-args'),
            paths: {
                // patch
                'es5-shim': '../bower_components/es5-shim/es5-shim.min',
                'es5-sham': '../bower_components/es5-shim/es5-sham.min',
                'html5shiv': '../bower_components/html5shiv/dist/html5shiv.min',
                'json2': '../bower_components/json2/json2',
                'respond': '../bower_components/respond/dest/respond.min',
                // app
                'angular': '../bower_components/angular/angular',
                'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
                'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
                'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
                'jquery': '../bower_components/jquery/dist/jquery',
                'app/application': 'app/application'
            },
            map: {
                '*': {
                    'rcss': '../bower_components/require-css/css'
                }
            },
            shim: {
                'respond': {
                    deps: ['html5shiv']
                },
                'app/application': {
                    deps: ['angular', 'jquery', 'bootstrap', 'angular-ui-router', 'ui-bootstrap-tpls']
                },
                'ui-bootstrap-tpls': {
                    deps: ['angular', 'bootstrap']
                },
                'angular-ui-router': {
                    deps: ['angular']
                },
                'bootstrap': {
                    deps: ['jquery']
                }
            }
        };

    initBrowserPatch(config);
    initReference(requires, config, options.references);
    initModules(requires, options);
    startup(requires, config);

    function startup(requires, config) {
        require.config(config);
        require(requires, function (application) {
            angular.element(document).ready(function () {
                angular.bootstrap(document, ['app.application']);
                angular.element(document).find('html')
                    .attr('id', 'ng-app')
                    .attr('ng-app', 'app.application');
            });
        });
    }

    function initReference(requires, config, references) {
        for (var name in references) {
            var reference = references[name];
            var referenceType = Object.prototype.toString.call(reference);
            if (referenceType === '[object Object]') {
                config.paths[name] = reference.path;
                if (reference.shim)
                    config.shim[name] = reference.shim;
                if (reference.required) {
                    requires.push(name);
                }
            } else if (referenceType === '[object String]') {
                config.paths[name] = reference;
            }
        }
    }

    function initModules(requires, options) {
        for (var idx in options.requires) {
            requires.push(options.requires[idx]);
        }
    }

    function initBrowserPatch(config) {
        if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8') {
            var patchs = ['es5-shim', 'es5-sham', 'html5shiv', 'json2', 'respond'];
            config.shim['angular'] = {
                deps: patchs
            };
            config.shim['bootstrap'] = {
                deps: patchs
            };
            config.shim['jquery'] = {
                deps: patchs
            };
        }
    }
})({
    app: document.getElementById('app'),
    references: {},
    requires: [
        'rcss!../bower_components/bootstrap/dist/css/bootstrap.css',
        'modules/sample/module'
    ],
    noDebugs: []
});