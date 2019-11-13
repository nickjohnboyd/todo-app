class ListCollection {
    constructor() {
        this.collection = [];   
    }
    add(listName, id) {
        this.collection.push(new List(listName, id));
    }
}

class List {
    constructor(name, id) {
        this.collection = [];
        this.name = name;
        this.id = id;
        this.display = "none";
        this.active = true;
    }
    add(name, id) {
        this.collection.push(new ListItem(name, id));
    }
    activate() {
        this.active = true;
    }
}

class ListItem {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}


let myLists = new ListCollection();