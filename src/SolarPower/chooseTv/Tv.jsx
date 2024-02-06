import React from 'react'
import { useDrag } from 'react-dnd'

export default function Tv({image , name}) {
    const [{isDragging} , dragStand] = useDrag(() => ({
        type:'Tv',
        item:{name : name},
        collect:(monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

  return (
    <div className='w-full h-[150px] cursor-grab flex flex-col justify-center items-center hover:scale-110 group transition duration-500' >
        <div className='absolute w-[160px] h-[160px] opacity-10 backdrop-blur-10 bg-white rounded-2xl shadow-md group-hover:shadow-lg' style={isDragging ? {opacity:0.2} : {}}/>
        <div ref={dragStand} style={{ '--image-url': `url(${image})` }} className='bg-[image:var(--image-url)]  bg-center bg-cover  w-[100px] h-[114px] z-10'/>
        <h1 className='text-center select-none pt-1'>Tv</h1>
    </div>
  )
}
