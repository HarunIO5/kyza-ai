import { Card, CardBody } from "@nextui-org/react";
import GSButton from "./gradient-shadow-button";

export default function CTABanner ({
    bannerText,
    bannerBtn,
    bannerLink
} : {
    bannerText?: string,
    bannerBtn?: string,
    bannerLink?: string
}) {
    return (
        <Card className=" border border-cyan-600 dark:border-cyan-900 bg-gradient-to-tr from-white to-cyan-700 dark:from-slate-950 dark:to-cyan-900">
          <CardBody>
            <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
              <div className="">
                <p className="text-lg">{bannerText}</p>
              </div>
              <div className="col-span-6 md:col-span-2">
                <GSButton bannerBtn={bannerBtn} bannerLink={bannerLink}/>
              </div>
            </div>
          </CardBody>
        </Card>
    );
}