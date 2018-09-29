var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/boot", "angular"], function (require, exports, boot, angular) {
    "use strict";
    exports.__esModule = true;
    var TreeContext = (function () {
        function TreeContext(defer) {
            this.defer = defer;
            this.result = this.defer.promise;
        }
        TreeContext.prototype.onEach = function (fn) {
            this.defer.promise.then(angular.noop, angular.noop, fn);
            return this;
        };
        return TreeContext;
    }());
    var TreeConvertContext = (function (_super) {
        __extends(TreeConvertContext, _super);
        function TreeConvertContext() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._key = 'id';
            _this._parentKey = 'parentId';
            return _this;
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
        return TreeConvertContext;
    }(TreeContext));
    var TreeResolveContext = (function (_super) {
        __extends(TreeResolveContext, _super);
        function TreeResolveContext() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._key = 'id';
            _this._childrenKey = 'children';
            return _this;
        }
        TreeResolveContext.prototype.key = function (name) {
            if (name) {
                this._key = name;
                return this;
            }
            return this._key;
        };
        TreeResolveContext.prototype.childrenKey = function (name) {
            if (name) {
                this._childrenKey = name;
                return this;
            }
            return this._childrenKey;
        };
        return TreeResolveContext;
    }(TreeContext));
    var TreeUtility = (function () {
        function TreeUtility($q, $timeout) {
            this.$q = $q;
            this.$timeout = $timeout;
        }
        TreeUtility.prototype._convert = function (data, context, defer) {
            var map = {};
            for (var i = 0; i < data.length; i++) {
                var current = data[i];
                map[current[context.key()]] = {
                    $data: current,
                    $key: current[context.key()]
                };
            }
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
                defer.notify(current);
            }
            return root;
        };
        TreeUtility.prototype._resolve = function (data, context, defer, parent) {
            var node = {
                $data: data,
                $parent: parent,
                $key: data[context.key()]
            };
            var resolvedChildren = [];
            var children = data[context.childrenKey()];
            children = angular.isArray(children) ? children : [];
            for (var i = 0; i < children.length; i++) {
                resolvedChildren.push(this._resolve(children[i], context, defer, node));
            }
            node.$children = resolvedChildren;
            delete node.$data[context.childrenKey()];
            defer.notify(node);
            return node;
        };
        TreeUtility.prototype._each = function (root, context, defer) {
            for (var i = 0; i < root.$children.length; i++) {
                defer.notify(root.$children[i]);
                if (root.$children[i].$children) {
                    this._each(root.$children[i], context, defer);
                }
            }
        };
        TreeUtility.prototype.toTree = function (data) {
            var _this = this;
            var defer = this.$q.defer();
            var context = new TreeConvertContext(defer);
            this.$timeout(function () {
                defer.resolve(_this._convert(data, context, defer));
            });
            return context;
        };
        TreeUtility.prototype.resolveTree = function (data) {
            var _this = this;
            var defer = this.$q.defer();
            var context = new TreeResolveContext(defer);
            this.$timeout(function () {
                defer.resolve(_this._resolve(data, context, defer));
            });
            return context;
        };
        TreeUtility.prototype.eachTree = function (root) {
            var _this = this;
            var defer = this.$q.defer();
            var context = new TreeContext(defer);
            this.$timeout(function () {
                _this._each(root, context, defer);
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