---
layout: post
title:  "The Beginner Front-End Dev's Guide to Troubleshooting Your Code"
date:   2014-06-14 15:00  
categories: beginners   

---

Troubleshooting code is an art form.  For people new to the realm of design or front-end development, the process can be extremely frustrating.  Many are convinced their more experienced brethren know some form of black magic that allows them to solve the mysteries of a missing element, a transition-less button, or a non-popping pop-up.

Welcome to the joys of front-end development!

Having not found a great guide for front-end troubleshooting on the web, I created a presentation for my students on the subject a few months ago.  This is that presentation in blog form.   


#### Note

This process is for beginners and focuses mostly on HTML and CSS.  Seasoned devs may scoff, but remember you were once there too!



### Step 1: Open your Developer Tools

Other than a [great text editor](http://www.sublimetext.com/), Developer Tools is the single greatest weapon in your web arsenal.  It contains HTML markup, CSS styles, source files that the browser is using, performance charts, a JavaScript console, and much more.


Here's how to access this mystical land:

- **Chrome**: Menu > Tools > Developer Tools (Macs: Cmd + Option + I,  Windows: Ctrl + Shift + I)
- **Firefox**: Menu > Developer > Inspector (Macs: Cmd + Option + I,  Windows: Ctrl + Shift + I)
- **Safari**: File > Preferences > Advanced > "Show Develop menu in menu bar", then Develop > Show Web Inspector (Cmd + Option + I)
- **IE11**: Gear Icon > F12 Developer Tools (F12)


We won't dive into all of the functions of DevTools today, but I do highly recommend you take the [Discover DevTools course](http://discover-devtools.codeschool.com/) from CodeSchool to get you started.  It is free dollars so there's no reason you shouldn't partake.

From here on out, we'll be using Chrome's DevTools for examples, so leave that panel open.  We'll also do one last thing before we move on: disable your cache when DevTools is open.

**In the DevTools pane, click the gear icon, and under General settings, check "Disable cache (while DevTools is open)".**

Vamanos!

###Step 2: Save your work

"Well duh", you may say. But it happens all the time. Moving on...



###Step 3: Refresh the page

Then refresh it again.  Then do a hard refresh:

- **Mac**: Cmd + Shift + R
- **Windows**: F5

At this point, if you still have a problem, it looks like it isn't a matter of the code getting to the web.  Therefore, we start troubleshooting in earnest.


###Step 4: Check for console errors

If you have an error, there's a little red circle with a number in it at the top right of the DevTools panel. Click that circle and the Console panel will pop up.

Read what the error says. Here are two of the most common error I see with beginners:


	ERR_FILE_NOT_FOUND

This usually means that you didn't enter the file path for the asset (image, js, etc.) correctly.  Go back to your HTML or CSS and make sure you're telling the browser exactly where that asset is.

 If you get something like: 

	$ is undefined

this means you forgot to load jQuery, or loaded it *after* you tried it use it.

There are plenty of other errors that can show up in the console. Skip to Step 6 to figure out how to resolve those.

If you don't have any console errors, let's keep going.





###Step 5: Using DevTools, find the element that isn't doing what it should be doing.

You can hover over the element, then right click > "Inspect element", or find the element in the Elements panel of DevTools by clicking on those little gray arrows.

####5a: Is the element missing?

This usually means that you did not close the element's tag or you missed a quotation mark somewhere.  Make sure you've got both an opening and closing tag for non-self-closing elements.

####5b: Is the style not being applied?

Look for the particular property that is incorrect in the CSS pane on the right.  If it is crossed out with a warning sign next to it, then:

1. it cannot be applied to this type of element, 

2. it is specific to another type of browser (like vendor prefixes), or 

3. (and most likely, let's face it) you misspelled it or tried to use a value that doesn't exist. Don't be too hard on yourself, I can't remember the syntax for transforms either.

 ![CSS style with warning]({{site_url}}/images/css-warning.png)

 If your CSS style is just crossed out with no warning symbol, then it is being overridden by another CSS rule.  Scroll down the CSS pane to see what other selector is taking precedence. You'll have to add to or edit your selectors in order apply that particular style. 


  ![CSS style crossed out]({{site_url}}/images/css-crossed-out.png)

(Side note: this is one reason why you should [avoid using id's](http://screwlewse.com/2010/07/dont-use-id-selectors-in-css/) and `!important`s in your CSS.  Read more about CSS specificity [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) and [here](http://cssspecificity.com/).)


###Step 6: Manually clear your cache

Clear your cache manually.  This shouldn't be a problem if you've already disabled the cache with DevTools open, but just to be sure, visit menu > Tools > Clear Browsing Data and clear what you need to clear.


###Step 7: Start Googling

It's every front-end dev's go-to resource.  You will quickly realize that some sites like [stackoverflow](http://stackoverflow.com/), [CSS Tricks](http://css-tricks.com/), and [MDN](https://developer.mozilla.org/en-US/) will be your new BFFs.  

If you've got an error in the console, type that error into the search bar verbatim.  Google can almost guarantee you that you aren't the only person who has had this problem before.

###Step 8: Take a break 

With or without a [KitKat bar](https://www.youtube.com/watch?v=DLJgyr-g3Ck), give yourself a break from your screen. Take a walk outside, drink a beer, pet your cat, take a few deep breaths.  Getting away from your problem for a bit aids in both sanity and productivity.

###Step 9: Phone a friend / Ask an instructor

Still stuck?  Shoot your friend or instructor an email.  Post a question on stackoverflow (but only if you've already googled the crap out of your problem. People want to help, but they [ain't got time](http://imgur.com/gallery/kFJVH) for lazy googlers.)

###Step 10: Cry

Just let it all out.


###Step 11: Start over tomorrow

Seriously, call it a night, get that beauty sleep, and start over in the morning.  You'll see things differently.  

###You know what the good news is?

In front-end development, there's more than one way to skin a cat. If you can't get something to work, try a different approach. 





***

Do you guys have any other suggestions for effective troubleshooting?





