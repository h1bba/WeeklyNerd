document.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis({
        autoRaf: true,
    });

    lenis.on('scroll', (e) => {
    });

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".fade-element").forEach(el => {
        const randomRotation = gsap.utils.random(-20, 20);
        gsap.fromTo(el,
            { opacity: 0, y: 50, scale: 1.1, rotation: randomRotation },
            {
                rotation: 0,
                opacity: 1,
                duration: 0.5,
                y: 0,
                scale: 1,
                delay: 0.3,

                scrollTrigger: {
                    // markers: true,
                    trigger: el,
                    start: "bottom bottom",
                    end: "top 85%",
                    toggleActions: "play none none reverse",
                    // scrub: true,
                }
            }
        );
    });

    // const container = document.querySelector(".scroll-track");
    // const scrollLength = container.scrollWidth - window.innerWidth;

    // gsap.to(container, {
    //     x: () => `-${scrollLength}px`,
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: ".projects",
    //         start: "bottom bottom",
    //         end: () => `+=${scrollLength}`,
    //         scrub: true,
    //         // pin: true,
    //     }
    // });

    // https://codepen.io/snorkltv/pen/PoxojaO
    const scrollTrack = document.querySelector(".scroll-track");
    console.log(scrollTrack.offsetWidth)

    function getScrollAmount() {
        let scrollTrackWidth = scrollTrack.scrollWidth;
        return -(scrollTrackWidth - window.innerWidth);
    }

    const tween = gsap.to(scrollTrack, {
        x: getScrollAmount,
        duration: 1,
        ease: "none",
    });


    ScrollTrigger.create({
        trigger: ".projects",
        start: "top 20%",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true
    })


})
