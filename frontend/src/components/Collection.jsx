import React from 'react'
import { Link } from 'react-router-dom'
import lavender4 from '../assets/lavender4.jpeg'
import lavender1 from '../assets/lavender1.jpg'

const Collection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Collections
      </h2>

      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Oil Collection */}
        <Link
          to="/ProductOil"
          className="group w-full md:w-1/2 max-w-md cursor-pointer"
        >
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={lavender4}
              alt="Oil's Collection"
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="mt-4 text-center text-2xl font-semibold text-gray-700 group-hover:text-black transition">
            Oil's Collection
          </div>
        </Link>

        {/* FaceWash's Collection */}
        <Link
          to="/ProductFacewash"
          className="group w-full md:w-1/2 max-w-md cursor-pointer"
        >
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={lavender1}
              alt="FaceWash Collection"
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="mt-4 text-center text-2xl font-semibold text-gray-700 group-hover:text-black transition">
            FaceWash Collection
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Collection
