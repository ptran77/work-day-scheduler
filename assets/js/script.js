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
      timeBlocks.eq(i).find(".event").addClass("present");
      curHourFound = true;
    }
    // current hour is already found, so set to future
    else if (curHourFound) {
      timeBlocks.eq(i).find(".event").addClass("future");
    }
    // current hour is not found, so set to past
    else {
      timeBlocks.eq(i).find(".event").addClass("past");
    }
  }
}


// save event listener, store into saveEvents
timeBlocks.on('click','.saveBtn', function() {
  if(!saveEvents[currentDay.text()]) {
    saveEvents[currentDay.text()] = {};
  }
  saveEvents[currentDay.text()][$(this).parent().find(".hour").text()] = $(this).parent().find(".event").val();

  // saving to local storage
  localStorage.setItem("workDayEvents", JSON.stringify(saveEvents));
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
        timeBlocks.eq(i).find(".event").val(saveEvents[currentDay.text()][hour]);
      }
    }
  }
}