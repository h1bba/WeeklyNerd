document.addEventListener("DOMContentLoaded", () => {
  // Basis: check of systeem motion wil verminderen
  let reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Simpele sessie-timer flag (alleen tijdens huidige reload)
  if (sessionStorage.getItem("reduceMotion") === "true") {
    reduceMotion = true;
  }

  // Voeg event listener toe aan knop (indien aanwezig)
  const toggleBtn = document.getElementById("toggle-motion");
  if (toggleBtn) {
    toggleBtn.textContent = `Motion ${
      reduceMotion ? "aanzetten" : "uitzetten"
    }`;
    toggleBtn.addEventListener("click", () => {
      const newValue = !reduceMotion;
      sessionStorage.setItem("reduceMotion", newValue.toString());
      location.reload();
    });
  }

  // Stop hier als motion uit staat
  if (reduceMotion) {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTrack.style.document.return;
  }

  // ✅ Lenis smooth scroll
  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on("scroll", (e) => {});

  gsap.registerPlugin(ScrollTrigger);

  // Fade-in animaties
  document.querySelectorAll(".fade-element").forEach((el) => {
    const randomRotation = gsap.utils.random(-20, 20);
    gsap.fromTo(
      el,
      { opacity: 0, y: 50, scale: 1.2, rotation: randomRotation },
      {
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        y: 0,
        scale: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: el,
          start: "bottom bottom",
          end: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Horizontale scroll animatie (alleen als .scroll-track bestaat)
  const scrollTrack = document.querySelector(".scroll-track");

  if (scrollTrack) {
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
      // markers: true // optioneel
    });
  }
});
