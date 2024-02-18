import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import StudentsTable from './students/StudentsTable';
const Dashboard = () => {
   const [selected, setSelected] = useState("students");
   return (
      <div className="flex w-full flex-col text-black">
         <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            color='primary'
            className='w-full flex flex-col '
         >
            <Tab key="students" title="Students">
               <StudentsTable />
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