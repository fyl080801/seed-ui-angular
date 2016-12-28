/**
 * Created by fyl08 on 2016/12/23.
 */
define('app.services.httpService', [
    'require',
    'app.services'
], function (require, services) {
    'use strict';

    services.service('app.services.httpService',
        [
            '$http',
            '$q',
            '$modal',
            '$appConfig',
            '$appEnvironment',
            '$rootScope',
            function ($http, $q, $modal, $appConfig, $appEnvironment, $rootScope) {
                function handleResponse(response, defered) {
                    if (response.data && response.data.Success === false) {
                        var scope = $rootScope.$new();
                        scope.text = response.data.Message;
                        $modal.open({
                            templateUrl: 'templates/information.html',
                            scope: scope
                        });
                        defered.reject(response.data.Message);
                    } else {
                        if (response.config.url.indexOf('SmartPark.WebPage') >= 0) {
                            var result = {};
                            $.each(response.data.Data, function (index, item) {
                                result[item.Name] = item.Result;
                            });
                            defered.resolve(result);
                        } else {
                            defered.resolve(response.data);
                        }
                    }
                    $appEnvironment.session = (response.data && response.data.Session)
                        ? response.data.Session
                        : null;
                }

                function handleError(error, defered) {
                    var scope = $rootScope.$new();
                    scope.text = error;
                    $modal.open({
                        templateUrl: 'templates/information.html',
                        scope: scope
                    });
                    defered.reject(error);
                }

                this.get = function (url) {
                    var defered = $q.defer();
                    $http.get($appConfig.serverUrl + url)
                        .then(function (response) {
                            handleResponse(response, defered);
                        }, function (response) {
                            handleError(response, defered);
                        });
                    return defered.promise;
                };

                this.post = function (url, params) {
                    var defered = $q.defer();
                    $http.post($appConfig.serverUrl + url, params)
                        .then(function (response) {
                            handleResponse(response, defered);
                        }, function (response) {
                            handleError(response, defered);
                        });
                    return defered.promise;
                };
            }
        ]
    );
});