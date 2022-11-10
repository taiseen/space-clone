import { Link } from "react-router-dom";


const PageNotFound = () => {

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen bg-gray-300'>
      
      <p className='text-3xl font-bold '>404 | Page NotFound</p>
      
      <Link to='/projects' className='text-xl cursor-pointer hover:underline underline-offset-8 hover:text-blue-500 duration-200'>Bake to home page</Link>
    
    </div>
  )
}

export default PageNotFound