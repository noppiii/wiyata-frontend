import React, { useEffect } from 'react';
import {memLocStore} from "../../lib/zustand/memberLocStore";
import {sysLocStore, useStore} from "../../lib/zustand/planStore";
import LandingMainContents from "../../components/Landing/LandingMainContents";

const LandingForm = () => {
    const { initializePlanForm } = useStore();
    const { initializeMemberForm } = memLocStore();
    const { initializeSysCateLocForm } = sysLocStore();

    useEffect(() => {
        initializePlanForm();
        initializeMemberForm();
        initializeSysCateLocForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <LandingMainContents />;
};

export default LandingForm;