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
   Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link, Autocomplete, AutocompleteItem, Select, SelectItem
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, users, skills } from "./data";
import { capitalize } from "./utils";
import useSWR from "swr";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { technology } from "@/data/Data"
// const statusColorMap = {
//    active: "success",
//    paused: "danger",
//    vacation: "warning",
// };
const fetcher = (...args) => fetch(...args).then(res => res.json())

const INITIAL_VISIBLE_COLUMNS = ["title", "role", "location", "skills", "salary", "actions"];

export default function JobsTable() {
   const session = useSession();


   const { data, error, isLoading } = useSWR('api/jobs/getjobsbyrecruiter', fetcher)
   const router = useRouter();
   let users = []
   if (data) {
      users = data;
   }
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const { isOpen: isUserInfoOpen, onOpen: onUserInfoOpen, onOpenChange: onUserInfoOpenChange } = useDisclosure();
   const today = dayjs();
   const [jobInfo, setJobInfo] = React.useState({
      title: "",
      description: "",
      company: session.data?.username,
      companyUrl: "",
      role: "",
      location: "",
      skills: new Set([]),
      salary: "",
   })
   const [jobEdit, setJobEdit] = React.useState({
      id: "",
      title: "",
      description: "",
      company: session.data?.username,
      companyUrl: "",
      role: "",
      location: "",
      skills: new Set([]),
      salary: "",
   })

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
            user.title.toLowerCase().includes(filterValue.toLowerCase()),
         );
      }
      // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      //    filteredUsers = filteredUsers.filter((user) =>
      //       Array.from(statusFilter).includes(user.status),
      //    );
      // }

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
         case "createdAt":
            return dayjs(cellValue).format('DD/MM/YYYY');
         case "skills":
            return cellValue.join(", ");
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
                        <DropdownItem onClick={async (e) => {
                           setJobEdit({ id: user.id, title: user.title, description: user.description, company: user.company, companyUrl: user.companyUrl, role: user.role, location: user.location, skills: new Set(user.skills), salary: user.salary });
                           onUserInfoOpen();
                        }}>Edit</DropdownItem>
                        <DropdownItem onClick={async (e) => {
                           await fetch("/api/jobs/deletejob", {
                              method: 'DELETE',
                              headers: {
                                 'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ id: user.id })
                           }).then(
                              (res) => {
                                 if (res.status === 200) {
                                    toast.success("Job deleted successFully", {
                                       position: "top-center",
                                       autoClose: 1500,
                                       hideProgressBar: false,
                                       closeOnClick: true,
                                       pauseOnHover: true,
                                       draggable: true,
                                       progress: undefined,
                                       theme: "dark",
                                    })
                                 }
                              }
                           ).catch((err) => {
                              toast.error("Something went wrong", {
                                 position: "top-center",
                                 autoClose: 1500,
                                 hideProgressBar: false,
                                 closeOnClick: true,
                                 pauseOnHover: true,
                                 draggable: true,
                                 progress: undefined,
                                 theme: "dark",
                              })

                           })


                        }}
                           className="text-danger"
                        >Delete</DropdownItem>
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
                  placeholder="Search by Title..."
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
                           <DropdownItem key={status.uid} className="capitalize">
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
                  <Button
                     onPress={onOpen}
                     className="bg-foreground text-background"
                     endContent={<PlusIcon />}
                     size="sm"
                  >
                     Add New
                  </Button>
               </div>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-default-400 text-small">Total {users.length} users</span>
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
         <Modal
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">Add Job</ModalHeader>
                     <ModalBody>
                        <Input
                           isRequired
                           autoFocus
                           name="title"
                           label="Title"
                           value={jobInfo.title}
                           onChange={(e) => setJobInfo({ ...jobInfo, title: e.target.value })}
                           variant="bordered"
                        />
                        <Input
                           isRequired
                           name="description"
                           label="Description"
                           value={jobInfo.description}
                           onChange={(e) => setJobInfo({ ...jobInfo, description: e.target.value })}
                           variant="bordered"
                        />
                        <Input
                           isRequired
                           name="companyUrl"
                           label="Company Url"
                           value={jobInfo.companyUrl}
                           onChange={(e) => setJobInfo({ ...jobInfo, companyUrl: e.target.value })}
                           variant="bordered"
                        />
                        <Autocomplete
                           isRequired
                           defaultItems={technology}
                           variant="bordered"
                           label="Role"
                           placeholder="Enter Role"
                           selectedKey={jobInfo.role}
                           onSelectionChange={(e) => setJobInfo({ ...jobInfo, role: e })}
                        >
                           {(tech) => <AutocompleteItem key={tech.name}>{tech.name}</AutocompleteItem>}
                        </Autocomplete>

                        <Input
                           isRequired
                           name="location"
                           label="Location"
                           value={jobInfo.location}
                           onChange={(e) => setJobInfo({ ...jobInfo, location: e.target.value })}
                           variant="bordered"
                        />
                        <Input
                           isRequired
                           name="salary"
                           label="Salary In INR"
                           type="number"
                           value={jobInfo.salary}
                           onChange={(e) => setJobInfo({ ...jobInfo, salary: e.target.value })}
                           variant="bordered"
                        />
                        <Select
                           label="Skills"
                           placeholder="select skills"
                           selectionMode="multiple"
                           variant="bordered"
                           selectedKeys={jobInfo.skills}
                           onSelectionChange={(e) => setJobInfo({ ...jobInfo, skills: e })}
                        >
                           {skills.map((skill) => (
                              <SelectItem key={skill.name} value={skill.name}>
                                 {skill.name}
                              </SelectItem>
                           ))}
                        </Select>
                     </ModalBody>
                     <ModalFooter>
                        <Button color="danger" variant="flat" onClick={(e) => {
                           setJobInfo({ title: "", description: "", company: session.data?.username, companyUrl: "", role: "", location: "", skills: new Set([]), salary: "" });
                           onClose();
                        }}>
                           Close
                        </Button>
                        <Button color="primary" onClick={async (e) => {
                           await fetch("/api/jobs/addjob", {
                              method: 'POST',
                              headers: {
                                 'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ ...jobInfo, skills: Array.from(jobInfo.skills) })
                           }).then(
                              (res) => {

                                 if (res.status === 200) {
                                    toast.success("Job added successFully", {
                                       position: "top-center",
                                       autoClose: 1500,
                                       hideProgressBar: false,
                                       closeOnClick: true,
                                       pauseOnHover: true,
                                       draggable: true,
                                       progress: undefined,
                                       theme: "dark",
                                    })
                                 }
                                 if (res.status === 400) {
                                    toast.error("Please fill all the fields", {
                                       position: "top-center",
                                       autoClose: 1500,
                                       hideProgressBar: false,
                                       closeOnClick: true,
                                       pauseOnHover: true,
                                       draggable: true,
                                       progress: undefined,
                                       theme: "dark",
                                    })
                                 }
                              }
                           ).catch((err) => {
                              toast.error("Something went wrong", {
                                 position: "top-center",
                                 autoClose: 1500,
                                 hideProgressBar: false,
                                 closeOnClick: true,
                                 pauseOnHover: true,
                                 draggable: true,
                                 progress: undefined,
                                 theme: "dark",
                              })


                           })
                           onClose();
                        }}>
                           Submit
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>




         {/* Edit Job Model */}



         <Modal
            backdrop="blur"
            isOpen={isUserInfoOpen}
            onOpenChange={onUserInfoOpenChange}
            placement="top-center"
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">Edit Job</ModalHeader>
                     <ModalBody>
                        <Input
                           isRequired
                           autoFocus
                           name="title"
                           label="Title"
                           value={jobEdit.title}
                           onChange={(e) => setJobEdit({ ...jobEdit, title: e.target.value })}
                           variant="bordered"
                        />
                        <Input
                           isRequired
                           name="description"
                           label="Description"
                           value={jobEdit.description}
                           onChange={(e) => setJobEdit({ ...jobEdit, description: e.target.value })}
                           variant="bordered"
                        />
                        <Input
                           isRequired
                           name="companyUrl"
                           label="Company Url"
                           value={jobEdit.companyUrl}
                           onChange={(e) => setJobEdit({ ...jobEdit, companyUrl: e.target.value })}
                           variant="bordered"
                        />
                        <Autocomplete
                           isRequired
                           defaultItems={technology}
                           variant="bordered"
                           label="Role"
                           placeholder="Enter Role"
                           selectedKey={jobEdit.role}
                           onSelectionChange={(e) => setJobEdit({ ...jobEdit, role: e })}
                        >
                           {(tech) => <AutocompleteItem key={tech.name}>{tech.name}</AutocompleteItem>}
                        </Autocomplete>

                        <Input
                           isRequired
                           name="location"
                           label="Location"
                           value={jobEdit.location}
                           onChange={(e) => setJobEdit({ ...jobEdit, location: e.target.value })}
                           variant="bordered"
                        />
                        <Input
                           isRequired
                           name="salary"
                           label="Salary In INR"
                           type="number"
                           value={jobEdit.salary}
                           onChange={(e) => setJobEdit({ ...jobEdit, salary: e.target.value })}
                           variant="bordered"
                        />
                        <Select
                           label="Skills"
                           placeholder="select skills"
                           selectionMode="multiple"
                           variant="bordered"
                           selectedKeys={jobEdit.skills}
                           onSelectionChange={(e) => setJobEdit({ ...jobEdit, skills: e })}
                        >
                           {skills.map((skill) => (
                              <SelectItem key={skill.name} value={skill.name}>
                                 {skill.name}
                              </SelectItem>
                           ))}
                        </Select>
                     </ModalBody>
                     <ModalFooter>
                        <Button color="danger" variant="flat" onClick={(e) => {
                           setJobEdit({ id: "", title: "", description: "", company: session.data?.username, companyUrl: "", role: "", location: "", skills: new Set([]), salary: "" });
                           onClose();
                        }}>
                           Close
                        </Button>
                        <Button color="primary" onClick={async (e) => {
                           await fetch("/api/jobs/editjob", {
                              method: 'PUT',
                              headers: {
                                 'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ ...jobEdit, skills: Array.from(jobEdit.skills) })
                           }).then((res) => {
                              if (res.status === 200) {
                                 toast.success("Job updated successFully", {
                                    position: "top-center",
                                    autoClose: 1500,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                 })
                              }
                           }).catch((err) => {
                              toast.error("Something went wrong", {
                                 position: "top-center",
                                 autoClose: 1500,
                                 hideProgressBar: false,
                                 closeOnClick: true,
                                 pauseOnHover: true,
                                 draggable: true,
                                 progress: undefined,
                                 theme: "dark",
                              })
                           })

                           onClose();
                        }}>
                           Submit
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>

















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
