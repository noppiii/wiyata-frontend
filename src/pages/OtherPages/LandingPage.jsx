import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LandingForm from 'containers/Other/LandingForm';

const LandingPage = () => {
    return (
        <PageTemplate type="landing">
            <LandingForm />
        </PageTemplate>
    );
};

export default LandingPage;