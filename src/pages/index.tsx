import Main from "@/components/layout/main";
import PageWithLayoutType from "@/types/layout";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";


const Index = () => {
  return (
    <>
      {/* <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" >
        <div>
          <Link href={'/game'} className="">
            <div className="px-6 py-3 rounded bg-primary-500 text-gray-50 font-bold duration-300 hover:bg-primary-400">Get Started</div>
          </Link>
        </div>
      </div> */}
      <div className="p-4 mt-16 w-full max-w-lg mx-auto ">
        <div className="my-12">
          <h1 className="text-primary-400 text-3xl italic font-bold ">{"Calculate player cost"}</h1>
          <h1 className="text-primary-400 text-3xl italic font-bold ">{"without the tears"}</h1>
          <h3 className=" text-gray-500 text-sm">Simple cost calculation support system</h3>
        </div>
        {/* <div className="flex items-center my-16">
          <div className="text-xs px-3 py-2 text-primary-500 font-bold border-primary-500 border rounded mr-2 uppercase">User friendly</div>
          <div className="text-xs px-3 py-2 text-primary-500 font-bold border-primary-500 border rounded mr-2 uppercase">Simple</div>
          <div className="text-xs px-3 py-2 text-primary-500 font-bold border-primary-500 border rounded mr-2 uppercase">Free</div>
        </div> */}
        <div className="flex flex-col justify-center items-center">
          <div className="my-2 text-gray-500">{'Click the button below to start'}</div>
          <Link href={'/game'} className="">
            <div className="px-4 py-2 bg-primary-500 flex justify-center items-center shadow text-white rounded font-bold">
              <span>Get Started</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute left-6 bottom-6" >
        <div className="mb-2">
          <h5 className="flex items-center text-xs text-gray-500">
            <span className="mr-2">{"Made with "}</span>
            <IoHeartSharp className='text-rose-500 animate-bounce mr-1' size={'1rem'} />
          </h5>
        </div>
        <div>
          <h5 className="flex items-center text-xs text-gray-500">
            <span className="mr-2">Copyright © {new Date().getFullYear()} All rights reserved.</span>
          </h5>
        </div>
      </div>
    </>
  )
}

(Index as PageWithLayoutType).layout = Main;

export default Index;