/**
 * Custom JS
 */

'use strict';

$(function() {

    /**
     * Adjusting height of columns in the About section
     */

    function adjustAboutColumns() {
        var section = $(".about_table");

        section.each(function() {
            var elem = $(this);
            var height = 0;
            var block = elem.find(".about_desc");

            if (block.length) 
                height = block.outerHeight(); 

            elem.find("[class*='about_img_']").css("height", height); 
        });

    }

    /**
     * Adjusting height of columns in the Reservation section
     */

    function adjustReservationColumns() {
        var section = $(".section_reservation");

        section.each(function() {
            var elem = $(this);
            var height = 0;
            var block = elem.find(".reservation_form_body");

            if (block.length) {
                height = block.outerHeight(); 
            }

            elem.find(".reservation_img").css("height", height); 
        }); 

    }

    /**
     * Navbar class toggle
     */

    var theWindow = $(window);
    var scrollTop = theWindow.scrollTop();
    var navbar = $('.navbar');
    var navbarDefault = $(".navbar-default");
    var navbarCollapse = $(".navbar-collapse");

    theWindow.on({
        'load': function() {

            /**
             * Navbar class toggle
             */

            $('[href*="#section_"]').on('click', function() {

                // Close collapsed navbar on click
                navbarCollapse.collapse('hide');

                // Smooths scroll to anchor
                if ( location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname ) {
                    
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 15
                        }, 1000);
                        return false;
                    }

                }
            });

            // Toggle navbar on page load if needed

            if (scrollTop > 0) {
                navbar.toggleClass("navbar-default navbar-inverse");
            }

            // Toggle navbar on collapse
            navbarCollapse.on({
                'show.bs.collapse': function() {
                    navbar.removeClass("navbar-default").addClass("navbar-inverse");
                },
                'hidden.bs.collapse': function() {
                    var scrollTop = theWindow.scrollTop();

                    if (scrollTop === 0) { 
                        navbar.removeClass("navbar-inverse").addClass("navbar-default");
                    }
                }
            });

            /**
             * Welcome parallax
             */

            var elem = $(".section_welcome"),
                offsetTop = elem.offset().top,
                elemHeight = elem.height(),
                parallaxRate = 2;

            $(window).scroll(function() {

                var scrollTop = $(window).scrollTop(),
                    elementOffsetTop = scrollTop - offsetTop,
                    parallaxOffset = elementOffsetTop / parallaxRate;
                
                if (elementOffsetTop <= elemHeight) {
                    $(".welcome-parallax_bg").css({
                        "-webkit-transform": "translateY(" + parallaxOffset + "px)",
                                "transform": "translateY(" + parallaxOffset + "px)"
                    });
                }

            });

            /**
             * Menu (filtering)
             */

            // Init Isotope
            var $menu = $(".menu__grid, .menu__text-grid").isotope({
                itemSelector: ".menu__item",
                layoutMode: "masonry"
            });

            // Set ititial filtering
            $menu.isotope({ filter: ".menu_breakfast, .menu-text_breakfast" });

            // Filter items on click
            $(".menu_nav").on('click', 'a', function(e) {
                var elem = $(this);

                // Filter items 
                var filterValue = elem.attr('data-filter');
                $menu.isotope({ filter: filterValue });

                // Change active button
                elem.parents("li").addClass("active").siblings("li").removeClass("active");

                e.preventDefault();
            });

            /**
             * Menu hover effect for iOS
             */
            var mobileHover = function () { 
                $('.menu__item_hover').on({
                    'touchstart': function () { 
                        $(this).trigger('hover');
                    },
                    'touchend': function () {
                        $(this).trigger('hover');
                    }
                });
            };

            mobileHover();

            /**
             * Events hover effect for iOS
             */
            var mobileHover = function () { 
                $('.events, .events__item').on({
                    'touchstart': function () { 
                        $(this).trigger('hover');
                    },
                    'touchend': function () {
                        $(this).trigger('hover');
                    }
                }); 
            };

            mobileHover();

            /**
             * Gallery (layout)
             */

            // Init Isotope
            var $gallery = $(".gallery__grid").isotope({
                itemSelector: ".gallery__item",
                percentPosition: true,
                layoutMode: "masonry"
            });

            // layout Isotope after each image loads
            $gallery.imagesLoaded().progress( function() {
                $gallery.isotope('layout');
            });


            /**
             * Adjusting columns heights
             */

            adjustAboutColumns();
            adjustReservationColumns();

        },
        'scroll': function() {

            /**
             * Navbar
             */

            var scrollTop = theWindow.scrollTop();

            if (scrollTop > 0 && navbarDefault.length) {
                navbar.removeClass("navbar-default").addClass("navbar-inverse");
            } else if (scrollTop === 0) {
                navbar.removeClass("navbar-inverse").addClass("navbar-default");
            }

            /**
             * Adjusting columns heights
             */

            adjustAboutColumns();
            adjustReservationColumns();

        }
    });

});