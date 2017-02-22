/**
 * Created by fyl08 on 2016/12/23.
 */
var bowerroot = '../../bower_components';

require.config({
    paths: {
        'es5-shim': bowerroot + '/es5-shim/es5-shim.min',
        'es5-sham': bowerroot + '/es5-shim/es5-sham.min',
        'html5shiv': bowerroot + '/html5shiv/dist/html5shiv.min',
        'json2': bowerroot + '/json2/json2',
        'respond': bowerroot + '/respond/dest/respond.min'
    },
    shim: {
        'respond': {deps: ['html5shiv']}
    }
});

define([
    'es5-shim',
    'es5-sham',
    'html5shiv',
    'json2',
    'respond'
], function (require) {
    'use strict';
});