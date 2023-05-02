const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getUTCFullYear();

let daysCompleted = {};
let displayYear = currentYear;
let displayMonth = currentMonth;
let color = "color1";
let habitTitleText = "Habit Tracker";
let habitText = ["Habit #1", "habit #2"]
let habitTextIDs = ["habit1Text", "habit2Text", "habit3Text"]
let currentHabit = 0;

loadPage();

function loadPage() {
    const calendar = document.getElementById("calendar");
    calendar.addEventListener(("click"), calendarClick);
    const paint = document.getElementById("paint");
    paint.addEventListener(('click'), paintClicked);
    const modal = document.getElementById("settingsModal");
    const closeBttn = document.getElementById("closeModal");
    closeBttn.addEventListener('click', closeModal);
    const editBttn = document.getElementById("openSettings");
    editBttn.addEventListener(('click'), openSettings);
    window.addEventListener(('click'), (event) => {
        if (event.target === modal) {
            modal.style.opacity = '0';
            setTimeout(function () {
                modal.style.display = 'none';
            }, 300);
        }
    });

    /* Get and set the data from local storage */
    const storedDictString = localStorage.getItem("daysCompleted")
    const titleString = localStorage.getItem("titleText")
    const habitItemString = localStorage.getItem("habitItems")
    if (storedDictString) daysCompleted = JSON.parse(storedDictString);
    if (titleString) habitTitleText = JSON.parse(titleString);
    if (habitItemString) habitText = JSON.parse(habitItemString);

    /* Set the currenlty selected habit and set its appropriate habit label  */
    const habitTitle = document.getElementById("habitTitle");
    habitTitle.textContent = habitText[currentHabit];

    const maintTitle = document.getElementById("headerID");
    maintTitle.textContent = habitTitleText;

    /* Fill the edit content with current content */
    const settingsTitle = document.getElementById("newTitleText");
    settingsTitle.value = habitTitleText;
    const settingsHabit1 = document.getElementById("habit1Text");
    settingsHabit1.value = habitText[0];
    const settingsHabit2 = document.getElementById("habit2Text");
    settingsHabit2.value = habitText[1];



    loadCalendar(currentMonth, currentYear);
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

    const colorName = document.getElementById("habitTitle");
    if (color == "color1") {
        colorName.textContent = habitText[0];
        currentHabit = 0;
    }
    else {
        colorName.textContent = habitText[1];
        currentHabit = 1;
    }
}

function updateData() {

    /* CHANGE TITLE TEXT */
    const newTitleText = document.getElementById("newTitleText");
    const title = document.getElementById("headerID");
    title.textContent = newTitleText.value;

    /* CHANGE EACH HABIT TEXT */
    for (i = 0; i < habitText.length; i++) {
        const newHabitText = document.getElementById(habitTextIDs[i]);
        habitText[i] = newHabitText.value;
    }
    /* Set the habit text to the new habit text  */
    const habitTitle = document.getElementById("habitTitle");
    habitTitle.textContent = habitText[currentHabit]

    /* Store info in local storage*/
    localStorage.setItem("habitItems", JSON.stringify(habitText));
    localStorage.setItem("titleText", JSON.stringify(newTitleText.value));

    /* Close the modal */
    const modal = document.getElementById("settingsModal");
    modal.style.opacity = "0";
    setTimeout(function () {
        modal.style.display = "none";
    }, 300);
}

function openSettings() {
    const modal = document.getElementById("settingsModal");
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.opacity = "1";
    }, 100);
}

function closeModal() {
    const modal = document.getElementById("settingsModal");
    modal.style.opacity = "0";
    setTimeout(function () {
        modal.style.display = "none";
    }, 300);
}