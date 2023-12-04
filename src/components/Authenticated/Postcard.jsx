import React from 'react'
import service from '../../appwrite/config'

function Postcard({post}) {
  return (
    <div class="relative bg-red-400  h-[300px] w-[300px] bg-red-400 rounded-2xl">
        <img
            src= {service.getFilePreview(post.featuredImage)}
            alt="AirMax Pro"
            class="z-0 h-full w-full rounded-2xl object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div class="absolute bottom-4 left-4 text-left">
            <h1 class="text-lg font-semibold text-white">{post.title}</h1>

            <button class="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
            View Blog →
            </button>
        </div>
    </div>
  )
}

export default Postcard