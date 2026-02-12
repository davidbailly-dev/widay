interface Props {
    className?: string;
}

interface Day {
    date: string,
    numInTheWeek: number,
    numInTheMonth: number,
    name: string,
    monthName: string,
    outOfTheMonth: boolean
}

interface Week {
    num: number;
    days: Day[];
}

export default function Calendar({ className }: Props) {
    const locale= 'fr-FR';
    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const today = new Date();
    const year = today.getFullYear();
    const month = {
        name: today.toLocaleString(locale, { month: 'long' }),
        num: today.getMonth() + 1,
    };
    const weeks = getWeeksInMonth(year, month.num - 1);

    return (
        <div className={`border border-stone-800 p-4 rounded-lg ${className}`}>
            <div className="text-center mb-4 uppercase">{year} - {month.name}</div>
            <div className="flex flex-col gap-4">
                <div>
                    <div className="grid grid-cols-7 gap-4">
                        {daysOfWeek.map((day) => (
                            <span
                                key={day}
                                className="font-bold text-center"
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
                {weeks.map((week) => (
                    <div
                        key={week.num}
                        className="grid grid-cols-7 gap-4"
                    >
                        {week.days.map((day) => (
                            <span
                                key={day.date}
                                className={`aspect-square align-top bg-stone-700 ${day.outOfTheMonth ? 'opacity-50' : ''} px-2 py-1 rounded-lg cursor-pointer hover:bg-orange-500`}
                            >
                                {day.numInTheMonth} {day.outOfTheMonth && day.monthName.slice(0, 3)}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Return the days of the requested week
 * 
 * @param year 
 * @param month - 0 indexed
 * 
 * @returns An array of weeks, each week containing an array of days
 */
function getWeeksInMonth(year: number, month: number) {
    const weeks: Week[] = [];
    const lastDate = new Date(year, month + 1, 0); // Get the last day of the month by setting the day to 0 of the next month
    const numDays = lastDate.getDate(); // Get the number of days in the month
    const missingDaysCount = lastDate.getDay();

    let currentWeek: Week | null = null;

    // If first day of month is different from monday,
    // we need to complete the first week with the last days of the previous month
    if (lastDate.getDay() !== 1) {
        const missingDays: Day[] = [];
        
        let prevMonthYear = new Date(year, month, 0); // Last day of previous month

        // If current month is january, we consider december of previous year
        if (month === 0) {
            prevMonthYear = new Date(year - 1, 12, 0);
        }

        let lastDayOfPrevMonth = new Date(year, month, 0).getDate();

        if (month == 0) {
            lastDayOfPrevMonth = new Date(year - 1, 11, 0).getDate();
        }

        // Add previours month days to the first week of the current month
        for (let i = 1; i <= missingDaysCount; i++) {
            const missingDay = new Date(year, month -1, lastDayOfPrevMonth - missingDaysCount + i);

            missingDays.push({
                date: getISODate(missingDay),
                numInTheWeek: missingDay.getDay(),
                numInTheMonth: missingDay.getDate(),
                name: missingDay.toLocaleString('fr-FR', { weekday: 'long' }),
                outOfTheMonth: true,
                monthName: missingDay.toLocaleString('fr-FR', { month: 'long' }),
            });
        }

        // Add current month days to the first week of the current month
        for (let i = 1; i <= 7 - missingDaysCount; i++) {
            const currentDay = new Date(year, month, i);

            missingDays.push({
                date: getISODate(currentDay),
                numInTheWeek: currentDay.getDay(),
                numInTheMonth: currentDay.getDate(),
                name: currentDay.toLocaleString('fr-FR', { weekday: 'long' }),
                outOfTheMonth: false,
                monthName: currentDay.toLocaleString('fr-FR', { month: 'long' }),
            });
        }

        weeks.push({
            num: 1,
            days: missingDays
        });
    }

    // Complete the weeks fo the current month
    for (let date = 7 - missingDaysCount + 1; date <= numDays; date++) {
        const day = new Date(year, month, date  );
        const dayNumberInTheWeek = day.getDay();

        if (dayNumberInTheWeek === 1 || currentWeek === null) {
            currentWeek = {
                num: weeks.length + 1,
                days: []
            };

            weeks.push(currentWeek);
        }

        currentWeek.days.push({
            date: getISODate(day),
            numInTheWeek: dayNumberInTheWeek,
            numInTheMonth: date,
            name: day.toLocaleString('fr-FR', { weekday: 'long' }),
            outOfTheMonth: false,
            monthName: day.toLocaleString('fr-FR', { month: 'long' }),
        });
    }

    // Add missing days of next month
    const lastWeek = weeks[weeks.length - 1];
    const missingDays: Day[] = [];

    if (lastWeek.days.length < 7) {
        for (let i = 1; i <= 7 - lastWeek.days.length; i++) {
            const missingDay = new Date(year, month + 1, i);

            missingDays.push({
                date: getISODate(missingDay),
                numInTheWeek: missingDay.getDay(),
                numInTheMonth: missingDay.getDate(),
                name: missingDay.toLocaleString('fr-FR', { weekday: 'long' }),
                outOfTheMonth: true,
                monthName: missingDay.toLocaleString('fr-FR', { month: 'long' }),
            });
        }
    }

    lastWeek.days.push(...missingDays);

    return weeks;
}

/**
 * Format a Date in ISO format
 * 
 * @param date 
 * @returns 
 */
function getISODate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}