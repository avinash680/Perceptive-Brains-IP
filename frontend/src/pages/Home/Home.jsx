import React from 'react'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import OurPracticeAreas from './OurPracticeAreas'
import WhyChoose from './WhyChoose'
import Process from './Process'
import Ourteam from './OurTeam'
import Testimonials from './Testimonial'
import PageMeta from '../../components/PageMeta'

const Home = () => {
  return (
     <>
      <PageMeta
        title="Perceptive Brains | Intellectual Property, Technology & Innovation"
        description="Perceptive Brains helps businesses and innovators protect patents, trademarks, copyrights, design rights, and technology-driven ideas with expert IP strategy."
      />
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

export default Home

