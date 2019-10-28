let mylists = new ListCollection();

function ListCollection() {
    this.collection = [];
    this.add = function(listName) {
        this.collection.push(new List(listName));
    }
}

function List(name) {
    this.collection = [];
    this.name = name;
    this.add = function(name, id) {
        this.collection.push(new ListItem(name, id));
    }
}

function ListItem(name, id) {
    this.name = name;
    this.id = id;
}