/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.group', [
    'require',
    'app.application'
], function (require, application) {
    'use strict';

    application.requires.push('modules.group');

    return angular.module('modules.group', ['ui.bootstrap']);
});