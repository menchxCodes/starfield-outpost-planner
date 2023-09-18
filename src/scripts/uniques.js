// @ts-check
import { recipes } from "./recipes";
import { resources } from "./resource";
import { compounds } from "./compounds";
import { exotics } from "./exotics";

const uniques = (function () {
  const all = [];
  const findByName = (name) => all.find((item) => item.name === name);

  return { all, findByName };
})();

class Unique {
  constructor(name, rarity, ingredientsArray) {
    this.name = name;
    this.rarity = rarity;
    this.ingredients = Unique.cost(ingredientsArray);
    this.type = "unique";
    uniques.all.push(this);
  }

  static cost(ingredientsArray) {
    const costs = [];
    ingredientsArray.forEach((ingredient) => {
      const obj = {};
      obj.item = ingredient[0];
      obj.amount = ingredient[1];
      costs.push(obj);
    });
    return costs;
  }

  breakdown(quantity = 1) {
    const costs = [];
    let obj = {};
    this.ingredients.forEach((ingredient) => {
      obj = {};
      if (ingredient.item.type === "resource") {
        obj.item = ingredient.item;
        obj.amount = ingredient.amount * quantity;
        costs.push(obj);
        // console.log(`${obj.item.name} x${obj.amount}`);
      }

      if (ingredient.item.type === "recipe") {
        ingredient.item.breakdown().forEach((resource) => {
          obj = {};
          obj.item = resource.item;
          obj.amount = resource.amount * ingredient.amount * quantity;
          obj.parent = ingredient.item.name;
          costs.push(obj);
        });
      }

      if (ingredient.item.type === "compound") {
        ingredient.item.breakdown().forEach((resource) => {
          obj = {};
          obj.item = resource.item;
          obj.amount = resource.amount * ingredient.amount * quantity;
          obj.parent = ingredient.item.name;
          costs.push(obj);
        });
      }

      if (ingredient.item.type === "exotic") {
        ingredient.item.breakdown().forEach((resource) => {
          obj = {};
          obj.item = resource.item;
          obj.amount = resource.amount * ingredient.amount * quantity;
          obj.parent = ingredient.item.name;
          costs.push(obj);
        });
      }
    });
    return costs;
  }

  consolidate() {
    const costs = this.breakdown();

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

const indicite = resources.findByName("indicite");
const lithium = resources.findByName("lithium");
const caesium = resources.findByName("caesium");
const solvent = resources.findByName("solvent");
const aldumite = resources.findByName("aldumite");
const rothicite = resources.findByName("rothicite");
const memorySubstrate = resources.findByName("memory substrate");
const biosuppressant = resources.findByName("biosuppressant");
const lubricant = resources.findByName("lubricant");
const veryl = resources.findByName("veryl");
const vytinium = resources.findByName("vytinium");
const plutonium = resources.findByName("plutonium");
const ytterbium = resources.findByName("ytterbium");

const drillingRig = compounds.findByName("drilling rig");
const superCooledMagnet = compounds.findByName("supercooled magnet");
const austenticManifold = compounds.findByName("austentic manifold");
const semimetalWafer = compounds.findByName("semimetal wafer");
const molecularSieve = compounds.findByName("molecular sieve");

const microsendRegulator = exotics.findByName("microsend regulator");
const sterileNanotubes = exotics.findByName("sterile nanotubes");
const nuclearFuelRod = exotics.findByName("nuclear fuel rod");

const aldumiteDrillingRig = new Unique("aldumite drilling-rig", "unique", [
  [microsendRegulator, 1],
  [aldumite, 4],
  [drillingRig, 1],
  [caesium, 2],
]);

const indiciteWafer = new Unique("indicite wafer", "unique", [
  [indicite, 4],
  [semimetalWafer, 1],
  [caesium, 2],
  [solvent, 2],
]);

const rothiciteMagnet = new Unique("rothicite magnet", "unique", [
  [rothicite, 4],
  [semimetalWafer, 1],
  [superCooledMagnet, 1],
  [lithium, 2],
]);
const substrateMoluculeSieve = new Unique(
  "substrate molucule sieve",
  "unique",
  [
    [sterileNanotubes, 2],
    [memorySubstrate, 3],
    [molecularSieve, 1],
    [biosuppressant, 2],
  ]
);

const verylTreatedManifold = new Unique("veryl-treated manifold", "unique", [
  [ytterbium, 2],
  [austenticManifold, 1],
  [lubricant, 2],
  [veryl, 4],
]);
const vytiniumFuelRod = new Unique("vytinium fuel rod", "unique", [
  [nuclearFuelRod, 1],
  [vytinium, 4],
  [indiciteWafer, 1],
  [plutonium, 2],
]);

export { uniques };
