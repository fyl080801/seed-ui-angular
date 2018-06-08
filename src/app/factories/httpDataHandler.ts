import boot = require('app/boot');
import angular = require('angular');

function factory(
  popupService: app.services.IPopupService
): app.factories.IHttpDataHandler {
  return {
    doResponse<TOutput>(
      response: ng.IHttpResponse<app.services.IResponseContext<TOutput>>,
      defer: ng.IDeferred<TOutput>
    ) {
      response.data = angular.extend(
        {
          success: false
        },
        response.data
      );
      if (response.data.success) {
        defer.resolve(response.data.data);
      } else {
        this.doError(response, defer);
      }
    },

    doError<TOutput>(
      response: ng.IHttpResponse<app.services.IResponseContext<TOutput>>,
      defer: ng.IDeferred<TOutput>
    ) {
      response.data = angular.extend(
        {
          success: false
        },
        response.data
      );

      popupService.error(response.data.message);

      defer.reject(response.data);
    }
  };
}

factory.$inject = ['app/services/popupService'];

boot.factory('app/factories/httpDataHandler', factory);
