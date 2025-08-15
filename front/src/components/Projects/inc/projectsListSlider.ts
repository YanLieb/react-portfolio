import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(Observer, SplitText);

export default function projectsListSlider(container: HTMLDivElement | null) {
  if (!container) return;

  const projects = gsap.utils.toArray<HTMLDivElement>('.project');
  const wrap = gsap.utils.wrap(0, projects.length);
  let currentIndex = 0;
  let isAnimating = false;

  gsap.set(projects, { xPercent: 100 });
  gsap.set(projects[0], { xPercent: 0 });
  gsap.set(projects[0]?.querySelector('.project__title'), { autoAlpha: 1 });
  gsap.set(projects[0]?.querySelector('.project__body'), { autoAlpha: 1 });

  const slide = (followingIndex: number) => {
    followingIndex = wrap(followingIndex);
    isAnimating = true;

    const totalSlides = projects.length;
    const forwardDistance = (followingIndex - currentIndex + totalSlides) % totalSlides;
    const backwardDistance = (currentIndex - followingIndex + totalSlides) % totalSlides;
    const shouldGoForward = forwardDistance <= backwardDistance;
    const calculatedDirection = shouldGoForward ? -1 : 1;

    const currentProject = projects[currentIndex];
    const currentTitle = currentProject?.querySelector('.project__title');
    const currentBody = currentProject?.querySelector('.project__body');

    const followingProject = projects[followingIndex];
    const followingTitle = followingProject?.querySelector('.project__title');
    const followingBody = followingProject?.querySelector('.project__body');

    if (!currentProject || !followingProject) {
      console.warn("No project found");
      isAnimating = false;
      return;
    }

    const splitCurrentTitle = new SplitText(currentTitle, { type: "words" });
    const splitCurrentBody = new SplitText(currentBody, { type: "lines" });
    const splitFollowingTitle = new SplitText(followingTitle, { type: "words" });
    const splitFollowingBody = new SplitText(followingBody, { type: "lines" });

    gsap.set(followingProject, {
      xPercent: calculatedDirection === -1 ? 100 : -100
    });
    gsap.set(splitFollowingTitle.words, {
      y: -50,
      autoAlpha: 0
    });
    gsap.set(splitFollowingBody.lines, {
      x: shouldGoForward ? 50 : -50,
      autoAlpha: 0
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "back.inOut(1.7)"
      },
      onComplete: () => {
        splitCurrentTitle.revert();
        splitCurrentBody.revert();
        splitFollowingTitle.revert();
        splitFollowingBody.revert();

        currentIndex = followingIndex;
        isAnimating = false;
      }
    })

    tl
      .to(splitCurrentTitle.words, {
        y: -50,
        autoAlpha: 0,
        stagger: 0.1
      })
      .to(splitCurrentBody.lines, {
        x: shouldGoForward ? -50 : 50,
        autoAlpha: 0,
        stagger: 0.1
      }, "<")
      .to(currentProject, {
        xPercent: 100 * calculatedDirection,
      })
      .to(followingProject, {
        xPercent: 0
      }, "<")
      .to(splitFollowingTitle.words, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1
      })
      .to(splitFollowingBody.lines, {
        x: 0,
        autoAlpha: 1,
        stagger: 0.1
      }, "<")
  }

  Observer.create({
    target: container,
    type: "pointer",
    onRight: () => {
      if (isAnimating) return;
      slide(currentIndex - 1);
    },
    onLeft: () => {
      if (isAnimating) return;
      slide(currentIndex + 1);
    },
    onClick: (self) => {
      if (isAnimating) return;

      const target = self.event.target as HTMLElement;
      if (target.closest('.projects__next-btn')) {
        slide(currentIndex + 1);
      } else if (target.closest('.projects__prev-btn')) {
        slide(currentIndex - 1);
      }

      const menuEntries = document.querySelectorAll('.projects__menu .projects__menu-item');
      menuEntries.forEach((entry, index) => {
        if (target.closest('.projects__menu-item') === entry) {
          if (index === currentIndex) return;
          slide(index);
        }
      });
    }
  });
}