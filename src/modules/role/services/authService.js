/**
 * Created by fyl08 on 2017/2/28.
 */
define('modules.role.services.authService', [
    'modules.role.module'
], function (module) {
    'use strict';

    module.service('modules.role.services.authService', [
        '$q',
        'app.services.httpService',
        function ($q, httpService) {
            this.authorizes = function (id) {
                var defer = $q.defer();

                defer.promise.success = function (fn) {
                    defer.promise.then(function (result) {
                        var groups = {};
                        $.each(result.data, function (index, item) {
                            groups[item.Group] = groups[item.Group] ? groups[item.Group] : [];
                            groups[item.Group].push(item);
                        });
                        var groupArray = [];
                        $.each(groups, function (name, item) {
                            groupArray.push({Name: name, Auths: item});
                        });
                        fn(groupArray);
                    });
                    return defer.promise;
                };

                defer.promise.error = function (fn) {
                    defer.promise.then(null, function (error) {
                        fn(error);
                    });
                    return defer.promise;
                };

                httpService
                    .get('/Role/Authorizes/' + id)
                    .then(function (result) {
                        defer.resolve(result);
                    }, function (result) {
                        defer.reject(result);
                    });

                return defer.promise;
            };

            this.save = function (data) {
                var postData = [];
                $.each(data, function (index, item) {
                    $.each(item.Auths, function (i, auth) {
                        postData.push(auth);
                    });
                });
                return httpService
                    .post('/Role/SetAuthorizes', postData);
            };
        }
    ]);
});