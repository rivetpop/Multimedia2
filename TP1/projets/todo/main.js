(function () {
    "use strict";

    var templateArticle = document.querySelector("template").content.firstElementChild;
    var inputUser = document.querySelector('input');
    var todolist = document.querySelector('#todolist');
    var donelist = document.querySelector('#donelist');
    var allDoneButton = document.querySelector('#allDoneButton');
    var deleteDoneButton = document.querySelector('#deleteDoneButton');
    var skinSelect = document.querySelector("#skinSelector");
    var root = document.querySelector(":root");

    allDoneButton.onclick = allDoneTodo;
    deleteDoneButton.onclick = deleteDoneTodo;
    dataLoaded();
    buttonDisabledManager();
    dataUpdated();
    skinLoad();
    loadQuery();

    function skinLoad(){
        if(localStorage.skin !== undefined){
            if(localStorage.skin == "blue-on-orange"){
                root.classList.add("blue-on-orange");
                skinSelect.selectedIndex = 1;
            }
            else if(localStorage.skin == "orange-on-blue"){
                root.classList.add("orange-on-blue");
                skinSelect.selectedIndex = 2;
            }
        }
    }

    skinSelect.onchange = skinSwitch;

    function skinSwitch(){
        if(skinSelect.selectedIndex === 0){
            root.classList.remove("blue-on-orange");
            root.classList.remove("orange-on-blue");
            localStorage.skin = "";
        }
        if(skinSelect.selectedIndex === 1){
            root.classList.add("blue-on-orange");
            root.classList.remove("orange-on-blue");
            localStorage.skin = "blue-on-orange";
        }
        if(skinSelect.selectedIndex === 2){
            root.classList.add("orange-on-blue");
            root.classList.remove("blue-on-orange");
            localStorage.skin = "orange-on-blue";
        }
    }

    function loadQuery(){
        var queryString = location.search;
        var cleValeur = parseQueryString(queryString);
        if(cleValeur.skin === ""){
            skinSelect.selectedIndex = 0;
            skinSwitch();
        }
        if(cleValeur.skin === "blue-on-orange"){
            skinSelect.selectedIndex = 1;
            skinSwitch();
        }
        if(cleValeur.skin === "orange-on-blue"){
            skinSelect.selectedIndex = 2;
            skinSwitch();
        }
    }



    function parseQueryString(qstr)
    {
        var query = {};
        var parameters = qstr.substr(1).split('&');
        for (var i=0; i<parameters.length; i++)
        {
            var keyAndValue = parameters[i].split('=');
            var key = decodeURIComponent(keyAndValue[0]);
            var value = decodeURIComponent(keyAndValue[1] || '');
            query[key] = value;
        }
        return query;
    }

    // ajouterTodo("Faire cuire la visite");
    // ajouterTodo("Manger de la litière");
    // ajouterTodo("Licher son coude");

    inputUser.onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
            if(inputUser.value.trim() !== ""){
                ajouterTodo(inputUser.value);
                inputUser.value = "";
            }
        }
    }

    function ajouterTodo(todoTexte){
        // var article = document.createElement('article');
        //
        // var checkbox = document.createElement('input');
        // checkbox.type = "checkbox";
        // checkbox.className = "checkbox";
        // article.appendChild(checkbox);
        //
        // var div = document.createElement('div');
        // div.className =  "text";
        // div.tabIndex = "0";
        // div.contentEditable = "true";
        // var texte = document.createTextNode(todoTexte);
        // div.appendChild(texte);
        // article.appendChild(div);
        //
        // var img = document.createElement('img');
        // img.src = "../../images/delete64.png";
        // img.alt = "delete";
        // img.tabIndex = "0";
        // article.appendChild(img);

        var clone = templateArticle.cloneNode(true);
        clone.querySelector('.text').textContent = todoTexte;

        todolist.insertBefore(clone, todolist.firstChild);
        var img = clone.querySelector('img');
        img.onclick = deleteTodo;
        img.onkeypress = deleteTodoEnter;
        var div = clone.querySelector('div');
        div.onkeypress = setFocusToInput;
        div.onblur = function(){
            dataUpdated();
        };
        var checkbox = clone.querySelector('input');
        checkbox.onchange = todoChecked;
        checkbox.onkeypress = checkCheckBoxEnter;


        buttonDisabledManager();

    }

    function deleteTodo(){
        this.parentNode.outerHTML = "";
        buttonDisabledManager();
        dataUpdated();
    }

    function deleteTodoEnter(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13' || keyCode == '32'){
            this.click();
        }
    }

    function setFocusToInput(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13' || keyCode == '32'){
            inputUser.focus();
        }
    }

    function todoChecked(){
        if(this.checked){
            donelist.insertBefore(this.parentNode, donelist.firstChild);
            this.focus()
        }
        else{
            todolist.appendChild(this.parentNode);
            this.focus();
        }
        buttonDisabledManager();
        dataUpdated();
    }

    function checkCheckBoxEnter(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13' || keyCode == '32'){
            this.click();
        }
    }

    function allDoneTodo(){
        while(todolist.hasChildNodes()){
            todolist.firstChild.querySelector(".checkbox").click();
        }
        buttonDisabledManager();
        dataUpdated();
    }

    function deleteDoneTodo(){
        while(donelist.hasChildNodes()){
            donelist.firstChild.querySelector("img").click();
        }
        buttonDisabledManager();
        dataUpdated();
    }

    function buttonDisabledManager(){

        allDoneButton.disabled = false;
        deleteDoneButton.disabled = false;

        if(!todolist.hasChildNodes()){
            allDoneButton.disabled = true;
        }

        if(!donelist.hasChildNodes()){
            deleteDoneButton.disabled = true;
        }
    }

    function dataUpdated(){
        var todosText = [];
        var doneTodosText = [];

        var allTodos = todolist.querySelectorAll('article');
        for(var i = 0; i < allTodos.length; i++){
            var inputTodoText = allTodos[i].querySelector('.text').textContent;
            todosText.push(inputTodoText);
        }

        var allDoneTodos = donelist.querySelectorAll('article');
        for(var j = 0; j < allDoneTodos.length; j++){
            var inputDoneTodoText = allDoneTodos[j].querySelector('.text').textContent;
            doneTodosText.push(inputDoneTodoText);
        }

        localStorage.todos = JSON.stringify(todosText);
        localStorage.doneTodos = JSON.stringify(doneTodosText);
    }

    function dataLoaded(){

        if(localStorage.todos !== undefined){
            var jsonTodos = JSON.parse(localStorage.todos);
            if(jsonTodos){
                for(var i = 0; i < jsonTodos.length; i++){
                    ajouterTodo(jsonTodos[i]);
                }
            }
        }
        if(localStorage.doneTodos !== undefined) {
            var jsonDoneTodos = JSON.parse(localStorage.doneTodos);
            if (jsonDoneTodos) {
                for (var j = 0; j < jsonDoneTodos.length; j++) {
                    ajouterTodo(jsonDoneTodos[j]);
                    todolist.firstChild.querySelector('.checkbox').click();
                }
            }
        }
    }
})();