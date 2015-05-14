---
layout: post
title:  "Busting the CSS Cache in WordPress"
date:   2014-03-20 10:00   
categories: [WordPress, CSS]

---

I have been updating my class website's look and feel, so the site sometimes looks broken due to all of my CSS changes.  

Instead of telling everybody to refresh, I did some Googling to systematically remedy this problem and found this lovely little snippet over at [Gilbert Pellegrom's site](http://gilbert.pellegrom.me/cache-busting-wordpress-style-css/) that goes in the `functions.php` file.

{% highlight php %}  
	/* Enqueue main stylesheet */
	wp_register_style( 'style', get_template_directory_uri().'/style.css', array(), filemtime( get_template_directory().'/style.css' ) );
	wp_enqueue_style( 'style' );
{% endhighlight %}

Thanks, Gilbert!    


