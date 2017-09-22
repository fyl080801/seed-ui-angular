(function (options) {
    'use strict';

    var requires = ['app/application'],
        config = {
            urlArgs: app.getAttribute('data-args'),
            paths: {
                'angular': '../bower_components/angular/angular',
                'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
                'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
                'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
                'jquery': '../bower_components/jquery/dist/jquery',
                'app/application': 'app/application'
            },
            shim: {
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

    // initBrowserPatch(config);
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

    // function initBrowserPatch(config) {
    //     if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8')
    //         config.shim['app'] = {
    //             deps: ['patch']
    //         };
    // }
})({
    app: document.getElementById('app'),
    references: {
        // modules
        // 'modules.system.module': {
        //     path: 'js/modules'
        // },
        // 'modules/sample/module': {
        //     path: 'modules/sample/module'
        // },

        // requires
        // 'modules.system.requires': {
        //     path: 'js/module.system',
        //     shim: {
        //         deps: ['modules.system.module']
        //     }
        // },
        // 'modules/sample/requires': {
        //     path: 'modules/sample/requires',
        //     shim: {
        //         deps: ['modules/sample/module']
        //     }
        // }
    },
    requires: [
        'modules/sample/module'
    ],
    noDebugs: []
});