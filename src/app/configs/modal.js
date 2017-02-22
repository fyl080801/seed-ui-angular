/**
 * Created by fyl08 on 2017/1/20.
 */
define('app.configs.modal', [
    'app.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('$modal', [
                '$delegate',
                '$rootScope',
                function ($delegate, $rootScope) {
                    var openFn = $delegate.open;

                    $rootScope.$modals = [];

                    $delegate.closeAll = function () {
                        while ($rootScope.$modals.length > 0) {
                            $rootScope.$modals.pop().close();
                        }
                    };

                    /**
                     * 打开模态窗口
                     * @param options.isolate
                     * @param options.scope
                     * @param options.data
                     * @param options.handlers
                     * @param options.stores
                     * @param options.backdrop
                     * @param options.single
                     * @param options.size
                     */
                    $delegate.open = function (options) {
                        // 数据
                        options.isolate = options.isolate === undefined ? true : options.isolate;
                        options.scope = options.scope ? options.scope : $rootScope.$new(options.isolate);
                        options.scope.$data = options.data ? options.data : (options.scope.$data ? options.scope.$data : {});
                        options.scope.$handlers = options.handlers ? options.handlers : (options.scope.$handlers ? options.scope.$handlers : {});
                        options.scope.$stores = options.stores ? options.stores : (options.scope.$stores ? options.scope.$stores : {});

                        // 样式
                        options.backdrop = options.backdrop ? options.backdrop : 'static';

                        //行为
                        if (options.single === true) {
                            $delegate.closeAll();
                        }

                        var modalInstance = openFn(options);
                        var modalRemove = function () {
                            if (modalInstance.index === $rootScope.$modals.length - 1) {
                                $rootScope.$modals.pop();
                            }
                            else {

                            }
                        };
                        modalInstance.index = $rootScope.$modals.push(modalInstance) - 1;
                        modalInstance.result.then(modalRemove, modalRemove);

                        return modalInstance;
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
});