import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PiStudent } from "react-icons/pi";
import Studenttable from './studentstable/Studenttable';
import { GoOrganization } from "react-icons/go";
import CompanyTable from './companytable/CompanyTable';
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
            <Tab key="company" title={
               <div className="flex items-center space-x-2">
                  <GoOrganization />
                  <span>Company</span>
               </div>
            }>
               <CompanyTable />
            </Tab>
         </Tabs>
      </div>
   )
}

export default Dashboard