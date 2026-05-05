import BreadCrumbs from "@/src/app/components/common/BreadCrumbs/BreadCrumbs"
import CreateRole from "./CreateRole"

const page = () => {

    const breadCrumbData = [
        {
            label: 'Roles',
            path: `/user-and-role`,
            isEdit: false,
            isActive: false,
            isLink: true
        },
        {
            label: 'Create Role',
            path: '/setup/users',
            isEdit: true,
            isActive: true
        }
    ]
    const roleDrop = {
        "Dashboard": {
            "Category": "Dashboard",
            "Feature": "",
            "Sub_Feature": "",
            "View": true,
            "Add_Create_Edit": false,
            "Update_Status": false,
            "Approve_Reject": false,
            "Threshold_Amount": false
        },
        "Conversations": {
            "Category": "Conversations",
            "Feature": "",
            "Sub_Feature": "",
            "View": true,
            "Add_Create_Edit": true,
            "Update_Status": false,
            "Approve_Reject": false,
            "Threshold_Amount": false
        },
        "Leads": {
            "Category": "Leads",
            "Feature": "",
            "Sub_Feature": "",
            "View": true,
            "Add_Create_Edit": true,
            "Update_Status": false,
            "Approve_Reject": false,
            "Threshold_Amount": false
        },
    }
    return (
        <div>
            <BreadCrumbs
                dataTest='Role'
                breadCrumbData={breadCrumbData} />
            <CreateRole
                roleData={{}}
                roleDropdown={roleDrop } />
        </div>
    )
}

export default page