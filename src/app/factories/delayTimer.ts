import boot = require('app/boot');
import angular = require('angular');

class DelayTimerContext implements app.services.IDelayTimerContext {
  constructor(private defer: ng.IDeferred<any>) {}

  callback(fn: (state: any) => any) {
    this.defer.promise.then(fn);
    return this;
  }

  canceling(fn: () => void) {
    this.defer.promise.catch(fn);
    return this;
  }
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
    this.context = new DelayTimerContext(this._defer);

    this._options(baseOptions);
  }

  context: app.services.IDelayTimerContext;

  invoke() {
    this.cancel();
    this._timer = this.$timeout(() => {
      this._defer.resolve();
    }, this._defaults.timeout);
  }

  cancel() {
    this._defer.reject();
    this.$timeout.cancel(this._timer);
  }
}

function factory($timeout, $q): app.factories.IDelayTimerFactory {
  return (options: app.factories.IDelayTimerOptions) => {
    return new DelayTimer($timeout, $q, options);
  };
}

factory.$inject = ['$timeout', '$q'];

boot.factory('app/factories/delayTimer', factory);
