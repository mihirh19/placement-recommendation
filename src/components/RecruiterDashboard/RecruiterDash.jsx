
import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

import { MdSpaceDashboard } from "react-icons/md";
import { PiUserCirclePlus } from "react-icons/pi";
import DashboardTab from './dashboardtab/DashboardTab';
import JobsTab from './jobstab/JobsTab';
const RecruiterDash = () => {
   const [selected, setSelected] = useState("dashboard");
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
            <Tab key="dashboard" title={
               <div className="flex items-center space-x-2">
                  <MdSpaceDashboard />
                  <span>Dashboard</span>
               </div>
            }>
               <DashboardTab />
            </Tab>
            <Tab key="jobs" title={
               <div className="flex items-center space-x-2">
                  <PiUserCirclePlus />
                  <span>Jobs</span>
               </div>
            }>
               <JobsTab />
            </Tab>
         </Tabs>
      </div>
   )
}

export default RecruiterDash