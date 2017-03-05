/**
 * Created by fyl08 on 2017/2/3.
 */
define('modules.controls.directives.bsTable', [
    'modules.controls.module',
    'bs-table',
    'bs-table-cn'
], function (module) {
    'use strict';

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

                    // 初始化参数
                    options.striped = options.striped ? options.striped : true;
                    options.method = options.method ? options.method : 'POST';
                    options.dataField = options.dataField ? options.dataField : 'data';
                    options.pagination = options.pagination ? options.pagination : 'true';
                    options.sidePagination = options.sidePagination ? options.sidePagination : 'server';
                    options.url = options.url ? httpService.resolveUrl(options.url) : options.url;
                    options.converters = options.converters ? options.converters : {};
                    options.behaviors = options.behaviors ? options.behaviors : {};
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

                    // 数据加载完毕生成表，执行附加样式
                    options.onLoadSuccess = function (data) {
                        var rows = $element.find('tbody tr');
                        rows.each(function (index, elm) {
                            var rowData = data.data[index];
                            // actions
                            var actions = $(elm).find('[data-action]');
                            actions.each(function (i, a) {
                                var action = $(a);
                                var e = options.actions[action.attr('data-action')];
                                if (e) action.on('click', function () {
                                    e(rowData, index, a);
                                });
                            });

                            // ext
                            var cells = $(elm).find('td');
                            cells.each(function (i, a) {
                                var behavior = me.behaviors[i];
                                if (behavior) {
                                    var eventNames = '',
                                        behaviorFn = function (event) {
                                            behavior.behavior[event.type](event, rowData[behavior.field], rowData, index);
                                        };
                                    for (var name in behavior.behavior) {
                                        eventNames = eventNames + name + ' ';
                                    }
                                    $(a).on(eventNames, behaviorFn);
                                }

                                var converter = me.converters[i];
                                if (converter) {
                                    $(a).html(converter.converter(a, rowData[converter.field], rowData, index));
                                }
                            });
                        });
                    };

                    // 直接输出列定义的html
                    var templates = $element.find('[data-template="true"]');
                    templates.attr('data-formatter', function () {
                        return templates.html();
                    });

                    // 初始化行为
                    var headers = $element.find('th');
                    this.behaviors = {};
                    this.converters = {};
                    headers.each(function (i, a) {
                        var behaviorName = $(a).attr('data-behavior'),
                            converterName = $(a).attr('data-converter'),
                            fieldName = $(a).attr('data-field');
                        if (behaviorName)
                            me.behaviors[i] = {
                                field: fieldName,
                                behavior: options.behaviors[behaviorName]
                            };
                        if (converterName)
                            me.converters[i] = {
                                field: fieldName,
                                converter: options.converters[converterName]
                            };
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