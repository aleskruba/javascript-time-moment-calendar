const now = moment();

const calendar = (containerEl) => {
  let selectedDate = null;
  const renderCalendar = () => {
    const startOfMonth = moment(now).startOf('month');
    const endOfMonth = moment(now).endOf('month');

    const monthName = now.format('MMMM');
    const year = now.format('YYYY');

    const calendarHeader = `
      <div class="calendar-header">
        <button id="prev-month">&lt;</button>
        <div>${monthName} ${year}</div>
        <button id="next-month">&gt;</button>
      </div>
    `;

    const calendarDays = `
      <div class="calendar-days">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
    `;

    const calendarDates = [];
    let cells = [];

    for (let date = moment(startOfMonth); date <= endOfMonth; date.add(1, 'day')) {
      const day = date.date();
      const isToday = date.isSame(moment(), 'day');
      const isSelected = date.isSame(selectedDate, 'day');
      const isPast = date.isBefore(moment(), 'day');

      cells.push(`
        <div
          class="calendar-date${isToday ? ' calendar-date-today' : ''}${isSelected ? ' calendar-date-selected' : ''}${isPast ? ' calendar-date-past' : ''}"
          data-date="${date.format('YYYY-MM-DD')}"
        >
          ${day}
        </div>
      `);

      if (date.day() === 6) {
        calendarDates.push(`<div class="calendar-row">${cells.join('')}</div>`);
        cells = [];
      }
    }

    const calendarDatesHtml = calendarDates.join('');

    const calendarHtml = `
      <div class="calendar">
        ${calendarHeader}
        ${calendarDays}
        ${calendarDatesHtml}
      </div>
    `;

    containerEl.innerHTML = calendarHtml;
    containerEl.querySelectorAll('.calendar-date').forEach((dateEl) => {

        dateEl.addEventListener('click', () => {
          const date = moment(dateEl.getAttribute('data-date'));
          if (date.isSameOrAfter(moment(), 'day')) {
            selectedDate = date;
            renderCalendar();
      
            // Create a new container for the 24-hour schedule
            const scheduleContainer = document.createElement('div');
            scheduleContainer.classList.add('schedule-container');
            containerEl.appendChild(scheduleContainer);
      
            // Create a string with 24 time slots for the schedule
         // Create a string with 24 time slots for the schedule
let scheduleHtml = '<div class="schedule-header">Select a time slot:</div>';
let amScheduleHtml = '';
let pmScheduleHtml = '';
for (let i = 0; i < 24; i++) {
  const timeSlot = moment({ hour: i });
  const isPast = timeSlot.isBefore(moment(), 'hour');
  const isSelected = false; // You could add logic to check if this time slot is currently selected
  const timeSlotHtml = `
    <div class="schedule-time-slot${isSelected ? ' schedule-time-slot-selected' : ''}${isPast ? ' schedule-time-slot-past' : ''}"
      data-date="${date.format('YYYY-MM-DD')}" data-time="${timeSlot.format('HH:mm')}">
      ${timeSlot.format('h A')}
    </div>
  `;
  if (i < 12) {
    amScheduleHtml += timeSlotHtml;
  } else {
    pmScheduleHtml += timeSlotHtml;
  }
}

// Set the inner HTML of the new container to the schedule HTML
scheduleHtml += `
  <div class="schedule-columns">
    <div class="schedule-column">${amScheduleHtml}</div>
    <div class="schedule-column">${pmScheduleHtml}</div>
  </div>
`;

      
            // Set the inner HTML of the new container to the schedule HTML
            scheduleContainer.innerHTML = scheduleHtml;
      
            // Add click event listeners to each time slot
            scheduleContainer.querySelectorAll('.schedule-time-slot').forEach((timeSlotEl) => {
              timeSlotEl.addEventListener('click', () => {
                const date = moment(timeSlotEl.getAttribute('data-date'));
                const time = moment(timeSlotEl.getAttribute('data-time'), 'HH:mm');
                const dateTime = moment({ year: date.year(), month: date.month(), date: date.date(), hour: time.hour(), minute: time.minute() });
                console.log(`Selected date and time slot: ${dateTime.format('MMMM D, YYYY h:mm A')}`);
                
            
                const dateTimeslot1 = dateTime.valueOf();
                console.log(`Datetime1 and time in UTC format in milliseconds: ${dateTimeslot1}`);

                const utcMoment = moment.utc(dateTimeslot1);
               
                const localMoment = utcMoment.local();
                const formattedDateTime = localMoment.format('MMMM D, YYYY h:mm A');
                
                // Log the result to the console
                console.log(`Formatted date and time: ${formattedDateTime}`);

            });
            });
          }
        });
        
      });
      
      

    containerEl.querySelector('#prev-month').addEventListener('click', () => {
      now.subtract(1, 'month');
      renderCalendar();
    });

    containerEl.querySelector('#next-month').addEventListener('click', () => {
      now.add(1, 'month');
      renderCalendar();
    });
  };

  renderCalendar();

  return {
    getSelectedDate: () => selectedDate,
  };
};
