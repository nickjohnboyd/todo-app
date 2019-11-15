function addList(event, listName) {
    switch(event.which) {
        case 13:
            $(".add-list-modal").modal('hide');
            if(listName == "") {
                break;
            }
            myLists.add(listName);
            $(".add-list").val("");
            saveLists();
            printPage();
            setTimeout(function(){
                $(".add-item").focus();
            }, 400)
            break;
    }
}

function addListFocus() {
    setTimeout(function(){
        $(".add-list").focus();
    }, 500)
}

function addItem(event, itemName, i) {
    switch(event.which) {
        case 13:
            if(itemName == "") {
                break;
            }
            myLists.collection[i].add(itemName);
            $(".add-item").val("");
            saveLists();
            printPage();
            $("#list" + i).find(".add-item").focus();
            break;
    }
}

function nameToInput(i, j) {
    let itemNameCont = $("#list" + i + "item" + j).find(".item-name-cont");
    itemNameCont.html("");
    itemNameCont.append(`
        <input type="text" class="new-item-name" onkeyup="editItem(event, this.value, ${i}, ${j})">
    `);
    $("#list" + i + "item" + j).find(".new-item-name").focus();

}

function editItem(event, itemName, i, j) {
    switch(event.which) {
        case 13:
            if(itemName != "") {
                myLists.collection[i].collection[j].name = itemName;
            }
            let itemNameCont = $("#list" + i + "item" + j).find(".item-name-cont");
            itemNameCont.html("");
            itemNameCont.append(`
                <div class="item-name">${itemName}</div>
            `);          
            saveLists();
            printPage();
            break;
    }
}


function saveLists() {
    let stringMyLists = JSON.stringify(myLists);
    localStorage.setItem("myLists", stringMyLists);
}

function getLists() {
    let stringMyLists = localStorage.getItem("myLists");
    let myStoredLists = JSON.parse(stringMyLists);

    if(myStoredLists == null) {
        return;
    }
    myLists = new ListCollection();
    for(let i = 0; i < myStoredLists.collection.length; i++) {
        let theList = myStoredLists.collection[i];
        myLists.add(theList.name);

        for(let j = 0; j < theList.collection.length; j++) {
            let theItem = theList.collection[j];
            myLists.collection[i].add(theItem.name);
        }

        for(let g = 0; g < theList.completedItems.length; g++) {
            let theItem = theList.completedItems[g];
            myLists.collection[i].addCompleted(theItem);
        }
    }
    return myLists;
}


function delList(list) {
    for(let i = 0; i < myLists.collection.length; i++) {
        if (i == list) {
            $("#list" + i).slideUp("1000");
            myLists.collection.splice(list, 1);
        }
    }
    setTimeout(function(){
        saveLists();
        printPage();
    }, 500);
}

function delItem(list, item) {
    for(let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        if(i == list) {
            for(let j = 0; j < theList.collection.length; j++) {
                if(j == item) {
                    $("#list" + i + "item" + j).css("background-color", "#ff4545");
                    $("#list" + i + "item" + j).slideUp("1000");
                    theList.collection.splice(item, 1);
                }
            }
        }
    }
    setTimeout(function(){
        saveLists();
        printPage();
    }, 500);
}


function addCompletedItems(list, item) {
    for(let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        if(i == list) {
            for(let j = 0; j < theList.collection.length; j++) {
                if(j == item) {
                    $("#list" + i + "item" + j).css("background-color", "#4ef542");
                    $("#list" + i + "item" + j).find(".new-item-name").css("background-color", "#4ef542");
                    $("#list" + i + "item" + j).slideUp("1000");
                    let completedItem = theList.collection.splice(item, 1);
                    theList.addCompleted(completedItem[0]);
                }
            }
        }
    }
    setTimeout(function(){
        saveLists();
        printPage();
    }, 500);
}

function delCompletedItems(list) {
    for(let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        if(i == list) {
            theList.completedItems = [];
            $("#list" + i).find(".completed").slideUp("1000");
        }
    }
    setTimeout(function(){
        saveLists();
        printPage();
    }, 500);
}

