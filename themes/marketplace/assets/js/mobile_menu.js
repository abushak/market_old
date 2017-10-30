(function($) {

    "use strict";

    $.fn.mobileMenu = function(options) {

        var settings = $.extend({
            pageSelector: '#page',
            targetWrapper: '#main-menu',
            accordionMenu: 'true'
        }, options);

        if ($(window).width() <= 991) {
            $(settings.targetWrapper).addClass('mobile-main-menu');
        }
        $(window).resize(function() {
            if ($(window).width() <= 991) {
                $(settings.targetWrapper).addClass('mobile-main-menu');
            } else {
                $(settings.targetWrapper).removeClass('mobile-main-menu');
                $('html, body').css('overflow', '');
                $('html, body').css('height', '');
                $('html, body').css('position', '');
                $(settings.pageSelector).removeClass('toggled');
                $(settings.pageSelector).find('.overlay').remove();
                $(settings.pageSelector).css('position', '');
                item.removeClass('open');
                item.find('ul').css('display', '');
            }
        });

        var toggleButton = this;
        this.off('click.mobileMenu');
        this.on('click.mobileMenu', function(e) {
            var wrapper = $(settings.pageSelector);
            if (!wrapper.hasClass('toggled')) {
                wrapper.addClass('toggled').css('position', 'relative');
                $(settings.targetWrapper).addClass('mobile-main-menu');
                if (wrapper.find('.overlay').length == 0) {
                    var overlay = $('<div class="overlay"></div>');
                    overlay.prependTo(wrapper);
                    overlay.click(function() {
                        toggleButton.trigger('click');
                    });
                    $('html, body').css('overflow', 'hidden');
                    $('html, body').css('height', '100%');
                    $('html, body').css('position', 'relative');
                }
                if ($(settings.pageSelector).find('.btn-close').length == 0) {
                    var btn_close = $('<span class="btn-close"></span>');
                    btn_close.prependTo($(settings.pageSelector));
                }

            } else {
                var overlay = wrapper.find('.overlay');
                wrapper.css({
                    'width': '',
                    'position': ''
                });
                wrapper.removeClass('toggled');

                if (overlay.length > 0) {
                    overlay.remove();
                    $('html, body').css('overflow', '');
                    $('html, body').css('height', '');
                    $('html, body').css('position', '');
                }
            }
            $('.btn-close').on('click', function(e) {
                toggleButton.trigger('click');
                e.preventDefault();
                return false;
            });
            e.preventDefault();
            e.stopPropagation();
        });

        // Hide sub-menu
        if (settings.accordionMenu == 'true') {
            var menu = $(settings.targetWrapper).find('ul.menu').first();
            var item = menu.find('> li.menu-item--expanded');
            var item_active = menu.find('> li.menu-item--expanded.menu-item--active-trail');
            if ($(window).width() <= 991) {
                item_active.addClass('open');
                item_active.find('> ul').css('display', 'block');
            }
            item.click(function() {
                if ($(window).width() <= 991) {
                    var _this = $(this);
                    var $sub_menu_inner = $(this).find('> ul');
                    if (!$(this).hasClass('open')) {
                        $(item).not($(this)).removeClass('open');
                        item.find('> ul').slideUp();
                        $(this).toggleClass('open');
                        if ($(this).hasClass('open')) {
                            $sub_menu_inner.slideDown();
                            setTimeout(function() {
                                $(settings.targetWrapper).animate({
                                    scrollTop: $(_this).offset().top
                                }, 700);
                            }, 500);

                        } else {
                            $sub_menu_inner.slideUp();
                        }
                        return false;
                    }
                }
            });
        }
        else {
            $(settings.targetWrapper).find('ul.men ul').css('display', 'block');
        }
    }

}(jQuery));
