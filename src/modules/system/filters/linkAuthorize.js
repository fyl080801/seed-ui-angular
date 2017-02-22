/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.filters.linkAuthorize', [
    'modules.system'
], function (system) {
    'use strict';

    system.filter('linkAuthorize', [
        '$appEnvironment',
        function ($appEnvironment) {
            return function (input) {
                var result = [];
                $.each(input, function (index, item) {
                    if (item.authorize && $appEnvironment.session) {
                        var isPermission = false;
                        $.each($appEnvironment.session.Permissions, function (i, data) {
                            if (data === item.authorize) {
                                isPermission = true;
                                return false;
                            }
                        });
                        if (isPermission) {
                            result.push(item);
                        }
                    } else if ($appEnvironment.session) {
                        result.push(item);
                    }
                });
                return result;
            };
        }]);
});