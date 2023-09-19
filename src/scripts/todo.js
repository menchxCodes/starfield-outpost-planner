import { recipes } from "./recipes";
import { resources } from "./resource";
import { compounds } from "./compounds";
import { exotics } from "./exotics";
import { uniques } from "./uniques";

class Todo {
  constructor() {
    this.all = [];
  }

  add(item, quantity) {
    const current = this.all.find(
      (listItem) => listItem.item.name === item.name
    );

    if (current !== undefined) {
      current.amount += quantity;
    } else {
      this.all.push({ item, amount: 1 * quantity });
    }
  }

  breakdown() {
    const output = [];
    this.all.forEach((item) => {
      if (item.item.type !== "resource") {
        const result = item.item.breakdown();
        output.push(result);
      }
    });
    return output;
  }

  consolidate() {
    const costs = this.breakdown();
    console.log(costs);

    const reduced = costs.reduce((itemGroup, item) => {
      const name = item.item.name;
      if (itemGroup[name] == null) {
        itemGroup[name] = 0;
      }
      itemGroup[name] += item.amount;
      return itemGroup;
    }, {});

    const array = Object.entries(reduced);
    const output = [];
    array.forEach((element) => {
      const obj = {};
      obj.item = resources.findByName(element[0]);
      obj.amount = element[1];
      output.push(obj);
    });

    return output;
  }
}

const todo = new Todo();

export { todo };
