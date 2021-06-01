(function ($) {

    $.fn.fieldValidate = function() {
        var $errorMsg = $('<div class="errormsg"><p>&larr;</p></div>');
        var $emailMsg = $('<div class="errormsg"><p>&larr;</p></div>');
        var passed    = false;

        if(!$(this).hasClass('required') || ($(this).hasClass('required') && $(this).val())) {
            passed = true;
        }

        if($(this).hasClass('email') && passed){
            if( $(this).val().match(/^(?!\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/)) {
                passed = true;
            }
            else {
                passed = false;
                $errorMsg = $emailMsg;
            }
        }

        if(passed) {
            $(this).removeClass('error').next('.errormsg').remove();

            return true;
        }
        else {
            $(this).addClass('error');

            if(!$(this).next('.errormsg').size())
                $(this).after($errorMsg);

            else if ($errorMsg)
                $(this).next('.errormsg').replaceWith($errorMsg);

            return false;
        }
    },

        $.fn.fitImgHeight = function() {
            var ratio = this.width() / parseInt(this.attr('width'));
            $(this).height(parseInt(this.attr('height')) * ratio);
        };
})(jQuery);

// SCROLL DOWN

$(function() {
    $('a[href*=#]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });
});


$(document).ready(function(){

    /*
   *-----------------------------------------------------------------------------------------------------------*
   NAVIGATION
   *-----------------------------------------------------------------------------------------------------------*
   */


    $('#toggle').click(function () {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
        $('#main').toggleClass('hide');
        $('.next').toggle();
        $('.prev').toggle();
        $('.slidewrap').toggle();
    });

    $('nav ul li a').click(function () {
        $('#overlay').toggleClass('open');
        $('#toggle').toggleClass('active');
    });


    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });


    //placeholder
    $('input, textarea').placeholder();

    //article
    if($('#article').size()){ //only on slider pages because of bbq
        $("#link1").anchorScroll();
    }

    //work - grid
    var $container = $('#container');

    $container.find('.lazy-image').show().lazyload({
        effect : "fadeIn",
        threshold : 300
    });

    $container.masonry({
        itemSelector :'.box',
        isResizable: true,
        columnWidth: function( containerWidth ) {

            //change 02: called every time container is resized
            $container.find('.lazy-image').each(function(){
                $(this).fitImgHeight();
            });
            //change 01: columns cound depend on screen size (according to mq in css)
            var windowWidth = $(window).width();
            if(windowWidth>1100)
                return containerWidth / 3;
            else if(windowWidth>700)
                return containerWidth / 2;
            else
                return containerWidth;
        }
    });

    $('.slidewrap').bind('carousel-validate', function(e, data) {
        e.valid = true;

        var index = (Math.abs(data.moveTo) / 100);
        var slide = $(this).find('.slide:nth('+index+')');

        $(slide).find('input, textarea, select').each(function(){
            if(e.valid)
                e.valid = $(this).fieldValidate();
            else
                $(this).fieldValidate();
        });

        $('.error:first').focus();
    });


    $('.works__article').mouseenter(
        function () {
            $(this).find('.works__head').fadeIn(300);
            $(this).find('.works__subhead').fadeIn(300)
        }
    );

    $('.works__article').mouseleave(
        function () {
            $(this).find('.works__head').fadeOut(300);
            $(this).find('.works__subhead').fadeOut(300)
        }

    );


});
