import { createContext, useReducer } from "react";
import refrigerator from './assets/SolarPower/Refrigerator.png'
import washingMachine from './assets/SolarPower/WashingMachine.png'
import hoot from './assets/SolarPower/Hoot.png'
import tv from './assets/SolarPower/Tv.png'
import ac from './assets/SolarPower/Ac.png'

export const StateContext = createContext()
// export const UpdateStateContext = createContext()

export const SolarPowerProvider = ({ children }) => {



    const dropMachine = (state, name) => {
        switch (name) {
            case 'Refrigerator':

                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Refrigerator: {
                                ...state.Kitchen.Refrigerator,
                                show: true,
                                edit: true
                            }
                        }
                    }
                )
                break;
            case 'Washing Machine':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            WashingMachine: {
                                ...state.Kitchen.WashingMachine,
                                show: true,
                                edit: true
                            }
                        }
                    }
                )

                break;
            case 'Hoot':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Hoot: {
                                ...state.Kitchen.Hoot,
                                show: true,
                                edit: true
                            }
                        }
                    }
                )
                break;
            case 'Tv':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Tv: {
                                ...state.LivingRoom.Tv,
                                show: true,
                                edit: true
                            }
                        }
                    }
                )
            case 'Ac':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Ac: {
                                ...state.LivingRoom.Ac,
                                show: true,
                                edit: true
                            }
                        }
                    }
                )
            default:
                break;
        }
    }

    const removeMachine = (state, name) => {

        switch (name) {
            case 'Refrigerator':

                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Refrigerator: {
                                ...state.Kitchen.Refrigerator,
                                show: false,
                                edit: false,
                                watt: 0
                            }
                        }
                    }
                )
                break;
            case 'Washing Machine':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            WashingMachine: {
                                ...state.Kitchen.WashingMachine,
                                show: false,
                                edit: false,
                                watt: 0
                            }
                        }
                    }
                )

                break;
            case 'Hoot':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Hoot: {
                                ...state.Kitchen.Hoot,
                                show: false,
                                edit: false,
                                watt: 0
                            }
                        }
                    }
                )
                break;
            case 'Tv':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Tv: {
                                ...state.LivingRoom.Tv,
                                show: false,
                                edit: false,
                                watt: 0
                            }
                        }
                    }
                )
            case 'Ac':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Ac: {
                                ...state.LivingRoom.Ac,
                                show: false,
                                edit: false,
                                watt: 0
                            }
                        }
                    }
                )
            default:
                break;
        }
    }
    const editWattConsumption = (state, name) => {
        switch (name) {
            case 'Refrigerator':

                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Refrigerator: {
                                ...state.Kitchen.Refrigerator,
                                edit: true,
                                watt: 0
                            }
                        }
                    }
                )
                break;
            case 'Washing Machine':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            WashingMachine: {
                                ...state.Kitchen.WashingMachine,
                                edit: true,
                                watt: 0
                            }
                        }
                    }
                )

                break;
            case 'Hoot':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Hoot: {
                                ...state.Kitchen.Hoot,
                                edit: true,
                                watt: 0
                            }
                        }
                    }
                )
                break;
            case 'Tv':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Tv: {
                                ...state.LivingRoom.Tv,
                                edit: true,
                                watt: 0
                            }
                        }
                    }
                )
            case 'Ac':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Ac: {
                                ...state.LivingRoom.Ac,
                                edit: true,
                                watt: 0
                            }
                        }
                    }
                )
            default:
                break;
        }
    }

    const wattsConsumption = (state, name, watts) => {
        let watt = 0
        watts.map(w => watt += w.watt)
        switch (name) {
            case 'Refrigerator':

                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Refrigerator: {
                                ...state.Kitchen.Refrigerator,
                                edit: false,
                                Refrigerators: watts,
                                watt: watt,
                                number: watts.length
                            }
                        }
                    }
                )
                break;
            case 'Washing Machine':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            WashingMachine: {
                                ...state.Kitchen.WashingMachine,
                                edit: false,
                                WashingMachines: watts,
                                watt: watt,
                                number: watts.length
                            }
                        }
                    }
                )

                break;
            case 'Hoot':
                return (
                    {
                        ...state,
                        Kitchen: {
                            ...state.Kitchen,
                            Hoot: {
                                ...state.Kitchen.Hoot,
                                edit: false,
                                Hoots: watts,
                                watt: watt,
                                number: watts.length
                            }
                        }
                    }
                )
                break;
            case 'Tv':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Tv: {
                                ...state.LivingRoom.Tv,
                                edit: false,
                                Tvs: watts,
                                watt: watt,
                                number: watts.length
                            }
                        }
                    }
                )
            case 'Ac':
                return (
                    {
                        ...state,
                        LivingRoom: {
                            ...state.LivingRoom,
                            Ac: {
                                ...state.LivingRoom.Ac,
                                edit: false,
                                Acs: watts,
                                watt: watt,
                                number: watts.length
                            }
                        }
                    }
                )
            default:
                break;
        }
    }


    const calcTotalConsumption = (state) => {
        const totalConsumption =
            state.Kitchen.Refrigerator.watt +
            state.Kitchen.WashingMachine.watt +
            state.Kitchen.Hoot.watt +
            state.LivingRoom.Tv.watt +
            state.LivingRoom.Ac.watt

        const overTotalConsumption = totalConsumption + 20 / 100 * totalConsumption
        return (
            {
                ...state,
                totalConsumption: totalConsumption,
                overTotalConsumption: overTotalConsumption
            }
        )
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'dropMachine':
                return (
                    dropMachine(state, action.payload)
                )
            case 'removeMachine':
                return (
                    removeMachine(state, action.payload)
                )
            case 'editWattConsumption':
                return (
                    editWattConsumption(state, action.payload)
                )
            case 'calcTotalConsumption':
                return (
                    calcTotalConsumption(state)
                )
            case 'wattsConsumption':
                return (
                    wattsConsumption(state, action.payload.name, action.payload.watts)
                )
            default:
                break;
        }
    }

    const [solarPowerState, dispatch] = useReducer(reducer,
        {
            stand: {
                image: null,
                number: 0,
                id: null
            },
            inverters: [4000, 5000, 6000, 8000],
            solarPanels: [550, 230],
            Kitchen: {
                WashingMachine: {
                    name: 'Washing Machine',
                    watt: 0,
                    number: 0,
                    WashingMachines: [
                        {
                            id: 0,
                            watt: 0
                        }
                    ],
                    show: false,
                    edit: false,
                    image: washingMachine
                },
                Refrigerator: {
                    name: 'Refrigerator',
                    watt: 0,
                    number: 0,
                    Refrigerators: [
                        {
                            id: 0,
                            watt: 0
                        }
                    ],
                    show: false,
                    edit: false,
                    image: refrigerator
                },
                Hoot: {
                    name: 'Hoot',
                    watt: 0,
                    number: 0,
                    Hoots: [
                        {
                            id: 0,
                            watt: 0
                        }
                    ],
                    show: false,
                    edit: false,
                    image: hoot
                },
            },
            LivingRoom: {

                Tv: {
                    name: 'Tv',
                    watt: 0,
                    number: 0,
                    Tvs: [
                        {
                            id: 0,
                            watt: 0
                        }
                    ],
                    show: false,
                    edit: false,
                    image: tv
                },
                Ac: {
                    name: 'Ac',
                    watt: 0,
                    number: 0,
                    Acs: [
                        {
                            id: 0,
                            watt: 0
                        }
                    ],
                    show: false,
                    edit: false,
                    image: ac
                }
            },
            totalConsumption: 0,
            overTotalConsumption: 0
        }
    )

    return (
        <StateContext.Provider value={{ solarPowerState: solarPowerState, dispatch: dispatch }}>
            {children}
        </StateContext.Provider>
    )
}