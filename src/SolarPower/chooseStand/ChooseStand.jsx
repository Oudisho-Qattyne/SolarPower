import React, { useState, useId, useRef, useEffect } from 'react'
import house from './../assets/SolarPower/house.png'
import standX2 from './../assets/SolarPower/standX2.png'
import standX1 from './../assets/SolarPower/stand.png'
import solarPanel from './../assets/SolarPower/solarPanel.png'
import door from './../assets/SolarPower/door.png'
import SolarPanel from './SolarPanel'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import Stand from './Stand'
import { motion, AnimatePresence } from 'framer-motion'


export default function ChooseStand({ setTotalInputWatt, setDoneWithThePanels }) {
    const SolarPanels = [
        {
            image: solarPanel,
            watt: 200,
            id: null
        },
        {
            image: solarPanel,
            watt: 300,
            id: null
        },
        {
            image: solarPanel,
            watt: 400,
            id: null
        }
    ]

    const stands = [
        {
            image: standX1,
            number: 4,
            id: null
        },
        {
            image: standX2,
            number: 8,
            id: null
        }
    ]

    const [solars, setSolars] = useState([]);
    const [canNotAddMore, setCanNotAddMore] = useState(false);
    const [stand, setStand] = useState({
        image: null,
        number: 0,
        id: null
    },);

    const [totalWatt, setTotalWatt] = useState(0);
    const solarsNumber = useRef(0);
    const standNumber = useRef(0);

    const [{ isOverDroppingstands }, dropStands] = useDrop(() => ({
        accept: 'stand',
        drop: (item) => {
            dropStand(item.number)
        }
    }))

    const [{ isOverDroppingPanels }, dropPanel] = useDrop(() => ({
        accept: "solarPanel",
        drop: ((item) => {
            return dropSolarPanel(item.watt)
        })
    }))

    useEffect(() => {
        let totalWatt = 0;
        for (let i = 0; i < solars.length; i++) {
            totalWatt += solars[i].watt;
        }
        setTotalWatt(totalWatt);
        setTotalInputWatt(totalWatt)
    }, [solars])

    const dropStand = (number) => {
        setSolars([])
        solarsNumber.current = 0
        for (let i = 0; i < stands.length; i++) {
            if (stands[i].number == number) {
                standNumber.current = stands[i].number
                setStand(stands[i])
            }
        }
    }
    const removeStand = () => {
        setStand({
            image: null,
            number: 0,
            id: null
        })
        setSolars([])
        solarsNumber.current = 0
    }
    const dropSolarPanel = (watt) => {
        if (solarsNumber.current >= standNumber.current) {
            setCanNotAddMore(true)
            setTimeout(() => { setCanNotAddMore(false) }, 2000);
        }
        else if (solarsNumber.current < standNumber.current) {
            for (let i = 0; i < SolarPanels.length; i++) {
                if (SolarPanels[i].watt == watt) {
                    const panel = structuredClone(SolarPanels[i]);
                    const id = uuidv4()
                    panel.id = id;
                    setSolars(prevSolars => [...prevSolars, panel]);
                    solarsNumber.current++
                    break;
                }
                continue;
            }
        }
    }

    const removeSolarPanel = (id) => {
        const copySolars = solars;
        const newSolars = []
        for (let index = 0; index < copySolars.length; index++) {
            if (copySolars[index].id !== id) {
                newSolars.push(copySolars[index]);
            }

        }
        solarsNumber.current--;
        setSolars(newSolars)
    }
    return (
        <div className="relative w-screen h-screen flex justify-center p-10 items-center overflow-hidden max-sm:flex-col-reverse">
            <AnimatePresence>
                {
                    canNotAddMore &&
                    <motion.h1
                        initial={{ right: -1000 }}
                        animate={{ right: 40 }}
                        exit={{ right: -1000 }}
                        transition={{ duration: 0.5 }}
                        className='absolute top-10 text-2xl bg-red-700 rounded-xl py-5 px-20 z-20 ease-in'>
                        can't Add More
                    </motion.h1>
                }
            </AnimatePresence>
            <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900 rounded-tl-3xl rounded-bl-3xl flex flex-col gap-5 p-5 items-center overflow-scroll scrollbar-hide max-lg:h-[528px] max-md:overflow-y-hidden max-md:h-[462px] max-sm:h-32 max-sm:w-[432px] max-sm:flex-row max-sm:rounded-tl-none max-sm:rounded-br-3xl  max-[440px]:w-[360px] '>
                {
                    stands.map(stand =>
                        <Stand key={stand.number} image={stand.image} number={stand.number} />
                    )
                }
                {
                    SolarPanels.map(solarPanel =>
                        <SolarPanel
                            key={solarPanel.watt}
                            id={solarPanel.id}
                            image={solarPanel.image}
                            watt={solarPanel.watt} />
                    )
                }
            </div>
            <AnimatePresence className="overflow-hidden">

                <motion.div
                    exit={{ scale: 10 }}
                    transition={{ duration: 1 }}
                    className='relative w-fit h-fit flex justify-center items-center'>
                    <div
                        style={{ '--image-url': `url(${house})` }}
                        className='relative  w-[720px] h-[660px] bg-[image:var(--image-url)] bg-left rounded-tr-3xl rounded-br-3xl bg-cover max-lg:w-[576px] max-lg:h-[528px] max-md:w-[504px] max-md:h-[462px] max-sm:w-[432px] max-sm:h-[396px] max-sm:rounded-br-none max-sm:rounded-tl-3xl max-[440px]:w-[360px] max-[440px]:h-[330px]'>
                        <div
                            ref={dropStands}
                            className='relative left-[85px] w-[416px] h-[316px] max-lg:w-[364px] max-lg:h-[277px] max-lg:-top-5 max-lg:left-[65px] max-md:w-[312px] max-md:h-[237px] max-md:left-[50px] max-md:-top-1 max-sm:w-[260px] max-sm:h-[198px] max-[440px]:w-[208px] max-[440px]:h-[158px]'>
                            {
                                stand.number == 0 &&
                                <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10'>
                                    <h1 className='text-4xl text-center select-none text-gray-700 font-black  max-md:text-2xl max-sm:text-xl'
                                    >
                                        Add Stand
                                    </h1>
                                    <h1 className='text-xl text-center select-none text-gray-700 font-black max-md:text-sm max-sm:text-xs'>
                                        Drag and Drop
                                    </h1>
                                </div>
                            }
                            {
                                stand.number !== 0 &&
                                <>
                                    <div
                                        onClick={removeStand}
                                        style={{ '--image-url': `url(${stand.image})` }}
                                        className=' w-full h-full bg-[image:var(--image-url)]  bg-left bg-cover'>
                                    </div>
                                    <AnimatePresence>
                                        {
                                            stand.number == 4 &&
                                            <div
                                                ref={dropPanel}
                                                style={{ transform: 'rotateX(49deg) rotateY(-5deg) rotateZ(-32deg)' }}
                                                className='absolute left-[127px] top-[111px] grid grid-cols-4 justify-start items-start gap-[2px] w-[257px] h-[158px]  max-lg:w-[224px] max-lg:h-[138px] max-lg:top-[97px] max-lg:left-[110px] max-md:w-[193px] max-md:h-[118px] max-md:top-[83px] max-md:left-[95px] max-sm:w-[160px] max-sm:h-[99px] max-sm:top-[70px] max-sm:left-[80px] max-[440px]:w-[129px] max-[440px]:h-[79px] max-[440px]:top-[55px] max-[440px]:left-[63px] '>
                                                <h1 className='absolute -top-10 text-3xl font-bold select-none max-lg:text-xl max-md:text-base'>
                                                    {
                                                        totalWatt / 1000
                                                    } KW
                                                </h1>
                                                <h1 className='absolute -top-10 right-0 text-3xl font-bold select-none max-lg:text-xl max-md:text-base'>
                                                    {solarsNumber.current} panels
                                                </h1>
                                                {solars.length == 0 &&
                                                    <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10'>
                                                        <h1 className='text-2xl text-center select-none text-gray-700 font-black  max-md:text-2xl max-sm:text-xl'>
                                                            ADD SolarPanels
                                                        </h1>
                                                        <h1 className='text-xl text-center select-none text-gray-700 font-black max-md:text-sm max-sm:text-xs'
                                                        >Drag and Drop
                                                        </h1>
                                                    </div>}
                                                {
                                                    solars.map(solar => {
                                                        return (
                                                            <div onClick={() => removeSolarPanel(solar.id)} key={solar.id} style={{ '--image-url': `url(${solar.image})` }} className='w-[60px] h-40 bg-[image:var(--image-url)]  bg-left bg-cover group flex justify-center items-center cursor-help z-20 max-lg:w-[53px] max-lg:h-[140px] max-md:w-[45px] max-md:h-[120px] max-sm:w-[38px] max-sm:h-[100px] max-[440px]:w-[30px] max-[440px]:h-[80px]' >
                                                                <h1 className='text-xl font-black opacity-0 group-hover:opacity-100 transition duration-300 text-center select-none '>{solar.watt} Watt</h1>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        }
                                        {
                                            stand.number == 8 &&
                                            <div
                                                ref={dropPanel}
                                                style={{ transform: 'rotateX(49deg) rotateY(-5deg) rotateZ(-32deg)' }}
                                                className='absolute left-[82px] top-[-19px] grid grid-cols-4 justify-start items-start gap-[2px]  w-[257px] h-[330px] max-lg:w-[225px] max-lg:h-[289px] max-lg:left-[73px] max-lg:top-[-15px] max-md:w-[193px] max-md:h-[247px] max-md:top-[-15px] max-md:left-[63px] max-sm:w-[160px] max-sm:h-[206px] max-sm:top-[-12px] max-sm:left-[54px] max-[440px]:w-[129px] max-[440px]:h-[165px] max-[440px]:top-[-10px] max-[440px]:left-[43px] '>
                                                <h1 className='absolute -top-10 text-4xl font-bold select-none max-lg:text-xl max-md:text-base'>
                                                    {totalWatt / 1000} KW
                                                </h1>
                                                <h1 className='absolute -top-10 right-0 text-3xl font-bold select-none max-lg:text-xl max-md:text-base'>
                                                    {solarsNumber.current} panels
                                                </h1>
                                                {solars.length == 0 &&
                                                    <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10 max-sm:border-4 max-[440px]:border-2'>
                                                        <h1 className='text-4xl text-center select-none text-gray-700 font-black max-md:text-2xl max-sm:text-xl'
                                                        >Add SolarPanels
                                                        </h1>
                                                        <h1 className='text-xl text-center select-none text-gray-700 font-black max-md:text-sm max-sm:text-xs'>
                                                            Drag and Drop
                                                        </h1>
                                                    </div>}

                                                {
                                                    solars.map(solar => {
                                                        return (
                                                            <div
                                                                onClick={() => removeSolarPanel(solar.id)}
                                                                key={solar.id}
                                                                style={{ '--image-url': `url(${solar.image})` }}
                                                                className='w-[60px] h-40 bg-[image:var(--image-url)]  bg-left bg-cover group flex justify-center items-center cursor-help max-lg:w-[53px] max-lg:h-[140px] max-md:w-[45px] max-md:h-[120px] max-sm:w-[38px] max-sm:h-[100px] max-[440px]:w-[30px] max-[440px]:h-[80px]' >
                                                                <h1 className='text-xl font-black opacity-0 group-hover:opacity-100 transition duration-300 text-center select-none '>
                                                                    {solar.watt} Watt
                                                                </h1>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        }
                                    </AnimatePresence>
                                </>
                            }
                        </div>
                        {
                            solars.length !== 0 &&
                            <div
                                style={{ '--image-url': `url(${door})` }}
                                onClick={() => setDoneWithThePanels(true)}
                                className='relative left-[295px] top-[50px] bg-[image:var(--image-url)] w-[60px] h-[115px] bg-left bg-cover group cursor-grab animate-ping hover:animate-none max-lg:w-[53px] max-lg:h-[101px] max-lg:top-[5px] max-lg:left-[237px] max-md:w-[45px] max-md:h-[86px] max-md:top-[12px] max-md:left-[206px] max-sm:w-[38px] max-sm:h-[72px] max-sm:top-[17px] max-sm:left-[178px] max-[440px]:w-[30px] max-[440px]:h-[58px] max-[440px]:top-[22px] max-[440px]:left-[147px]'>

                                <h1 className='absolute px-5 text-2xl font-black opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-400  rounded-xl max-lg:text-xl max-md:text-base max-sm:text-sm '>
                                    ENTER
                                </h1>
                            </div>
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
            {/* <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900 rounded-tr-3xl rounded-br-3xl flex flex-col py-10 gap-5 overflow-scroll  scrollbar-hide max-lg:h-[528px] max-md:h-[462px] max-sm:h-32 max-sm:w-[432px]  max-sm:flex-row max-sm:rounded-tl-3xl max-sm:rounded-br-none max-sm:overflow-y-hidden max-[440px]:w-[360px] '>

            </div> */}
        </div>
    )
}