function moveCompletedItem(list, item) {
    for(let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        if(i == list) {
            for(let j = 0; j < theList.completedItems.length; j++) {
                if(j == item) {
                    $("#completed-list" + i + "item" + j).css("background-color", "#ffc107");
                    $("#completed-list" + i + "item" + j).slideUp("1000");
                    let completedItem = theList.completedItems.splice(item, 1);
                    theList.moveCompleted(completedItem[0]);
                }
            }
        }
    }
    setTimeout(function(){
        saveLists();
        printPage();
    }, 500);
}

function delOneCompletedItem(list, item) {
    for(let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        if(i == list) {
            for(let j = 0; j < theList.completedItems.length; j++) {
                if(j == item) {
                    $("#completed-list" + i + "item" + j).css("background-color", "#ff4545");
                    $("#completed-list" + i + "item" + j).slideUp("1000");
                    theList.completedItems.splice(item, 1);
                }
            }
        }
    }
    setTimeout(function(){
        saveLists();
        printPage();
    }, 500);
}


function printPage() {
    getLists();
    $(".all-lists").html("");

    if(myLists.collection.length == 0) {
        let startInfo = `
            <div class="start-info">Welcome to Minimalist Todo.</div>
            <div class="start-info">Press the add button to begin with your first list.</div>
        `;
        $(".start-cont").append(startInfo);
    } else {
        $(".start-cont").remove();
    }

    for (let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        let listItems = "";
        let completed = "";
        let removeCompleted = "";
        theList.id = `list${i}`;

        for (let j = 0; j < theList.collection.length; j++) {
            let theItem = theList.collection[j];
            let itemName = theItem.name;
            theItem.id = `list${i}item${j}`;
            listItems += `
                <div class="item" id="${theItem.id}">
                    <div class="item-start">
                        <i class="far fa-square" onclick="addCompletedItems(${i}, ${j})"></i>
                        <div class="item-name-cont" onclick="nameToInput(${i}, ${j})">
                            <div class="item-name uncompleted">${itemName}</div>
                        </div>
                    </div>
                    <i class="fas fa-minus" onclick="delItem(${i}, ${j})"></i>
                </div>
            `;
        }

        for (let g = 0; g < theList.completedItems.length; g++) {
            let theItem = theList.completedItems[g];
            let itemName = theItem.name;
            theItem.id = `completed-list${i}item${g}`;
            completed += `
                <div class="item checked-off" id="${theItem.id}">
                    <div class="item-start">
                        <i class="far fa-check-square" onclick="moveCompletedItem(${i}, ${g})"></i>
                        <div class="item-name">${itemName}</div>
                    </div>
                    <i class="fas fa-minus" onclick="delOneCompletedItem(${i}, ${g})"></i>
                </div>
            `;
        }

        if(theList.completedItems.length > 0) {
            removeCompleted += `
                <button type="button" class="rm-completed-btn" onclick="delCompletedItems(${i})">
                    Clear Completed
                </button>
            `;
        }

        $(".all-lists").append(`
            <div class="row justify-content-center">
                <div class="col-11 list" id="${theList.id}">
                    <div class="del-list">
                        <i class="fas fa-times" onclick="delList(${i})"></i>
                    </div>               
                    <div class="list-title">
                        <div class="list-name" contenteditable="false">${theList.name}</div>
                    </div>
                    <div class="item-cont">
                        <div class="add-item-cont">
                            <input type="text" class="add-item" onkeyup="addItem(event, this.value, ${i})">
                        </div>
                        <div class="all-items">
                            <div class="items-todo">
                                ${listItems}
                            </div>
                            <div class="completed">
                                <div class="items-completed">
                                    ${completed}
                                </div>
                                <div class="remove-completed">${removeCompleted}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}


// function btnToInput() {
//     // setTimeout(function() {
//         let btnCont = $(".add-list-btn-cont");
//         btnCont.html("");
//         btnCont.append(`
//             <input type="text" class="add-list" onkeyup="addList(event, this.value)">
//         `);
//         $(".add-list").focus();
//     // }, 200)
// }