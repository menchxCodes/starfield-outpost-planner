class Todo {
  constructor() {
    this.all = [];
  }

  findByName(name) {
    return this.all.find((item) => item.item.name === name);
  }

  save() {
    localStorage.setItem("localTodo", JSON.stringify(this.all));
  }

  addToList(craft, quantity = 1) {
    const item = this.findByName(craft.name);

    if (item) {
      item.amount += 1 * quantity;
    } else {
      const obj = {};
      obj.item = craft;
      obj.amount = 1 * quantity;
      this.all.unshift(obj);
    }
    this.save();
  }

  deleteItemByName(itemName) {
    const item = this.findByName(itemName);

    this.all.splice(this.all.indexOf(item), 1);
    this.save();
  }

  deleteItem(item) {
    this.all.splice(this.all.indexOf(item), 1);
    this.save();
  }

  increaseQuantity(craft, quantity = 1) {
    const item = this.findByName(craft);
    item.amount += 1 * quantity;
    // console.log(craft, item);
    this.save();
  }

  decreaseQuantity(craft, quantity = 1) {
    const item = this.findByName(craft);
    if (item.amount >= 2) {
      item.amount -= 1 * quantity;
      this.save();
    } else {
    }
  }

  clearList() {
    this.all = [];
    this.save();
  }
}

const todo = new Todo();

export { todo };
