/**
 * Created by Quy on 11/10/2015.
 */

(function($) {

    Drupal.Marketplace = Drupal.Marketplace || {};

    $('.btn-btt').smoothScroll({
        speed: 600
    });
    convert_dropdown_search();
    //main_menu_float();
    slideshow();
    carousel();
    downloadapp_block();
    elevatezoom();
    setOwlCarousel();
    mobileMenu();
    fixLoginBlock();
    hidePopup();
    showPopup();
    initProductQuantity();
    productDetail();
    fixImageSources();

    // Placeholder
    setInputPlaceHolder('keys', 'Search...', '.block-search .form-item');
    setInputPlaceHolder('mail[0][value]', 'Your email', '.block-simplenews');

    var base_path = Drupal.url('');

    if (base_path.length > 1) {
        fixBasePath();
    }

    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            $('.btn-btt').show();
        } else {
            $('.btn-btt').hide();
        }
    });

    $('.menu--main .content > ul.menu > li.menu-item--expanded > ul > li').matchHeight();
    $('.view-products .views-row .views-field-title').matchHeight();
    $('.view-frontpage .views-row .views-field-title').matchHeight();
    

    function convert_dropdown_search() {
        ($)("#edit-category").chosen();
    }

    function main_menu_float() {
        var flag = false;
        var timeout;

        ($)('#block-mainnavigation-2 .content').fadeOut();
        ($)('#block-mainnavigation-2 h2').hover(function() {
            if (timeout) {
                clearTimeout(timeout);
            }

            var self = ($)(this);
            var content = self.parent().find('.content');
            content.fadeIn(200);
            flag = false;
        }, function() {
            var self = ($)(this);
            var content = self.parent().find('.content');
            timeout = setTimeout(function() {
                if (!flag) {
                    content.fadeOut(200);
                }
                if (timeout) {
                    clearTimeout(timeout);
                }
                flag = false;
            }, 200);
        });
        ($)('#block-mainnavigation-2 .content').hover(function() {
            var self = ($)(this);
            flag = true;
        }, function() {
            var self = ($)(this);
            timeout = setTimeout(function() {
                if (!flag) {
                    self.fadeOut(200);
                }
                if (timeout) {
                    clearTimeout(timeout);
                }
                flag = false;
            }, 200);
        });
    }

   /* var base_path = Drupal.url('');
    if (base_path == '/ar/') {
        fixImageSources();
    }*/

    function fixImageSources() {
        ($)('.region-footer-fourth img').each(function(i, e) {
            var self = ($)(this);
            var src = self.attr('src');
            if(src.indexOf('arsites') != -1)
            {
            var tmphref = src.replace("arsites","sites");
            self.attr('src', tmphref);
          }
        });

       /* ($)('.block-block-content7855d7a2-90af-4bf7-9100-c1f7bbd4a2bd img').each(function(i, e) {
            var self = ($)(this);
            var src = self.attr('src');
            var tmphref = src.substring(3);
            self.attr('src', tmphref);
        });*/
    }

    function slideshow() {
        ($)('.slideshow').flexslider({
            animation: 'slide',
            selector: '.view-content > .views-row',
            slideshowSpeed: 5000,
            animationSpeed: 600,
            controlNav: true,
            directionNav: false
        });
    }

    function hidePopup() {
        $('#page').once('load').click(function() {
            $('.block.show').removeClass('show');
            //Fix
            $('#block-userlogin').removeClass('show');
        });
    };

    function showPopup() {
        $('#block-yourorder').once('load').click(function(event) {
            $('.block.show').removeClass('show');
            $(this).toggleClass('show');
            event.stopPropagation();
        });
        $('#block-shoppingcart').once('load').click(function(event) {
            $('.block.show').removeClass('show');
            $(this).toggleClass('show');
            event.stopPropagation();
            return false;
        });
        //Fix
        $("#block-userlogin .content").click(function(event) {
            event.stopPropagation();
        });

        $('#block-userlogin').once('load').click(function(event) {
            $('.block.show').removeClass('show');
            $(this).toggleClass('show');
            event.stopPropagation();
        });
    }

    function carousel() {
        ($)('.carousel-list').flexslider({
            animation: 'slide',
            selector: '.view-content > .views-row',
            animationLoop: false,
            itemWidth: 210,
            /*itemMargin: 5,*/
            maxItems: 5,
            controlNav: false,
            directionNav: true
        });
    }

    function elevatezoom() {
        preprocess_product_images();

        // refer to http://www.elevateweb.co.uk/image-zoom/configuration
        $('#product-image').elevateZoom({
            gallery: 'product-galaxy',
            cursor: 'pointer',
            imageCrossfade: true,
            galleryActiveClass: 'active',
        });

        $("#product-image").bind("click", function(e) {
            var ez = $('#product-image').data('elevateZoom');
            $.fancybox(ez.getGalleryList());
            return false;
        });
    }

    function preprocess_product_images() {
        var large_image = $('#product-images-wrapper > img');
        var src = large_image.attr('src');
        large_image.attr('id', 'product-image');
        if (src && src.split('?').length > 0) {
            large_image.attr('data-zoom-image', src.split('?')[0].replace("/styles/large/public", ""));
        }

        var product_image_wrappers_gallery = $('#product-galaxy a');
        product_image_wrappers_gallery.each(function(i, e) {
            var self = $(this);
            var img = self.find('img');
            var src = img.attr('src');

            if (src.split('?').length > 0) {
                self.attr('data-image', src);
                self.attr('data-zoom-image', src.split('?')[0].replace("/styles/large/public", ""));
            }
        });
    }

    function downloadapp_block() {
        $('#block-downloadapps img, #block-paymentmethod img').each(function(i, e) {
            var self = $(this);
            var src = self.attr('src');
            var location = $('#base-path').attr('href');
            src = location + src;
            self.attr('src', src);
        });
    }

    function setOwlCarousel() {
        $('.products-recommend .view-content').owlCarousel({
            items: 5,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsMobile: [479, 1],
            navigation: true,
            rtl: true,
        });
    }

    function mobileMenu() {
        $('.navbar-toggle').mobileMenu({
          targetWrapper: '#block-mainnavigationm, .menu--main'
        });
    }

    function fixBasePath() {
        ($)('.base-path-me').each(function(i, e) {
            var self = ($)(this);
            var href = self.attr('href');
            if (href.indexOf('/' == 0)) {
                href = href.slice(1);
            }

            href = base_path + href;
            self.attr('href', href);
        });
    }

    function initProductQuantity() {
        var instock = 10;
        var quantity = $(".commerce-add-to-cart.form-item-quantity");
        if (quantity.children('.commerce-add-to-cart .increase').length == 0) {
            quantity.append($('<span class="btn increase" id="quantity-increase"></span>'));
        }
        if (quantity.children('.commerce-add-to-cart .decrease').length == 0) {
            quantity.prepend($('<span class="btn decrease" id="quantity-decrease"></span>'));
        }
        var node_product_price = $("#main .node .field-name-field-product .form-item-quantity");
        if (node_product_price.find('.increase').length == 0) {
            node_product_price.append('<span class="btn increase" id="quantity-increase"></span>');
        }
        if (node_product_price.find('.decrease').length == 0) {
            node_product_price.prepend('<span class="btn decrease" id="quantity-decrease"></span>');
        }
        $('#quantity-increase').once('load').click(function(event) {
            var value = parseInt($(this).parent().children('input#edit-quantity').val());
            value = value + 1;
            if (value <= instock) {
                $(this).parent().children('input#edit-quantity').val(value);
                $(this).parent().children('.commerce-add-to-cart .decrease').removeClass("disabled");
            }
            event.preventDefault();
            event.stopPropagation();
        });

        $('#quantity-decrease').once('load').click(function(event) {
            var value = parseInt($(this).parent().children('input#edit-quantity').val());
            value = value - 1;
            if (value >= 1) {
                $(this).parent().children('input#edit-quantity').val(value);
                $(this).parent().children('.commerce-add-to-cart .increase').removeClass("disabled");
                if (value == 1) {
                    $(this).parent().children('.commerce-add-to-cart .decrease').addClass("disabled");
                }
            }
            event.preventDefault();
            event.stopPropagation();
        });

        var outStock = $('.out-of-stock');
        outStock.find('.form-item-quantity .form-text').prop('disabled', true);

        /* shopping cart detail */
        var cart_quantity = $('#views-form-commerce-cart-form-default .views-field-edit-quantity .form-item');

        $('#views-form-commerce-cart-form-default tbody tr').each(function() {
            var stock = $(this).find('td.views-field-edit-quantity span').hide().text();
            if ($(this).find('.increase').length == 0) {
                cart_quantity.append('<a href="javascript:void(0)" class="btn increase"></a>');
            }
            if ($(this).find('.decrease').length == 0) {
                cart_quantity.prepend('<a href="javascript:void(0)" class="btn decrease"></a>');
            }
            $(this).find('.increase').once('load').click(function() {
                var value = parseInt($(this).parent().find('input[type=text]').val()) + 1;
                if (value <= stock) {
                    $(this).parent().find('input[type=text]').val(value);
                }
            });
            $(this).find('.decrease').once('load').click(function() {
                var value = parseInt($(this).parent().find('input[type=text]').val());
                if (value > 1) {
                    value--;
                    $(this).parent().find('input[type=text]').val(value);
                }
            });
        });

    };

    function setInputPlaceHolder(name, text, selector) {
        selector = selector == undefined ? '' : selector + ' ';

        if ($.support.placeholder) {
            $(selector + 'input[name="' + name + '"]').attr('placeholder', Drupal.t(text));
        } else {
            $(selector + 'input[name="' + name + '"]').val(Drupal.t(text));
            console.log($(selector + 'input[name="' + name + '"]'));
            $(selector + 'input[name="' + name + '"]').focus(function() {
                if (this.value == Drupal.t(text)) {
                    this.value = '';
                }
            }).blur(function() {
                if (this.value == '') {
                    this.value = Drupal.t(text);
                }
            });
        }
    }

    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    function productDetail() {
        $('.product-detail-tabs a').smoothScroll({
            speed: 600
        });
    };


    function fixLoginBlock() {
        $('#block-userlogin').prepend('<h2>Sign in</h2>');
    }
})(jQuery);
