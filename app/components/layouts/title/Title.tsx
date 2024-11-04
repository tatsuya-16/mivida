import * as motion from "framer-motion/client";
import { ChevronDown } from 'lucide-react'
import React from 'react'

const Title = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            体験をコレクションしよう
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl"
          >
            MIVIDAで、あなたの体験を世界中の人々と共有しましょう。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ChevronDown size={40} className="animate-bounce" />
          </motion.div>
        </section>
  )
}

export default Title