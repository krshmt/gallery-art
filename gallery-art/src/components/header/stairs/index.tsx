import React from 'react'
import './styles.css';
import { height, background, mountAnim } from '../anim';
import { motion } from 'framer-motion';

export default function index() {

  return (
    <motion.div className="stairs">
      {
        [...Array(5)].map( (_, index) => {
          return <motion.div 
          variants={height} 
          {...mountAnim}
          custom={4 - index} 
          className="stair">
          </motion.div>
        })
      }
      <motion.div 
      variants={background} 
      {...mountAnim}
      className="background">
      </motion.div>
    </motion.div>
  )
}
