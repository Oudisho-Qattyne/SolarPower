import React, { useContext, useEffect, useRef, useState } from 'react'
import { StateContext } from './contextState';

export default function WattConsumption({ machine }) {
    const [number, setNumber] = useState(0);
    const [inValid, seTInValid] = useState(false);

    const inputRef = useRef(null)
    const inputNumberRef = useRef(null)
    const { dispatch } = useContext(StateContext)

    const validNumber = (number) => {
        if (number > 10 || number < 0) {
            seTInValid(true)
            setNumber(0)
        }
        else {
            seTInValid(false)
            setNumber(number)
        }
    }
    let machines = []
    let inputs = []
    for (let i = 0; i < number; i++) {
        let machineData = {
            id: i,
            watt: 0
        }
        let inputt =
            <div
                key='inputts'
                className='relative w-full flex justify-center items-center gap-5'>
                <h1 className='relative w-full -top-3 font-bold select-none text-center p-5'>
                    {machine} {i + 1} :
                </h1>
                <div className='relative w-fit flex justify-center items-center gap-3 pb-5'>
                    <input
                        ref={inputRef}
                        onChange={(event) => setWatts(Number(event.target.value), i)}
                        className='relative rounded-lg bg-white text-black text-center' type='number' />
                    <span className='absolute left-32 border-l-2 pl-1 border-gray-500 font-bold text-black select-none'>
                        Watt
                    </span>
                </div>
            </div>
        machines.push(machineData)
        inputs.push(inputt)


    }


    const setWatts = (watt, index) => {
        machines[index].watt = watt
    }

    useEffect(() => {
        inputNumberRef.current.focus()
        if (number != 0) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center  z-50'>
            <div
                onClick={() =>
                    dispatch(
                        {
                            type: 'wattsConsumption',
                            payload: {
                                name: machine,
                                watts: []
                            }
                        }
                    )}
                className='absolute backdrop-blur-md w-full h-full ' />
            <div
                className='absolute max-h-[400px] w-[500px] p-5 rounded-lg backdrop-blur-xl ring-1 ring-white shadow-md flex flex-col justify-center items-center'>
                <h1 key='consumption' className='w-full text-2xl text-center font-black pt-5 pb-1 select-none'>
                    {machine} Consumption
                </h1>
                <div key='number'>
                    <h1 className='w-full text-center font-black p-5 select-none'>
                        Number of {machine}/s
                    </h1>
                    <form className='w-full flex justify-center items-center gap-3 pb-5'>
                        <input
                            ref={inputNumberRef}
                            onChange={(event) => validNumber(Number(event.target.value))}
                            className={inValid ?
                                'rounded-lg w-[200px] text-black text-center bg-red-400 border border-1 border-red-700' :
                                'rounded-lg w-[200px] bg-white text-black text-center'} type='number' />
                    </form>
                    {inValid &&
                        <h1 className='w-full text-center text-red-600 font-bold'>
                            are you sure..!!?
                        </h1>}
                </div>
                {number != 0 &&
                    <form
                        key='form'
                        onSubmit={() =>
                            dispatch(
                                {
                                    type: 'wattsConsumption',
                                    payload: {
                                        name: machine,
                                        watt: machines
                                    }
                                }
                            )}>
                        {/* <div className='w-full flex justify-center items-center gap-3 pb-5'>
                    <input
                        ref={inputRef}
                        onChange={(event) => setWatt(Number(event.target.value))}
                        className='rounded-lg bg-white text-black text-center' type='number' />
                    <h1 className='font-bold select-none'>
                        Watt
                    </h1>
                </div> */}
                        <div className='max-h-[160px] overflow-scroll scrollbar-hide p-4 '>
                            {inputs}
                        </div>
                        <div className='w-full flex justify-center items-center gap-2 pt-2 '>
                            <button
                                onClick={() => dispatch(
                                    {
                                        type: 'wattsConsumption',
                                        payload: {
                                            name: machine,
                                            watts: machines
                                        }
                                    }
                                )}
                                className='w-28 flex  justify-center  items-center rounded-lg text-white text-bold cursor-pointer bg-cyan-600 ring-2 ring-black hover:bg-cyan-900 py-2 px-5 transition duration-300 hover:ring-white shadow-md hover:shadow-lg select-none'>
                                OK
                            </button>
                            <button
                                onClick={() => dispatch(
                                    {
                                        type: 'wattsConsumption',
                                        payload: {
                                            name: machine,
                                            watts: []
                                        }
                                    }
                                )}
                                className='w-28 flex  justify-center  items-center rounded-lg text-white text-bold cursor-pointer bg-red-600 ring-2 ring-black hover:bg-red-900 py-2 px-5 transition duration-300 hover:ring-white  shadow-md hover:shadow-lg select-none'>
                                Skip
                            </button>
                        </div>
                    </form>}
            </div>
        </div>
    )
}
