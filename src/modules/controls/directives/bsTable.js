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

            var _controller = function ($scope, $element, $attrs) {
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

                // 初始化windows的options对象，data-formatter这种属性只是别windows对象中的方法
                window[$scope.$id] = options;
                $scope.$on('$destroy', function () {
                    delete window[$scope.$id];
                });

                //
                var templates = $element.find('[data-template="true"]');
                templates.attr('data-formatter', function () {
                    return templates.html();
                });

                //
                var converters = $element.find('[data-converter]');
                converters.each(function (i, a) {
                    var elm = $(a), name = elm.attr('data-converter');
                    elm.attr('data-formatter', $scope.$id + '.converters.' + name);
                });

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
                    exParams['rowCount'] = params.limit ? params.limit : 10;
                    exParams['current'] = (params.offset / params.limit) + 1;
                    if (params.sort) {
                        exParams.sort = {};
                        exParams.sort[params.sort] = params.order;
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
                    if (!options.actions || options.actions.length <= 0)
                        return;
                    var rows = $element.find('tbody tr');
                    rows.each(function (index, elm) {
                        var rowData = data.data[index];
                        // actions
                        var actions = $(elm).find('[data-action]');
                        actions.each(function (i, a) {
                            var action = $(a);
                            var e = options.actions[action.attr('data-action')];
                            if (e) action.on('click', function () {
                                e(rowData);
                            });
                        });
                        //
                    });
                };

                // 初始化表格
                $element.bootstrapTable(options);

                //
                options.reload = function () {
                    $element.bootstrapTable('refresh');
                };
            };

            return {
                scope: {
                    bsTable: '='
                },
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller]
            };
        }
    ]);
});