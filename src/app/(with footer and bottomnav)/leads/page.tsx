
import Section from '../../components/common/Section/Section'
import ResetFullPageLoader from '../../components/FullPageLoader/ResetFullPageLoader'
import { getAllLeads } from './action';
import ComponentWrapper from './ComponentWrapper';




async function page() {
 
  const [leads] = await Promise.all([ getAllLeads()])
 
  return (
    <Section
      heading="Leads">
      <ResetFullPageLoader />
      <ComponentWrapper leadData={leads} />

    </Section>
  )
}

export default page