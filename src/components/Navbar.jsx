'use client'
import React, { useState, useEffect } from "react";
// import { useRouter} from 'next/router';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon.jsx";
import Image from "next/image.js";

export default function App({userRole}) {
  const [activeTab, setActiveTab] = useState('Home'); 

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const tab = getTabFromPath(pathname);
    setActiveTab(tab);
  }, []);

  const getTabFromPath = (pathname) => {
    const parts = pathname.split("/");
    return parts[1] || "Home";
  }; 
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-0">
          <Image src="https://upload.wikimedia.org/wikipedia/en/0/05/Dharamsinh_Desai_University_logo.png" width={50} height={50}/>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-10">
        {userRole == 'STUDENT' && (<>
          <NavbarItem isActive={activeTab === 'Home'}>
            <Link href="/" onClick={() => handleClick('Home')} style={{ color: activeTab === "Home" ? "#F55734" : "inherit" }}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'Dashboard'}>
            <Link color="foreground" onClick={() => handleClick('Dashboard')} href="/dashboard" style={{ color: activeTab === "Dashboard" ? "#F55734" : "inherit" }}>
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'Reviews'}>
            <Link color="foreground" onClick={() => handleClick('Reviews')} href="#" style={{ color: activeTab === "Reviews" ? "#F55734" : "inherit" }}>
              Reviews
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'About'}>
            <Link color="foreground" onClick={() => handleClick('About')} href="#" style={{ color: activeTab === "About" ? "#F55734" : "inherit" }}>
              About
            </Link>
          </NavbarItem>
          </>
          )}
          {userRole == 'ADMIN' && (<>
          <NavbarItem isActive={activeTab === 'Home'}>
            <Link href="/" onClick={() => handleClick('Home')} style={{ color: activeTab === "Home" ? "#F55734" : "inherit" }}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'AddStudent'}>
            <Link color="foreground" onClick={() => handleClick('AddStudent')} href="/dashboard" style={{ color: activeTab === "AddStudent" ? "#F55734" : "inherit" }}>
              Add Student
            </Link>
          </NavbarItem>
          <NavbarItem isActive={activeTab === 'About'}>
            <Link color="foreground" onClick={() => handleClick('About')} href="#" style={{ color: activeTab === "About" ? "#F55734" : "inherit" }}>
              About
            </Link>
          </NavbarItem>
          </>
          )}
        </NavbarContent>
      </NavbarContent>
    
      <NavbarContent as="div" className="items-center" justify="end">
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
              style={{ color: '#F55734' }}
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
