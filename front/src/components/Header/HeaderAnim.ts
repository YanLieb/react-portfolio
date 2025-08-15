import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class HeaderAnim {

  constructor() {
  }

  init() {
    this.scrollMenu();
    this.scrollLogo();
  }

  scrollLogo() {
    gsap.to(".header__logo .logo", {
      autoAlpha: 1,
      yPercent: 100,
      ease: "back",
      scrollTrigger: {
        trigger: ".header__logo",
        start: `-=${window.scrollY}px`,
        end: `-=${window.scrollY}px`,
        toggleActions: "play none none reverse",
      }
    })
  }

  scrollMenu() {
    gsap.to(".header__menu .menu-entry", {
      autoAlpha: 1,
      yPercent: 100,
      stagger: 0.1,
      ease: "back",
      scrollTrigger: {
        trigger: ".header__menu",
        start: `-=${window.scrollY}px`,
        end: `-=${window.scrollY}px`,
        toggleActions: "play none none reverse",
      }
    })

  }

}