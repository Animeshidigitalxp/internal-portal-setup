import React from 'react'
import ResetFullPageLoader from '../../components/FullPageLoader/ResetFullPageLoader'
import Section from '../../components/common/Section/Section';
import RecommendWrapper from './RecommendWrapper';

function page() {
    return (
    <Section heading="Recommendations">
      <ResetFullPageLoader />
      <RecommendWrapper />
    </Section>
  );
}

export default page