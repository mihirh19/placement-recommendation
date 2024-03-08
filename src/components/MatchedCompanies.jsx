import React, { useState } from 'react';
import matchedCompanies from '@/data/MatchedCompaniesData';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,
} from "@nextui-org/react";

function calcTime(company, info) {
  const skillLevels = ['cpi', 'english_level', 'logical_reasoning_level']
  let totalMonths = 0

  skillLevels.forEach(skill => {
    const userSkillLevel = info[skill]
    const companySkillLevel = company[skill]

    if (userSkillLevel < companySkillLevel) {
      const difference = companySkillLevel - userSkillLevel
      const monthsRequired = difference * 2
      totalMonths += monthsRequired
    }
  })

  const avgMonthsRequired = totalMonths / skillLevels.length
  return Math.round(avgMonthsRequired)
}



const columns = [
  {
    key: "criteria",
    label: "Criteria",
  },
  {
    key: "student",
    label: "Student Criteria",
  },
  {
    key: "company",
    label: "Company Criteria",
  }
];




const MatchedCompanies = ({ info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateinfo, setStateinfo] = useState({
    company: {
      cpi: 0,
      english_level: 0,
      logical_reasoning_level: 0,
    },
    student: {
      cpi: 0,
      english_level: 0,
      logical_reasoning_level: 0,
    },

  })
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
              (Math.abs(company.english_level - info.english_level) <= 2 || company.english_level < info.english_level) &&
              (Math.abs(company.logical_reasoning_level - info.logical_reasoning_level) <= 2 || company.logical_reasoning_level < info.logical_reasoning_level);
            if (isMatched) {
              return (
                <TableRow key={company.id} onClick={() => {
                  setStateinfo({
                    company: {
                      cpi: company.cpi,
                      english_level: company.english_level,
                      logical_reasoning_level: company.logical_reasoning_level,
                    },
                    student: {
                      cpi: info.cpi,
                      english_level: info.english_level,
                      logical_reasoning_level: info.logical_reasoning_level,
                    }
                  })
                  onOpen()

                }} style={{ cursor: "pointer" }}>
                  <TableCell>{company.company}</TableCell>
                  <TableCell>{company.role}</TableCell>
                  <TableCell>{calcTime(company, info)}</TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Comparison</ModalHeader>
              <ModalBody>
                <Table aria-label="Example table with dynamic content">
                  <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                  </TableHeader>
                  <TableBody >
                    <TableRow>
                      <TableCell>CPI</TableCell>
                      <TableCell>{stateinfo.student.cpi}</TableCell>
                      <TableCell>{stateinfo.company.cpi}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>English Level</TableCell>
                      <TableCell>{stateinfo.student.english_level}</TableCell>
                      <TableCell>{stateinfo.company.english_level}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Logical Reasoning</TableCell>
                      <TableCell>{stateinfo.student.logical_reasoning_level}</TableCell>
                      <TableCell>{stateinfo.company.logical_reasoning_level}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MatchedCompanies;
