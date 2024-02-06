import React, { useContext } from 'react'
import kitchen from './../assets/SolarPower/kitchen.png'
import edit from './../assets/edit.png'
import Machine from './Machine'
import { useDrop } from 'react-dnd'
import WattConsumption from '../WattConsumption'
import { StateContext } from '../contextState'

export default function 
ChooseWashAndRefr({ setDoneWithThePanels, setDoneWithKitchen }) {


    const { solarPowerState, dispatch } = useContext(StateContext)


    const [{ isOverDroppingMachines }, dropWashAndRefr] = useDrop(() => ({
        accept: 'Machine',
        drop: ((items) => {
            return dispatch({ type: 'dropMachine', payload: items.name })
        })

    }))

    const [{ isOverDroppingHoot }, dropHoot] = useDrop(() => ({
        accept: "Hoot",
        drop: (items) => {
            return dispatch({ type: 'dropMachine', payload: items.name })
        }
    }))



    return (
        <div className="relative w-screen h-screen flex justify-center p-10 items-center overflow-hidden max-sm:flex-col-reverse">
            <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900 rounded-tl-3xl rounded-bl-3xl flex flex-col justify-start items-center gap-7 overflow-scroll scrollbar-hide max-lg:h-[528px] max-md:h-[462px] p-5 max-sm:h-32 max-sm:w-[432px] max-sm:flex-row max-sm:rounded-tl-none max-sm:rounded-br-3xl max-sm:overflow-y-hidden max-[440px]:w-[360px] '>
                {
                    Object.keys(solarPowerState.Kitchen).map(machine =>
                        <Machine
                            className='bg-[image:var(--image-url)] bg-center bg-cover w-[60px] h-[200px] max-lg:w-[36px] max-lg:h-[120px] z-[5]'
                            key={solarPowerState.Kitchen[machine].name}
                            image={solarPowerState.Kitchen[machine].image}
                            type={solarPowerState.Kitchen[machine].type}
                            name={solarPowerState.Kitchen[machine].name} />
                    )
                }
            </div>
            
            <div
                style={{ '--image-url': `url(${kitchen})` }}
                className='relative  w-[720px] h-[660px] bg-[image:var(--image-url)] bg-left rounded-tr-3xl rounded-br-3xl bg-cover max-lg:w-[576px] max-lg:h-[528px] max-md:w-[504px] max-md:h-[462px] max-sm:w-[432px] max-sm:h-[396px] max-sm:rounded-br-none max-sm:rounded-tl-3xl max-[440px]:w-[360px] max-[440px]:h-[330px]'>

                <div
                    onClick={() => setDoneWithThePanels(false)}
                    style={{ clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)' }}
                    className='absolute top-3/4 left-1 w-20 h-20 z bg-black flex justify-center items-center cursor-pointer hover:scale-105 transition duration-300'>
                    <h1 className='relative left-2 text-center font-black text-sm select-none'>
                        Back to Panels
                    </h1>
                </div>
                <div
                    onClick={() => setDoneWithKitchen(true)}
                    style={{ clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }}
                    className='absolute top-3/4 right-1 w-20 h-20 bg-black flex justify-center items-center cursor-pointer  hover:scale-105 transition duration-300 '>
                    <h1 className='relative right-2 text-center font-black text-sm select-none'>
                        to Living room
                    </h1>
                </div>
                <div
                    ref={dropWashAndRefr}
                    className='relative top-48 left-20 w-[261px] h-[315px] max-lg:w-[208px] max-lg:h-[252px] max-lg:top-44 max-lg:left-16 max-md:w-[182px] max-md:h-[221px] max-md:top-28 max-md:left-12 max-sm:w-[157px] max-sm:h-[189px] max-[440px]:w-[131px] max-[440px]:h-[158px] max-[440px]:top-24'>

                    {
                        !solarPowerState.Kitchen.Refrigerator.show && !solarPowerState.Kitchen.WashingMachine.show &&
                        <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-20 max-sm:border-4 max-[440px]:border-2'>
                            <h1 className='text-xl pb-10 text-center select-none text-gray-700 font-black max-sm:text-sm'>
                                Add washingMachine and refrigerator
                            </h1>
                            <h1 className='text-xl text-center select-none text-gray-700 font-black max-sm:text-sm'>
                                Drag and Drop
                            </h1>
                        </div>
                    }

                    {solarPowerState.Kitchen.Refrigerator.show &&
                        <div className='relative'>
                            {
                                solarPowerState.Kitchen.Refrigerator.edit &&
                                <WattConsumption
                                    machine={'Refrigerator'} />
                            }
                            <div
                                onClick={() => dispatch({ type: 'editWattConsumption', payload: 'Refrigerator' })}
                                className=' absolute top-20 left-2 w-7 h-7 rounded-lg bg-gray-500 flex justify-center items-center cursor-pointer z-30 ring-1 ring-black hover:scale-[0.9] hover:ring-white transition duration-300 max-lg:left-1 max-lg:top-12 max-lg:scale-75 max-md:top-[70px] max-sm:top-12 max-[440px]:top-10 max-[440px]:-left-4'>
                                <img src={edit} className='w-5 h-5' />
                            </div>
                            <div
                                onClick={() => dispatch({ type: 'removeMachine', payload: 'Refrigerator' })}
                                style={{ '--image-url': `url(${solarPowerState.Kitchen.Refrigerator.image})` }}
                                className='absolute top-12 left-4 w-[126px] h-[261px] bg-[image:var(--image-url)] bg-left bg-cover z-[15] group cursor-pointer max-lg:w-[100px] max-lg:h-[208px] max-lg:top-5 max-md:w-[88px] max-md:h-[182px] max-md:top-14 max-md:left-4 max-sm:w-[76px] max-sm:h-[157px] max-sm:top-8 max-sm:left-2 max-[440px]:w-[63px] max-[440px]:h-[130px] max-[440px]:top-6 max-[440px]:left-0'>
                                {
                                    solarPowerState.Kitchen.Refrigerator.watt &&
                                    <h1
                                        style={{ transform: 'rotateX(48deg) rotateY(-8deg) rotateZ(-40deg)' }}
                                        className=' absolute top-5 left-8 w-16 text-3xl text-center font-black opacity-0 transition duration-300 group-hover:opacity-100 max-lg:w-5 max-lg:text-xl max-sm:top-4 max-sm:left-7 max-sm:text-sm max-[440px]:top-3 max-[440px]:left-4 max-[440px]:text-xs'>
                                        {solarPowerState.Kitchen.Refrigerator.watt} watt
                                    </h1>
                                }

                            </div>
                        </div>
                    }


                    {
                        solarPowerState.Kitchen.WashingMachine.show &&
                        <div className='relative'>
                            {
                                solarPowerState.Kitchen.WashingMachine.edit &&
                                <WattConsumption
                                    machine={'Washing Machine'} />
                            }
                            <div
                                onClick={() => dispatch({ type: 'editWattConsumption', payload: 'Washing Machine' })}
                                className=' absolute top-36 left-48 w-7 h-7 rounded-lg bg-gray-500 flex justify-center items-center cursor-pointer z-30 ring-1 ring-black hover:scale-[0.9] hover:ring-white transition duration-300 max-lg:left-36 max-lg:top-20 max-lg:scale-75 max-md:top-28 max-md:left-[135px] max-sm:top-20 max-sm:left-[110px] max-[440px]:top-16 max-[440px]:left-[85px]'>
                                <img src={edit} className='w-5 h-5' />
                            </div>
                            <div
                                onClick={() => dispatch({ type: 'removeMachine', payload: 'Washing Machine' })}
                                style={{ '--image-url': `url(${solarPowerState.Kitchen.WashingMachine.image})` }}
                                className='absolute top-14 left-20 w-[126px] h-[261px] bg-[image:var(--image-url)] group bg-left bg-cover cursor-pointer z-10 max-lg:w-[100px] max-lg:h-[208px] max-lg:top-5 max-lg:left-[70px] max-md:w-[88px] max-md:h-[182px] max-md:top-[55px] max-md:left-16 max-sm:w-[76px] max-sm:h-[157px] max-sm:top-9 max-sm:left-12 max-[440px]:w-[63px] max-[440px]:h-[130px] max-[440px]:top-7 max-[440px]:left-8'>
                                {
                                    solarPowerState.Kitchen.WashingMachine.watt &&
                                    <h1
                                        style={{ transform: 'rotateX(-45deg) rotateY(41deg) rotateZ(0deg)' }}
                                        className=' absolute top-28 left-14 w-[80px] text-3xl text-center bg-white rounded-lg text-black font-black opacity-0 select-none transition duration-300 group-hover:opacity-100 max-lg:left-10 max-lg:top-24 max-lg:text-xl max-lg:w-16 max-md:top-20 max-md:left-8 max-sm:top-[70px] max-sm:left-8 max-sm:w-12 max-[440px]:text-xs max-[440px]:w-10 max-[440px]:left-7 max-[440px]:top-16'>
                                        {solarPowerState.Kitchen.WashingMachine.watt} watt
                                    </h1>
                                }
                            </div>
                        </div>
                    }
                </div>
                {/* <div style={{ '--image-url': `url(${hoot})` }} className='absolute top-20 left-[570px] w-[140px] h-[290px] bg-[image:var(--image-url)]  bg-left bg-cover z-10'> */}
                <div
                    ref={dropHoot}
                    className='absolute top-20 left-[460px] w-[140px] h-[290px] z-30 max-lg:w-[112px] max-lg:h-[232px] max-lg:top-12 max-lg:left-[380px] max-md:w-[98px] max-md:h-[203px] max-md:top-7 max-md:left-[340px] max-sm:w-[84px] max-sm:h-[174px] max-sm:left-[290px] max-[440px]:w-[70px] max-[440px]:h-[145px] max-[440px]:left-[240px]'>
                    {
                        !solarPowerState.Kitchen.Hoot.show &&
                        <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10 max-sm:border-4 max-[440px]:border-2'>
                            <h1 className='text-xl text-center select-none text-gray-700 font-black pb-10 max-sm:text-sm'>
                                Add Hoot
                            </h1>
                            <h1
                                className='text-xl text-center select-none text-gray-700 font-black max-sm:text-sm'>
                                Drag and Drop
                            </h1>
                        </div>
                    }
                    {
                        solarPowerState.Kitchen.Hoot.show &&
                        <div className='relative'>
                            {
                                solarPowerState.Kitchen.Hoot.edit &&
                                <WattConsumption
                                    machine={'Hoot'} />
                            }
                            <div
                                onClick={() => dispatch({ type: 'editWattConsumption', payload: 'Hoot' })}
                                className=' absolute top-[200px] left-32 w-7 h-7 rounded-lg bg-gray-500 flex justify-center items-center cursor-pointer  ring-1 ring-black hover:scale-[0.9] hover:ring-white transition duration-300 z-40 max-lg:scale-75 max-lg:left-20 max-lg:top-[170px] max-md:left-16 max-md:top-[150px] max-sm:top-[130px] max-[440px]:left-10 max-[440px]:top-[120px]'>
                                <img src={edit} className='w-5 h-5' />
                            </div>
                            <div
                                onClick={() => dispatch({ type: 'removeMachine', payload: 'Hoot' })}
                                style={{ '--image-url': `url(${solarPowerState.Kitchen.Hoot.image})` }}
                                className='absolute top-10 w-[140px] h-[290px] bg-[image:var(--image-url)] group bg-left bg-cover cursor-pointer z-30 max-lg:w-[112px] max-lg:h-[232px]  max-lg:right-3 max-md:w-[98px] max-md:h-[203px] max-sm:w-[84px] max-sm:h-[174px] max-[440px]:w-[70px] max-[440px]:h-[145px]'>
                                {
                                    solarPowerState.Kitchen.Hoot.watt &&
                                    <h1
                                        style={{ transform: 'rotateX(45deg) rotateY(44deg) rotateZ(0deg)' }}
                                        className=' absolute top-16 left-24 w-16 text-xl text-center bg-black rounded-lg text-white font-black opacity-0 select-none transition duration-300 group-hover:opacity-100'>
                                        {solarPowerState.Kitchen.Hoot.watt} watt
                                    </h1>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>

{/* 
            <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900  backdrop-blur-3xl z-10 flex flex-col py-10 rounded-tr-3xl rounded-br-3xl gap-7 overflow-y-scroll overflow-x-hidden scrollbar-hide'>

            </div> */}

        </div>
    )
}
