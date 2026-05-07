import React from 'react'
import ResetFullPageLoader from '../../components/FullPageLoader/ResetFullPageLoader'
import Section from '../../components/common/Section/Section';
import OrderWrapper from './OrderWrapper';

function page() {
  return (
    <Section heading="Morning Queue">
      <ResetFullPageLoader />
      <OrderWrapper />
      
    </Section>
  );
}

export default page