define('modules.system.directives.linkHover', [
    'modules.system.module'
], function (module) {
    'use strict';

    module.directive('linkHover', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {
                // outside the scope of the jQuery plugin to
                // keep track of all dropdowns
                var $allDropdowns = $();
                // if instantlyCloseOthers is true, then it will instantly
                // shut other nav items when a new one is hovered over
                $.fn.dropdownHover = function (options) {

                    // the element we really care about
                    // is the dropdown-toggle's parent
                    $allDropdowns = $allDropdowns.add(this.parent());

                    return this.each(function () {
                        var $this = $(this).parent(),
                            defaults = {
                                delay: 0,
                                instantlyCloseOthers: false
                            },
                            data = {
                                delay: $(this).data('delay'),
                                instantlyCloseOthers: $(this).data('close-others')
                            },
                            options = $.extend(true, {}, defaults, options, data),
                            timeout;

                        $this.hover(function () {
                            if (options.instantlyCloseOthers === true)
                                $allDropdowns.removeClass('open');

                            window.clearTimeout(timeout);
                            $(this).addClass('open');
                        }, function () {
                            timeout = window.setTimeout(function () {
                                $this.removeClass('open');
                            }, options.delay);
                        });
                    });
                };

                $('[link-hover="dropdown"]').dropdownHover();
            };

            return {
                restrict: 'A',
                link: _link
            };
        }
    ]);
});