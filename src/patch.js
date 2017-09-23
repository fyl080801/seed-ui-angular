require.config({
    paths: {
        'es5-shim': '../bower_components/es5-shim/es5-shim.min',
        'es5-sham': '../bower_components/es5-shim/es5-sham.min',
        'html5shiv': '../bower_components/html5shiv/dist/html5shiv.min',
        'json2': '../bower_components/json2/json2',
        'respond': '../bower_components/respond/dest/respond.min'
    },
    shim: {
        'respond': {
            deps: ['html5shiv']
        }
    }
});

define([
    'es5-shim',
    'es5-sham',
    'html5shiv',
    'json2',
    'respond'
], function () {
    'use strict';
});