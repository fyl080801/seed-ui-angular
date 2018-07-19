define(["require", "exports", "app/boot", "angular", "app/configs/enums/size"], function (require, exports, boot, angular, size_1) {
    "use strict";
    exports.__esModule = true;
    var ConfirmPromise = (function () {
        function ConfirmPromise(defer) {
            this.defer = defer;
        }
        ConfirmPromise.prototype.ok = function (callback) {
            this.defer.promise.then(callback || angular.noop);
            return this;
        };
        ConfirmPromise.prototype.cancel = function (callback) {
            this.defer.promise["catch"](callback || angular.noop);
            return this;
        };
        return ConfirmPromise;
    }());
    var PopupService = (function () {
        function PopupService($modal, $q, $rootScope) {
            this.$modal = $modal;
            this.$q = $q;
            this.$rootScope = $rootScope;
        }
        PopupService.prototype.confirm = function (text, size) {
            var defer = this.$q.defer();
            var promise = new ConfirmPromise(defer);
            this.$modal
                .open({
                templateUrl: 'app/templates/popup/confirm.html',
                size: size ? size : size_1.Size.sm,
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: {
                        text: text ? text : '是否确认操作？'
                    }
                })
            })
                .result.then(function (result) {
                if (result === true) {
                    defer.resolve(result);
                }
                else {
                    defer.reject(result);
                }
            })["catch"](function () {
                defer.reject();
            });
            return promise;
        };
        PopupService.prototype.error = function (text, size) {
            var defered = this.$q.defer();
            var _data = {};
            if (text === null || text === undefined) {
                _data = angular.extend(_data, {
                    text: '发生错误'
                });
            }
            else if (typeof text !== 'string') {
                _data = angular.extend(_data, {
                    contents: text
                });
            }
            else {
                _data = angular.extend(_data, {
                    text: text
                });
            }
            this.$modal
                .open({
                templateUrl: 'app/templates/popup/error.html',
                size: size ? size : size_1.Size.sm,
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: _data
                })
            })
                .result.then(function (result) {
                defered.resolve(result);
            });
            return defered.promise;
        };
        PopupService.prototype.information = function (text, size) {
            var defered = this.$q.defer();
            this.$modal
                .open({
                templateUrl: 'app/templates/popup/information.html',
                size: size ? size : size_1.Size.sm,
                scope: angular.extend(this.$rootScope.$new(), {
                    $data: {
                        text: text ? text : '操作成功'
                    }
                })
            })
                .result.then(function (data) {
                defered.resolve();
            });
            return defered.promise;
        };
        PopupService.$inject = ['$modal', '$q', '$rootScope'];
        return PopupService;
    }());
    boot.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('app/templates/popup/information.html', '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;消息</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>');
            $templateCache.put('app/templates/popup/error.html', '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;错误</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>');
            $templateCache.put('app/templates/popup/confirm.html', '<div><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;确认</h4></div><div class="modal-body clearfix"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close(true)"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button><button class="btn btn-default" type="button" ng-click="$dismiss()"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;取消</button></div></div>');
        }
    ]);
    boot.service('app/services/popupService', PopupService);
});
//# sourceMappingURL=popupService.js.map