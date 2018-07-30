import boot = require('app/boot');

class RouteRun {
  constructor(
    $rootScope: app.IExtendRootScopeService,
    $state: app.IExtendStateService,
    $stateParams: ng.ui.IStateParamsService
  ) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on(
      '$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {}
    );
    $rootScope.$on(
      '$stateChangeSuccess',
      (event, toState, toParams, fromState, fromParams) => {
        $rootScope.$previous = fromState;
        $rootScope.$previousParams = fromParams;
      }
    );
    $state.back = () => {
      if ($rootScope.$previous)
        return $state.go($rootScope.$previous.name, $rootScope.$previousParams);
    };
  }
}

RouteRun.$inject = ['$rootScope', '$state', '$stateParams'];

boot.run(RouteRun);
