'use client'

import { saveAs } from 'file-saver';
import { Button } from "@nextui-org/button"
import { DownloadIcon } from "lucide-react"

export default function DownloadBtn ({srcName, srcUrl, etx}: {srcName: string, srcUrl: string, etx: string}) {

    const saveFile = ({srcUrl, srcName, etx}: {srcUrl: string, srcName: string, etx: string}) => {

        const name = (srcName.replace(/[^a-zA-Z ]/g, "")).slice(0, 20)

        saveAs(new Blob([srcUrl], {type: etx == 'webp' ? 'image/webp' : 'video/mp4'}), `${name}.${etx}`)
      }

    return (
        <Button className="w-fit dark:bg-slate-800" onClick={() => {saveFile({srcName: srcName, srcUrl: srcUrl, etx: etx})}}>
            <DownloadIcon />
            Download
        </Button>
    );
}