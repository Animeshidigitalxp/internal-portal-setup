import ResetFullPageLoader from '../../components/FullPageLoader/ResetFullPageLoader'
import Section from '../../components/common/Section/Section';
import CustomerWrapper from './CustomerWrapper';

function page() {
  return (
    <Section heading="Customers">
      <ResetFullPageLoader />
      <CustomerWrapper />
      
    </Section>
  );
}

export default page