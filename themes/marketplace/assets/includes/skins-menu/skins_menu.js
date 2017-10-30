
(function ($, Drupal) {

    Drupal.SkinsMenu = Drupal.SkinsMenu || {}

    Drupal.behaviors.skinMenuAction = {
        attach: function (context) {

            $(window).load(function() { 

                $('#change-skin').once('load').on('click', function(){
                    $('#change-skin i').toggleClass('spin');
                    $('#change_skin_menu_wrapper').toggleClass('fly-out');
                });


                $(".change-skin-button").click(Drupal.SkinsMenu.changeSkinHandle);

                $(".change-layout-button").on("click", Drupal.SkinsMenu.changeLayoutHandle);

                $(".change-background-button").on("click", Drupal.SkinsMenu.changeBackgroundHandle);

                Drupal.SkinsMenu.fixCacheBug();
                Drupal.SkinsMenu.fixCacheBugBackground();
            });


        }
        
    }


    Drupal.SkinsMenu.onClickResetDefaultSettings = function() {

        var answer = confirm(Drupal.t('Are you sure you want to reset your theme settings to default theme settings?'))
        if (answer){

            var base_path = drupalSettings.path.baseUrl;        
            $.cookie("weebpal_skin", 'default', {path: base_path});
            $.cookie("weebpal_layout", 'layout-default', {path: base_path});
            $.cookie("weebpal_background", 'bg-default', {path: base_path});
            return true;
        }
        return false;
    }

    Drupal.SkinsMenu.changeSkinHandle = function() {

        parts = this.href.split("/");
        style = parts[parts.length - 1];
        var base_path = drupalSettings.path.baseUrl;

        $.cookie("weebpal_skin", style, {path: base_path});
        window.location.reload();
        return true;
    }



    Drupal.SkinsMenu.changeLayoutHandle = function () {

        var layout_class = $(this).attr("id");
        //var layout_width = drupalSettings.layout_width;
        
        // For demo
        //var layout_width = 1200; 

        var layout_width = parseInt($.cookie("weebpal_layout_width"));
        if(!layout_width){
            layout_width = 1200;
        }

        var base_path = drupalSettings.path.baseUrl;

        $.cookie("weebpal_layout", layout_class, {path: base_path});

        $("#page").removeAttr("style");
        $("#page").removeClass("boxed");
        $(".background").addClass("hidden");
        var current_background = $.cookie("weebpal_background");
        $("body").removeClass(current_background);
        if (layout_class != "layout-default") {

            $("#page").css("max-width", layout_width);
            $("#page").css("margin", "0 auto");
            $("#page").addClass("boxed");
            $(".background").removeClass("hidden");
            $("body").addClass(current_background);
        }
        $(".change-layout-button").removeClass("active");
        if(!$(this).hasClass("active"))
            $(this).addClass("active");
        return true;
    }

   
    Drupal.SkinsMenu.changeBackgroundHandle = function () {

        parts = this.href.split("/");
        style = parts[parts.length - 1];
        var current_background = $.cookie("weebpal_background");
        var base_path = drupalSettings.path.baseUrl;

        $.cookie("weebpal_background", style, {path: base_path});
        $("body").removeClass(current_background);
        $("body").addClass(style);
        
        return true;
    }

    Drupal.SkinsMenu.fixCacheBug = function(){ 

        var cookieState = $.cookie("weebpal_layout");
        if(!cookieState)
            return;

        var currentState = $('#change_skin_menu_wrapper .layout .switch-btn > .active').attr('id');
        if (currentState == cookieState) {
            if (currentState == 'layout-boxed')
            {
                $('#change_skin_menu_wrapper .layout .switch-btn #layout-boxed').click();
            }
            return;
        }

        $('#'+cookieState).click();

        /*if (cookieState != "layout-default") {
            $("#page").addClass("boxed");
        }*/

    }


Drupal.SkinsMenu.fixCacheBugBackground = function(){ 

    if ($.cookie("weebpal_layout") == 'layout-boxed') {

     var cookieBackground = $.cookie("weebpal_background");
        if (!cookieBackground) 
            return;
        var currentBackground = $('#change_skin_menu_wrapper .background .change-background > .active').attr('class');

        console.log(currentBackground);

        if (currentBackground == cookieBackground)
            return;
       // $('.'+currentBackground).click();


       $('#change_skin_menu_wrapper .background .change-background').find('.'+currentBackground.substr(0,4) + ' a').click();
         $('#change_skin_menu_wrapper .background .change-background').find('.'+cookieBackground + ' a').click();
     }
}





})(jQuery, Drupal);



                  

                  
                  


                  





                  
