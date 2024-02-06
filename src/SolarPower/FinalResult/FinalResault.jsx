import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../contextState'

export default function FinalResault({ setDoneWithTheLivingRoom }) {
    const { solarPowerState, dispatch } = useContext(StateContext)
    const [machines, setMachines] = useState([])
    const [solutions, setSolutions] = useState([])

    const calcTotalConsumption = () => {
        const totalConsumption =
            solarPowerState.Kitchen.Refrigerator.watt +
            solarPowerState.Kitchen.WashingMachine.watt +
            solarPowerState.Kitchen.Hoot.watt +
            solarPowerState.LivingRoom.Tv.watt +
            solarPowerState.LivingRoom.Ac.watt

        return (totalConsumption)
    }

    const findSolutions = () => {
        const totalConsumption = calcTotalConsumption()
        const overTotalConsumption = totalConsumption + 20 / 100 * totalConsumption
        const solarPanels = solarPowerState.solarPanels
        const inverters = solarPowerState.inverters
        const solution = []
        solarPanels.map(panel => {
            let wattOfSolarPanel = panel;
            let numberOfSolarPanels = Math.ceil(overTotalConsumption / panel)
            let totalInputWatt = wattOfSolarPanel * numberOfSolarPanels
            inverters.map(inverter => {
                if (inverter >= totalInputWatt) {
                    solution.push(
                        {
                            panel: wattOfSolarPanel,
                            numberOfSolarPanels: numberOfSolarPanels,
                            inverter: inverter
                        }
                    )
                }
            })
        })
        setSolutions(solution)
    }
    useEffect(() => {
        dispatch({ type: 'calcTotalConsumption' })
        const updateMachines = []
        Object.keys(solarPowerState.Kitchen).map(key => {
            if (solarPowerState.Kitchen[key].watt !== 0) {
                const machine =
                    <tr key={key} className=' bg-cyan-700 hover:bg-cyan-900 cursor-context-menu transition duration-300'>
                        <td className='px-6 py-3 border-gray-600'>{key}/s</td>
                        <td className='px-6 py-3 border-gray-600'>{solarPowerState.Kitchen[key].number}</td>
                        <td className='px-6 py-3 border-gray-600'>
                            <span>{solarPowerState.Kitchen[key].watt}</span>
                            <span className='font-bold'> Watt</span>
                        </td>
                    </tr>

                updateMachines.push(machine)
            }
        })
        Object.keys(solarPowerState.LivingRoom).map(key => {
            if (solarPowerState.LivingRoom[key].watt !== 0) {
                const machine =
                    <tr key={key} className=' bg-cyan-700 hover:bg-cyan-900 cursor-context-menu transition duration-300'>
                        <td className='px-6 py-3 border-gray-600'>{key}/s</td>
                        <td className='px-6 py-3 border-gray-600'>{solarPowerState.LivingRoom[key].number}</td>
                        <td className='px-6 py-3 border-gray-600'>
                            <span>{solarPowerState.LivingRoom[key].watt}</span>
                            <span className='font-bold'> Watt</span>
                        </td>
                    </tr>

                updateMachines.push(machine)
            }
        })
        setMachines(updateMachines)
        findSolutions()
    }, [])
    return (
        <div className="relative w-screen h-screen flex justify-center p-5 items-center overflow-hidden">
            <div className='relative top-0 left-0 w-11/12 h-[660px] bg-cyan-900  backdrop-blur-3xl z-10 flex py-5 rounded-3xl gap-7 overflow-x-scroll scrollbar-hide '>
                <div
                    onClick={() => setDoneWithTheLivingRoom(false)}
                    style={{ clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)' }}
                    className='absolute top-10 left-1 w-20 h-20 bg-black flex justify-center items-center cursor-pointer hover:scale-105 transition duration-300 z-50'>
                    <h1 className='relative left-2 text-center font-black text-xs select-none'>
                        Back to living Room
                    </h1>
                </div>
                <div className='relative w-full h-full p-10 justify-center items-center pt-20'>

                    <div className='relative w-full flex flex-col justify-center items-center gap-10'>

                        <div className='relative w-[350px] flex flex-col justify-center items-center overflow-scroll scrollbar-hide '>
                            <>
                                <h1 className='w-full text-4xl text-center font-black pb-10'>
                                    Consumptions
                                </h1>
                                <hr className='p-5 ' />
                            </>
                            <table className='bg-cyan-700 rounded-lg shadow-xl '>
                                <thead className=''>
                                    <tr>
                                        <th className='text-lg px-4 py-3 text-left'>Machines</th>
                                        <th className='text-lg px-2 py-3 text-left'>Count</th>
                                        <th className='text-lg px-2 py-3 text-left'>Consumption</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {machines}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className='px-2 py-3'>
                                            <h1 className='font-bold text-xs'>
                                                Total Consumption :
                                            </h1>
                                        </td>
                                        <td className='px-2 py-3'>
                                            <span>
                                                {solarPowerState.totalConsumption}

                                            </span>
                                            <span className='font-bold'> Watt</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className='relative w-[320px] '>
                            <>
                                <h1 className='w-full text-4xl text-center font-black pb-10'>
                                    Solutions
                                </h1>
                                <hr className='p-5 ' />
                            </>
                            <table className='bg-cyan-700 max-h-[430px] rounded-lg shadow-xl overflow-scroll scrollbar-hide '>
                                <thead className=''>
                                    <tr>
                                        <th className='text-lg px-2 py-3 text-center'>Panels</th>
                                        <th className='text-lg px-2 py-3 text-center'>Count</th>
                                        <th className='text-lg px-2 py-3 text-center'>Inverter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solutions.map(solution => {
                                        return (
                                            <tr key={solution.panel + ' ' + solution.inverter + ' ' + solution.numberOfSolarPanels} className='hover:bg-cyan-900 transition duration-300'>
                                                <td className='text-lg px-2 py-3 text-center group'>
                                                    <div className='peer cursor-pointer'>
                                                        <span>
                                                            {solution.panel}
                                                        </span >
                                                        <span > watt</span>
                                                    </div>
                                                    <div className=' absolute left-20  w-52 h-32 flex justify-center items-center rounded-lg shadow-lg bg-cyan-200 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10 transition duration-500'>
                                                        <h1 className='text-black'>data</h1>
                                                    </div>
                                                </td>
                                                <td className='text-lg px-2 py-3 text-center'>
                                                    {solution.numberOfSolarPanels}
                                                </td>
                                                <td className='text-lg px-6 py-3 text-center'>
                                                    <div className='peer cursor-pointer'>
                                                        <span >
                                                            {solution.inverter / 1000}
                                                        </span>
                                                        <span > KW</span>
                                                    </div>
                                                    <div className=' absolute left-24  w-52 h-32 flex justify-center items-center rounded-lg shadow-lg bg-cyan-200 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10 transition duration-500' >
                                                        <h1 className='text-black'>data</h1>
                                                    </div>
                                                </td>
                                                <td className='text-lg px-6 py-3 text-center '>
                                                    Batteries
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
