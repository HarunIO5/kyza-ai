import { vidType } from "@/app/layout";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/react";
import LandingPageVideoFilters from "@/components/video-filters";

export default function LandingPageVideos ()  {
    const boxStyle =
    'rounded-xl brightness-110';
    return (
      <>
        <div className="w-full grid md:grid-cols-4 auto-rows-[300px] gap-4" >
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2`}
                  key={'Large round chrome orb.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Large%20round%20chrome%20orb.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Large%20round%20chrome%20orb.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Large%20round%20chrome%20orb.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle}`}
                  key={'spaceship oblivion.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/spaceship%20oblivion.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/spaceship%20oblivion.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/spaceship%20oblivion.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:row-span-2`}
                  key={'Fisherman of Maldives.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Fisherman%20of%20Maldives.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Fisherman%20of%20Maldives.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Fisherman%20of%20Maldives.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle}`}
                  key={'ancient fantasy lands.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/ancient%20fantasy%20lands.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/ancient%20fantasy%20lands.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/ancient%20fantasy%20lands.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2`}
                  key={'1970 red porsche.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/1970%20red%20porsche.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/1970%20red%20porsche.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/1970%20red%20porsche.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2`}
                  key={'hearding cows.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/hearding%20cows.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/hearding%20cows.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/hearding%20cows.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2`}
                  key={'magical flowers.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/magical%20flowers.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/magical%20flowers.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/magical%20flowers.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:row-span-2 md:col-span-2`}
                  key={'Cyberpunk man.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Cyberpunk%20man.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Cyberpunk%20man.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/Cyberpunk%20man.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2 md:row-span-2 brightness-125`}
                  key={'staring at the meda.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/staring%20at%20the%20meda.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/staring%20at%20the%20meda.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/staring%20at%20the%20meda.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2`}
                  key={'gecko skateboard.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/gecko%20skateboard.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/gecko%20skateboard.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/gecko%20skateboard.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
                <Card
                  isFooterBlurred
                  className={`${boxStyle} md:col-span-2`}
                  key={'horses running.mp4'}
                  >
                    <video 
                      className="h-full w-full object-cover"
                      preload="metadata"
                      poster={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/horses%20running.mp4#t=0.1'}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/horses%20running.mp4#t=0.1'} type="video/mp4" />
                      <track
                        src={'https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/horses%20running.mp4'}
                      />
                      Your browser does not support the video tag.
                    </video>
                </Card>
          </div>
      </>   
    );
}