import Main from "@/components/layout/main";
import PageWithLayoutType from "@/types/layout";
import Link from "next/link";


const Index = () => {
  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" >
        <div>
          {/* <div className="flex justify-center items-center mb-4">ようこそ</div> */}
          <Link href={'/game'} className="">
            <div className="px-6 py-3 rounded bg-primary-500 text-gray-50 font-bold duration-300 hover:bg-primary-400">Get Started</div>
          </Link>
        </div>
      </div>
    </>
  )
}

(Index as PageWithLayoutType).layout = Main;

export default Index;