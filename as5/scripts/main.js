// Filename: scripts/main.js
// Alex Glasser
// Alexander_Glasser@student.uml.edu
// For use in GUI Programming I -- Assignment 5
// Formatting Dynamic Text
// Purpose: Uses the JSON structure in ihaveadream.json to 
// dynamically place the title, author, date, location and 
// actual speech (MLK's "I Have a Dream") on the page.
//
// Special thanks to Jesse Heines for providing boilerplate code
// on his website!
// I've modified his code pretty heavily to support my new JSON
// fields, such as the "class" field for each paragraph.
// This lets me format poems differently from regular text and
// also emphasize certain parts of the speech, such as "I have 
// a dream today!" being in italics and bold.
//
// REQUIRES: ihaveadream.json 

// story is assigned in the AJAX call at the bottom of this page
// It is then used by placeContent() to fill the divs on the HTML
// page that is associated with this.
var story;

function placeContent() {
    // Changed this function to add the header stuff into its own div
    // for formatting reasons
    var strHeader = "";  // author, title, location, date
    var strContent = ""; // speech content
    var strImage = "";   // image urls also encoded in JSON
    var strFooter = "";  // source in footer

    // create dynamic content from JSON

    // Header
    // - Title
    strHeader += "<h1 class='title'>" + story.title + "</h1>"; 
    // - Author
    strHeader += "<h2 class='author'>"
    strHeader += "by <span class='authorname'>" + story.author + "</span>"; 
    strHeader += " (<span class='authorlifespan'>" + story.authorlifespan + "</span>)";
    strHeader += "</h2>";
    // - Location
    strHeader += "<h3 class='locationLabel'>delivered at:</h3>";
    strHeader += "<h3 class='location'>" + story.location + "</h3>";
    // - Date
    strHeader += "<h3 class='date'>" + story.date + "</h3>";
    // End Header

    // loop through all the paragraphs and sentences
    for (var para = 0; para < story.text.paragraphs.length; para++ ) {
        // Each paragraph now has a class so we can style content multiple ways
        strContent += "<p class=" + story.text.paragraphs[para].class + ">";
        for (var sent = 0; sent < story.text.paragraphs[para].content.length; sent++ ) {
            strContent += story.text.paragraphs[para].content[sent] + "&nbsp; ";
            // If this is a poem block, add a newline before each line in the poem
            if (story.text.paragraphs[para].class == "poem") {
                strContent += "<br>"
            }
        }
        strContent += "</p>";
    }

    // set up images of MLK for display 
    // (Only one for now, but making this dynamic for the future)
    for (var i = 0; i < story.images.length; i++) {
        strImage += "<img class='" + story.images[i].class + "' alt='' src='" + story.images[i].url + "'>"
    }

    // added a footer to provide a source for the content of the page
    strFooter = "<a class='source' href=" + story.source + ">" + story.source + "</a>"

    // place dynamic content on page
    $("#contentheader").html(strHeader);  // speech title, author, etc.
    $("#content").html(strContent);       // text content of the speech
    $("#images").html(strImage);          // images to accomodate #content
    $("#sourcefooter").html(strFooter);   // footer to provide source
}

// Method borrowed from Heines' page 
jQuery.ajax({
    async: false,
    dataType: "json",
        url: "./ihaveadream.json",    // MLK speech
        success: function(data) {
            story = data; // AJAX return goes into story variable, 
                          // which then gets placed in divs by placeContent()
        }
});

$(document).ready(function() {
    placeContent();
});

