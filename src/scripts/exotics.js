// @ts-check
import { recipes } from "./recipes";
import { resources } from "./resource";
import { compounds } from "./compounds";

const exotics = (function () {
  const all = [];
  const findByName = (name) => all.find((item) => item.name === name);

  return { all, findByName };
})();

class Exotic {
  constructor(name, rarity, ingredientsArray) {
    this.name = name;
    this.rarity = rarity;
    this.ingredients = Exotic.cost(ingredientsArray);
    this.type = "exotic";
    exotics.all.push(this);
  }

  static cost(ingredientsArray, quantity = 1) {
    const costs = [];
    ingredientsArray.forEach((ingredient) => {
      const obj = {};
      obj.item = ingredient[0];
      obj.amount = ingredient[1] * quantity;
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

const dysporium = resources.findByName("dysporium");
const lithium = resources.findByName("lithium");
const europium = resources.findByName("europium");
const solvent = resources.findByName("solvent");
const polymer = resources.findByName("polymer");
const paladium = resources.findByName("paladium");
const uranium = resources.findByName("uranium");
const vanadium = resources.findByName("vanadium");

const tauGradeRheostat = recipes.findByName("tau grade rheostat");
const isotopicCoolant = recipes.findByName("isotopic coolant");

const superCooledMagnet = compounds.findByName("supercooled magnet");
const austenticManifold = compounds.findByName("austentic manifold");
const paramagnonConductor = compounds.findByName("paramagnon conductor");
const positronBattery = compounds.findByName("positron battery");
const semimetalWafer = compounds.findByName("semimetal wafer");
const molecularSieve = compounds.findByName("molecular sieve");

const controlRod = new Exotic("control rod", "exotic", [
  [dysporium, 3],
  [austenticManifold, 1],
  [isotopicCoolant, 1],
]);

const microsendRegulator = new Exotic("microsend regulator", "exotic", [
  [lithium, 2],
  [tauGradeRheostat, 1],
  [superCooledMagnet, 1],
  [europium, 4],
]);

const nuclearFuelRod = new Exotic("nuclear fuel rod", "exotic", [
  [solvent, 2],
  [semimetalWafer, 1],
  [uranium, 3],
]);
const powerCircut = new Exotic("power circuit", "exotic", [
  [polymer, 2],
  [paramagnonConductor, 1],
  [paladium, 4],
  [positronBattery, 1],
]);

const sterileNanotubes = new Exotic("sterile nanotubes", "exotic", [
  [solvent, 2],
  [vanadium, 2],
  [molecularSieve, 1],
]);

export { exotics };
