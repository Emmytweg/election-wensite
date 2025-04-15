import React from 'react'
import Hero from './Hero/Hero'
import Candidates from './Candidates'
import {ElectionTimeline} from '../election-timeline/ElectionTimeline'
import { DM_Sans } from 'next/font/google'
import HowToVote from './HowToVote/HowToVote'

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
      <HowToVote />
    </div>
  )
}

export default Home
