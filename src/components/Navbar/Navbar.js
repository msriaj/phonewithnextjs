import { APP_NAME } from '@/config'
import Brand from '@/pages/brand/[slug]'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>

            <nav class="bg-gray-800">
                <div class="max-w-7xl mx-auto py-3  px-4 sm:px-6 lg:px-8 flex  justify-between items-center">
                    <button className='flex md:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                    </button>
                    <Link className="text-white font-bold text-xl mr-6 ml-2" href="/">
                        {APP_NAME}
                    </Link>
                    <div class="hidden md:block">
                        <div className=" ">
                            <div className="ml-10 flex items-baseline ">
                                <Link href="/">
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Home
                                    </button>
                                </Link>
                                <Link href="/about">
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        About
                                    </button>
                                </Link>
                                <Link href="/contact">
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Contact
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="flex  mr-2 items-center  bg-white py-1 px-2 rounded-full">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input class="outline-none w-full text-xs ml-2" type="text" placeholder="Search" />
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar