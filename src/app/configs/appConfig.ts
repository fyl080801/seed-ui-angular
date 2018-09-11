import boot = require('app/boot');
import angular = require('angular');

boot.config([
  '$provide',
  function($provide) {
    var app =
      angular.element(document).find('#app').length > 0
        ? angular.element(document).find('#app')
        : null;
    $provide.constant('$appConfig', {
      serverUrl: app ? app.attr('data-server') : '',
      debug: app ? (eval(app.attr('data-debug')) ? true : false) : false
    });
  }
]);
