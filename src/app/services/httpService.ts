import boot = require('app/boot');

class RequestPromise<TOutput> implements app.services.IRequestPromise<TOutput> {
  constructor(private defer: ng.IDeferred<TOutput>) {}

  cancel(): void {
    this.defer.resolve();
  }

  then<TResult1 = TOutput, TResult2 = never>(
    successCallback?: (
      value: TOutput
    ) => TResult1 | angular.IPromise<never> | angular.IPromise<TResult1>,
    errorCallback?: (
      reason: any
    ) => TResult2 | angular.IPromise<never> | angular.IPromise<TResult2>,
    notifyCallback?: (state: any) => any
  ): angular.IPromise<TResult1 | TResult2> {
    return this.defer.promise.then(
      successCallback,
      errorCallback,
      notifyCallback
    );
  }

  catch<TResult = never>(
    onRejected?: (
      reason: any
    ) => angular.IPromise<never> | TResult | angular.IPromise<TResult>
  ): angular.IPromise<TOutput | TResult> {
    return this.defer.promise.catch(onRejected);
  }

  finally(finallyCallback: () => void): angular.IPromise<TOutput> {
    return this.defer.promise.finally(finallyCallback);
  }
}

class HttpService implements app.services.IHttpService {
  get<TOutput>(url: string): app.services.IRequestPromise<TOutput> {
    var defer = this.$q.defer<TOutput>();
    var promise = new RequestPromise<TOutput>(defer);
    var self = this;

    this.$http<app.services.IResponseContext<TOutput>>({
      method: 'get',
      url: this.resolveUrl(url),
      withCredentials: false,
      timeout: promise
    })
      .then(response => {
        self.httpDataHandler.doResponse(response, defer);
      })
      .catch(response => {
        self.httpDataHandler.doError(response, defer);
      });

    return promise;
  }

  post<TInput, TOutput>(
    url: string,
    param: TInput
  ): app.services.IRequestPromise<TOutput> {
    var defer = this.$q.defer<TOutput>();
    var promise = new RequestPromise<TOutput>(defer);
    var self = this;

    this.$http<app.services.IResponseContext<TOutput>>({
      method: 'post',
      data: param,
      url: this.resolveUrl(url),
      withCredentials: false,
      timeout: promise,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(response => {
        self.httpDataHandler.doResponse(response, defer);
      })
      .catch(response => {
        self.httpDataHandler.doError(response, defer);
      });

    return promise;
  }

  private resolveUrl(url: string): string {
    return url.indexOf('http://') === 0 || url.indexOf('https://') === 0
      ? url
      : this.$appConfig.serverUrl + url;
  }

  static $inject = [
    '$http',
    '$q',
    '$appConfig',
    'app/factories/httpDataHandler'
  ];

  constructor(
    private $http: ng.IHttpService,
    private $q: ng.IQService,
    private $appConfig: app.IAppConfig,
    private httpDataHandler: app.factories.IHttpDataHandler
  ) {}
}

boot.service('app/services/httpService', HttpService);

// define(['app/boot'], function(boot) {
//   'use strict';

//   boot.service('app/services/httpService', [
//     '$http',
//     '$q',
//     '$modal',
//     '$appConfig',
//     'app/factories/httpDataHandler',
//     function($http, $q, $modal, $appConfig, httpDataHandler) {
//       var me = this;

//       this.resolveUrl = function(url) {
//         return url.indexOf('http://') === 0 || url.indexOf('https://') === 0
//           ? url
//           : $appConfig.serverUrl + url;
//       };

//       this.get = function(url) {
//         var defer = $q.defer();
//         var cancelDefer = $q.defer();
//         $http({
//           method: 'get',
//           url: me.resolveUrl(url),
//           withCredentials: false,
//           timeout: cancelDefer.promise
//         }).then(
//           function(response) {
//             httpDataHandler.doResponse(response, defer);
//           },
//           function(response) {
//             httpDataHandler.doError(response, defer);
//           }
//         );
//         defer.promise.cancel = function() {
//           cancelDefer.resolve();
//         };
//         return defer.promise;
//       };

//       this.post = function(url, params) {
//         var defer = $q.defer();
//         var cancelDefer = $q.defer();
//         $http({
//           method: 'post',
//           data: params,
//           url: me.resolveUrl(url),
//           withCredentials: false,
//           timeout: cancelDefer.promise,
//           headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//           }
//         }).then(
//           function(response) {
//             httpDataHandler.doResponse(response, defer);
//           },
//           function(response) {
//             httpDataHandler.doError(response, defer);
//           }
//         );
//         defer.promise.cancel = function() {
//           cancelDefer.resolve();
//         };
//         return defer.promise;
//       };

//       this.jsonp = function(url, params) {
//         var defer = $q.defer();
//         var cancelDefer = $q.defer();
//         $http({
//           method: 'jsonp',
//           data: params,
//           url: me.resolveUrl(url),
//           withCredentials: false,
//           timeout: cancelDefer.promise
//         }).then(
//           function(response) {
//             httpDataHandler.doResponse(response, defer);
//           },
//           function(response) {
//             httpDataHandler.doError(response, defer);
//           }
//         );
//         defer.promise.cancel = function() {
//           cancelDefer.resolve();
//         };
//         return defer.promise;
//       };
//     }
//   ]);
// });
