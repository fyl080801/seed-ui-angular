/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.controls.module', [
    'app.application',
    'angular-formly',
    'angular-formly-templates-bootstrap'
], function (application) {
    'use strict';

    application.requires.push('modules.controls');

    return angular.module('modules.controls', [
        'ui.bootstrap',
        'formly',
        'formlyBootstrap'
    ]);
});