define(['app/boot'], function(services) {
  'use strict';

  boot.service('app/services/httpService', [
    '$http',
    '$q',
    '$modal',
    '$appConfig',
    'app.factories.httpDataHandler',
    function($http, $q, $modal, $appConfig, httpDataHandler) {
      var me = this;

      this.resolveUrl = function(url) {
        return url.indexOf('http://') === 0 || url.indexOf('https://') === 0
          ? url
          : $appConfig.serverUrl + url;
      };

      this.get = function(url) {
        var defer = $q.defer();
        var cancelDefer = $q.defer();
        $http({
          method: 'get',
          url: me.resolveUrl(url),
          withCredentials: false,
          timeout: cancelDefer.promise
        }).then(
          function(response) {
            httpDataHandler.doResponse(response, defer);
          },
          function(response) {
            httpDataHandler.doError(response, defer);
          }
        );
        defer.promise.cancel = function() {
          cancelDefer.resolve();
        };
        return defer.promise;
      };

      this.post = function(url, params) {
        var defer = $q.defer();
        var cancelDefer = $q.defer();
        $http({
          method: 'post',
          data: params,
          url: me.resolveUrl(url),
          withCredentials: false,
          timeout: cancelDefer.promise,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(
          function(response) {
            httpDataHandler.doResponse(response, defer);
          },
          function(response) {
            httpDataHandler.doError(response, defer);
          }
        );
        defer.promise.cancel = function() {
          cancelDefer.resolve();
        };
        return defer.promise;
      };

      this.jsonp = function(url, params) {
        var defer = $q.defer();
        var cancelDefer = $q.defer();
        $http({
          method: 'jsonp',
          data: params,
          url: me.resolveUrl(url),
          withCredentials: false,
          timeout: cancelDefer.promise
        }).then(
          function(response) {
            httpDataHandler.doResponse(response, defer);
          },
          function(response) {
            httpDataHandler.doError(response, defer);
          }
        );
        defer.promise.cancel = function() {
          cancelDefer.resolve();
        };
        return defer.promise;
      };
    }
  ]);
});
