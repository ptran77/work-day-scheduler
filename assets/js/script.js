let currentDay = $("#currentDay"); // currentDay element
currentDay.text(moment().format("dddd, MMMM Do")); // setting date of current day
let timeBlocks = $(".time-block"); // time blocks
let saveEvents = {}; // storage of scave events


// function to format time blocks with past, present, or future
let formatTimeBlocks = function() {
  let currentHour = moment().format("hA");
  let curHourFound = false;
  for(let i = 0; i < timeBlocks.length; i++) {

    // found currentHour and setting it to present
    if(timeBlocks.eq(i).find(".hour").text() === currentHour) {
      timeBlocks.eq(i).find(".textarea").addClass("present");
      curHourFound = true;
    }
    // current hour is already found, so set to future
    else if (curHourFound) {
      timeBlocks.eq(i).find(".textarea").addClass("future");
    }
    // current hour is not found, so set to past
    else {
      timeBlocks.eq(i).find(".textarea").addClass("past");
    }
  }
}


// save event listener, store into saveEvents
timeBlocks.on('click','.saveBtn', function() {
  // if there an actually event, add it to saveEvents
  if($(this).parent().find(".textarea").text() != "") {
    if(!saveEvents[currentDay.text()]) {
      saveEvents[currentDay.text()] = {};
    }
  saveEvents[currentDay.text()][$(this).parent().find(".hour").text()] = $(this).parent().find(".textarea").text();

  // saving to local storage
  localStorage.setItem("workDayEvents", JSON.stringify(saveEvents));
  }
})

formatTimeBlocks();

// getting save events from local storage and placing them into corresponding timeblocks
window.onload = function () {
  saveEvents = JSON.parse(localStorage.getItem("workDayEvents"));
  // no save events
  if(!saveEvents) {
    saveEvents = {};
    return;
  }
  // there are save events of the current day
  if(saveEvents[currentDay.text()]) {
    for(let i = 0; i < timeBlocks.length; i++) {
      let hour = timeBlocks.eq(i).find(".hour").text();
      // if the timeblock hr is save in saveEvent, set the event
      if(saveEvents[currentDay.text()][hour]) {
        timeBlocks.eq(i).find(".textarea").text(saveEvents[currentDay.text()][hour]);
      }
    }
  }
}