const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#setAlarm button");
const alarmsList = document.querySelector("ul");

// SET LIVE CLOCK TIME

setInterval(() => {

    // GETTING LIVE HOUR , MINS , SECS

    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;

    // ADDING 0 BEFORE HTMLTableRowElement, MINS, SEC IF VALUE < 10

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

}, 1000)


// SET ALARM



for (let i = 12; i > 0; i--) {
    let hour = i < 10 ? "0" + i : i;
    let option = `<option value= "${hour}" >${hour}</option>`;
    selectMenu[0].insertAdjacentHTML("afterbegin", option);
}

for (let i = 59; i > 0; i--) {
    let minute = i < 10 ? "0" + i : i;
    let option = `<option value= "${minute}" >${minute}</option>`;
    selectMenu[1].insertAdjacentHTML("afterbegin", option);
}

for (let i = 59; i > 0; i--) {
    let second = i < 10 ? "0" + i : i;
    let option = `<option value= "${second}" >${second}</option>`;
    selectMenu[2].insertAdjacentHTML("afterbegin", option);
}

["AM", "PM"].forEach(period => {
    let option = `<option value= "${period}" >${period}</option>`;
    selectMenu[3].insertAdjacentHTML("afterbegin", option);
});

// ADD ALARMS

let alarmTimestamps = [];

setAlarmBtn.addEventListener("click", () => {
    const hrs = selectMenu[0].value;
    const mins = selectMenu[1].value;
    const secs = selectMenu[2].value;
    const ampm = selectMenu[3].value;

    // Storing current time in alarmTime

    const alarmTime = new Date();

    // CONVERTING HRS TO 24 HR FORMAT
    // alarmTime represents the user-selected alarm time in the future.

    alarmTime.setHours(ampm === "PM" ? parseInt(hrs) + 12 : parseInt(hrs));
    alarmTime.setMinutes(parseInt(mins));
    alarmTime.setSeconds(parseInt(secs));

    // getTime() method is used to get the numeric value 
    // corresponding to the time for the specified date according to universal time

    const alarmTimestamp = alarmTime.getTime();

    // ADIING ALARM to alarmTimestamps array

    alarmTimestamps.push(alarmTimestamp);

    const li = document.createElement("li");
    li.textContent = `${hrs}:${mins}:${secs} ${ampm}`;


    // CREATING DELETE BUTTON

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        li.remove();
        // This line of code uses the filter method to create a new array with all elements from alarmTimestamps 
        // except for the one that matches the current alarmTimestamp.
        alarmTimestamps = alarmTimestamps.filter(timestamp => timestamp !== alarmTimestamp);
    });

    li.appendChild(deleteBtn);
    alarmsList.appendChild(li);
});

// Check alarms every second
setInterval(() => {
    const now = new Date().getTime();

    // ITERATE OVER EACH ELEMENT IN THE ARRAY alarmTimestamps

    // The expression calculates the absolute difference in milliseconds 
    // between the current time (now) and the set alarm time (alarmTimestamp). 
    // The Math.abs() function is used to ensure that the result is a positive value, 
    // regardless of the order of the subtraction.

    alarmTimestamps.forEach((alarmTimestamp, index) => {
        if (Math.abs(now - alarmTimestamp) < 1000) {
            alert("Alarm! Wake up!");
            const alarmItem = alarmsList.children[index];
            // REMOVING THE CORRESPONDING <li>
            alarmItem.remove();
            // REMOVING THE ELEMENT FROM ARRAY
            alarmTimestamps.splice(index, 1);
        }
    });
}, 1000);
