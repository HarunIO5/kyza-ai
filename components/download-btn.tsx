'use client'

import { saveAs } from 'file-saver';
import { Button } from "@nextui-org/button"
import { DownloadIcon } from "lucide-react"

export default function DownloadBtn ({srcName, srcUrl}: {srcName: string, srcUrl: string}) {

    const saveFile = ({srcUrl, srcName}: {srcUrl: string, srcName: string}) => {
        saveAs(new Blob([srcUrl]), `${srcName}.mp4`)
      }

    return (
        <Button className="w-fit dark:bg-slate-800" onClick={() => {saveFile({srcName: srcName, srcUrl: srcUrl})}}>
            <DownloadIcon />
            Download
        </Button>
    );
}