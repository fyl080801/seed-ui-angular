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
                    link.order = link.order ? link.order : defaultOrder;
                    var linkObj = {
                        _links: {},
                        root: function () {
                            return that;
                        },
                        add: function (l) {
                            l.order = l.order ? l.order : defaultOrder;
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
                    return result;
                }
            }
        );
});