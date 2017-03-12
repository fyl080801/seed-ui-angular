/**
 * Created by fyl08 on 2017/3/11.
 */
define('modules.formeditor.module', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.formeditor');

    return angular
        .module('modules.formeditor', [
            'ui.router',
            'modules.system'
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider.state('main.dictionary', {
                    text: '字典变量',
                    url: '/dictionary',
                    templateUrl: 'views/formeditor/dictionary/List.html',
                    css: ['./css/bootstrap-table.min.css'],
                    dependencies: ['modules.controls.requires', 'modules.formeditor.requires']
                });
            }
        ])
        .config([
            'modules.system.configs.linkManagerProvider',
            function (linkManagerProvider) {
                linkManagerProvider
                    .add({
                        id: 'editor',
                        text: '定制管理',
                        icon: 'glyphicon glyphicon-wrench'
                    })
                    .child({
                        id: 'editor.dictionary',
                        text: '字典变量',
                        href: '#/main/dictionary'
                    })
                    .add({
                        id: 'editor.datasource',
                        text: '数据源',
                        href: '#/main/datasource'
                    })
                    .add({
                        id: 'editor.page',
                        text: '页面',
                        href: '#/main/page'
                    });
            }
        ]);
});