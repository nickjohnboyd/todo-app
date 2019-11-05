function addList(event, listName) {
    switch(event.which) {
        case 13: 
            myLists.add(listName);
            $(".add-list").val("");
            printPage();
            $(".add-item").focus();
            break;
    }
}

function addItem(event, itemName, i) {
    switch(event.which) {
        case 13:
            myLists.collection[i].add(itemName);
            $(".add-item").val("");
            printPage();
            $(".add-item").focus();
            break;
    }
}

function delList() { 

}

function delItem() {

}

function printPage() {
    $(".list-group").html("");
    $(".items").html("");
    for (let i = 0; i < myLists.collection.length; i++) {
        let theList = myLists.collection[i];
        let listItems = "";

        for (let j = 0; j < theList.collection.length; j++) {
            let itemName = theList.collection[j].name;
            listItems += `
                <div class="item">
                    <div class="item-name" contenteditable="true" onclick="">${itemName}</div>
                    <i class="fas fa-minus"></i>
                </div>
            `;
        }

        $(".list-group").append(`
            <div class="list">
                <div class="list-name" contenteditable="true" onclick="">${theList.name}</div>
            </div>
        `);

        $(".items").append(`
            <div class="new-item">
                <input type="text" class="add-item" onkeyup="addItem(event, this.value, ${i})">
            </div>
            <div class="item-group">
                ${listItems}
            </div>
        `);   
    }
}