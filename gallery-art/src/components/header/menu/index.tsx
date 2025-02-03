import { motion } from 'framer-motion';
import { opacity, slideLeft, mountAnim } from '../anim';
import './styles.css';
import Link from './link';
import { useState } from 'react';

const menu = [
  {
    title: "Projects",
    description: "To See Everything",
  },
  {
    title: "Me",
    description: "To Learn Everything",
  },
  {
    title: "Contact",
    description: " To Send a Message",
  }
]

export default function index({closeMenu}) {

  return (
    <motion.div className="menu" variants={opacity} initial="initial" animate="enter" exit="exit">

        <div className="header">
          <motion.svg 
            variants={slideLeft} 
            {...mountAnim}
            onClick={() => {closeMenu()}} 
            width="68" 
            height="68" 
            viewBox="0 0 68 68" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.5L67 67" stroke="white"/>
              <path d="M66.5 1L0.999997 66.5" stroke="white"/>
          </motion.svg>
        </div>

        <div className="body">
          {
            menu.map( (el, index) => {
              return <Link data={el} index={index} key={index}/>
            })
          }
        </div>

    </motion.div>
  )
}
