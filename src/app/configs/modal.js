define(['app/boot'], function (boot) {
    'use strict';
    boot
        .constant('app/configs/modal', {
        modals: {},
        _counter: 0
    })
        .config([
        '$provide',
        'app/configs/modal',
        function ($provide, modal) {
            $provide.decorator('$modal', [
                '$delegate',
                '$rootScope',
                function ($delegate, $rootScope) {
                    var openFn = $delegate.open;
                    $delegate.closeAll = function () {
                        for (var i in modal.modals) {
                            modal.modals[i].dismiss();
                        }
                    };
                    $delegate.open = function (options) {
                        options.isolate =
                            options.isolate === undefined ? true : options.isolate;
                        options.scope = options.scope
                            ? options.scope
                            : $rootScope.$new(options.isolate);
                        options.scope.$data = options.data
                            ? options.data
                            : options.scope.$data
                                ? options.scope.$data
                                : {};
                        options.scope.$handlers = options.handlers
                            ? options.handlers
                            : options.scope.$handlers
                                ? options.scope.$handlers
                                : {};
                        options.scope.$stores = options.stores
                            ? options.stores
                            : options.scope.$stores
                                ? options.scope.$stores
                                : {};
                        options.backdrop = options.backdrop ? options.backdrop : 'static';
                        if (options.single === true) {
                            $delegate.closeAll();
                        }
                        var modalInstance = openFn(options);
                        modalInstance.index = ++modal._counter;
                        modalInstance.result.then(function () {
                            delete modal.modals[modalInstance.index];
                        }, function () {
                            delete modal.modals[modalInstance.index];
                        });
                        modal.modals[modal._counter] = modalInstance;
                        return modalInstance;
                    };
                    return $delegate;
                }
            ]);
        }
    ]);
});
//# sourceMappingURL=modal.js.map