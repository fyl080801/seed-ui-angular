/**
 * Created by fyl08 on 2017/3/2.
 */
define('modules.system.configs.linkManager', [
    'modules.system.configs'
], function (configs) {
    'use strict';

    configs
        .provider('modules.system.configs.linkManager',
            function () {
                var that = this;
                var defaultOrder = 65535;
                var _links = {};

                this.add = function (link) {
                    if (_links[link.id]) {
                        _links[link.id] = $.extend(_links[link.id], link);
                    }

                    link.order = link.order || link.order <= 0 ? link.order : defaultOrder;

                    var linkObj = {
                        _links: {},
                        root: function () {
                            return that;
                        },
                        add: function (l) {
                            l.order = l.order || l.order <= 0 ? l.order : defaultOrder;
                            linkObj._links[l.id] = $.extend(l, deepClone(linkObj));
                            return linkObj;
                        },
                        child: function (l) {
                            l.order = l.order ? l.order : defaultOrder;
                            linkObj._links[l.id] = $.extend(l, deepClone(linkObj));
                            return linkObj._links[l.id];
                        },
                        get: function (id) {
                            return linkObj._links[id];
                        }
                    };
                    _links[link.id] = $.extend(link, linkObj);
                    return _links[link.id];
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

                function deepClone(obj) {
                    var result = {};
                    result['root'] = obj['root'];
                    result['add'] = obj['add'];
                    result['get'] = obj['get'];
                    result['child'] = obj['child'];
                    result['_links'] = {};
                    return result;
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
            }
        );
});