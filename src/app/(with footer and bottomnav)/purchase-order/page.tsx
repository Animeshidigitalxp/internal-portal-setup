import ResetFullPageLoader from '../../components/FullPageLoader/ResetFullPageLoader'
import Section from '../../components/common/Section/Section';
import ComponentWrapper from './ComponentWrapper';

function page() {
  return (
    <Section heading="Purchase Orders">
      <ResetFullPageLoader />
      <ComponentWrapper />
      
    </Section>
  );
}

export default page