'use client';

import { useEffect, useRef, useState } from 'react';

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { useCardapioStore } from '@/shared/store/use-cardapio-store';
import { calculateWeek } from '@/shared/utils/date-methods';
import { InputCalendar } from '@/widgets/inputs/input-calendar';

type TCalendarCardapioProps = {
  userToken?: string;
};

export function CalendarCardapio({ userToken }: Readonly<TCalendarCardapioProps>) {
  const { setCardapios } = useCardapioStore();
  const btnOpenCalendar = useRef<HTMLButtonElement | null>(null);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentFormattedWeek, setCurrentFormattedWeek] = useState<string>('');
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  useEffect(() => {
    const { weekStart, weekEnd, formattedWeek } = calculateWeek(currentDate);
    setCurrentFormattedWeek(formattedWeek);
    setCardapios(weekStart, weekEnd, userToken);
  }, [currentDate, setCardapios, userToken]);

  function backWeek() {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  }

  function advanceWeek() {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  }

  function onWeekClick(firstDay: Date | null) {
    setCurrentDate(firstDay ?? new Date());
    setCalendarVisible(false);
  }

  return (
    <section className='relative'>
      <div className='self-center flex justify-between p-4 bg-functional-soft-lightest rounded-lg shadow-md w-max lg:w-80'>
        <div className='flex gap-4'>
          <button aria-label='Retornar semana' onClick={backWeek}>
            <ChevronLeft
              size={20}
              className='transition-color duration-300 text-functional-heavy-medium hover:text-brand-primary-dark'
            />
          </button>
          <button aria-label='Avançar semana' onClick={advanceWeek}>
            <ChevronRight
              size={20}
              className='transition-color duration-300 text-functional-heavy-medium hover:text-brand-primary-dark'
            />
          </button>
        </div>
        <button
          ref={btnOpenCalendar}
          aria-label='Abrir calendário'
          onClick={() => setCalendarVisible(!calendarVisible)}
          className='flex gap-4'
        >
          <p>{currentFormattedWeek}</p>

          <ChevronDown
            size={20}
            className={`transition-color duration-300 text-functional-heavy-medium hover:text-brand-primary-dark ${calendarVisible && 'rotate-180'}`}
          />
        </button>
      </div>

      <InputCalendar
        currentDate={currentDate}
        calendarVisible={calendarVisible}
        onWeekClick={onWeekClick}
        setCalendarVisible={setCalendarVisible}
        btnOpenCalendarRef={btnOpenCalendar}
      />
    </section>
  );
}
