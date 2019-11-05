class ListCollection {
    constructor() {
        this.collection = [];   
    }
    add(listName) {
        this.collection.push(new List(listName));
    }
}

class List {
    constructor(name) {
        this.collection = [];
        this.name = name;
    }
    add(name, id) {
        this.collection.push(new ListItem(name, id));
    }
}

class ListItem {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}


let myLists = new ListCollection();