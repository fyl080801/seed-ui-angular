/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.terminal', [
    'require',
    'app.application'
], function (require, application) {
    'use strict';

    application.requires.push('modules.terminal');

    return angular.module('modules.terminal', ['ui.bootstrap']);
});