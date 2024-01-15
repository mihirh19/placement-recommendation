'use client'
import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button, User, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
    Image
} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon.jsx";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import NextImage from "next/image";

import {toast} from "react-toastify";

export default function App() {
  const {status , data} = useSession();
  const [activeTab, setActiveTab] = useState('Home');
    const router = useRouter();

  const handleClick = (tab) => {
    setActiveTab(tab);
  };
    const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
    <Navbar isBordered shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-0">
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
          <Image src='http://ddualumni.org/Content/Public/images/ddu_logo.png'
                 width={50}
                 height={50}
                 alt={"DDU LOGO"}
          />
        </NavbarBrand>
  
        {status==='authenticated' && data?.role === 'STUDENT' && (
        <>
        <NavbarContent className="hidden sm:flex gap-10">
          <NavbarItem isActive={activeTab === 'Home'}>
            <Link href="/" onClick={() => handleClick('Home')} style={{ color: activeTab === "Home" ? "#F55734" : "inherit" }}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'Dashboard'}>
            <Link color="foreground" onClick={() => handleClick('Dashboard')} href={'/dashboard'} style={{ color: activeTab === "Dashboard" ? "#F55734" : "inherit" }}>
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'Reviews'}>
            <Link color="foreground" onClick={() => handleClick('Reviews')} href="/" style={{ color: activeTab === "Reviews" ? "#F55734" : "inherit" }}>
              Reviews
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'About'}>
            <Link color="foreground" onClick={() => handleClick('About')} href="/" style={{ color: activeTab === "About" ? "#F55734" : "inherit" }}>
              About
            </Link>
          </NavbarItem>
          </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem isActive={activeTab === 'Home'}>
                    <Link href="/" onClick={() => handleClick('Home')} style={{ color: activeTab === "Home" ? "#F55734" : "inherit" }}>
                        Home
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={activeTab === 'Dashboard'}>
                    <Link color="foreground" onClick={() => handleClick('Dashboard')} href={'/dashboard'} style={{ color: activeTab === "Dashboard" ? "#F55734" : "inherit" }}>
                        Dashboard
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={activeTab === 'Reviews'}>
                    <Link color="foreground" onClick={() => handleClick('Reviews')} href="/" style={{ color: activeTab === "Reviews" ? "#F55734" : "inherit" }}>
                        Reviews
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={activeTab === 'About'}>
                    <Link color="foreground" onClick={() => handleClick('About')} href="/" style={{ color: activeTab === "About" ? "#F55734" : "inherit" }}>
                        About
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
          </>
          )}
          {status==='authenticated' && data?.role === 'ADMIN' && (<>
          <NavbarContent className="hidden sm:flex gap-10">
          <NavbarItem isActive={activeTab === 'Home'}>
            <Link href="/" onClick={()=>{
                handleClick("Home")
            }}  style={{ color: activeTab === "Home" ? "#F55734" : "inherit" }}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'AddStudent'}>
            <Link color="foreground" onClick={()=> {
                handleClick("AddStudent")
            }}  href="/register" style={{ color: activeTab === "AddStudent" ? "#F55734" : "inherit" }}>
              Add Student
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'About'}>
            <Link color="foreground" onClick={()=> {
                handleClick("About")
            }}  href="/" style={{ color: activeTab === "About" ? "#F55734" : "inherit" }}>
              About
            </Link>
          </NavbarItem>
          </NavbarContent>
                  <NavbarMenu>
                      <NavbarMenuItem isActive={activeTab === 'Home'}>
                          <Link href="/" onClick={()=>{
                              handleClick("Home")
                          }}  style={{ color: activeTab === "Home" ? "#F55734" : "inherit" }}>
                              Home
                          </Link>
                      </NavbarMenuItem>
                      <NavbarMenuItem isActive={activeTab === 'AddStudent'}>
                          <Link color="foreground" onClick={()=> {
                              handleClick("AddStudent")
                          }}  href="/register" style={{ color: activeTab === "AddStudent" ? "#F55734" : "inherit" }}>
                              Add Student
                          </Link>
                      </NavbarMenuItem>
                      <NavbarMenuItem isActive={activeTab === 'About'}>
                          <Link color="foreground" onClick={()=> {
                              handleClick("About")
                          }}  href="/" style={{ color: activeTab === "About" ? "#F55734" : "inherit" }}>
                              About
                          </Link>
                      </NavbarMenuItem>
                  </NavbarMenu>
          </>
          )}
        </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        {status === 'unauthenticated' && (
          <>
            <p style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic', marginBottom: '10px' }}>
              DHARMSINH DESAI UNIVERSITY - PLACEMENT
            </p>
            <Button style={{ color: "#F55734" }} variant={'ghost'} onClick={() => router.push('/login')}>
              Login
            </Button>
          </>
        )}

        {status==='authenticated' && (
            <>
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[20rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
              />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                  <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="danger"
                      name={data?.username}
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{data?.username}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => signOut({redirect:false}).then(() => {
                  toast.info('Sign Out Success', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  router.push('/login');
                  })} >Log Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </>
            )}
      </NavbarContent>
    </Navbar>
    </>
  );
}
