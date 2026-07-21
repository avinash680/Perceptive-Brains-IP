import React from 'react'
import HeroSection from './herosection'
import StatsSection  from './statsSection'
import OurPracticeAreas from './ourPracticeares'
import WhyChoose from './whychoose'
import Process from './process'
import Ourteam from './ourTeam'
import Testimonials from './TestImonial'
const home = () => {
  return (
     <>
     <HeroSection />
      <StatsSection />
      <OurPracticeAreas />
      <WhyChoose />
      <Ourteam />
      <Process />
      <Testimonials />
     </>
  )
}

export default home

