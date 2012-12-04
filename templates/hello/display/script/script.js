/* Get URl parameters */
 var urlParams = location.search && location.search.substr(1).replace(/\+/gi, " ").split("&");

 for (var i=0; i<urlParams.length; i++)
 {
     var s = urlParams[i].split("=");
     urlParams[i] = urlParams[unescape(s[0])] = unescape(s[1]);
 }

// The interval between each greeting
var GREET_INTERVAL = 2000;
function greet(people, index) {
   if (people.length > 1) {
      // There are other people to greet
      // Fade out current greeting
      $('#title').fadeOut('slow', function() {
         $('#title')
         // Assign new person
         .html('Hello, <span style="border-bottom: 8px dashed #2E2E2E">' + people[index].name + '</span>!')
         // Fade in new greeting
         .fadeIn('slow', function() {
            // Wait GREET_INTERVAL milliseconds an then recursively greet again!
            setTimeout(function() {
               greet(people, (index + 1) % people.length);
            }, GREET_INTERVAL);
         });
      });
   } else if (people.length == 1) {
      // Only one person to greet
      $('#title')
      // Assign person
      .html('Hello, <span style="border-bottom: 8px dashed #2E2E2E">' + people[index].name + '</span>!')
      // Fade in new greeting
      .fadeIn('slow', function() {
         // Wait GREET_INTERVAL milliseconds an then recursively greet again!
         setTimeout(function() {
            greet(people, (index + 1) % people.length);
         }, GREET_INTERVAL);
      });
   }
}

// Use jQuery's document ready. See: http://api.jquery.com/ready/
$(function() {
   // This is the array which will hold the currently present people.
   var people = [];

   // Let's create our splash screen controller
   var splash = new IP.UI.SplashScreen({
      // The minimum amount of time that the splash screen should run
      minTime : 1500,
      // onStart will run when we later call splash.start()
      onStart : function() {
         // Fade in the splash screen div
         $('.splash').hide().fadeIn('slow', function() {
            // Pulse animation for the little dot
            $('.splash .circle').css({
               opacity : 1
            }).pulse({
               opacity : 0.1
            }, {
               duration : 2250,
               pulses : -1
            });
         });
      },
      // onEnd will run whenever the splash screen ends
      onEnd : function() {
         // Let's fade out the splash screen div...
         $('.splash').fadeOut('slow', function() {
            // ...stop the pulsing effect...
            $('.splash .circle').stop().css({
               opacity : 1
            });
            // and fade in the content div.
            $('.content').fadeIn('slow', function() {
               if (people.length == 0)
                  $('#title').fadeIn('slow');
               else
                  greet(people, 0);
            });
         });
      }
   });
   // Run splash screen
   splash.start();

    var placeId = urlParams['placeId'];
    
   // Provide a custom global error callback
   IP.API.onerror = function() {
      // dot turns red
      $('.splash .circle').css('background-color', '#ff3333');
      // Let's mask the error
      $('#title').text('Hi everyone! :)');
      // We can now tell the splash screen that we're ready.
      splash.ready();
   };

   // Let's see if we have a placeId
   if(placeId == undefined){
   	// No placeId parameter provided. This is an unknown place!
      $('#title').html('Hello, <u>unknown</u> place! :)');
      // We can now tell the splash screen that we're ready.
      splash.ready();
   }
   else{
      // While the splash screen is running, let's fetch some data with IP.API!
      IP.API.Places.get(placeId, function(place) {
         // The place was retrieved!
         // Let's get the place's OPENED sessions now.
         place.getSituatedIdentities({
            since : 'now'
         }, function(situatedIdts) {
            if (situatedIdts.length == 0) {
               // No one is here
               $('#title').text('There isn\'t anyone here. :(');
            } else {
               // Let's iterate the present situated identities
               situatedIdts.forEach(function(sIdt, index) {
                  // Add the name to a local array for later retrieval
                  people.push({
                     name : sIdt.attrs.name
                  });
               });
            }
            // We can now tell the splash screen that we're ready.
            splash.ready();
         });
      });
   }
});
