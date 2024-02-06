import React from 'react'
import { useDrag } from 'react-dnd'



export default function SolarPanel({ image, watt, id }) {

  const [{ isDragging }, dragPanel] = useDrag(() => ({
    type: "solarPanel",
    item: { watt: watt },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),

    })
  }))

  return (
    <div className='cursor-grab w-[150px] h-[220px] flex flex-col justify-center items-center group hover:scale-110 transition duration-500 max-lg:w-[120px] max-lg:h-[176px] max-md:w-[81px] max-md:h-[120px]  p-1' >
      <div className='absolute w-[150px] h-[220px] opacity-10 backdrop-blur-10 bg-white rounded-2xl shadow-md group-hover:shadow-lg max-lg:w-[120px] max-lg:h-[176px] max-md:w-[81px] max-md:h-[120px]' style={isDragging ? { opacity: 0.2 } : {}} />
      <div ref={dragPanel} style={{ '--image-url': `url(${image})` }} className='bg-[image:var(--image-url)] bg-center bg-cover w-[107px] h-[177px] max-lg:w-[75px] max-lg:h-[124px] max-md:w-[64px] max-md:h-[106px] z-10' />
      <h1 className='text-center select-none pt-1'>{watt} Watt</h1>
    </div>
  )
}
