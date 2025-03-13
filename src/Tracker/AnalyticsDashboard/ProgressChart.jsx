// Github style progress chart
// data prop should be a hashmap of dates and counts.
"use client";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function ProgressChart({ data }) {
  const sortedDates = Object.keys(data).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const weeks = Math.ceil(sortedDates.length / 7);

  // Group data into weeks with dates and counts
  const groupedData = Array.from({ length: weeks }, (_, weekIndex) =>
    sortedDates.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date) => ({
      date,
      count: data[date],
    }))
  );

  console.log("grouped data:", groupedData);

  const maxCount = Math.max(...Object.values(data));

  const getIntensity = (count) => {
    if (count === 0) return "bg-base-100";
    const intensity = Math.ceil((count / maxCount) * 4);
    return `bg-primary`;
  };

  return (
    <div className="w-full bg-base-200 p-10 justify-center rounded-2xl overflow-x-auto">
      {/* Month labels */}
      <div className="flex flex-row text-left ml-10 text-sm text-gray-500 w-fit gap-11.5 mb-2">
        {months.map((month) =>
            <div className="h-3 flex items-center space-x-8">{month}</div>
        )}
      </div>
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col justify-between pr-2 text-sm text-gray-500">
          <div className="h-3 flex items-center justify-end">Mon</div>
          <div className="h-3 flex items-center justify-end">Wed</div>
          <div className="h-3 flex items-center justify-end">Fri</div>
          <div className="h-3 flex items-center justify-end">Sun</div>
        </div>

        {/* Chart grid */}
        <div className="flex-1">
          <div className="grid grid-rows-7 gap-y-1">
            {DAYS_OF_WEEK.map((_, dayIndex) => (
              <div key={dayIndex} className="flex gap-x-1">
                {groupedData.map((week, weekIndex) => {
                  const dayData = week[dayIndex];
                  return (
                    <div className="tooltip"
                    data-tip={
                        dayData
                          ? `${dayData.date}: ${dayData.count} completions`
                          : `No completions`
                      }> 
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`h-3 w-3 rounded-sm ${
                        dayData ? getIntensity(dayData.count) : "bg-secondary"
                      }`}
                    />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
