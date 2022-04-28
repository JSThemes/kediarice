jQuery(document).ready(function($) {
	"use strict";

	/* window */
	var window_width, window_height, scroll_top;

	/* admin bar */
	var adminbar = $('#wpadminbar');
	var adminbar_height = 0;

	/* header menu */
	var header = $('#cshero-header');
	var header_top = 0;

	/* scroll status */
	var scroll_status = '';
    
    $('[data-tooltip="tooltip"]').tooltip();
	/**
	 * window load event.
	 * 
	 * Bind an event handler to the "load" JavaScript event.
	 * @author Fox
	 */
	$(window).on('load', function() {
	   
        if ( $('.wow').length ) {
           initWow(); 
        };
        
		/** current scroll */
		scroll_top = $(window).scrollTop();

		/** current window width */
		window_width = $(window).width();

		/** current window height */
		window_height = $(window).height();

		/* get admin bar height */
		adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0 ;

		/* get top header menu */
		header_top = header.length > 0 ? header.offset().top - adminbar_height : 0 ;
        
        /* auto resize video width */
        cms_auto_post_video_width();
        
        cms_lightbox_popup();
        
        setTimeout(function(){ red_organicfood_countdown(); }, 500);
		/* check sticky menu. */
		cms_stiky_menu();
	});

	/**
	 * reload event.
	 * 
	 * Bind an event handler to the "navigate".
	 */
	window.onbeforeunload = function(){
	}
	
	/**
	 * resize event.
	 * 
	 * Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.
	 * @author Fox
	 */
	$(window).on('resize', function(event, ui) {
		/** current window width */
		window_width = $(event.target).width();

		/** current window height */
		window_height = $(window).height();

		/** current scroll */
		scroll_top = $(window).scrollTop();
        
        /* auto resize video width */
        cms_auto_post_video_width();
        
		/* check sticky menu. */
		cms_stiky_menu();
	});
	
	/**
	 * scroll event.
	 * 
	 * Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.
	 * @author Fox
	 */
	$(window).on('scroll', function() {
		/** current scroll */
		scroll_top = $(window).scrollTop();

		/* check sticky menu. */
		cms_stiky_menu();
        
        cms_back_to_top();
	});
    
    $(document).ajaxComplete(function(){  
        cms_auto_post_video_width();
    });
    
    $('[data-tooltip="tooltip"]').tooltip(); 
    
    /**
	 * gallery hover js
	 *
	 * @author Knight
	 */
    $('.cms-gallerys.layout-nopading .cms-gallery-item').each( function() { $(this).hoverdir(); } );
    
	/**
	 * Stiky menu
	 *
	 * Show or hide sticky menu.
	 * @author Fox
	 * @since 1.0.0
	 */
	function cms_stiky_menu() {
		if (header.hasClass('sticky-desktop') && header_top < scroll_top && window_width > 1199) {
			header.addClass('header-fixed');
			$('body').addClass('hd-fixed');

			if($('.sticky_logo').length > 0) {
				$('.sticky_logo').removeClass('hide');
				$('.main_logo').addClass('hide');
			}

		} else {
			header.removeClass('header-fixed');
			$('body').removeClass('hd-fixed');

			if($('.sticky_logo').length > 0) {
				$('.sticky_logo').addClass('hide');
				$('.main_logo').removeClass('hide');
			}
		}
	}
    function initWow(){
        var wow = new WOW( { mobile: false, } );
        wow.init();
    };
    /**
	 * Auto width video iframe
	 * 
	 * Youtube Vimeo.
	 * @author Fox
	 */
	function cms_auto_post_video_width() {  
		$('.entry-video iframe').each(function(){
			var v_width =$('.entry-video').width();
			var v_height = v_width / (16/9);
            $(this).attr('width',v_width);
			$(this).attr('height',v_height + 35);
		})
        $('.entry-video iframe').each(function(){
            $(this).attr('width','100%');
		});
	} 

	/**
	 * Mobile menu
	 * 
	 * Show or hide mobile menu.
	 * @author Fox
	 * @since 1.0.0
	 */
	
	$('body').on('click', '#cshero-menu-mobile', function(){
		var navigation = $(this).parent().find('.cshero-header-navigation');
		if(!navigation.hasClass('collapse')){
			navigation.addClass('collapse');
		} else {
			navigation.removeClass('collapse');
		}
	});

	/**
	 * Back to top
	 */
	$('body').on('click', '.ef3-back-to-top', function () {
		$('body, html').animate({scrollTop:0}, '1000');
	})
    
    /* Show or hide buttom  */
	function cms_back_to_top(){
		/* back to top */
        if (scroll_top < window_height) {
        	$('.ef3-back-to-top').addClass('off').removeClass('on');
        } else {
        	$('.ef3-back-to-top').removeClass('off').addClass('on');
        }
	}
    
	/**
	 * One page
	 *
	 * @author Fox
	 */
	if(typeof(one_page_options) != "undefined"){
		one_page_options.speed = parseInt(one_page_options.speed);
		$('#site-navigation').singlePageNav(one_page_options);
	}
    
    /**
	 * LightBox
	 * 
	 * @author Knight
	 * @since 1.0.0
	 */
	function cms_lightbox_popup() {   
		$('.magic-popup,.cms-product-gallery .zoom').magnificPopup({
			// delegate: 'a',
			type: 'image',
			mainClass: 'mfp-3d-unfold',
			removalDelay: 500,  
			callbacks: {
				beforeOpen: function() {
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				}
			},
			closeOnContentClick: true,
			midClick: true  
		});
        
        
        $('.cms-video-popup').magnificPopup({
			//disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
		
       
        $('.cms-map-popup').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
        
		/* gallery */
		$('.gallery-popup-wrap').each(function(i, el) {
			$(el).magnificPopup({
				delegate: '.magic-popups',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-3d-unfold',
				removalDelay: 500, 
				callbacks: {
					beforeOpen: function() {
						this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					}
				},
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] 
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				}
			});
		});
        $('.cms-gallerys').magnificPopup({
			delegate: '.magic-popups',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-3d-unfold',
			removalDelay: 500,  
			callbacks: {
				beforeOpen: function() {
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				}
			},
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]  
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			}
		});
         
	}
    
    /* CMS Countdown. */
	var _e_countdown = [];
	function red_organicfood_countdown() {
		"use strict";
		$('.cms-countdown').each(function () {
			var event_date = $(this).find('.cms-countdown-bar');
			var data_count = event_date.data('count');
			var server_offset = event_date.data('timezone');
			/* get local time zone */
			var offset = (new Date()).getTimezoneOffset();
			offset = (- offset / 60) - server_offset;
			
			if(data_count != undefined){
				var data_label = event_date.attr('data-label');
				
				if(data_label != undefined && data_label != ''){
					data_label = data_label.split(',')
				} else {
					data_label = ['Days','Hours','Minutes','Seconds'];
				}
				
				data_count = data_count.split(',')
				
				var austDay = new Date(data_count[0],parseInt(data_count[1]) - 1,data_count[2],parseInt(data_count[3]) + offset,data_count[4],data_count[5]);
				
				_e_countdown.push(event_date.countdown({
					until: austDay,
					layout:'<div class="clearfix text-center"><div class="cms-count-day col-xs-12 col-sm-3 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">{dn}</span> <span class="countdown-period">'+data_label[0]+'</span></div></div><div class="cms-count-hours col-xs-12 col-sm-3 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">{hn}</span> <span class="countdown-period">'+data_label[1]+'</span></div></div><div class="cms-count-minutes col-xs-12 col-sm-3 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">{mn}</span> <span class="countdown-period">'+data_label[2]+'</span></div></div><div class="cms-count-second col-xs-12 col-sm-3 col-md-3"><div class="countdown-item-container"><span class="countdown-amount">{sn}</span> <span class="countdown-period">'+data_label[3]+'</span></div></div></div>'
				}));
			}
		});
	}
});