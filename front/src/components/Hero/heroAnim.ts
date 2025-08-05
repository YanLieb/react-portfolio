import { gsap } from 'gsap';
import { SplitText, ScrambleTextPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(SplitText, ScrambleTextPlugin, ScrollTrigger);

export default class HeroAnim {
  #container: HTMLDivElement;
  #title: HTMLHeadingElement | null;
  #subtitle: HTMLHeadingElement | null;
  #description: Element | null;
  #hero: HTMLDivElement | null;
  #logoHeader: HTMLOrSVGImageElement | null;

  constructor(container: HTMLDivElement) {
    this.#container = container;
    this.#title = this.#container?.querySelector(".hero__title");
    this.#subtitle = this.#container?.querySelector(".hero__subtitle");
    this.#description = this.#container?.querySelector(".hero__description")
    this.#hero = this.#container?.querySelector(".hero");
    this.#logoHeader = document?.querySelector("header .logo");
  }

  init() {
    this.apparition()
    //this.scroll(this.#container)
    this.scrollMenu(this.#container)
  }

  #splitTitle(title = this.#title) {
    return SplitText.create(title, {
      type: "chars",
      charsClass: "title-char++"
    });
  }

  #splitSubtitle(subtitle = this.#subtitle) {
    return SplitText.create(subtitle, {
      type: "words, chars",
      wordsClass: "subtitle-word++",
    });
  }

  #splitDescription(description = this.#description) {
    return SplitText.create(description, {
      type: "lines",
      linesClass: "description-line++"
    })
  }

  async apparition() {
    try {
      await document.fonts.ready;

      const title: HTMLHeadingElement | null = this.#container?.querySelector(".hero__title");
      const subtitle: HTMLHeadingElement | null = this.#container?.querySelector(".hero__subtitle");
      const description: HTMLDivElement | null = this.#container?.querySelector(".hero__description")

      if (!title || !subtitle || !description) throw new Error('Missing elements for the animation')

      const timeline = gsap.timeline({});

      const splitTitle = this.#splitTitle(title);
      const splitSubtitle = this.#splitSubtitle(subtitle);
      const splitDescription = this.#splitDescription(description);

      timeline.addLabel('start')
        .fromTo(splitTitle.chars, {
          x: -20,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 1,
          ease: "back.out"
        })
        .addLabel('Fix broken letter spacing after split chars')
        .to(".title-char:not(.title-char1)", {
          x: -5,
        }, "<1.5")
        .addLabel("Subtitle Animation")
        .fromTo(splitSubtitle.chars, {
          opacity: 0,
          ease: "power4.out"
        }, {
          opacity: 1,
          scrambleText: {
            text: "{original}",
            // chars: "ウェブ開発者",
            chars: "React{}useState[]<>JSX./=component",
            revealDelay: 0.3,
            speed: 0.5,
          },
          duration: 2,
          stagger: 0.05,
        }, "<")
        .addLabel("Description animation")
        .from(splitDescription.lines, {
          opacity: 0,
          rotationX: -50,
          transformOrigin: "50% 50% -10px",
          duration: 1.5,
          stagger: 0.5,
          ease: "elastic.out"
        }, "<")
        .addLabel("Title Words Animation")
        .fromTo(".title-char:not(.title-char1):not(.title-char8)", {
          maxWidth: "50px",
        }, {
          rotateY: 90,
          opacity: 0,
          maxWidth: "0px",
        }, "<1")
        .to(".title-char1", {
          x: 3,
          y: -5
        }, "<")
        .to(".title-char8", {
          x: window.innerWidth > 640 ? -10 : -5,
          y: 5,
        }, "<")
        .addLabel("Subtitle Words Animation")
        .to(splitSubtitle.words, {
          rotateX: 90,
        }, "<0.5")
        .fromTo(".logo-line--1", {
          rotateX: 90,
        }, {
          rotateX: 0,
          rotateZ: 62,
          x: 10,
          width: window.innerWidth > 640 ? 27 : 20,
          opacity: 1,
        }, "<0.4")
        .fromTo(".logo-line--2", {
          rotateX: 90,
        }, {
          rotateX: 0,
          rotateZ: 90,
          x: -45,
          width: window.innerWidth > 640 ? 35 : 25,
          opacity: 1,
        }, "<")
        .to(".logo-line--1", {
          y: window.innerWidth > 640 ? -88 : -77,
          x: window.innerWidth > 640 ? 117 : 76,
        }, "<")
        .to(".logo-line--2", {
          y: window.innerWidth > 640 ? -61 : -52,
          x: window.innerWidth > 640 ? -145 : -91,
        }, "<")
        .to(".hero__description", {
          y: -45,
        }, "<0.2")
        .addLabel("end")

    } catch (err) {
      console.warn(err)
    }
  }

  scroll(hero = this.#hero, logo = this.#logoHeader) {
    try {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          toggleActions: "play none none reverse",
          markers: true,
        }
      })

      tl.clear();

      tl
        .fromTo(hero, {
          y: 0,
          opacity: 1,
          duration: 0.4,
        }, {
          y: -100,
          opacity: 0,
          duration: 0.4,
          ease: "back.in"
        })
        .fromTo(logo, {
          y: -100,
          opacity: 0,
          duration: 0.4
        }, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "back.in"
        }, "<")
        .restart()

    } catch (err) {
      console.warn(err)
    }
  }
  scrollMenu(container = this.#container) {
    const headerMenuEntries = document.querySelectorAll(".header .menu-wrapper .menu-entry")
    const menuContainer = container.querySelector(".hero__menu");
    const menuEntries = menuContainer?.querySelectorAll(".menu-entry");
    const menuContainerTop = menuContainer?.getBoundingClientRect().top

    if (!menuContainer || !menuEntries) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: menuContainer,
        start: `top+=1 top+=${menuContainerTop}`,
        end: `bottom+=${menuContainerTop} top+=${menuContainerTop}`,
        toggleActions: "play none none reverse",
        pin: true,
        pinSpacing: false,
        //markers: true
      }
    });
    tl
      .to(menuEntries, {
        x: 200,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.in",
      })
      .to(headerMenuEntries, {
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out"
      })
  }
}