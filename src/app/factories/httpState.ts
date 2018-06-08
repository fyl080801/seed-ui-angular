import boot = require('app/boot');

function factory($appEnvironment: app.IAppEnvironment): ng.IHttpInterceptor {
  return {
    request(config: ng.IRequestConfig) {
      $appEnvironment.ajaxState.loading = true;
      $appEnvironment.ajaxState.url = config.url;
      $appEnvironment.ajaxState.method = config.method;
      $appEnvironment.ajaxState.data = config.data;
      return config;
    },
    requestError(rejection: any) {
      $appEnvironment.ajaxState.loading = false;
      $appEnvironment.ajaxState.url = null;
      $appEnvironment.ajaxState.method = null;
      $appEnvironment.ajaxState.data = null;
      return rejection;
    },
    response(response: ng.IHttpResponse<any>) {
      $appEnvironment.ajaxState.loading = false;
      $appEnvironment.ajaxState.url = null;
      $appEnvironment.ajaxState.method = null;
      $appEnvironment.ajaxState.data = null;
      return response;
    },
    responseError(rejection: any) {
      $appEnvironment.ajaxState.loading = false;
      $appEnvironment.ajaxState.url = null;
      $appEnvironment.ajaxState.method = null;
      $appEnvironment.ajaxState.data = null;
      return rejection;
    }
  };
}

factory.$inject = ['$appEnvironment'];

boot.factory('app/factories/httpState', factory);
