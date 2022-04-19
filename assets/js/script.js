let currentDay = $("#currentDay");
currentDay.text(moment().format("dddd, MMMM Do"));
let timeBlocks = $(".time-block");
let saveEvents = {};


// function to format time blocks with past, present, or future
let formatTimeBlocks = function() {
  let currentHour = moment().format("hA");
  let curHourFound = false;
  for(let i = 0; i < timeBlocks.length; i++) {
    if(timeBlocks.eq(i).find(".hour").text() === currentHour) {
      timeBlocks.eq(i).find(".textarea").addClass("present");
      curHourFound = true;
    }
    else if (curHourFound) {
      timeBlocks.eq(i).find(".textarea").addClass("future");
    }
    else {
      timeBlocks.eq(i).find(".textarea").addClass("past");
    }
  }
}

timeBlocks.on('click','.saveBtn', function() {
  if($(this).parent().find(".textarea").text() != "") {
    if(!saveEvents[currentDay.text()]) {
      saveEvents[currentDay.text()] = {};
    }
  saveEvents[currentDay.text()][$(this).parent().find(".hour").text()] = $(this).parent().find(".textarea").text();
  }
})

formatTimeBlocks();