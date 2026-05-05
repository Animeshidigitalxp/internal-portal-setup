import Section from '../../components/common/Section/Section'
import ComponentWrapper from './ComponentWrapper'
import boatImg from '../img/DUDA Commercial Properties.webp'

function page() {
   const data: any = [
    {
      boatImg: boatImg,
      boatName: "2026 Evotti 523QL",
      price: "$102,239",
      type: "Wake",
      Availability: "In Stock",
      
    },
    {
      boatImg: boatImg,
      boatName: "2026 MasterCraft NXT20",
      price: "$102,239",
      type: "Wake",
      Availability: "Sold",
    
    },
    {
      boatImg: boatImg,
      boatName: "2026 MasterCraft NXT22",
      price: "$102,239",
      type: "Fishing",
      Availability: "Sold",
      
    },
    {
      boatImg: boatImg,
      boatName: "2026 Sunseeker 60",
      price: "$102,239",
      type: "Fishing",
      Availability: "In Stock",
      
    },
    {
      boatImg: boatImg,
      boatName: "2026 Sunseeker 60",
      price: "$102,239",
      type: "Sport",
      Availability: "Sold",
      
    },
    {
      boatImg: boatImg,
      boatName: "2026 Sunseeker 60",
      price: "$102,239",
      type: "Sport",
      Availability: "In Stock",
      
    },
    {
      boatImg: boatImg,
      boatName: "2026 Sunseeker 60",
      price: "$102,239",
      type: "Sport",
      Availability: "On Order",
      
    }
  ];
  return (
      <Section
        heading="Inventory">
          {/* <ResetFullPageLoader /> */}
          <ComponentWrapper conversData={data}/>
          
      </Section>
  )
}

export default page