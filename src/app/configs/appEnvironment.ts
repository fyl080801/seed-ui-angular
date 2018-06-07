import boot = require('app/boot');

class AjaxState implements app.IAjaxState {
  loading: boolean = false;
  url?: string;
  method?: string;
  data?: object;
}

class AppEnvironment implements app.IAppEnvironment {
  ajaxState: app.IAjaxState = new AjaxState();
  theme?: string;
}

class AppEnvironmentConfig {
  constructor($provide: ng.IModule) {
    $provide.constant('$appEnvironment', new AppEnvironment());
  }
}

AppEnvironmentConfig.$inject = ['$provide'];

boot.config(AppEnvironmentConfig);
