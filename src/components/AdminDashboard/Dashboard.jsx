import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PiStudent } from "react-icons/pi";
import Studenttable from './studentstable/Studenttable';
const Dashboard = () => {
   const [selected, setSelected] = useState("students");
   return (
      <div className="flex w-full flex-col">
         <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            color='danger'
            className='flex flex-col '
            size={'lg'}
            radius='none'
            fullWidth
            variant='underlined'
         >
            <Tab key="students" title={
               <div className="flex items-center space-x-2">
                  <PiStudent />
                  <span>Students</span>
               </div>
            }>
               <Studenttable />
            </Tab>
            <Tab key="music" title="Music">
               <Card>
                  <CardBody>
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </CardBody>
               </Card>
            </Tab>
            <Tab key="videos" title="Videos">
               <Card>
                  <CardBody>
                     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
               </Card>
            </Tab>
         </Tabs>
      </div>
   )
}

export default Dashboard