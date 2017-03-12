/**
 * Created by fyl08 on 2017/2/3.
 */
define('modules.controls.directives.bsTable', [
    'modules.controls.module',
    'bs-table',
    'bs-table-cn'
], function (module) {
    'use strict';

    // 初始化行
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initRow = BootstrapTable.prototype.initRow;

    BootstrapTable.prototype.initRow = function (item, i, data, parentDom) {
        var that = this;

        var row = _initRow.apply(that, Array.prototype.slice.apply(arguments));
        if (Object.prototype.toString.call(row) !== '[object String]') {
            return row;
        }
        var rowElement = $(row);
        var rowData = item;

        // actions
        var actions = rowElement.find('[data-action]');
        actions.each(function (idx, a) {
            var action = $(a);
            var e = that.options.actions[action.attr('data-action')];
            if (e) action.on('click', function (event) {
                e(rowData, i, event);
            });
        });

        //renderer
        var renderers = rowElement.find('[data-renderer]');
        renderers.each(function (idx, a) {
            var element = $(a);
            var e = that.options.renderers[element.attr('data-renderer')];
            if (e) {
                e(rowData, i, element);
            }
        });

        // ext
        rowElement.find('td').each(function (idx, cell) {
            var cellElement = $(cell);
            var columnOptions = that.columns[idx];
            var args = {
                options: that.options,
                column: columnOptions
            };

            // behavior
            var behavior = columnOptions.behavior && that.options.behaviors && that.options.behaviors[columnOptions.behavior]
                ? that.options.behaviors[columnOptions.behavior]
                : null;
            if (behavior) {
                for (var name in  behavior) {
                    cellElement.on(name, function (event) {
                        behavior[event.type](rowData[columnOptions.field], rowData, i, $.extend({
                            event: event
                        }, args));
                    });
                }
            }

            // converter
            var converter = columnOptions.converter && that.options.converters && that.options.converters[columnOptions.converter]
                ? that.options.converters[columnOptions.converter]
                : null;
            if (converter) {
                cellElement.html(converter(rowData[columnOptions.field], rowData, i, $.extend({
                    element: cellElement
                }, args)));
            }
        });

        return rowElement;
    };

    module.directive('bsTable', [
        '$compile',
        'app.services.httpService',
        function ($compile, httpService) {
            var _link = function ($scope, $element, $attrs, $ctrl) {
            };

            var _controller = [
                '$scope',
                '$element',
                '$attrs',
                function ($scope, $element, $attrs) {
                    var me = this;

                    var options = $.extend($scope.bsTable, $attrs);
                    this.options = options;

                    // 初始化参数
                    options.striped = options.striped ? options.striped : true;
                    options.method = options.method ? options.method : 'POST';
                    options.dataField = options.dataField ? options.dataField : 'data';
                    options.pagination = options.pagination !== undefined ? options.pagination : 'true';
                    options.sidePagination = options.sidePagination ? options.sidePagination : 'server';
                    options.url = options.url ? httpService.resolveUrl(options.url) : options.url;
                    options.converters = options.converters ? options.converters : {};
                    options.behaviors = options.behaviors ? options.behaviors : {};
                    options.renderers = options.renderers ? options.renderers : {};
                    options.limitParam = options.limitParam ? options.limitParam : 'rowCount';// 传递分页记录数
                    options.pageParam = options.pageParam ? options.pageParam : 'current';// 传递当前页参数
                    options.sortsParam = options.sortsParam ? options.sortsParam : 'sort';// 传递排序参数

                    // 重新定义ajax方法
                    options.ajax = function (request) {
                        (request.type === 'POST' || request.type === 'post'
                            ? httpService.post(request.url, Object.prototype.toString.call(request.data) === '[object Object]' ? request.data : JSON.parse(request.data))
                            : httpService.get(request.url))
                            .then(request.success, request.error);
                    };

                    // 组合请求参数
                    options.queryParams = function (params) {
                        var exParams = {};
                        exParams[options.limitParam] = params.limit ? params.limit : 10;
                        exParams[options.pageParam] = (params.offset / params.limit) + 1;
                        if (params[options.sortsParam]) {
                            exParams[options.sortsParam] = {};
                            exParams[options.sortsParam][params.sort] = params.order;
                        }
                        var optionParams = options.params;
                        $.each(optionParams, function (index, param) {
                            if (param !== null || param !== undefined)
                                exParams[index] = param;
                        });
                        return exParams;
                    };

                    // 直接输出列定义的html
                    var templates = $element.find('[data-template="true"]');
                    templates.attr('data-formatter', function () {
                        return templates.html();
                    });

                    // 初始化表格
                    $element.bootstrapTable(options);

                    // 方法
                    options.reload = function () {
                        $element.bootstrapTable('refresh');
                    };
                }
            ];

            return {
                scope: {
                    bsTable: '='
                },
                link: _link,
                controller: _controller
            };
        }
    ]);
});