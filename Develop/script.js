// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the id of the time-block containing the button.
    var timeBlockId = $(this).parent().attr("id");

    // Use the id as a key to save user input in local storage.
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to apply past, present, or future class to each time block.
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Apply classes on page load.
  updateTimeBlocks();

  // Display the current date in the header.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
