const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getUTCFullYear();

let daysCompleted = {};
let displayYear = currentYear;
let displayMonth = currentMonth;
let color = "color1";

loadPage();

function loadPage() {
    const calendar = document.getElementById("calendar");
    calendar.addEventListener(("click"), calendarClick);
    const paint = document.getElementById("paint");
    paint.addEventListener(('click'), paintClicked);

    const storedDictString = localStorage.getItem("daysCompleted")
    if (storedDictString) daysCompleted = JSON.parse(storedDictString);



    loadCalendar(currentMonth, currentYear)
}

function loadCalendar(month, year) {

    /* CLEAR ALL INNER CONTENTS OF CALENDAR */
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = '';


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    /* SET HEADER MONTH AND YEAR*/
    monthAndYear = monthNames[month] + " " + year;
    document.getElementById('month-year').textContent = monthAndYear;

    /* GENERATE THE BUFFER DAYS */
    const bufferDays = new Date(year, month, 1).getDay();

    for (let i = 0; i < bufferDays; i++) {
        const newVar = document.createElement('div');
        newVar.id = 'bufferDate';
        calendar.append(newVar);
    }

    /* GENERATE THE DAYS OF THE CALENDAR */

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
        const newDiv = document.createElement('div');
        newDate = month + '-' + (i + 1) + '-' + year;
        newDiv.id = newDate
        newDiv.className = 'DOW'
        if (newDate in daysCompleted) {
            newDiv.classList.add(daysCompleted[newDate])
        }
        newDiv.textContent = i + 1;
        calendar.append(newDiv);
    }

    /* formats the current date if not selected */
    currentDate = currentMonth + '-' + (currentDay) + '-' + currentYear
    const currentDateDiv = document.getElementById(currentDate);
    if (!(currentDate in daysCompleted)) {
        currentDateDiv.style.fontWeight = 'bold';
        currentDateDiv.style.color = 'red';
    }
}

function nextMonth() {
    if (displayMonth == 11) {
        displayYear += 1;
        displayMonth = 0;
    }
    else displayMonth = displayMonth + 1;

    loadCalendar(displayMonth, displayYear);
}

function prevMonth() {
    if (displayMonth == 0) {
        displayMonth = 11;
        displayYear -= 1;
    }
    else displayMonth = displayMonth - 1;
    loadCalendar(displayMonth, displayYear);
}

function calendarClick(event) {
    const dateClicked = event.target.id;

    if (dateClicked in daysCompleted) {
        delete daysCompleted[dateClicked];
    }
    else daysCompleted[dateClicked] = color;

    localStorage.setItem("daysCompleted", JSON.stringify(daysCompleted));
    loadCalendar(displayMonth, displayYear);

}

function paintClicked(event) {
    const newColorID = event.target.id;
    if (newColorID == color) return;

    const colorDiv = document.getElementById(newColorID);
    colorDiv.classList.add('selected');
    document.getElementById(color).classList.remove('selected');
    color = newColorID;

    const colorName = document.getElementById("colorTitle");
    if (color == "color1") colorName.textContent = "climbing";
    else colorName.textContent = "gym";
}

function updateData() {
    console.log("SMD")
}

