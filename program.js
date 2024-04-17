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

// Use a 12-hour clock format for alarms
function formatTime(hours, minutes, seconds, period) {
    return `${hours}:${minutes}:${seconds} ${period}`;
}

let alarmTimestamps = [];

// Set alarm button click event
setAlarmBtn.addEventListener("click", () => {
    const hrs = selectMenu[0].value;
    const mins = selectMenu[1].value;
    const secs = selectMenu[2].value;
    const ampm = selectMenu[3].value;

    const alarmTime = new Date();
    alarmTime.setHours(ampm === "PM" ? parseInt(hrs) + 12 : parseInt(hrs));
    alarmTime.setMinutes(parseInt(mins));
    alarmTime.setSeconds(parseInt(secs));

    const alarmTimestamp = alarmTime.getTime();
    alarmTimestamps.push(alarmTimestamp);

    const li = document.createElement("li");
    li.textContent = formatTime(hrs, mins, secs, ampm);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        li.remove();
        alarmTimestamps = alarmTimestamps.filter(timestamp => timestamp !== alarmTimestamp);
    });

    li.appendChild(deleteBtn);
    alarmsList.appendChild(li);
});

// Check alarms every second
setInterval(() => {
    const now = new Date().getTime();

    alarmTimestamps.forEach((alarmTimestamp, index) => {
        if (Math.abs(now - alarmTimestamp) < 1000) {
            alert("Alarm! Wake up!");
            const alarmItem = alarmsList.children[index];
            alarmItem.remove();
            alarmTimestamps.splice(index, 1);
        }
    });
}, 1000);
