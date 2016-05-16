(function() {
    "use strict";
    var monTitre = document.querySelector('h1');
    monTitre.textContent = 'Allo Adrian!';

    var monImage = document.querySelector('img');

    monImage.onclick = function(){

    var maSrc = monImage.getAttribute('src');
    if(maSrc === 'images/firefox-icon.png'){

        monImage.setAttribute('src', 'images/firefox2.png');
    }
    else{

        monImage.setAttribute('src', 'images/firefox-icon.png');
    }
    }

    var monBouton = document.querySelector('button');

    function definirNomUtilisateur(){

        var monNom = prompt('Veuillez saisir votre nom:').trim();
        if(!monNom){
            monNom = 'Inconnu';
        }
        localStorage.nom = monNom;
        monTitre.textContent = 'Mozilla est cool, ' + monNom;
    }

    if(!localStorage.nom){
        
        definirNomUtilisateur();
    }
    else{

        var nomEnregistre = localStorage.getItem('nom');
        monTitre.textContent = 'Mozilla est cool, ' + nomEnregistre.trim();
    }

    monBouton.onclick = function(){
            
        definirNomUtilisateur();
    }
}) ();