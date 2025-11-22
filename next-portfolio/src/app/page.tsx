"use client"

import { useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useGSAP } from '@gsap/react';

import Header from './(front)/components/Header/Header';
import Hero from './(front)/components/Hero/Hero';
import ProjectsList from './(front)/components/Projects/ProjectsList';
import Contact from './(front)/components/Contact/Contact';
import Bubbles from "./(front)/components/Projects/inc/Bubbles";

import "./front.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const mainContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.2
    })
  }, { scope: mainContainer })

  return (
    <div ref={mainContainer} id="smooth-wrapper">
      <Header />
      <div id="smooth-content" className="home relative">
        <Bubbles
          className="cursor-anim-wrapper"
          fade={30}
          strokeGray={230}
          bg={255}
        >
          <Hero />
          <ProjectsList />
          <Contact />
        </Bubbles>
      </div>
    </div>
  )
}
