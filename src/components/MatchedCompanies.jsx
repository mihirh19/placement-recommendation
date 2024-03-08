import React, { useEffect } from 'react';
import matchedCompanies from '@/data/MatchedCompaniesData';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

function clacTime(){
  
}
const MatchedCompanies = ({ info }) => {
  console.log(info)
  return (
    <div>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
      >
        <TableHeader>
          <TableColumn>COMPANY</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>TIME</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No matched companies found" items="10">
            {matchedCompanies.map((company) => {

                const isMatched = 
                (Math.abs(company.cpi - info.cpi) < 1 || company.cpi < info.cpi) &&
                (Math.abs(company.english - info.english_level) <= 2 || company.english < info.english_level) && 
                (Math.abs(company.lr - info.logical_reasoning_level) <= 2 || company.lr < info.logical_reasoning_level); 
                console.log(isMatched)
                if (isMatched) {
                return (
                    <TableRow key={company.id}>
                    <TableCell>{company.company}</TableCell>
                    <TableCell>{company.role}</TableCell>
                    <TableCell>{2}</TableCell>
                    </TableRow>
                );
                }
            })}
        </TableBody>

      </Table>
    </div>
  );
};

export default MatchedCompanies;
