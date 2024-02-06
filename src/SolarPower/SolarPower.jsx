import React, { useState, createContext } from 'react'
import ChooseStand from './chooseStand/ChooseStand'
import ChooseWashAndRefr from './chooseWashAndRefr/ChooseWashAndRefr'
import ChooseTv from './chooseTv/ChooseTv'
import { SolarPowerProvider } from './contextState'
import FinalResault from './FinalResult/FinalResault'
import { DndProvider } from 'react-dnd-multi-backend'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

export default function SolarPower() {


  const [totalInputWatt, setTotalInputWatt] = useState(0);
  const [doneWitheThePanels, setDoneWithThePanels] = useState(false);
  const [doneWithKitchen, setDoneWithKitchen] = useState(false)
  const [doneWithTheLivingRoom, setDoneWithTheLivingRoom] = useState(false)



  // console.log('input', totalInputWatt);
  // console.log('consumption', totalConsumption);

  return (
    <div >
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <SolarPowerProvider>
          {!doneWitheThePanels && <ChooseStand
            setTotalInputWatt={setTotalInputWatt}
            setDoneWithThePanels={setDoneWithThePanels} />}
          {doneWitheThePanels && !doneWithKitchen &&
            <ChooseWashAndRefr
              setDoneWithThePanels={setDoneWithThePanels}
              setDoneWithKitchen={setDoneWithKitchen}
            />
          }
          {
            doneWithKitchen && !doneWithTheLivingRoom &&
            <ChooseTv setDoneWithTheLivingRoom={setDoneWithTheLivingRoom} setDoneWithKitchen={setDoneWithKitchen} />
          }
          {
            doneWithTheLivingRoom &&
            <FinalResault setDoneWithTheLivingRoom={setDoneWithTheLivingRoom}/>
          }
        </SolarPowerProvider>
      </DndProvider>
    </div>
  )
}
