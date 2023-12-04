import React from 'react'
import service from '../../appwrite/config'

function Postcard({post}) {
  return (
    <div class="relative h-80  overflow-hidden rounded-3xl border-2 px-6 border-black pl-2">
        <img
            src= {service.getFilePreview(post.featuredImage)}
            alt="AirMax Pro"
            class="z-0 h-3/4 w-full rounded-2xl object-contain"
        />
        <div class="absolute bottom-4 left-4 text-left">
            <h1 class="text-lg font-semibold text-black">{post.title}</h1>

            <button class="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-black">
            View Blog →
            </button>
        </div>
    </div>
  )
}

export default Postcard