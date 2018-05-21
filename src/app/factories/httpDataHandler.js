define(['app/boot'], function(boot) {
  'use strict';

  boot.factory('app/factories/httpDataHandler', [
    '$modal',
    function($modal) {
      var handler = {
        doResponse: function(response, defered) {
          response.data = response.data ? response.data : {};
          if (response.data && response.data.success === false) {
            handler.doError(response, defered);
          } else {
            defered.resolve(response.data);
          }
        },

        doError: function(response, defered) {
          response.data = response.data ? response.data : {};
          $modal.open({
            templateUrl: 'templates/modal/Error.html',
            data: {
              text: response.data.message
            }
          });
          defered.reject(response.data);
        }
      };
      return handler;
    }
  ]);
});
