'use strict';

const staffList = document.querySelector('.js-staff-list');
const employeeTemplate = document.querySelector('#employee').content.querySelector('.vacation-schedule__employee');
const popupTemplate = document.querySelector('#popup').content.querySelector('.popup');
const data = [
  {
    photo: 'img/photo.png',
    name: 'Иван Иванов',
    days: '14/28',
    vacations: [
      {
        startDay: "22.04.2019",
        endDay: "30.04.2019",
        color: '#F16953'
      },
      {
        startDay: "20.05.2019",
        endDay: "31.05.2019",
        color: '#1EBEB4'
      }
    ]
  },
  {
    photo: 'img/photo-2.png',
    name: 'Катерина Иванова',
    days: '14/28',
    vacations: [
      {
        startDay: "05.08.2019",
        endDay: "18.08.2019",
        color: '#1EBEB4'
      }
    ]
  },
  {
    photo: 'img/photo.png',
    name: 'Иван Иванов',
    days: '14/28',
    vacations: [
      {
        startDay: "25.03.2019",
        endDay: "01.04.2019",
        color: '#1EBEB4'
      },
      {
        startDay: "20.05.2019",
        endDay: "02.06.2019",
        color: '#1EBEB4'
      },
      {
        startDay: "24.06.2019",
        endDay: "30.06.2019",
        color: '#1EBEB4'
      },
      {
        startDay: "16.09.2019",
        endDay: "22.09.2019",
        color: '#F16953'
      },
      {
        startDay: "30.09.2019",
        endDay: "30.09.2019",
        color: '#F16953'
      }
    ]
  },
  {
    photo: 'img/photo.png',
    name: 'Иван Иванов',
    days: '14/28',
    vacations: [
      {
        startDay: "18.03.2019",
        endDay: "24.03.2019",
        color: '#FCC659'
      }
    ]
  },
  {
    photo: 'img/photo.png',
    name: 'Иван Иванов',
    days: '14/28',
    vacations: [
      {
        startDay: "29.04.2019",
        endDay: "30.04.2019",
        color: '#F16953'
      },
      {
        startDay: "20.05.2019",
        endDay: "31.05.2019",
        color: '#1EBEB4'
      }
    ]
  }
];

addEmployeeElements(data);

function addEmployeeElements(array) {
  let fragment = document.createDocumentFragment();

  array.forEach(function (object) {
    let employeeElement = generateEmployeeElement(object);
    fragment.append(employeeElement);
  });

  staffList.append(fragment);
}

function generateEmployeeElement(employee) {
  let employeeElement = employeeTemplate.cloneNode(true);

  let imageElement = employeeElement.querySelector('.vacation-schedule__employee-photo img');
  imageElement.src = employee.photo;
  imageElement.alt = employee.name;

  let nameElement = employeeElement.querySelector('.vacation-schedule__employee-name');
  nameElement.textContent = employee.name;

  let daysElement = employeeElement.querySelector('.vacation-schedule__days');
  daysElement.textContent = employee.days;

  for (let i = 0; i < 12; i++) {
    let monthElement = generateMonthElement(i);
    employeeElement.append(monthElement);
  }


  let months = employeeElement.querySelectorAll('.vacation-schedule__month');

  employee.vacations.forEach(function (vacation) {
    let startDayIndex = Number(vacation.startDay.slice(0, 2)) - 1;
    let startMonthIndex = Number(vacation.startDay.slice(3, 5)) - 1;
    let endDayIndex = Number(vacation.endDay.slice(0, 2));
    let endMonthIndex = Number(vacation.endDay.slice(3, 5)) - 1;

    let startMonthDays = months[startMonthIndex].querySelectorAll('.vacation-schedule__day[style]');

    if (startMonthIndex === endMonthIndex) {
      let amountOfDays = endDayIndex - startDayIndex;

      for (let i = startDayIndex; i < startDayIndex + amountOfDays; i++) {
        addVacations(startMonthDays[i], vacation);
      }
    } else {
      for (let i = startDayIndex; i < startMonthDays.length; i++) {
        addVacations(startMonthDays[i], vacation);
      }
      let endMonthdays = months[endMonthIndex].querySelectorAll('.vacation-schedule__day[style]');
      for (let i = 0; i < endDayIndex; i++) {
        addVacations(endMonthdays[i], vacation);
      }
    }
  });

  return employeeElement;
}

function addVacations(dayElement, vacation) {
  dayElement.style.backgroundColor = vacation.color;
  dayElement.style.cursor = 'pointer';

  // dayElement.addEventListener('mouseenter', function () {
  //   if (!dayElement.parentElement.classList.contains('popup-opened')) {
  //     popupElement = popupTemplate.cloneNode(true);
  //     let dayElementPosition = dayElement.getBoundingClientRect();

  //     popupElement.style.top = dayElementPosition.y + 'px';
  //     popupElement.style.left = dayElementPosition.x + 'px';

  //     document.body.append(popupElement);

  //     dayElement.parentElement.classList.add('popup-opened');
  //   }
  // });
}

function generateMonthElement(monthIndex) {
  let monthElement = document.createElement('div');
  monthElement.classList.add('vacation-schedule__month');

  let date = new Date(2019, monthIndex);

  for (let i = 0; i < getDay(date); i++) {
    let dayElement = generateDayElement();
    monthElement.append(dayElement);
  }

  let daysInMonth = new Date(2019, monthIndex + 1, 0).getDate();

  let currentDay = new Date(2019, 2, 9);

  for (let i = 0; i < daysInMonth; i++) {
    let dayElement = generateDayElement();

    let day = new Date(2019, monthIndex, i);

    if (day > currentDay) {
      dayElement.style.backgroundColor = '#EAF9FF';
    } else {
      dayElement.style.backgroundColor = '#F6F6F6';
    }

    monthElement.append(dayElement);
  }

  return monthElement;
}

function generateDayElement() {
  let dayElement = document.createElement('div');
  dayElement.classList.add('vacation-schedule__day');
  return dayElement;
}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
}
