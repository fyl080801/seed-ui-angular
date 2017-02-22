/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.examine', [
    'require',
    'app.application'
], function (require, application) {
    'use strict';

    application.requires.push('modules.examine');

    return angular.module('modules.examine', ['ui.bootstrap']);
});