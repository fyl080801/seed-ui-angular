/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.controls.directives.exField', [
    'require',
    'modules.controls'
], function (require, controls) {
    'use strict';

    document.createElement('ex-valuefield');
    document.createElement('ex-textfield');
    document.createElement('ex-textarea');
    document.createElement('ex-checkboxfield');
    document.createElement('ex-timefield');
    document.createElement('ex-numericfield');
    document.createElement('ex-datefield');
    document.createElement('ex-file');
    document.createElement('ex-combobox');

    var textRegexps = {
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        int: /^[0-9]*$/,
        ip: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
        mac: /[0-9A-Fa-f][0-9A-Fa-f]:[0-9A-Fa-f][0-9A-Fa-f]:[0-9A-Fa-f][0-9A-Fa-f]:[0-9A-Fa-f][0-9A-Fa-f]:[0-9A-Fa-f][0-9A-Fa-f]:[0-9A-Fa-f][0-9A-Fa-f]/
    };

    var directiveAttribute = {
        restrict: 'AE',
        replace: true,
        require: '^ngModel'
    };

    var bindAttribute = {
        restrict: 'A',
        require: '?ngModel'
    };

    var fieldScope = {
        exFieldLabel: '@',
        exFlexInput: '@',
        exFlexLabel: '@',
        exFieldAuthorize: '@',
        exBindModel: '=ngModel'
    };

    var inputFieldScope = {
        exBindRequired: '=ngRequired',
        exBindDisabled: '=ngDisabled'
    };

    return {
        textRegexps: textRegexps,
        directiveAttribute: directiveAttribute,
        bindAttribute: bindAttribute,
        fieldScope: fieldScope,
        inputFieldScope: inputFieldScope
    };
});