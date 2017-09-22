(function (options) {
    'use strict';

    var requires = ['app/application'],
        config = {
            urlArgs: app.getAttribute('data-args'),
            paths: {
                'patch': 'js/patch',
                'angular': 'js/app',
                'app': 'js/app',
                'app/application': 'js/app.application'
            },
            shim: {
                'app/application': {
                    deps: ['app']
                }
            }
        };

    // initBrowserPatch(config);
    initReference(requires, config, options.references);
    initModules(requires, options);
    // initDebug(config, options.noDebugs);
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

    // function initDebug(config, nonDebugs) {
    //     var debug = eval(app.getAttribute('data-debug')) ? '' : '.min';
    //     for (var index in config.paths) {
    //         var isDebug = true;
    //         for (var i in nonDebugs) {
    //             if (nonDebugs[i] === index) {
    //                 isDebug = false;
    //                 break;
    //             }
    //         }
    //         config.paths[index] = config.paths[index] + (isDebug ? debug : '');
    //     }
    // }

    // function initBrowserPatch(config) {
    //     if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8')
    //         config.shim['app'] = {
    //             deps: ['patch']
    //         };
    // }
})({
    app: document.getElementById('app'),
    references: {
        // // modules
        // 'modules.system.module': {
        //     path: 'js/modules'
        // },
        'modules/sample/module': {
            path: 'js/modules'
        },

        // // requires
        // 'modules.system.requires': {
        //     path: 'js/module.system',
        //     shim: {
        //         deps: ['modules.system.module']
        //     }
        // },
        'modules/sample/requires': {
            path: 'js/modules.sample',
            shim: {
                deps: ['modules/sample/module']
            }
        }
    },
    requires: [
        'modules/sample/module'
    ],
    noDebugs: []
});