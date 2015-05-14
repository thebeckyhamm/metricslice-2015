---
layout: post
title:  "Color Gradations Using SASS Control Directives"
date:   2014-05-21 15:00  
categories: [SASS, CSS] 

---

I came across a problem recently where I wanted to gradually change the colors of a set of list items - but without assigning a class with a color to each one. Enter [SASS Control Directives](http://thesassway.com/intermediate/if-for-each-while) (I thought these were just called functions but apparently I was wrong).

My front-end development definition of control directives is: those ifs, whiles, eaches, and fors that you use in programming to (essentially) do a bunch of repetitive tasks that you don't feel like doing manually.

####How to Use the @While Loop

In the Codepen below, I use the `@while` directive to loop through a number of steps to assign each `li:nth-child()` a different background color.  This way I don't have to go and add a class to each `li` element!	

{% highlight SASS %}
$darken-color: #0046C5; // The color you want to use
$step: 1; // Set the initial step value

//The "<= #" determines the number of steps you want this while loop to create

@while $step <=10  {

// darkens color step by step
.darken li:nth-child(#{$step}) {
	// Here we use the SASS darken function and darken our color by 2% each time.  Set this to whatever percentage you like. 
	background-color: darken($darken-color, ($step * 2%));
}

// Increment the step up by 1 so it continues until you've reached 10 (which you specified at the beginning of the function)
$step: $step + 1;
}


{% endhighlight %}  

The output to your CSS looks like this:
{% highlight CSS %}

.darken li:nth-child(1) {
background-color: #0042bb;
}

.darken li:nth-child(2) {
background-color: #003fb1;
}

.darken li:nth-child(3) {
background-color: #003ba6;
}

.darken li:nth-child(4) {
background-color: #00389c;
}

.darken li:nth-child(5) {
background-color: #003492;
}

/* Etc etc */


{% endhighlight %}  

And you apply it to your HTML like this:

{% highlight HTML %}

<ul class="darken">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
	<li>Item 4</li>	
	<!--etc-->
<ul>

{% endhighlight %}  


Here is the Codepen, with examples using the darken, transparentize, adjust-hue, and mix SASS functions.

<p data-height="411" data-theme-id="0" data-slug-hash="szEyK" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/thebeckyhamm/pen/szEyK/'>SASS Color Gradations</a> by Becky Hamm (<a href='http://codepen.io/thebeckyhamm'>@thebeckyhamm</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<br />
Special thanks to [Jackie Balzer's site](http://jackiebalzer.com/color) for helping me greatly in understanding the syntax for the color functions.



***


Do you have other cool uses of SASS control directives?




