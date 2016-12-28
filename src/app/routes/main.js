/**
 * Created by fyl08 on 2016/12/23.
 */
define('app.routes.main', [
    'require',
    'app.routes'
], function (require, routes) {
    'use strict';

    routes.config(
        [
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider.state('main', {
                    url: '/',
                    template: '<button class="btn btn-default">啊啊啊</button>',
                    data: {
                        title: 'aaaaaa'
                    }
                });
            }
        ]
    );
});