import { gsap } from 'gsap';
import { SplitText, ScrambleTextPlugin } from 'gsap/all';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

async function textApparitionAnim(titleElem = 'h1', subtitleElem = 'h2', descriptionElem = '.description') {
    await document.fonts.ready;

    const timeline = gsap.timeline();

    const splitTitle = SplitText.create(titleElem, {
      type: "chars",
      charsClass: "title-char++"
    });

    const splitSubtitle = SplitText.create(subtitleElem, {
      type: "words, chars",
      wordsClass: "subtitle-word++",
    });

    const splitDescription = SplitText.create(descriptionElem, {
      type: "lines"
    })

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
          chars: "ウェブ開発者",
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
      }, "<1.2")
      .addLabel("Title Words Animation")
      .fromTo(".title-char:not(.title-char1):not(.title-char8)", {
        maxWidth: "50px",
      } ,{
        rotateY: 90,
        opacity: 0,
        maxWidth: "0px",
      },"<1")
      .to(".title-char1", {
        x: 3,
        y: -5
      }, "<")
      .to(".title-char8", {
        x: -10,
        y: 5,
      }, "<")
      .addLabel("Subtitle Words Animation")
      .to(splitSubtitle.words,{
        rotateX: 90,
      }, "<0.5")
      .fromTo(".line1",{
        rotateX: 90,
      },{
        rotateX: 0,
        rotateZ: 62,
        x: 10,
        width: 27,
        opacity: 1,
      }, "<0.4")
      .fromTo(".line2", {
        rotateX: 90,
      }, {
        rotateX: 0,
        rotateZ: 90,
        x: -45,
        width: 35,
        opacity: 1,
      }, "<")
      .to(".line1", {
        y: -75,
        x: 63,
      }, "<")
      .to(".line2", {
        y: -49,
        x: -91,
      }, "<")
      .to(".description", {
        y: -45,
      }, "<0.2")
      .addLabel("end")
  }

  export {
    textApparitionAnim
  }