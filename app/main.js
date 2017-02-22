/**
 * Created by fyl08 on 2016/12/22.
 */
(function (app) {
    'use strict';

    var modules = {
        'system': {},
        'controls': {deps: ['system']},
        'user': {deps: ['controls']},
        'role': {deps: ['controls']},
        'group': {deps: ['controls']},
        'log': {deps: ['controls']},
        'resource': {deps: ['controls']},
        'program': {deps: ['controls']},
        'examine': {deps: ['controls']},
        'notify': {deps: ['controls']},
        'terminal': {deps: ['controls']},
        'monitor': {deps: ['controls']}
    };

    var nonDebug = [];

    var requires = ['app.application'],
        config = {
            urlArgs: 'v=1.0.18',
            paths: {
                'iepatch': 'js/iepatch',// ie8补丁
                'angular': 'js/reference',// angular需要在模块里引用所以声明一下
                'reference': 'js/reference',// 所有基础框架引用
                'bs-table': 'js/bootstrap-table',// 项目中需要用到的第三方框架
                'bs-table-cn': 'js/bootstrap-table-zh-CN',
                'clockpicker': 'js/bootstrap-clockpicker',
                'angular-formly': 'js/formly',
                'angular-formly-templates-bootstrap': 'js/angular-formly-templates-bootstrap',
                'api-check': 'js/api-check',
                'webuploader': 'js/webuploader',
                'app.application': 'js/app.application'// 最后引用主框架
            },
            shim: {
                'app.application': {
                    deps: ['reference']
                },
                'bs-table-cn': {
                    deps: ['bs-table']
                },
                'angular-formly': {
                    deps: ['api-check']
                },
                'angular-formly-templates-bootstrap': {
                    deps: ['angular-formly']
                }
            }
        };

    initBrowserPatch(requires);
    initModules(requires, config, modules);
    initDebug(config);
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

    function initModules(requires, config, modules) {
        for (var moduleName in modules) {
            var modulePath = 'modules.' + moduleName;
            var requirePath = modulePath + '.requires';
            var moduleDeps = ['app.application'];
            var configDeps = modules[moduleName].deps;
            if (Object.prototype.toString.call(configDeps) === '[object Array]') {
                for (var index in configDeps) {
                    moduleDeps.push('modules.' + configDeps[index]);
                }
            }
            else if (configDeps) {
                moduleDeps.push('modules.' + configDeps);
            }
            config.paths[requirePath] = 'js/module.' + moduleName;
            config.paths[modulePath] = 'js/modules';
            config.shim[modulePath] = {deps: moduleDeps};
            config.shim[requirePath] = {deps: [modulePath]};
            requires.push(modulePath);
        }
    }

    function initDebug(config) {
        var debug = eval(app.getAttribute('data-debug')) ? '' : '.min';
        for (var index in config.paths) {
            var isDebug = true;
            for (var i in nonDebug) {
                if (nonDebug[i] === index) {
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
})(document.getElementById('app'));