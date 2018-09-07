import boot = require('app/boot');

function directive(
  $rootScope: ng.IRootScopeService,
  $timeout: ng.ITimeoutService
): ng.IDirective {
  function _link(
    scope: any,
    instanceElement: JQLite,
    instanceAttributes: ng.IAttributes
  ) {
    $rootScope.$on('$stateChangeSuccess', (event, toState: ng.ui.IState) => {
      $timeout(() => {
        document.title =
          toState.data && toState.data.title ? toState.data.title : '';
      });
    });
  }

  return {
    restrict: 'E',
    link: _link
  };
}

directive.$inject = ['$rootScope', '$timeout'];

boot.directive('title', directive);
