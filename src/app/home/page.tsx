import React from 'react'
import Hero from './Hero/Hero'
import Candidates from '../candidates/page'
import {ElectionTimeline} from '../election-timeline/ElectionTimeline'
import { DM_Sans } from 'next/font/google'

const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans',
})

const Home = () => {

  return (
    <div className={`${dm_sans.className}`}>
      <Hero />
      <Candidates />
      <ElectionTimeline /> 
    </div>
  )
}

export default Home
