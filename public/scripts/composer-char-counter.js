
$(document).ready(function() {
  console.log("composer-char-counter.js is loaded");

  // Adding event listener to textarea
  $('.new-tweet textarea').on('input', function() {
    const tweetLength = $(this).val().length;
    const remainingChars = 140 - tweetLength;

    // Log the remaining characters
    console.log("Characters left:", remainingChars);

    // Update the counter text
    $(this).closest('form').find('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $(this).closest('form').find('.counter').css('color', 'red');
    } else {
      $(this).closest('form').find('.counter').css('color', 'black');
    }
  });
});
