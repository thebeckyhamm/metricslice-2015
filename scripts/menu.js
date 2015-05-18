$(document).ready(function() {
        var $menulink = $('.menu-link'),
        $aside = $('.aside'),
        $menuExit = $('.menu-exit');
        
        $menulink.click(function(e) { 
            e.preventDefault();  
            $menulink.toggleClass('active');
            $aside.toggleClass('active');
        });

        $menuExit.click(function(e) {
            e.preventDefault();
            $menulink.toggleClass('active');
            $aside.toggleClass('active');
        });
        
});