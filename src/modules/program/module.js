/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.program', [
    'require',
    'app.application'
], function (require, application) {
    'use strict';

    application.requires.push('modules.program');

    return angular.module('modules.program', ['ui.bootstrap']);
});