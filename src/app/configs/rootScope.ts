import boot = require('app/boot');

class ConfigClass {
  static decorator(
    $delegate: app.configs.IExtendRootScopeService,
    $appEnvironment: app.IAppEnvironment
  ): app.configs.IExtendRootScopeService {
    $delegate.$appEnvironment = $appEnvironment;
    return $delegate;
  }

  constructor($provide: ng.IModule) {
    ConfigClass.decorator.$inject = ['$delegate', '$appEnvironment'];

    $provide.decorator('$rootScope', ConfigClass.decorator);
  }
}

ConfigClass.$inject = ['$provide'];

boot.config(ConfigClass);
