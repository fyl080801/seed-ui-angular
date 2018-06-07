import boot = require('app/boot');

class ConfigClass {
  private decorator(
    $delegate: app.configs.IExtendRootScopeService,
    $appEnvironment: app.IAppEnvironment
  ): app.configs.IExtendRootScopeService {
    $delegate.$appEnvironment = $appEnvironment;
    return $delegate;
  }

  constructor($provide: ng.IModule) {
    this.decorator.$inject = ['$delegate', '$appEnvironment'];

    $provide.decorator('$rootScope', this.decorator);
  }
}

ConfigClass.$inject = ['$provide'];

boot.config(ConfigClass);
