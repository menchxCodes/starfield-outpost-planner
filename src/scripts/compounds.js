// @ts-check
import { recipes } from "./recipes";
import { resources } from "./resource";

const compounds = (function () {
  const all = [];
  const findByName = (name) => all.find((item) => item.name === name);

  return { all, findByName };
})();

class Compound {
  constructor(name, rarity, ingredientsArray) {
    this.name = name;
    this.rarity = rarity;
    this.ingredients = Compound.cost(ingredientsArray);
    this.type = "compound";
    compounds.all.push(this);
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

const nickel = resources.findByName("nickel");
const iron = resources.findByName("iron");
const tungsten = resources.findByName("tungsten");
const lubricant = resources.findByName("lubricant");
const ionicLiquids = resources.findByName("ionic liquids");
const membrane = resources.findByName("membrane");
const alkanes = resources.findByName("alkanes");
const gold = resources.findByName("gold");
const neodymium = resources.findByName("neodymium");
const antimony = resources.findByName("antimony");
const vanadium = resources.findByName("vanadium");
const tantalum = resources.findByName("tantalum");

const reactiveGauge = recipes.findByName("reactive gauge");
const tauGradeRheostat = recipes.findByName("tau grade rheostat");
const isocenteredMagnet = recipes.findByName("isocentered magnet");
const magPressureTank = recipes.findByName("mag pressure tank");
const zeroWire = recipes.findByName("zero wire");
const isotopicCoolant = recipes.findByName("isotopic coolant");

const austenticManifold = new Compound("austentic manifold", "uncommon", [
  [nickel, 2],
  [reactiveGauge, 1],
  [iron, 2],
]);

const commRelay = new Compound("comm relay", "uncommon", [
  [tauGradeRheostat, 1],
  [isocenteredMagnet, 1],
]);

const drillingRig = new Compound("drilling rig", "rare", [
  [tungsten, 3],
  [reactiveGauge, 1],
  [lubricant, 2],
]);

const molecularSieve = new Compound("molecular sieve", "rare", [
  [magPressureTank, 1],
  [ionicLiquids, 2],
  [membrane, 2],
]);
const monopropellant = new Compound("monopropellant", "rare", [
  [magPressureTank, 1],
  [reactiveGauge, 1],
  [alkanes, 2],
]);

const paramagnonConductor = new Compound("paramagnon conductor", "rare", [
  [gold, 1],
  [neodymium, 1],
  [zeroWire, 3],
]);

const positronBattery = new Compound("positron battery", "rare", [
  [tauGradeRheostat, 1],
  [antimony, 2],
  [vanadium, 2],
]);
const semimetalWafer = new Compound("semimetal wafer", "rare", [
  [gold, 2],
  [antimony, 2],
  [zeroWire, 1],
]);
const supercooledMagnet = new Compound("supercooled magnet", "rare", [
  [isotopicCoolant, 1],
  [isocenteredMagnet, 1],
  [neodymium, 3],
]);
const zeroGGimbal = new Compound("zero-g gimbal", "rare", [
  [isocenteredMagnet, 1],
  [lubricant, 2],
  [tantalum, 2],
]);

export { compounds };
