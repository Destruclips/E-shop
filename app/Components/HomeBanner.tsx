import Image from "next/image"
import bannerimg from '../Components/banner-image.png'

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
        <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
            <div className="mb-8 md:mb-0 text-center">
            <h1 className="text-2xl md:text-7xl font-bold text-white mb-4">Summer Sales</h1>
            <p className="text-sm md:text-lg text-white mb-2">Enjoy discounts on selected items</p>
            <p className="text-md md:text-xl text-yellow-400 font-bold">Get About 50-70% off</p>

            </div>
            <div className="w-2/4 relative aspect-video">
                <Image src={bannerimg} alt={"banner-image"} fill className="object-contain"/>
            </div>
        </div>
    </div>
  )
}

export default HomeBanner