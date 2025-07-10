import { gsap, ScrollTrigger } from 'gsap/all'

function scrollMenuAnim(
 wrapperWidth: number,
 wrapperHeight: number,
 menuContainer: React.RefObject<HTMLDivElement>,
 menuEntries: NodeListOf<Element>
): void {

 try {
  if (!wrapperWidth || !wrapperHeight || !menuContainer || !menuEntries.length) return;

  menuEntries.forEach((entry, key) => {
   const entryTop = entry?.getBoundingClientRect().top;
   if (key === 0) {
    const tl = gsap.timeline({
     scrollTrigger: {
      trigger: entry,
      start: `top top+=${entryTop}`,
      end: `bottom top-=${entryTop}`,
      scrub: true,
      pin: true,
      pinSpacing: false,
      //markers: true,
     }
    });

    tl
     .to(entry, {
      x: `-${wrapperWidth && wrapperWidth / 2}px`,
     })
     .to(entry, {
      y: `-${wrapperHeight && wrapperHeight / 2}px`
     });

   } else {

    ScrollTrigger.create({
     trigger: entry,
     start: `top top+=${entryTop}`,
     end: `bottom top-=${entryTop}`,
     pin: true,
     pinSpacing: false,
     //markers: true,
    });
   }
  });

 } catch (err) {
  console.warn(err)
 }
}

export default scrollMenuAnim;