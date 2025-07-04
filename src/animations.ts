import { gsap } from 'gsap';
import { SplitText, ScrambleTextPlugin } from 'gsap/all';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

async function textApparitionAnim(titleElem = 'h1', subtitleElem = 'h2', descriptionElem = '.description') {
    await document.fonts.ready;

    const timeline = gsap.timeline();

    const splitTitle = SplitText.create(titleElem, {
      type: "chars"
    });

    const splitSubtitle = SplitText.create(subtitleElem, {
      type: "chars"
    });

    const splitDescription = SplitText.create(descriptionElem, {
      type: "lines"
    })

    timeline.addLabel('start')
      .from(splitTitle.chars, {
        x: -50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out"
      })
      .addLabel("Subtitle Animation")
      .fromTo(splitSubtitle.chars, {
        opacity: 0,
        ease: "power4.out"
      }, {
        opacity: 1,
        scrambleText: {
          text: "{original}",
          chars: "ウェブ開発者",
          revealDelay: 0.3,
          speed: 0.5,
        },
        duration: 2,
        stagger: 0.05,
      }, "<1")
      .addLabel("Description animation")
      .from(splitDescription.lines, {
        opacity: 0,
        rotationX: -50,
        transformOrigin: "50% 50% -10px",
        duration: 1.5,
        stagger: 0.5,
        ease: "elastic.out"
      }, "<1.2")
      .addLabel("end")
  }

  export {
    textApparitionAnim
  }