let currentDay = $("#currentDay");
currentDay.text(moment().format("dddd, MMMM Do"));

let formatTimeBlocks = function() {
  let currentHour = moment().format("hA");
  let hours = $(".hour");
  let textAreas = $(".textarea");
  let curHourFound = false;
  for(let i = 0; i < hours.length; i++) {
    if(hours.eq(i).text() === currentHour) {
      textAreas.eq(i).addClass("present");
      curHourFound = true;
    }
    else if (curHourFound) {
      textAreas.eq(i).addClass("future");
    }
    else {
      textAreas.eq(i).addClass("past");
    }
  }
}

formatTimeBlocks();