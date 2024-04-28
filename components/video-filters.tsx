'use client'

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function LandingPageVideoFilters () {

    const router = useRouter();
    return (
        <div className="md:w-1/2 grid grid-cols-3 gap-4 px-8 pt-4">
            <Button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {router.push('/media?search=cinema')}}>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                  Cinema
                </span>
            </Button>
            <Button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {router.push('/media?search=animals')}}>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                  Animals
                </span>
            </Button>
            <Button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {router.push('/media?search=anime')}}>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                  Anime
                </span>
            </Button>
            <Button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {router.push('/media?search=cartoon')}}>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                  Cartoon
                </span>
            </Button>
            <Button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {router.push('/media?search=art')}}>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                  Art
                </span>
            </Button>
            <Button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {router.push('/media?search=movies')}}>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                  Movies
                </span>
            </Button>
        </div>
    );
}