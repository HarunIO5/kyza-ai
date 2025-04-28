"use client";

import { motion } from "framer-motion";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { title } from "@/components/primitives";

const ScrollingTestimonials = () => {
  return (
    <div className="py-12">
      <div className="mb-8 px-4 text-center">
        <h3 className={title({ color: "violet" })}>Testimonials</h3>
        <p className="text-sm mt-2 max-w-lg mx-auto text-foreground/60">
          From some of the best in the game.
        </p>
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />

        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
};

const TestimonialList = ({
  list,
  reverse = false,
  duration = 50,
}: {
  list: typeof testimonials.top;
  reverse?: boolean;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
          >
            <Image
              src={t.img}
              className="w-full h-44 object-cover"
              alt={`${t.name}'s profile`}
              width={200}
              height={400}
            />
            <div className="bg-card text-card-foreground p-4">
              <span className="block font-semibold text-lg mb-1">{t.name}</span>
              <span className="block mb-3 text-sm font-medium text-foreground/80">
                {t.title}
              </span>
              <span className="block text-sm text-foreground/60">{t.info}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

const testimonials = {
  top: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=703&q=80",
      name: "Emily P.",
      title: "Graphic Designer",
      info: "As a graphic designer, Kyza has become my secret weapon. It effortlessly transforms my text ideas into stunning visuals, saving me hours of work. Highly recommend!",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
      name: "Steph R.",
      title: "Content Creator",
      info: "Impressed by the speed and accuracy of Kyza. As a content creator, it's streamlined my workflow, allowing me to focus more on creativity. A definite game-changer!",
    },
    {
      id: 3,
      img: "https://plus.unsplash.com/premium_photo-1670588776139-da93b47afc6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Maya J.",
      title: "Screenwriter",
      info: "With Kyza, I've unlocked a whole new level of storytelling. From scripts to visuals, it brings my concepts to life seamlessly. A must-have for any storyteller!",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      name: "Hannah T.",
      title: "Copywriter",
      info: "As a copywriter, visuals are just as important as words. Kyza has revolutionized my creative process, allowing me to visualize my copy instantly. It's a copywriter's dream come true!",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Alex W.",
      title: "Digital Marketer",
      info: "In the world of digital marketing, staying ahead is crucial. Thanks to Kyza, I'm able to create eye-catching visuals that grab attention instantly. It's a marketer's dream!.",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      name: "Evan L.",
      title: "Social Media Manager",
      info: "As a social media manager, Kyza has become my go-to tool for creating thumb-stopping content. It's intuitive, efficient, and produces exceptional results every time!",
    },
  ],
  middle: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Andrea C.",
      title: "Video Producer",
      info: "From concept to execution, Kyza has transformed the way we produce video content. Its AI-powered capabilities are unmatched, making our videos stand out in a crowded market.",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Daniel E.",
      title: "Small Business Owner",
      info: "As a small business owner, resources are limited. Kyza has leveled the playing field, enabling me to create professional-grade visuals without breaking the bank. It's a game-changer for entrepreneurs!",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
      name: "Max Q.",
      title: "Creative Strategist",
      info: "With Kyza, brainstorming sessions have never been more productive. Its rapid image and video generation capabilities help us bring ideas to life in real-time, fostering creativity and collaboration.",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
      name: "Adam R.",
      title: "UI/UX Designer",
      info: "As a UI/UX designer, attention to detail is everything. Kyza aligns perfectly with my design process, allowing me to iterate quickly and produce pixel-perfect visuals effortlessly.",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1625504615927-c14f4f309b63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
      name: "Brian T.",
      title: "Creative Director",
      info: "From concept to execution, Kyza has transformed our agency's workflow. Its intuitive interface and powerful features have made it our go-to solution for all our visual content needs",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1589729132389-8f0e0b55b91e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      name: "Jessica G.",
      title: "Visual Designer",
      info: "I've tried numerous text-to-video tools, but none compare to Kyza. Its versatility and precision make it an indispensable asset in my toolkit. Highly recommend it to fellow designers!",
    },
  ],
};

export default ScrollingTestimonials;
