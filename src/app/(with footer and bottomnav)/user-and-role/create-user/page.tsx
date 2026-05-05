import Breadcrumb from "@/src/app/components/common/Breadcrumb/Breadcrumb";
import CreateUser from "./CreateUser";

const page = () => {

     const breadCrumbData = [
        {
            label: "User",
            href: "/user-and-role"
        },
        {
            label: "Create user",
            href: "/conversations"
        },
    ];

  return (
    <div>
        <Breadcrumb items={breadCrumbData}/>
        <CreateUser
            userData={{}}
            fromCreate={true}
        />
    </div>
  )
}

export default page