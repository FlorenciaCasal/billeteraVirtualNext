
'use client';
import Activity from '../../../components/dashboard/Activity';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


const ActivityPage = () => {
    const [isDashboard, setIsDashboard] = useState<boolean>(false);
    const pathname = usePathname(); 

    useEffect(() => {
        if (pathname === '/dashboard') {
            setIsDashboard(true);
        } else {
            setIsDashboard(false);
        }
    }, [pathname]);

    return <Activity isDashboard={isDashboard} />;
};

export default ActivityPage;