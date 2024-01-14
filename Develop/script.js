// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the id of the parent time block.
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Get the user input from the textarea within the same time block.
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time block id as a key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future class to each time block based on the current hour.
  $(".time-block").each(function () {
    var currentHour = dayjs().hour();
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Get user input from local storage and set it to the respective textarea.
  $(".time-block .description").each(function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var storedInput = localStorage.getItem(timeBlockId);

    if (storedInput) {
      $(this).val(storedInput);
    }
  });

  // Display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("MMMM DD, YYYY"));
});
