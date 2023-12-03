var App = function() {
    var MediaSize = {
        xl: 1200,
        lg: 992,
        md: 991,
        sm: 576
    };

    var _mobileResolution = {
        onRefresh: function() {
            var windowWidth = window.innerWidth;
            if ( windowWidth <= MediaSize.md ) {
                // toggleFunction.sidebar();
            }
        },

        // Note : -  _mobileResolution -> onResize | Uncomment it if need for onresize functions for MOBILE RESOLUTION i.e. below or equal to 991px |

        /*
        onResize: function() {
            $(window).on('resize', function(event) {
                event.preventDefault();
                var windowWidth = window.innerWidth;
                if ( windowWidth <= MediaSize.md ) {
                }
            });
        }
        */
    }

    var _desktopResolution = {
        onRefresh: function() {
            var windowWidth = window.innerWidth;
            if ( windowWidth > MediaSize.md ) {
                // toggleFunction.sidebar(true);
            }
        },

        // Note : -  _desktopResolution -> onResize | Uncomment it if need, for onresize functions for DESKTOP RESOLUTION i.e. above or equal to 991px |

        /*
        onResize: function() {
            $(window).on('resize', function(event) {
                event.preventDefault();
                var windowWidth = window.innerWidth;
                if ( windowWidth > MediaSize.md ) {
                }
            });
        }
        */
    }

    function sidebarFunctionality() {
        function sidebarCloser() {

            if (window.innerWidth <= 991 ) {

                if (!$('body').hasClass('alt-menu')) {

                    $("#container").addClass("sidebar-closed");
                    $('.overlay').removeClass('show');
                } else {
                    $(".navbar").removeClass("expand-header");
                    $('.overlay').removeClass('show');
                    $('#container').removeClass('sbar-open');
                    $('html, body').removeClass('sidebar-noneoverflow');
                }

            } else if (window.innerWidth > 991 ) {

                if (!$('body').hasClass('alt-menu')) {

                    $("#container").removeClass("sidebar-closed");
                    $(".navbar").removeClass("expand-header");
                    $('.overlay').removeClass('show');
                    $('#container').removeClass('sbar-open');
                    $('html, body').removeClass('sidebar-noneoverflow');
                } else {
                    $('html, body').addClass('sidebar-noneoverflow');
                    $("#container").addClass("sidebar-closed");
                    $(".navbar").addClass("expand-header");
                    $('.overlay').addClass('show');
                    $('#container').addClass('sbar-open');
                }
            }

        }

        function sidebarMobCheck() {
            if (window.innerWidth <= 991 ) {

                if ( $('.main-container').hasClass('sbar-open') ) {
                    return;
                } else {
                    sidebarCloser()
                }
            } else if (window.innerWidth > 991 ) {
                sidebarCloser();
            }
        }

        sidebarCloser();

        $(window).resize(function(event) {
            sidebarMobCheck();
        });

    }

    return {
        init: function() {
            // toggleFunction.overlay();
            /*
                Desktop Resoltion fn
            */
            _desktopResolution.onRefresh();

            // Note : -  _desktopResolution -> onResize | Uncomment it if need for onresize functions for MOBILE RESOLUTION i.e. above or equal to 991px |

            // _desktopResolution.onResize();

            /*
                Mobile Resoltion fn
            */
            _mobileResolution.onRefresh();

            // Note : -  _mobileResolution -> onResize | Uncomment it if need for onresize functions for DESKTOP RESOLUTION i.e. below or equal to 991px |
            
            // _mobileResolution.onResize();

            sidebarFunctionality();
            // inBuiltfunctionality.mainCatActivateScroll();
            // inBuiltfunctionality.preventScrollBody();
            // inBuiltfunctionality.functionalDropdown();
        }
    }

}();
var App = function() {

    var Selector = {
        mainHeader: '.header.navbar',
        headerhamburger: '.toggle-sidebar',
        fixed: '.fixed-top',
        mainContainer: '.main-container',
        sidebar: '#sidebar',
        sidebarContent: '#sidebar-content',
        sidebarStickyContent: '.sticky-sidebar-content',
        ariaExpandedTrue: '#sidebar [aria-expanded="true"]',
        ariaExpandedFalse: '#sidebar [aria-expanded="false"]',
        contentWrapper: '#content',
        contentWrapperContent: '.container',
        mainContentArea: '.main-content',
        searchFull: '.toggle-search',
        overlay: {
            sidebar: '.overlay',
            cs: '.cs-overlay',
            search: '.search-overlay'
        }
    };

    // Default Enabled

    var toggleFunction = {
        sidebar: function() {
            $('.sidebarCollapseTop').on('click', function (sidebar) {
                sidebar.preventDefault();
                $(Selector.mainContainer).toggleClass("topbar-closed");
                $(Selector.mainContainer).toggleClass("sbar-open");
                $('.overlay').toggleClass('show');
                $('html,body').toggleClass('sidebar-noneoverflow');
            });
        },
        overlay: function() {
            $('#dismiss, .overlay').on('click', function () {
                $(Selector.mainContainer).removeClass('topbar-closed');
                $('.overlay').removeClass('show');
                $('html,body').removeClass('sidebar-noneoverflow');
            });
        },
    }

    return {
        init: function() {
            
            // Sidebar fn
            toggleFunction.sidebar();
            // Overlay fn
            toggleFunction.overlay();

        },
    }

}();
