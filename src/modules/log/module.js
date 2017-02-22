/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.log', [
    'require',
    'app.application'
], function (require, application) {
    'use strict';

    application.requires.push('modules.log');

    return angular.module('modules.log', ['ui.bootstrap']);
});