import 'angular-base';
import jQuery = require('jquery');
let ng: ng.IAngularStatic = window['angular'];
window['jQuery'] = jQuery;
window['$'] = jQuery;
export = ng;
