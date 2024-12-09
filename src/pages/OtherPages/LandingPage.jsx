import React from 'react';
import LandingForm from 'containers/Other/LandingForm';
import PageTemplate from "../../components/common/PageTemplate";

const LandingPage = () => {
    return (
        <PageTemplate type="landing">
            <LandingForm />
        </PageTemplate>
    );
};

export default LandingPage;