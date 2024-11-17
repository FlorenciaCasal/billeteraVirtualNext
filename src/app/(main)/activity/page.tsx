
'use client';
import Activity from '@/Components/dashboard/Activity';

interface ActivityPageProps {
    isDashboard: boolean;
}

const ActivityPage = ({ isDashboard }: ActivityPageProps) => {
    return (
        <Activity isDashboard={isDashboard}
        />
    );
};

export default ActivityPage;