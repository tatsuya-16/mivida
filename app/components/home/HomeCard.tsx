import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as motion from "framer-motion/client";

const HomeCard = () => {
  return (
    <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
        <Card className="shadow-lg hover:shadow-cyan-500/50">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur accusamus tempora aut asperiores saepe odio! Perferendis sint nulla recusandae? Fugiat quam consequuntur nostrum labore, harum dolorum ab maiores dolores voluptatibus?
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={"/"} className="text-blue-500">Read More</Link>
          </CardFooter>
        </Card>
      </motion.div>
  )
}

export default HomeCard