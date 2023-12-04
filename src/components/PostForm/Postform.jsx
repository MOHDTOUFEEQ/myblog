
import React from 'react'
import { useForm } from 'react-hook-form'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Postform({post}) {
    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)
    const {register,handleSubmit,watch,setValue,} = useForm({
        defaultValues:{
            title : post?.title || '',            
            slug : post?.slug || '',            
            status : post?.status || '',        
            content : post?.content || '',            
        }
    })
    const watchedFieldValue = watch('title');

  // Use useEffect to perform actions when watched value changes
  useEffect(() => {
    function slugtranform(value) {
      const transformedValue = value.replace(/\s+/g, '-');
      setValue("slug",transformedValue,{required:true})
    }
    slugtranform(watchedFieldValue)
    // You can perform additional actions based on the watched value
  }, [watchedFieldValue]);

    const formsubmit = async(data)=>{
        if (data) {
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const userId = userData ? userData.$id : null;
                const post = await service.createPost({...data , userId })
                if (post) {
                    navigate("/")
                }
            }
            
        }
    }
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit(formsubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 w-full border rounded-md"
            required
            {...register("title",{
                required: true,
            })}
          />
        </div>

        <div>
          <label htmlFor="slug" className=" block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="mt-1 p-2 w-full border rounded-md"
            required
            {...register("slug",{
                required: true,
            })}
            disabled
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            className="mt-1 p-2 w-full border rounded-md"
            required
            {...register("status",{
                required: true,
            })}
          >
            <option value="draft">Active</option>
            <option value="published">Deactive</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="mt-1 p-2 w-full border rounded-md"
            accept="image/*"
            required
            {...register("image",{
                required: true,
            })}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            className="mt-1 p-2 w-full border rounded-md"
            rows="8"
            required
            {...register("content",{
                required: true,
            })}
          />
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Postform