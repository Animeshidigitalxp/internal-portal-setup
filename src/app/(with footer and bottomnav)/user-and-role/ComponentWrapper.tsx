"use client"

import { useState } from "react";
import Section from "../../components/common/Section/Section"
import TabGroup from "../../components/common/TabGroup/TabGroup";
import UsersTable from "./Components/UsersTable/UsersTable";
import RolesTable from "./Components/RolesTable/RolesTable";


const ComponentWrapper = () => {

    const userData: any = [
    {
      user: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      created: "2023-01-01",
      lastLogin: "2023-10-01",
      status: "Active"
    },
    {
      user: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      created: "2023-02-01",
      lastLogin: "2023-10-01",
      status: "Active"
    },
    {
      user: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Editor",
      created: "2023-03-01",
      lastLogin: "2023-10-01",
      status: "Deactivated"
    }
  ];

  const roleData: any = [
    {
      noOfUsers: 3,
      role: "Admin",
      Description: "Full access to the entire platform. Manages users, system settings, integrations, and oversees all activity.",

    },
    {
      noOfUsers: 3,
      role: "Admin",
      Description: "Full access to the entire platform. Manages users, system settings, integrations, and oversees all activity.",

    },
    {
      noOfUsers: 3,
      role: "Admin",
      Description: "Full access to the entire platform. Manages users, system settings, integrations, and oversees all activity.",

    },
    {
      noOfUsers: 3,
      role: "Admin",
      Description: "Full access to the entire platform. Manages users, system settings, integrations, and oversees all activity.",

    },
  ];

    const filterHeading = ['Users', 'Roles'];
    const [filterHeadingTab, setFilterHeadingTab] = useState(filterHeading[0])

    return (
        <Section
            heading="Users & Roles"
            showAddButton={true}
            buttonLabel={filterHeadingTab === 'Users' ? '+ Create user' : '+ Create role'}
            path={filterHeadingTab === 'Users' ? '/user-and-role/create-user' : '/user-and-role/create-role' }
            
        >
            <TabGroup tabHeading={filterHeading} setFilterHeadingTab={setFilterHeadingTab} />
            {filterHeadingTab === 'Users' && <UsersTable conversData={userData} />}
            {filterHeadingTab === 'Roles' && <RolesTable conversData={roleData} />}
        </Section>
    )
}

export default ComponentWrapper