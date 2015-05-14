---
layout: post
title:  "Flyouts, Panels, Off-Canvas Content: Revisiting a Not-So-New Pattern"
date:   2014-05-15 11:00 
categories: UI  

---

I've been working on some complex web applications recently that require a lot of user input, including a credit card payment application and an energy monitoring application.  Since reducing the amount of user input isn't an option (though it would be nice), we began utilizing the flyout (also called a side panel, off-canvas content pattern, aside, etc.) to better help our users complete tasks and view related information.

<br />

####We Didn't Start with Flyouts* 

Flyouts are not commonly seen at this point in web applications, but they're starting to pop up (pardon the pun) more and more.  They are already used heavily in native apps, and are sometimes used for navigational elements on websites, but the extra depth that the flyout offers only recently came to my attention in this [Medium article](https://medium.com/design-ux/bc190d62eff5).

This was a mind-blowing find for me.  Up to this point, I had used all of the old UI tricks: accordions, tabs, modals, etc. - but in my projects I felt like the user's path was still not very clear.  Accordions required lots of scrolling, a modal can sometimes feel intrusive, and I wasn't very happy with the end result.  For complex processes like expense management, my design worked, but I wasn't happy with it.

So I did some more digging into this new/old design pattern.

[Mikkel Bo Schmidt](https://twitter.com/mibosc) also has a great writeup on [filtering on small screens](https://medium.com/mobile-first-responsive-design/bbd6c04f09e1), and [Wren Lanier](https://twitter.com/heywren) wrote about further possibilities in [this A List Apart article](http://alistapart.com/article/the-z-axis-designing-for-the-future).

<br />
####Initial Results

Well, the clients loved it!  They thought it made the process much clearer, instead of the previous endless seas of accordions.  My back-end developer coworkers were not quite as thrilled to partially recode a few pages, but I keep bringing them food offerings to win them back over.

<br />
####Roll Your Own Flyout...

The best way to describe is to show.  Here's my CodePen on the subject.

<p data-height="374" data-theme-id="0" data-slug-hash="jKypi" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/thebeckyhamm/pen/jKypi/'>Flyout Panel</a> by Becky Hamm (<a href='http://codepen.io/thebeckyhamm'>@thebeckyhamm</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
<br>
The flyout element is positioned off the page with the `transform: translate3d()` property.  

If you need to support olderish browsers, you'll also need to set some `overflow-y: scroll` or `overflow-y: auto` to the flyout in order to scroll within it.  This sucks sometimes because you'll see a double scroll bar.  If you are a lucky SOB who can use flexbox, set the flyout element to `display: flex; flex-direction: column;`.  Only the body text of the flyout will scroll in this case.

<br>



Warning, Warning! Watch out for these:

1. Shit gets weird when you are positioning other items on your page `absolute`ly or `relative`ly.  I keep my flyouts at the top of my code so it is always positioned relative to my wrapper or body.
2. The parent element of the flyout should also have `overflow: hidden;` or else you can get some weird widths greater than 100%.


<br />

####...Or Make It Easy on Yourself

 If you're using Angular, [AngularStrap](http://mgcrea.github.io/angular-strap/##asides) has an "aside" directive.  Pretty sweet!  The only headache is dealing with pesky ol' Bootstrap.  Sigh.


 



<br>
####What We're Using It For
Much like [Mikkel's article](https://medium.com/design-ux/bc190d62eff5), one use of our flyouts is to guide the user through a process (note that all of these graphics are mockups in various states of completion).

In this first example, the user adds expenses to a report:
<div class="text-center">
![adding expenses]({{site_url}}/images/expense-management2.gif)
</div>

The use of buttons instead of a dropdown make the process quicker for a user on a small device.

The next example is editing details for an expense transaction:
<div class="text-center">
![editing and splitting a transaction]({{site_url}}/images/transaction-edit2.gif)
</div>
The flyout makes a more logical process for splitting transactions and editing amounts or categories as needed.

<br>
####Compatibility

This pattern isn't going to work for everyone because it requires JavaScript.  If you come up with an all-CSS version let me know! 

<br>
###Flyouts in the Wild
Since these came to my attention, I've started seeing flyouts more often.

Kayak uses them for their iPad and iPhone web users.  Here is their badass datepicker (I am terribly jealous):

![Kayak's Awesome Datepicker]({{site_url}}/images/kayak-flyout-calendar.jpg)

And here's how they utilize a flyout for hotel detail data:

![Kayak's Hotel Detail]({{site_url}}/images/kayak-flyout-detail.jpg)

Google also uses a flyout for date functionality in their Google Photos service:

![Google Photos Flyout]({{site_url}}/images/google-photos-flyout.jpg)


<small>*(reminds me of [this song](https://www.youtube.com/watch?v=eFTLKWw542g&feature=kp))</small>

***

So what do you guys think of this design pattern?  And where else have you seen it used on the web?




