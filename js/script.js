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

    // Learn More button handler with error checking
    const learnMoreBtn = document.getElementById("LearnMoreBtn");
    if (learnMoreBtn) {
        learnMoreBtn.onclick = function() {
            try {
                const overlay = document.getElementById("overlay");
                const popup = document.getElementById("popup");
                
                if (!overlay || !popup) {
                    console.error("Required overlay or popup elements not found");
                    return;
                }
                
                overlay.style.display = "block";
                popup.style.display = "block";
            } catch (error) {
                console.error("Error in LearnMore button handler:", error);
            }
        };
    }

})

$(document).ready(function(){
    // Initialize project carousel
    const projectCarousel = $('.project-slides');
    let currentSlide = 0;
    const slides = $('.project-slide');
    const totalSlides = slides.length;
    const indicators = $('.project-indicators .indicator');

    // Function to update slide visibility and indicators
    function updateSlide(index) {
        // Handle circular navigation
        if (index >= totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = totalSlides - 1;
        }
        
        // Store new index before animation
        const newSlide = index;
        
        // Fade out current slide
        $(slides[currentSlide]).css({
            opacity: 0,
            visibility: 'hidden',
            transform: 'translateX(-20px)'
        });
        
        // Update indicators
        indicators.removeClass('active');
        $(indicators[newSlide]).addClass('active');
        
        // Short delay before showing new slide
        setTimeout(() => {
            slides.removeClass('active');
            currentSlide = newSlide;
            
            // Fade in new slide
            $(slides[currentSlide])
                .addClass('active')
                .css({
                    opacity: 1,
                    visibility: 'visible',
                    transform: 'translateX(0)'
                });
        }, 300);
    }

    // Navigation button handlers
    $('.nav-btn.prev').click(function() {
        updateSlide(currentSlide - 1);
    });

    $('.nav-btn.next').click(function() {
        updateSlide(currentSlide + 1);
    });

    // Indicator click handlers
    indicators.each(function(index) {
        $(this).click(function() {
            updateSlide(index);
        });
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    projectCarousel.on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    projectCarousel.on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - show previous
                updateSlide(currentSlide - 1);
            } else {
                // Swipe left - show next
                updateSlide(currentSlide + 1);
            }
        }
    }

    // Remove auto-advance functionality
    // Only manual navigation through arrows is allowed

    // Initialize first slide
    updateSlide(0);

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


// Animation with error handling
try {
    const textWrapper = document.querySelector('.ml6 .letters');
    if (!textWrapper) {
        console.error("Text wrapper element not found");
    } else {
        // Safely wrap letters in spans
        try {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        } catch (error) {
            console.error("Error wrapping letters:", error);
        }

        // Initialize animation with error handling
        try {
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
        } catch (error) {
            console.error("Error initializing animation:", error);
        }
    }
} catch (error) {
    console.error("Error in animation setup:", error);
}

