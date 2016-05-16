(function(){
    "use strict";
    var sourdine = document.querySelector('#sourdineCheckBox');
    var audio = document.querySelector('video'); 
    var sourdineTitle = document.querySelector('.sourdine');
    //initMenu();
    initAudio();

    sourdine.addEventListener('click', function sourdine(){
        if(sourdineCheckBox.checked){
            audio.pause();
            sourdineTitle.title = "Desactivez la sourdine";
            localStorage.sourdine = true;
        }
        else{
            audio.load();
            audio.play();
            sourdineTitle.title = "Activez la sourdine";
            localStorage.sourdine = false;
        }
    });

    var getTemplateScript = $("#projets").html();
    var templateScript = Handlebars.compile(getTemplateScript);

    $.getJSON("projets.json").done(function(jsonData){
        var compiledHtml = templateScript(jsonData);
        $(document).find('ul').append(compiledHtml);

    }).fail(function(){
        console.log("Erreur lors du chargement du fichier projets.")
    });
    // var context = {
    //     projets: [
    //         {
    //             nom: "Langues",
    //             dir: "langues",
    //             desc: "Pratique de l'utilisation des sélecteurs et de la mise en page avec CSS3",
    //             sujets: ["CSS3", "HTML5", "Sélecteurs"]
    //         },
    //         {
    //             nom: "Pens",
    //             dir: "pens",
    //             desc: "Exercises que j'ai fait sur CodePen"
    //         },
    //         {
    //             nom: "Youtube",
    //             dir: "youtube"
    //         },
    //         {
    //             nom: "Tutoriel",
    //             dir: "tutoriel"
    //         },
    //         {
    //             nom: "Todo",
    //             dir: "todo",
    //             desc: "Application de todo fait en javascript"
    //         },
    //         {
    //             nom: "Todo",
    //             dir: "todo",
    //             desc: "Application de todo fait en javascript",
    //             color: "classique",
    //             param: "?skin="
    //         },
    //         {
    //             nom: "Todo",
    //             dir: "todo",
    //             desc: "Application de todo fait en javascript",
    //             color: "blue",
    //             param: "?skin=blue-on-orange"
    //         },
    //         {
    //             nom: "Todo",
    //             dir: "todo",
    //             desc: "Application de todo fait en javascript",
    //             color: "orange",
    //             param: "?skin=orange-on-blue"
    //         }
    //     ]
    // };

    // var compiledHtml = templateScript(context);
    // $(document).find('ul').append(compiledHtml);

    // function initMenu(){
    //
    //     var projets = [
    //         {
    //             nom: "Langues",
    //             dir: "langues"
    //         },
    //         {
    //             nom: "Pens",
    //             dir: "pens"
    //         },
    //         {
    //             nom: "Youtube",
    //             dir: "youtube"
    //         },
    //         {
    //             nom: "Tutoriel",
    //             dir: "tutoriel"
    //         },
    //         {
    //             nom: "Todo",
    //             dir: "todo"
    //         }
    //
    //     ]
    //
    //     var ul = document.querySelector('ul');
    //     projets.forEach( function (element)
    //     {
    //         var li = document.createElement('li');
    //         li.innerHTML = "<a href = \"../"+element['dir']+"/index.html\">"+element['nom']+"</a>"
    //         ul.appendChild(li);
    //     });
    // }
    
    function initAudio(){
        if(localStorage.sourdine === "true"){
            sourdineCheckBox.checked = true;
            sourdineTitle.title = "Desactivez la sourdine";
        }
        else{
            audio.play();
        }
    }
})();