'use client'

import React from "react";
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Input,
   Button,
   DropdownTrigger,
   Dropdown,
   DropdownMenu,
   DropdownItem,
   Chip,
   User,
   Pagination,
   Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link, Select, SelectItem
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import useSWR from "swr";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// const statusColorMap = {
//    active: "success",
//    paused: "danger",
//    vacation: "warning",
// };
const fetcher = (...args) => fetch(...args).then(res => res.json())

const INITIAL_VISIBLE_COLUMNS = ["title", "email", "role", "company", "salary", "actions"];

export default function JobsTable() {
   let { data: users, error, isLoading } = useSWR('api/jobs/getallJobs', fetcher, { revalidateOnMount: true, revalidateOnFocus: true, refreshInterval: 1000 })
   // console.log(users);
   const router = useRouter();
   if (isLoading) {
      users = [];
   }

   const today = dayjs();

   const [filterValue, setFilterValue] = React.useState("");
   const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
   const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
   const [statusFilter, setStatusFilter] = React.useState("all");
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "id",
      direction: "ascending",
   });
   const [page, setPage] = React.useState(1);

   const pages = Math.ceil(users.length / rowsPerPage);

   const hasSearchFilter = Boolean(filterValue);

   const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;

      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
   }, [visibleColumns]);

   const filteredItems = React.useMemo(() => {
      let filteredUsers = [...users];

      if (hasSearchFilter) {
         filteredUsers = filteredUsers.filter((user) =>
            user.role.toLowerCase().includes(filterValue.toLowerCase()),
         );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
         filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.role),
         );
      }

      return filteredUsers;
   }, [users, filterValue]);

   const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
   }, [page, filteredItems, rowsPerPage]);




   const renderCell = React.useCallback((user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
         case "email":
            return user.recruiter.email
         case "skills":
            return cellValue.join(", ")
         case "actions":
            return (
               <div className="relative flex justify-end items-center gap-2">
                  <Dropdown className="bg-background border-1 border-default-200">
                     <DropdownTrigger>
                        <Button isIconOnly radius="full" size="sm" variant="light">
                           <VerticalDotsIcon className="text-default-400" />
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu>
                        <DropdownItem >Apply</DropdownItem>

                     </DropdownMenu>
                  </Dropdown>

               </div>
            );
         default:
            return cellValue;
      }
   }, []);

   const onRowsPerPageChange = React.useCallback((e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
   }, []);


   const onSearchChange = React.useCallback((value) => {
      if (value) {
         setFilterValue(value);
         setPage(1);
      } else {
         setFilterValue("");
      }
   }, []);

   const topContent = React.useMemo(() => {
      return (
         <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
               <Input
                  isClearable
                  classNames={{
                     base: "w-full sm:max-w-[44%]",
                     inputWrapper: "border-1",
                  }}
                  placeholder="Search by Role..."
                  size="sm"
                  startContent={<SearchIcon className="text-default-300" />}
                  value={filterValue}
                  variant="outlined"
                  onClear={() => setFilterValue("")}
                  onValueChange={onSearchChange}
               />
               <div className="flex gap-3">
                  {/* <Dropdown>
                     <DropdownTrigger className="hidden sm:flex">
                        <Button
                           endContent={<ChevronDownIcon className="text-small" />}
                           size="sm"
                           variant="flat"
                        >
                           Status
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={statusFilter}
                        selectionMode="multiple"
                        onSelectionChange={setStatusFilter}
                     >
                        {statusOptions.map((status) => (
                           <DropdownItem key={status.name} className="capitalize">
                              {capitalize(status.name)}
                           </DropdownItem>
                        ))}
                     </DropdownMenu>
                  </Dropdown> */}
                  <Dropdown>
                     <DropdownTrigger className="hidden sm:flex">
                        <Button
                           endContent={<ChevronDownIcon className="text-small" />}
                           size="sm"
                           variant="flat"
                        >
                           Columns
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}
                     >
                        {columns.map((column) => (
                           <DropdownItem key={column.uid} className="capitalize">
                              {capitalize(column.name)}
                           </DropdownItem>
                        ))}
                     </DropdownMenu>
                  </Dropdown>

               </div>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-default-400 text-small">Total {users.length} Jobs</span>
               <label className="flex items-center text-default-400 text-small">
                  Rows per page:
                  <select
                     className="bg-transparent outline-none text-default-400 text-small"
                     onChange={onRowsPerPageChange}
                  >
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="15">15</option>
                  </select>
               </label>
            </div>
         </div>
      );
   }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      users.length,
      hasSearchFilter,
   ]);

   const bottomContent = React.useMemo(() => {
      return (
         <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
               showControls
               classNames={{
                  cursor: "bg-foreground text-background",
               }}
               color="default"
               isDisabled={hasSearchFilter}
               page={page}
               total={pages}
               variant="light"
               onChange={setPage}
            />
            <span className="text-small text-default-400">
               {selectedKeys === "all"
                  ? "All items selected"
                  : `${selectedKeys.size} of ${items.length} selected`}
            </span>
         </div>
      );
   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

   const classNames = React.useMemo(
      () => ({
         wrapper: ["max-h-[382px]", "max-w-3xl"],
         th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
         td: [
            // changing the rows border radius
            // first
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            // middle
            "group-data-[middle=true]:before:rounded-none",
            // last
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
         ],
      }),
      [],
   );

   return (
      <>

         <Table
            isCompact
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
               classNames: {
                  wrapper: "after:bg-foreground after:text-background text-background",
               },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
         >
            <TableHeader columns={headerColumns}>
               {(column) => (
                  <TableColumn
                     key={column.uid}
                     align={column.uid === "actions" ? "center" : "start"}
                     allowsSorting={column.sortable}
                  >
                     {column.name}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={items}>
               {(item) => (
                  <TableRow key={item.id}>
                     {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </>
   );

}
