/**
 * Created by fyl08 on 2017/1/23.
 */
define('app.factories.httpDataHandler', [
    'app.factories'
], function (factories) {
    'use strict';

    factories.factory('app.factories.httpDataHandler', [
        '$modal',
        function ($modal) {
            return {
                doResponse: function (response, defered) {
                    response.data = response.data ? response.data : {};
                    if (response.data && response.data.success === false) {
                        this.doError(response, defered);
                    } else {
                        defered.resolve(response.data);
                    }
                },

                doError: function (response, defered) {
                    response.data = response.data ? response.data : {};
                    $modal
                        .open({
                            templateUrl: 'templates/modal/Error.html',
                            data: {
                                text: response.data.message
                            }
                        });
                    defered.reject(response.data);
                }
            };
        }
    ]);
});