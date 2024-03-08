'use client'

import React, { use } from "react";
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
   Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link, Autocomplete, AutocompleteItem, Select, SelectItem,
   RadioGroup, Radio,
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


   let { data: users, error, isLoading } = useSWR('api/jobs/getjobsbyrecruiter', fetcher, { revalidateOnMount: true, revalidateOnFocus: true, refreshInterval: 1000 })
   const router = useRouter();
   if (isLoading) {
      users = []
   }   // let users = []
   // if (data) {
   //    users = data;
   // }
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
      cpi: 0.0,
      english_level: 0,
      logical_reasoning_level: 0,
      experience_gained: 0,
      extra_curricular_activities: 0,
      easy_leetcode_questions: 0,
      medium_leetcode_questions: 0,
      hard_leetcode_questions: 0,
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
      cpi: 0.0,
      english_level: 0,
      logical_reasoning_level: 0,
      experience_gained: 0,
      extra_curricular_activities: 0,
      easy_leetcode_questions: 0,
      medium_leetcode_questions: 0,
      hard_leetcode_questions: 0,
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

   let filteredItems = React.useMemo(() => {
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

   let items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
   }, [page, filteredItems, rowsPerPage]);




   const renderCell = React.useCallback((user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
         case "cpi":
            return user.Criteria.cpi;
         case "english_level":
            return user.Criteria.english_level;
         case "logical_reasoning_level":
            return user.Criteria.logical_reasoning_level;
         case "experience_gained":
            return user.Criteria.experience_gained;
         case "extra_curricular_activities":
            return user.Criteria.extra_curricular_activities;
         case "easy_leetcode_questions":
            return user.Criteria.easy_leetcode_questions;
         case "medium_leetcode_questions":
            return user.Criteria.medium_leetcode_questions;
         case "hard_leetcode_questions":
            return user.Criteria.hard_leetcode_questions;
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
                           setJobEdit({
                              id: user.id, title: user.title, description: user.description, company: user.company, companyUrl: user.companyUrl, role: user.role, location: user.location, skills: new Set(user.skills), salary: user.salary,
                              cpi: user.Criteria.cpi, english_level: user.Criteria.english_level, logical_reasoning_level: user.Criteria.logical_reasoning_level, experience_gained: user.Criteria.experience_gained, extra_curricular_activities: user.Criteria.extra_curricular_activities, easy_leetcode_questions: user.Criteria.easy_leetcode_questions, medium_leetcode_questions: user.Criteria.medium_leetcode_questions, hard_leetcode_questions: user.Criteria.hard_leetcode_questions,

                           });
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
                  <Dropdown
                     type="listbox"
                  >
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

                        shouldBlockScroll={false}
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}
                        style={{ maxHeight: "300px", overflowY: "auto" }}
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

         <Modal
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            scrollBehavior="inside"
            size="md"
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
                        <Input
                           isRequired
                           name="cpi"
                           label="CPI"
                           type="number"
                           inputMode="decimal"
                           value={jobInfo.cpi}
                           onChange={(e) => setJobInfo({ ...jobInfo, cpi: parseFloat(e.target.value) })}
                           variant="bordered"
                        />

                        <RadioGroup
                           label="English Level"
                           orientation="horizontal"
                           id='english_level'
                           name='english_level'
                           value={jobInfo.english_level}

                           onValueChange={(e) => setJobInfo({ ...jobInfo, english_level: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1}  >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Logical Reasoning"
                           orientation="horizontal"
                           name="logical_reasoning_level"
                           value={jobInfo.logical_reasoning_level}
                           onValueChange={(e) => setJobInfo({ ...jobInfo, logical_reasoning_level: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1} >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Experience Gained 0-Yes | 1-No"
                           orientation="horizontal"
                           name='experience_gained'
                           value={jobInfo.experience_gained}
                           onValueChange={(e) => setJobInfo({ ...jobInfo, experience_gained: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1}>1</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Involvement in Extra Curricular Activities"
                           orientation="horizontal"
                           name="extra_curricular_activities"
                           value={jobInfo.extra_curricular_activities}
                           onValueChange={(e) => setJobInfo({ ...jobInfo, extra_curricular_activities: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1} >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Leetcode Questions Solved Of Easy Level"
                           orientation="horizontal"
                           value={jobInfo.easy_leetcode_questions}
                           onValueChange={(e) => setJobInfo({ ...jobInfo, easy_leetcode_questions: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1} >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Leetcode Questions Solved Of Medium Level"
                           orientation="horizontal"
                           value={jobInfo.medium_leetcode_questions}
                           onValueChange={(e) => setJobInfo({ ...jobInfo, medium_leetcode_questions: parseInt(e) })}
                        >
                           <Radio value={0}>0</Radio>
                           <Radio value={1}>1</Radio>
                           <Radio value={2}>2</Radio>
                           <Radio value={3}>3</Radio>
                           <Radio value={4}>4</Radio>
                           <Radio value={5}>5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Leetcode Questions Solved Of Hard Level"
                           orientation="horizontal"
                           value={jobInfo.hard_leetcode_questions}
                           onValueChange={(e) => setJobInfo({ ...jobInfo, hard_leetcode_questions: parseInt(e) })}
                        >
                           <Radio value={0}>0</Radio>
                           <Radio value={1}>1</Radio>
                           <Radio value={2}>2</Radio>
                           <Radio value={3}>3</Radio>
                           <Radio value={4}>4</Radio>
                           <Radio value={5}>5</Radio>
                        </RadioGroup><br />
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
                           // console.log(jobInfo);
                           onClose();
                        }}>
                           Submit
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal >




         {/* Edit Job Model */}



         < Modal
            backdrop="blur"
            isOpen={isUserInfoOpen}
            onOpenChange={onUserInfoOpenChange}
            placement="top-center"
            scrollBehavior="inside"
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
                        <Input
                           isRequired
                           name="cpi"
                           label="CPI"
                           type="number"
                           inputMode="decimal"
                           value={jobEdit.cpi}
                           onChange={(e) => setJobEdit({ ...jobEdit, cpi: parseFloat(e.target.value) })}
                           variant="bordered"
                        />

                        <RadioGroup
                           label="English Level"
                           orientation="horizontal"
                           id='english_level'
                           name='english_level'
                           value={jobEdit.english_level}

                           onValueChange={(e) => setJobEdit({ ...jobEdit, english_level: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1}  >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Logical Reasoning"
                           orientation="horizontal"
                           name="logical_reasoning_level"
                           value={jobEdit.logical_reasoning_level}
                           onValueChange={(e) => setJobEdit({ ...jobEdit, logical_reasoning_level: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1} >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Experience Gained 0-Yes | 1-No"
                           orientation="horizontal"
                           name='experience_gained'
                           value={jobEdit.experience_gained}
                           onValueChange={(e) => setJobEdit({ ...jobEdit, experience_gained: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1}>1</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Involvement in Extra Curricular Activities"
                           orientation="horizontal"
                           name="extra_curricular_activities"
                           value={jobEdit.extra_curricular_activities}
                           onValueChange={(e) => setJobEdit({ ...jobEdit, extra_curricular_activities: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1} >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Leetcode Questions Solved Of Easy Level"
                           orientation="horizontal"
                           value={jobEdit.easy_leetcode_questions}
                           onValueChange={(e) => setJobEdit({ ...jobEdit, easy_leetcode_questions: parseInt(e) })}
                        >
                           <Radio value={0} >0</Radio>
                           <Radio value={1} >1</Radio>
                           <Radio value={2} >2</Radio>
                           <Radio value={3} >3</Radio>
                           <Radio value={4} >4</Radio>
                           <Radio value={5} >5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Leetcode Questions Solved Of Medium Level"
                           orientation="horizontal"
                           value={jobEdit.medium_leetcode_questions}
                           onValueChange={(e) => setJobEdit({ ...jobEdit, medium_leetcode_questions: parseInt(e) })}
                        >
                           <Radio value={0}>0</Radio>
                           <Radio value={1}>1</Radio>
                           <Radio value={2}>2</Radio>
                           <Radio value={3}>3</Radio>
                           <Radio value={4}>4</Radio>
                           <Radio value={5}>5</Radio>
                        </RadioGroup><br />
                        <RadioGroup
                           label="Leetcode Questions Solved Of Hard Level"
                           orientation="horizontal"
                           value={jobEdit.hard_leetcode_questions}
                           onValueChange={(e) => setJobEdit({ ...jobEdit, hard_leetcode_questions: parseInt(e) })}
                        >
                           <Radio value={0}>0</Radio>
                           <Radio value={1}>1</Radio>
                           <Radio value={2}>2</Radio>
                           <Radio value={3}>3</Radio>
                           <Radio value={4}>4</Radio>
                           <Radio value={5}>5</Radio>
                        </RadioGroup><br />
                     </ModalBody>
                     <ModalFooter>
                        <Button color="danger" variant="flat" onClick={(e) => {
                           setJobEdit({
                              id: "", title: "", description: "", company: session.data?.username, companyUrl: "", role: "", location: "", skills: new Set([]), salary: "",
                              cpi: 0.0, english_level: 0, logical_reasoning_level: 0, experience_gained: 0, extra_curricular_activities: 0, easy_leetcode_questions: 0, medium_leetcode_questions: 0, hard_leetcode_questions: 0,
                           });
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
         </Modal >

















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
