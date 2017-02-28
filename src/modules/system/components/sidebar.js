/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.components.sidebar', [
    'modules.system.module'
], function (module) {
    'use strict';

    $.fn.myAccordion = function () {
        var Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;

            // Variables privadas
            var links = this.el.find('.link');
            // Evento
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
        };

        Accordion.prototype.dropdown = function (e) {
            var $el = e.data.el;
            var $this = $(this),
                $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
            }
        };
        return new Accordion($(this), false);
    };
});