import { MutableRefObject, useEffect, useRef } from 'react';

import { getMonthName } from '@/shared/utils/date-methods';

type TInputCalendarProps = {
  currentDate: Date;
  calendarVisible?: boolean;
  onWeekClick?: (date: Date | null) => void;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  btnOpenCalendarRef?: MutableRefObject<HTMLButtonElement | null>;
};

export function InputCalendar({
  currentDate,
  calendarVisible = true,
  onWeekClick,
  setCalendarVisible,
  btnOpenCalendarRef = undefined,
}: Readonly<TInputCalendarProps>) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !btnOpenCalendarRef?.current?.contains(event.target as Node)
      ) {
        setCalendarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [btnOpenCalendarRef, setCalendarVisible]);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth: (Date | null)[] = [];
  for (let day = new Date(firstDayOfMonth); day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    daysInMonth.push(new Date(day));
  }

  const startDayIndex = firstDayOfMonth.getDay();
  const endDayIndex = lastDayOfMonth.getDay();

  const prevMonthDays: (Date | null)[] = [];
  if (startDayIndex > 0) {
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    for (let i = 0; i < startDayIndex; i++) {
      prevMonthDays.push(
        new Date(
          prevMonthLastDay.getFullYear(),
          prevMonthLastDay.getMonth(),
          prevMonthLastDay.getDate() - (startDayIndex - i - 1)
        )
      );
    }
  }

  const nextMonthDays: (Date | null)[] = [];
  if (endDayIndex < 6) {
    const nextMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    for (let i = 0; i < 6 - endDayIndex; i++) {
      nextMonthDays.push(
        new Date(nextMonthFirstDay.getFullYear(), nextMonthFirstDay.getMonth(), i + 1)
      );
    }
  }

  const calendarDays: (Date | null)[] = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  function isCurrentWeek(week: (Date | null)[]) {
    const weekStart = week[0] instanceof Date ? week[0] : null;
    const weekEnd = week[6] instanceof Date ? week[6] : null;

    if (!weekStart || !weekEnd) return false;

    return currentDate >= weekStart && currentDate <= weekEnd;
  }

  function isCurrentMonth(day: Date | null) {
    if (!day) return false;
    return (
      day.getMonth() === currentDate.getMonth() && day.getFullYear() === currentDate.getFullYear()
    );
  }

  return (
    <div
      ref={calendarRef}
      className={`absolute bg-functional-soft-lightest w-full rounded-lg shadow-md mt-2 p-4 z-10 ${calendarVisible ? 'block' : 'hidden'}`}
    >
      <p className='text-center my-2 capitalize font-semibold'>{getMonthName(currentDate)}</p>

      <div className='grid grid-cols-7 text-center mb-2'>
        <span>D</span>
        <span>S</span>
        <span>T</span>
        <span>Q</span>
        <span>Q</span>
        <span>S</span>
        <span>S</span>
      </div>

      <div className='flex flex-col gap-2'>
        {weeks.map((week) => {
          const firstDay = week.find((day) => day !== null) || null;

          const currentWeek = isCurrentWeek(week);

          return (
            <button
              key={String(firstDay)}
              onClick={() => onWeekClick?.(firstDay)}
              className='grid grid-cols-7 text-center gap-1 p-2 group rounded-lg'
            >
              {week.map((day, dayIndex) => {
                let colorsClassName =
                  'bg-functional-soft-dark group-hover:bg-functional-soft-darkest';

                if (!isCurrentMonth(day) && currentWeek) {
                  colorsClassName =
                    'bg-functional-soft-dark text-brand-primary-dark font-medium group-hover:bg-functional-soft-darkest group-hover:text-brand-primary-darkest';
                } else if (!isCurrentMonth(day)) {
                  colorsClassName =
                    'bg-functional-soft-lightest group-hover:bg-functional-soft-medium';
                } else if (currentWeek) {
                  colorsClassName =
                    'bg-brand-primary-dark text-functional-soft-lightest font-medium group-hover:bg-brand-primary-darkest';
                }

                return (
                  <div
                    key={day ? day.toISOString() : `day-${dayIndex}`}
                    className={`p-2 transition-all duration-300 rounded-md ${colorsClassName}`}
                  >
                    {day ? day.getDate() : ''}
                  </div>
                );
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
}
