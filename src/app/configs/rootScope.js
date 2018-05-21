/**
 * Created by fyl08 on 2016/12/28.
 */
define(['app/boot'], function(boot) {
  'use strict';

  boot.config([
    '$provide',
    function($provide) {
      $provide.decorator('$rootScope', [
        '$delegate',
        '$appEnvironment',
        function($delegate, $appEnvironment) {
          $delegate.$appEnvironment = $appEnvironment;
          return $delegate;
        }
      ]);
    }
  ]);
});
