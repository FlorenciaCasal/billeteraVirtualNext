'use client';
import Activity from '../../../Components/dashboard/Activity';

const ActivityPage = () => {
    return (
        <div className="flex-grow min-h-full py-8 px-4 sm:w-[70vw] menu:w-[calc(100vw-16rem)] tablet:px-8 tablet:py-8 lg:py-16 lg:px-16 bg-[#EEEAEA]">
            <Activity />
        </div>
    );
};

export default ActivityPage;