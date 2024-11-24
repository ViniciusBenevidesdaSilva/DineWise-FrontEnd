export function getDateInfo(date: Date): {
  weekDayName: string;
  formattedDate: string;
  americanFormattedDate: string;
} {
  const weekDayNames = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];

  const weekDayName = weekDayNames[date.getDay()];

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const americanFormattedDate = `${year}-${month}-${day}`;

  return { weekDayName, formattedDate, americanFormattedDate };
}

export function getMonthName(date: Date): string {
  return date.toLocaleDateString('pt-BR', { month: 'long' });
}

export function calculateWeek(date: Date): {
  weekStart: Date;
  weekEnd: Date;
  formattedWeek: string;
} {
  if (date.getDay() === 0) {
    date.setDate(date.getDate() + 1);
  }

  const dayOfWeek = date.getDay();

  const weekStartDifference = dayOfWeek - 1;
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - weekStartDifference);

  const weekEndDifference = 6 - dayOfWeek;
  const weekEnd = new Date(date);
  weekEnd.setDate(date.getDate() + weekEndDifference);

  const formattedWeek = formatWeekString(weekStart, weekEnd);

  return {
    weekStart,
    weekEnd,
    formattedWeek,
  };
}

export function formatDateString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function formatWeekString(weekStart: Date, weekEnd: Date): string {
  const month = getMonthName(weekStart);
  const year = weekStart.getFullYear();
  const dayStart = weekStart.getDate().toString().padStart(2, '0');
  const dayEnd = weekEnd.getDate().toString().padStart(2, '0');

  return `${month} de ${year}, ${dayStart} - ${dayEnd}`;
}
