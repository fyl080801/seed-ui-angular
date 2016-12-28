/**
 * Created by fyl08 on 2016/12/22.
 */
(function () {
    'use strict';

    require.config({
        urlArgs: 'v=1.1.69',
        paths: {
            'reference': 'js/reference',
            'iepatch': 'js/iepatch',
            'app.application': 'js/application'
        },
        shim: {
            'app.application': {
                deps: ['reference']
            }
        }
    });

    if (document.getElementsByTagName('html')[0].getAttribute('data-html-type') === 'no-js lte-ie8') {
        require(['iepatch'], function () {
            require('iepatch');
        });
    }

    require([
        'app.application'
    ], function (application) {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app.application']);
            angular.element(document).find('html')
            //.attr('id', 'ng-app')
            //.addClass('ng-app:app.application')
                .attr('ng-app', 'app.application');

        });
    });
})();