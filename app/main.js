/**
 * Created by fyl08 on 2016/12/22.
 * var modules = {
        'modules.smartpark': {
            requires: 'modules.smartpark.requires',
            path: 'js/smartpark'
        },
        'modules.ck': {
            requires: 'modules.ck.requires',
            path: 'js/ck'
        },
        'modules.enterprise': {
            requires: 'modules.enterprise.requires',
            path: 'js/enterprise'
        },
        'modules.personal': {
            requires: 'modules.personal.requires',
            path: 'js/personal'
        }
    };
 */
(function () {
    'use strict';

    var modules = {};

    var requires = ['app.application'], config = {
        urlArgs: 'v=1.0.0',
        paths: {
            'reference': 'js/reference',
            'iepatch': 'js/iepatch',
            'app.application': 'js/application'
        },
        shim: {
            'app.application': {deps: ['reference']}
        }
    };
    var debug = eval(document.getElementById('app').getAttribute('data-debug')) ? '' : '.min';

    if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8') {
        requires.push('iepatch');
    }

    for (var index in modules) {
        config.paths[modules[index].requires] = modules[index].path;
        config.paths[index] = 'js/modules';
        config.shim[modules[index].requires] = {deps: [index]};
        requires.push(index);
    }

    for (var index in config.paths) {
        config.paths[index] = config.paths[index] + debug;
    }

    require.config(config);
    require(requires, function (application) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app.application']);
            angular.element(document).find('html')
                .attr('id', 'ng-app')
                //.addClass('ng-app:app.application');
                .attr('ng-app', 'app.application');
        });
    });
})();