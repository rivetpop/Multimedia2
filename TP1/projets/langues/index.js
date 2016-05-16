(function () {
    "use strict";

    var iframe = document.querySelector('iframe');
    var btnIframe = document.querySelector('.btnIframe');
    var btnPara = document.querySelector('.btnPara');
    var btnBoutons = document.querySelector('.btnBoutons');

    iframe.onload = function(){
        this.style.height = this.contentDocument.body.scrollHeight + 200 + 'px';
        initButtons();
    }

    window.onresize = function(){
        iframe.style.height = "initial";
        iframe.style.height = iframe.contentDocument.body.scrollHeight + 50 + 'px';
    }

    btnIframe.onclick = function(){
        $("iframe:first").fadeToggle("slow", "linear");
        $(".container:first").fadeToggle("slow", "linear");
    }

    btnPara.onclick = function(){
        var iframeRoot = iframe.contentDocument;
        var $p = $('p', iframeRoot);
        if($p.is(":hidden")){
            $p.show("slow");
        }else{
            $p.slideUp();
        }
    }

    btnBoutons.onclick = function(){
        var iframeRoot = iframe.contentDocument;
        var $articles = $(iframeRoot.querySelectorAll('article'));
        $articles.find('button').fadeToggle("slow");
    }

    function initButtons() {
        var iframeRoot = iframe.contentDocument;
        var $btn = $('<button>Basculer Affichage</button>');
        $btn.css({
            'position': 'absolute',
            'top': '5px',
            'right': '5px',
            'border-radius': '10px',
            'font-weight': 'bold',
            'width': '30%',
            'opacity': '0.50'
        });

        $btn.click(function() {
            $(this).parent().find('p, ol').toggle('slow');
        });

        $btn.hover(function () {
                $(this).stop();
                $(this).animate({opacity: '1'});
                $(this).css('color', 'red');
        },
            function () {
                $(this).stop();
                $(this).animate({opacity: '0.50'},
                    function () {
                        $(this).css('color', 'black');
                    })
            });


        $btn.hide();
        var $articles = $(iframeRoot.querySelectorAll('article'));
        $articles.css('position', 'relative');
        $articles.prepend($btn);
    }
})();