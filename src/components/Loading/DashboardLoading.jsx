import React from 'react'
import { Spinner } from "@nextui-org/react";
const DashboardLoading = () => {
   return (
      <div className="flex w-full flex-col items-center content-center justify-center " style={{ height: "40rem" }}>
         <Spinner size='lg' color='primary' />
      </div>
   )
}

export default DashboardLoading