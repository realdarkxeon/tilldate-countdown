const givenDate = {
    month: "",
    day: "",
    year: ""
};

const today = new Date();

const currentDate = {
    month: today.getMonth() + 1,
    day: today.getDay(),
    year: today.getFullYear()
};

function setWarning() {
    document.getElementsByClassName("invalid-guide")[0].classList.toggle('hide');
    document.getElementsByClassName("start-guide")[0].classList.toggle('hide');
    document.getElementsByClassName("warning-window")[0].classList.toggle('hide-warning-window');
}

function dateIsValid(myDate) {
    const newDate = new Date(myDate);
    return newDate.getDate() == givenDate.day;
}

function startTimer() {
    let timer = setInterval(function() {
        const xDate = new Date();
        const yDate = new Date(givenDate["year"], givenDate["month"], givenDate["day"]);
        const totalTime = Math.floor((yDate - xDate) / 1000);

        if(totalTime < 1) {
            clearInterval(timer);
        }

        const weeks = Math.floor(totalTime / (3600 * 24 * 7));
        const days = Math.floor(totalTime / (3600 * 24)) % 7;
        const hours = Math.floor(totalTime / 3600) % 24;
        const minutes = Math.floor(totalTime / 60) % 60; 
        const seconds = totalTime % 60;

        document.getElementsByClassName("weeks-display")[0].textContent = String(weeks);
        document.getElementsByClassName("days-display")[0].textContent = String(days);
        document.getElementsByClassName("hours-display")[0].textContent = String(hours);
        document.getElementsByClassName("minutes-display")[0].textContent = String(minutes);
        document.getElementsByClassName("seconds-display")[0].textContent = String(seconds);

    }, 1000);
}

function changeRoute() {
    document.getElementsByClassName("countdown-wrapper")[0].classList.toggle('hide');
    document.getElementsByClassName("date-input-wrapper")[0].classList.toggle('hide');
    document.getElementsByClassName("guide")[0].classList.toggle('hide');
}

if(!document.getElementsByClassName("guide")[0].classList.contains("hide")) {
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key == "Enter") {
            givenDate["month"] = Number(document.getElementsByClassName("month")[0].value)-1;
            givenDate["day"] = Number(document.getElementsByClassName("day")[0].value);
            givenDate["year"] = Number(document.getElementsByClassName("year")[0].value);
            
            const xDate = new Date(`${givenDate["year"]}-${givenDate["month"]+1 }-${givenDate["day"]}`);
            const yDate = new Date();

            console.log(xDate);
            console.log(yDate);
            
            if(xDate > yDate && dateIsValid(xDate)) {
                changeRoute();
                startTimer();
            }
            else {
                setWarning();
                document.getElementsByClassName("month")[0].value = "";
                document.getElementsByClassName("day")[0].value = "";
                document.getElementsByClassName("year")[0].value = "";
                setTimeout(setWarning, 3000);
            }
        }
    });
}
else {
    document.removeEventListener("keydown");
}
