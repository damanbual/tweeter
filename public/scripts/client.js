
$(document).ready(function() {
  // Constant for maximum tweet length
  const MAX_TWEET_LENGTH = 140;

  // Function to create the HTML structure for a tweet
  const createTweetElement = (tweet) => {
    return `
      <article class="tweet">
        <header>
          <div class="profile-pic">
            <img src="${tweet.user.avatars}" alt="User's profile picture" />
          </div>
          <div class="user-info">
            <h2>${tweet.user.name}</h2>
            <p class="handle">${tweet.user.handle}</p>
          </div>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <div class="date-posted">
            <p>${timeago.format(tweet.created_at)}</p>
          </div>
          <div class="tweet-actions">
            <i class="fas fa-reply"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  };

  // Function to render tweets
  const renderTweets = (tweets) => {
    const tweetContainer = $('#tweets-container');
    tweetContainer.empty(); // Clear any existing content
    tweets.forEach(tweet => {
      const tweetElement = createTweetElement(tweet);
      tweetContainer.prepend(tweetElement); // Append each tweet element
    });
  };

  // Function to fetch tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error('Error fetching tweets:', error);
        alert('Failed to load tweets. Please try again later.');
      }
    });
  };

  // Call loadTweets when the page is ready
  loadTweets();

  // Form submission event handler
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const tweetContent = $('#tweet-text').val().trim();
    const errorMessageElement = $('.error-message');

    // Hide the error message before validation
    errorMessageElement.slideUp();

    // Validation
    if (!tweetContent) {
      errorMessageElement.text('Tweet content cannot be empty.').slideDown();
      return;
    }
    if (tweetContent.length > MAX_TWEET_LENGTH) {
      errorMessageElement.text('Tweet content cannot exceed 140 characters.').slideDown();
      return;
    }

    // Serialize the form data
    const formData = $(this).serialize();

    // Make the AJAX POST request
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function(response) {
        loadTweets(); // Reload tweets to include the new one
        $('form')[0].reset(); // Reset the form to its initial state
        $('.counter').text(MAX_TWEET_LENGTH); // Reset the character counter
      },
      error: function(err) {
        console.error('Error in form submission:', err);
        errorMessageElement.text('Failed to post tweet. Please try again later.').slideDown();
      }
    });
  });
});

