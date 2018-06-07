define(["require", "exports", "app/boot", "angular"], function (require, exports, boot, angular) {
    "use strict";
    exports.__esModule = true;
    var TreeContext = (function () {
        function TreeContext(defer) {
            this.defer = defer;
            this.result = this.defer.promise;
        }
        TreeContext.prototype.onEach = function (fn) {
            this.eachCallback = fn;
            return this;
        };
        return TreeContext;
    }());
    var TreeConvertContext = (function () {
        function TreeConvertContext(defer) {
            this.defer = defer;
            this._key = 'id';
            this._parentKey = 'parentId';
            this.result = this.defer.promise;
        }
        TreeConvertContext.prototype.key = function (name) {
            if (name) {
                this._key = name;
                return this;
            }
            return this._key;
        };
        TreeConvertContext.prototype.parentKey = function (name) {
            if (name) {
                this._parentKey = name;
                return this;
            }
            return this._parentKey;
        };
        TreeConvertContext.prototype.onEach = function (fn) {
            this.eachCallback = fn;
            return this;
        };
        return TreeConvertContext;
    }());
    var TreeUtility = (function () {
        function TreeUtility($q, $timeout) {
            this.$q = $q;
            this.$timeout = $timeout;
        }
        TreeUtility.prototype.convertToTree = function (data, context) {
            var map = {};
            data.forEach(function (item, idx, arr) {
                var current = arr[idx];
                map[current[context.key()]] = {
                    $data: current,
                    $key: current[context.key()]
                };
            });
            var root = {
                $data: null,
                $key: null,
                $children: []
            };
            for (var key in map) {
                var current = map[key];
                var parent_1 = map[current.$data[context.parentKey()]];
                if (parent_1) {
                    current.$parent = parent_1;
                    (parent_1.$children || (parent_1.$children = [])).push(current);
                }
                else {
                    current.$parent = root;
                    root.$children.push(current);
                }
                (context.eachCallback || angular.noop)(current);
            }
            return root;
        };
        TreeUtility.prototype.doEachTree = function (root, context) {
            var self = this;
            root.$children.forEach(function (item) {
                (context.eachCallback || angular.noop)(item);
                if (item.$children) {
                    self.doEachTree(item, context);
                }
            });
        };
        TreeUtility.prototype.toTree = function (data) {
            var self = this;
            var defer = this.$q.defer();
            var context = new TreeConvertContext(defer);
            this.$timeout(function () {
                defer.resolve(self.convertToTree(data, context));
            });
            return context;
        };
        TreeUtility.prototype.eachTree = function (root) {
            var self = this;
            var defer = this.$q.defer();
            var context = new TreeContext(defer);
            this.$timeout(function () {
                self.doEachTree(root, context);
                defer.resolve(root);
            });
            return context;
        };
        TreeUtility.$inject = ['$q', '$timeout'];
        return TreeUtility;
    }());
    boot.service('app/services/treeUtility', TreeUtility);
});
//# sourceMappingURL=treeUtility.js.map