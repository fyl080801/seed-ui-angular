import boot = require('app/boot');
import angular = require('angular');

class DelayTimerContext implements app.services.IDelayTimerContext {
  private _callback: (state: any) => any;
  private _canceling: () => void;

  callback(fn: (state: any) => any): app.services.IDelayTimerContext;
  callback(): (state: any) => any;
  callback(fn?: any) {
    if (fn && angular.isFunction(fn)) {
      this._callback = fn;
      return this as app.services.IDelayTimerContext;
    } else {
      return this._callback || angular.noop;
    }
  }

  canceling(fn: () => void): app.services.IDelayTimerContext;
  canceling(): () => void;
  canceling(fn?: any) {
    if (fn && angular.isFunction(fn)) {
      this._canceling = fn;
      return this as app.services.IDelayTimerContext;
    } else {
      return this._canceling || angular.noop;
    }
  }

  // callback(
  //   fn?: (state: any) => any
  // ): app.services.IDelayTimerContext | ((state: any) => any) {

  // }

  // canceling(fn?: () => void): app.services.IDelayTimerContext | (() => void) {

  // }
}

class DelayTimer implements app.services.IDelayTimer {
  private _timer: ng.IPromise<void>;
  private _defer: ng.IDeferred<any>;
  private _defaults: app.factories.IDelayTimerOptions;

  private _options(opts) {
    if (opts) {
      this._defaults = angular.extend(this._defaults, opts);
      return this;
    }
    return this._defaults;
  }

  constructor(
    private $timeout: ng.ITimeoutService,
    private $q: ng.IQService,
    private baseOptions: app.factories.IDelayTimerOptions
  ) {
    this._defaults = {
      timeout: 1024
    };
    this._defer = $q.defer();
    this.context = new DelayTimerContext();

    this._options(baseOptions);
  }

  context: app.services.IDelayTimerContext;

  invoke() {
    this.cancel();
    this._defer = this.$q.defer();
    this._defer.promise.then(this.context.callback(), this.context.canceling());
    this._timer = this.$timeout(() => {
      this._defer.resolve();
    }, this._defaults.timeout);
  }

  cancel() {
    this.$timeout.cancel(this._timer);
    this._defer.reject();
    this._defer = null;
  }
}

function factory($timeout, $q): app.factories.IDelayTimerFactory {
  return (options: app.factories.IDelayTimerOptions) => {
    return new DelayTimer($timeout, $q, options);
  };
}

factory.$inject = ['$timeout', '$q'];

boot.factory('app/factories/delayTimer', factory);
