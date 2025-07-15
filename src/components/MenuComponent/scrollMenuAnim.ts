import { gsap, ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

function scrollMenuAnim(
  wrapperWidth: number,
  wrapperHeight: number,
  menuContainer: React.RefObject<HTMLDivElement>,
  menuEntries: NodeListOf<Element>
): void {

  try {
    if (!wrapperWidth || !wrapperHeight || !menuContainer || !menuEntries.length) return;

    const headerMenuEntries = document.querySelectorAll(".header .menu-wrapper .menu-entry")
    const menuContainerTop = menuContainer.current.getBoundingClientRect().top
    console.log(menuContainerTop)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: menuContainer.current,
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

  } catch (err) {
    console.warn(err)
  }
}

export default scrollMenuAnim;