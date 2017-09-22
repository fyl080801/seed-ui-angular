define([
    'app/services'
], function (services) {
    'use strict';

    services.service('app.services.ajaxService', [
        '$q',
        '$modal',
        '$appConfig',
        'app.factories.httpDataHandler',
        function ($q, $modal, $appConfig, httpDataHandler) {
            // jquery.ajax
        }
    ]);
});