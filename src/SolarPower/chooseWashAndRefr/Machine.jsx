import React from 'react'
import { useDrag } from 'react-dnd'

export default function Machine({image , type , name , className}) {
  let typeName=''
  if(name==='Washing Machine'){
    typeName='Machine';
  }
  else if(name==='Refrigerator'){
    typeName='Machine'
  }
  else{
    typeName=name
  }
    const [{isDragging} , dragStand] = useDrag(() => ({
        type:typeName,
        item:{name : name},
        collect:(monitor) => ({
            isDragging: !!monitor.isDragging(),

        })
    }))

  return (
    <div className='relative w-[150px] h-[150px] cursor-grab flex flex-col justify-center items-center hover:scale-110 group transition duration-500 max-lg:w-[120px] max-lg:h-[120px]  ' >
        <div className='absolute w-[160px] h-[160px] opacity-10 backdrop-blur-10 bg-white rounded-2xl shadow-md group-hover:shadow-lg max-lg:w-[120px] max-lg:h-[120px] ' style={isDragging ? {opacity:0.2} : {}}/>
        <div ref={dragStand} style={{ '--image-url': `url(${image})` }} className={className}/>
        <h1 className='text-center select-none pt-1'>{name}</h1>
    </div>
  )
}
