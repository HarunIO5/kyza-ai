import { vidType } from "@/app/layout";
import { Card } from "@nextui-org/react";

export default function LandingPageVideos ({vidProp, limit, offset, isMobile} : {vidProp : vidType[], limit: number, offset: number, isMobile: boolean})  {
    const boxStyle =
    'rounded-xl brightness-110';
    return (
        <div className="w-full grid md:grid-cols-4 auto-rows-[300px] gap-4 my-10" >
                {vidProp && (
                    vidProp.map((file: vidType, i: number) => {
                        return (
                          <>
                            <Card
                            isFooterBlurred
                            className={`${boxStyle} ${
                              i === 0 || i === 4 || i === 5 || i === 6 ? 'md:col-span-2' : ''
                            } ${i === 2 ? 'md:row-span-2' : ''} ${i === 7 ? 'md:row-span-2 md:col-span-2' : ''} ${i === 8 ? 'md:col-span-2' : ''}`}
                            key={file.id}
                            
                            >
                              <video 
                                className="h-full w-full object-cover"
                                preload="metadata"
                                poster={file.url + '#t=0.1'}
                                autoPlay
                                loop
                                muted
                                playsInline
                              >
                                <source src={file.url + '#t=0.1'} type="video/mp4" />
                                <track
                                  src={file.url}
                                />
                                Your browser does not support the video tag.
                              </video>
                          </Card>
                          </>
                        )
                    })
                )} 
            </div>
    );
}