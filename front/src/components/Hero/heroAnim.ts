import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSDevTools } from 'gsap/GSDevTools';

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger, GSDevTools);

export default class HeroAnim {
  #container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.#container = container;
  }

  init() {
    this.heroAnimation()
    //this.scroll()
    this.scrollMenu(this.#container)
  }

  async heroAnimation() {
    try {
      await document.fonts.ready;

      const title: HTMLHeadingElement | null = this.#container?.querySelector(".hero__title");
      const subtitle: HTMLHeadingElement | null = this.#container?.querySelector(".hero__subtitle");
      const description: HTMLDivElement | null = this.#container?.querySelector(".hero__description")

      if (!title || !subtitle || !description) throw new Error('Missing elements for the animation')

      const splitTitle = title && SplitText.create(title, {
        type: "chars, words",
      });
      const splitSubtitle = subtitle && SplitText.create(subtitle, {
        type: "chars",
      });
      const splitDescription = description && SplitText.create(description, {
        type: "lines",
      });

      const tl = gsap.timeline({
        defaults: {
          duration: 1,
        }
      });

      tl
        .from(splitTitle.chars, {
          autoAlpha: 0,
          stagger: 0.1,
          y: 20,
          ease: "back(4)"
        })
        .to(splitTitle.chars[0], {
          x: 4,
        }, "<+=0.2")
        .to(subtitle, {
          text: subtitle.dataset.text,
        }, "<+=1")
        .from(splitDescription.lines[0], {
          autoAlpha: 0,
          x: -50,
          stagger: 0.5,
          ease: "back.out"
        }, "<+=0.5")
        .from(splitDescription.lines[1], {
          autoAlpha: 0,
          x: 50,
          stagger: 0.5,
          ease: "back.out"
        }, "<+=0.5")
    } catch (err) {
      console.warn(err)
    }
  }

  scroll() {
    try {
      const logo = document?.querySelector("header .logo")
      const hero = this.#container?.querySelector(".hero")
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