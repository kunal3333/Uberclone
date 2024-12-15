import { Link } from "react-router-dom"

const Start = () => {
  return (
    <div>
 <div 
  className=" bg-cover bg-center bg-[url('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR33T3Iiugu8EtJHUi-RKQs-K3boxlgBXLuxXuzk0lso6Jj6MZf')]
      bg-red-400 h-screen pt-8 flex justify-between flex-col w-full ">
            <img className='w-16 ml-8' src='https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n' alt='' />

            <div className='bg-white pb-7 py-4 px-4'>
            <h4 className='text-3xl font-bold'>Get started with Uber</h4>
            <Link to='/login' className=' flex item-center justify-center  w-full bg-black text-white py-3 rounder mt-5'>Continue</Link>
        </div>
    </div>
    </div>
  )
}

export default Start
