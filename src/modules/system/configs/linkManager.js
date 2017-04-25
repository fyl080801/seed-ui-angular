/**
 * Created by fyl08 on 2017/3/2.
 */
define('modules.system.configs.linkManager', [
    'modules.system.configs'
], function (configs) {
    'use strict';

    configs
        .provider('modules.system.configs.linkManager', function () {
            var that = this;
            var defaultOrder = 65535;
            var _links = {};

            this.add = function (link) {
                return _links[link.id] = _links[link.id]
                    ? $.extend(_links[link.id], link)
                    : $.extend(link, createLink(link.order));
            };

            this.get = function (id) {
                return _links[id];
            };

            // $get
            this.$get = function () {
                return {
                    get: that.get,
                    tree: function () {
                        return buildTree(_links);
                    },
                    links: _links
                };
            };

            function createLink(order) {
                var linkObject = {
                    _links: {},
                    _root: that,
                    order: order || order <= 0 ? order : defaultOrder
                };

                linkObject.add = function (sl) {
                    this._links[sl.id] = $.extend(sl, createLink(sl.order));
                    return this;
                };

                linkObject.get = function (id) {
                    return this._links[id];
                };

                linkObject.root = function () {
                    return that;
                };

                return linkObject;
            }

            function buildTree(links) {
                var result = [];
                for (var id in links) {
                    var tree = links[id];
                    tree.links = buildTree(tree._links);
                    result.push(tree);
                }
                result.sort(orderBy('order'));
                return result;
            }

            function orderBy(name) {
                if (!name)
                    return function () {
                        return -1;
                    };
                return function (o, p) {
                    var a, b;
                    if (typeof o === 'object' && typeof p === 'object' && o && p) {
                        a = o[name];
                        b = p[name];
                        if (a === b) {
                            return 0;
                        }
                        if (typeof a === typeof b) {
                            return a < b ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    }
                    else {
                        throw ('菜单排序异常');
                    }
                }
            }
        });
});