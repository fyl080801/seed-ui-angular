define([
    'modules/ngtable/module'
], function (module) {
    'use strict';

    module.controller('modules.ngtable.controllers.ngTableFilterRowController', [
        '$scope',
        'modules.ngtable.providers.ngTableFilterConfig',
        function ($scope, ngTableFilterConfig) {
            $scope.config = ngTableFilterConfig;
        }
    ]);
});