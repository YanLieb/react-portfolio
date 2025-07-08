import { gsap, ScrollTrigger } from 'gsap/all'

export default function scrollMenuAnim(
 wrapperWidth: number,
 wrapperHeight: number,
 container: React.RefObject<HTMLDivElement>,
 menuEntries: NodeListOf<Element>
): void {

 if (!wrapperWidth || !wrapperHeight || !container || !menuEntries.length) return;

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
}