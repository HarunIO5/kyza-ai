'use client'

import { dotWave } from "ldrs";
import { Typewriter } from "react-simple-typewriter";


export default function LoadingSearchResults () {

  dotWave.register();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <l-dot-wave
        size="65"
        speed="1.75" 
        color="purple" 
      ></l-dot-wave>
      <span className="mt-4 font-medium mx-12">
        {/* Style will be inherited from the parent element */}
        <Typewriter
          words={['Searching for your video...']}
          loop={false}
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </span>
    </div>
  );
}
