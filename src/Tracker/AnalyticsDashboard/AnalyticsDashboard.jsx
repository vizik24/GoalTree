import ProgressChart from "./ProgressChart";
import RecentlyCompleted from "./RecentlyCompleted";


export default function AnalyticsDashboard({ goals }) {
   
    

    // function to create data object for progress chart from goals
    function createYearlyData(year, data) {
        const yearlyData = {};
    
        // Generate all dates in the year and set counts 0
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
    
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0]; // Format YYYY-MM-DD
            yearlyData[dateStr] = 0;
        }
    
        // Populate counts 
        for (const item of data) {
            const dateStr = item.completedDate;
            if (yearlyData[dateStr] != undefined) {
                yearlyData[dateStr]++;
            }
        }
    
        return yearlyData;
    }


    return (
        <>
          <div className="h-fit w-full flex flex-col items-center justify-center rounded-2xl">
            <div className="grid grid-rows-1 gap-2">
              <ProgressChart data={createYearlyData(2025, goals)} />
            </div>
            <div className="grid grid-rows-1 gap-2 w-fit my-2">
              <RecentlyCompleted />
            </div>
          </div>
        </>
      );
      
      
}
