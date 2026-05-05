
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb"
import AddDealerDetails from "./AddDealerDetails"

function page() {

      const breadCrumbData = [
        {
            label: "Dealer details",
            href: "/user-and-role"
        },
        {
            label: "Edit",
            href: "/conversations"
        },
    ];
     

  return (
         <div>
        <Breadcrumb items={breadCrumbData}/>
        <AddDealerDetails
            userData={{}}
            fromCreate={true}
        />
    </div>
    )
}

export default page