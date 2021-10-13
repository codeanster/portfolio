$(window).on('load', function(){

    $('.loader .inner').fadeOut(1000, function(){
        $('.loader').fadeOut(1250)
    })

    $('.items').isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing:'linear',
            queue: false,
        }
    })

    //Get the DOM element that represents the <button> element.
   //And set the onclick event
   document.getElementById("LearnMoreBtn").onclick = function(){
    //Set a variable to contain the DOM element of the overly
    var overlay = document.getElementById("overlay");
    //Set a variable to contain the DOM element of the popup
    var popup = document.getElementById("popup");
    
    //Changing the display css style from none to block will make it visible
    overlay.style.display = "block";
    //Same goes for the popup
    popup.style.display = "block";
 };

})

$(document).ready(function(){

    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    })

    var typed = new Typed(".typed",{
        strings: ["Data Analyst",'Data Scientist','Python Developer'],
        typeSpeed: 70,
        loop:true,
        startDelay:1000,
        showCursor: false
    })


    $('.owl-carousel').owlCarousel({
        loop:true,
        items:4,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    })


    var skillsTopOffset = $('.skillsSection').offset().top
    var statsTopOffset = $('.statsSection').offset().top
    var countUpFinished = false
    $(window).scroll(function(){
        if(window.pageYOffset > skillsTopOffset - $(window).height() + 200)

        $('.chart').easyPieChart({
            easing: 'easeInOut',
            barColor: '#fff',
            trackColor: false,
            scaleColor:false,
            lineWidth: 4,
            size:152,
            onStep: function(from,to,percent){
                $(this.el).find('.percent').text(Math.round(percent))
            }
        });
        
        if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200){

        $('.counter').each(function(){
            var element  = $(this)
            var endVal = parseInt(element.text())
            element.countup(endVal)
        })

        countUpFinished = true

        }

    })

    $('#filters a').click(function(){

        $('#filters .current').removeClass('current')
        $(this).addClass('current')

        var selector = $(this).attr('data-filter')

            $('.items').isotope({
                filter: selector,
                animationOptions: {
                    duration: 1500,
                    easing:'linear',
                    queue: false,
                }
            })
        return false

    })

    $('#navigation li a').click(function(e) {
        e.preventDefault()

        var targetElement = $(this).attr('href')
        var targetPosition = $(targetElement).offset().top
        $('html, body').animate({
            scrollTop: targetPosition - 50
        }, "slow")
    }
    )
    
    
    const nav = $('#navigation')
    const navTop = nav.offset().top

    $(window).on('scroll',stickyNavigation)

    function stickyNavigation() {

        var body = $('body')
        
        if($(window).scrollTop() >= navTop) {
            body.css('padding-top',nav.outerHeight() + 'px')
            body.addClass('fixedNav')
        }
        else {
            body.css('padding-top',0 + 'px')
            body.removeClass('fixedNav')
        }
    }

})


// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
.add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750*2.4,
    delay: (el, i) => 80 * i
}).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 100
});



