/**
 * Created by fyl08 on 2016/12/22.
 */
(function (app, options) {
    'use strict';

    var requires = ['app.application'],
        config = {
            urlArgs: 'v=1.0.18',
            paths: {
                'iepatch': 'js/iepatch',
                'angular': 'js/reference',
                'reference': 'js/reference',
                'app.application': 'js/app.application'
            },
            shim: {
                'app.application': {
                    deps: ['reference']
                }
            }
        };

    initBrowserPatch(requires);
    initReference(requires, config, options.references);
    initModules(requires, config, options.modules);
    initDebug(config, options.nonDebugs);
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
                config.shim[name] = reference.shim;
                if (reference.required) {
                    requires.push(name);
                }
            } else if (referenceType === '[object String]') {
                config.paths[name] = reference;
            }
        }
    }

    function initModules(requires, config, modules) {
        for (var name in modules) {
            var modulePath = 'modules.' + name + '.module';
            var requirePath = 'modules.' + name + '.requires';
            var moduleDeps = ['app.application'];
            var configDeps = modules[name].deps;
            if (Object.prototype.toString.call(configDeps) === '[object Array]') {
                for (var index in configDeps) {
                    moduleDeps.push('modules.' + configDeps[index] + '.module');
                }
            }
            else if (configDeps) {
                moduleDeps.push('modules.' + configDeps + '.module');
            }
            config.paths[requirePath] = 'js/module.' + name;
            config.paths[modulePath] = 'js/modules';
            config.shim[modulePath] = {deps: moduleDeps};
            config.shim[requirePath] = {deps: [modulePath]};
            requires.push(modulePath);
        }
    }

    function initDebug(config, nonDebugs) {
        var debug = eval(app.getAttribute('data-debug')) ? '' : '.min';
        for (var index in config.paths) {
            var isDebug = true;
            for (var i in nonDebugs) {
                if (nonDebugs[i] === index) {
                    isDebug = false;
                    break;
                }
            }
            config.paths[index] = config.paths[index] + (isDebug ? debug : '');
        }
    }

    function initBrowserPatch(requires) {
        if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8')
            requires.splice(0, 0, 'iepatch');
    }
})(
    document.getElementById('app'),
    {
        modules: {
            'system': {},
            'controls': {deps: ['system']},
            'user': {deps: ['controls']},
            'role': {deps: ['controls']},
            'plugin': {deps: ['controls']},
            'formeditor': {deps: ['controls']}
        },
        references: {
            'bs-table': 'js/bootstrap-table',
            'bs-table-cn': {
                path: 'js/bootstrap-table-zh-CN',
                shim: {deps: ['bs-table']}
            },
            'api-check': 'js/api-check',
            'angular-formly': {
                path: 'js/formly',
                shim: {deps: ['api-check']}
            },
            'angular-formly-templates-bootstrap': {
                path: 'js/angular-formly-templates-bootstrap',
                shim: {deps: ['angular-formly']}
            }
        },
        nonDebugs: []
    }
);