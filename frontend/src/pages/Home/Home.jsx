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
        title="Perceptive Brains | Patent, Trademark & IP Services in India"
        description="Perceptive Brains provides patent registration, trademark registration, copyright, design registration, IP consulting and web services for businesses and innovators in India."
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

