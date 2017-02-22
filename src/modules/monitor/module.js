/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.monitor', [
    'require',
    'app.application'
], function (require, application) {
    'use strict';

    application.requires.push('modules.monitor');

    return angular.module('modules.monitor', ['ui.bootstrap']);
});