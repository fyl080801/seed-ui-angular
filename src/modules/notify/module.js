/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.notify', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.notify');

    return angular.module('modules.notify', ['ui.bootstrap']);
});