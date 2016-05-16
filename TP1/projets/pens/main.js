(function(){
    "use strict";

    var idPens = [
        "YqRZYJ",
        "vGQxpQ",
        "RaqpxE",
        "QNvaYr",
        "PNmjJM"
    ];

    var pensContainer = document.querySelector(".pens-container")
    var template = pensContainer.firstElementChild;
    pensContainer.innerHTML = "";
    for(var i = 0; i < idPens.length; i++){
        var clone = template.cloneNode(true);
        clone.querySelector('p').setAttribute("data-slug-hash", idPens[i]);
        pensContainer.appendChild(clone);
    }
})();