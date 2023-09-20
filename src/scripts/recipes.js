import { resources } from "./resource";

const recipes = (function () {
  const all = [];
  const findByName = (name) => all.find((item) => item.name === name);

  return { all, findByName };
})();

class Recipe {
  constructor(name, rarity, ingredientsArray) {
    this.name = name;
    this.rarity = rarity;
    this.ingredients = Recipe.cost(ingredientsArray);
    this.type = "recipe";
    recipes.all.push(this);
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
    this.ingredients.forEach((ingredient) => {
      const obj = {};
      if (ingredient.item.type === "resource") {
        obj.item = ingredient.item;
        obj.amount = ingredient.amount * quantity;
      }
      costs.push(obj);
    });
    return costs;
  }

  consolidate() {
    return this.breakdown();
  }
}

const iron = resources.findByName("iron");
const aluminum = resources.findByName("aluminum");
const nickel = resources.findByName("nickel");
const cobalt = resources.findByName("cobalt");
const tetraflourides = resources.findByName("tetraflourides");
const ionicLiquids = resources.findByName("ionic liquids");
const fiber = resources.findByName("fiber");
const cosmetic = resources.findByName("cosmetic");
const copper = resources.findByName("copper");
const beryllium = resources.findByName("beryllium");
const silver = resources.findByName("silver");

const adaptiveFrame = new Recipe("adaptive frame", "common", [
  [iron, 1],
  [aluminum, 1],
]);
const isocenteredMagnet = new Recipe("isocentered magnet", "common", [
  [nickel, 1],
  [cobalt, 1],
]);
const isotopicCoolant = new Recipe("isotopic coolant", "common", [
  [tetraflourides, 1],
  [ionicLiquids, 1],
]);
const magPressureTank = new Recipe("mag pressure tank", "uncommon", [
  [nickel, 1],
  [aluminum, 2],
]);
const polytextile = new Recipe("polytextile", "uncommon", [
  [fiber, 2],
  [cosmetic, 1],
]);
const reactiveGauge = new Recipe("reactive gauge", "common", [
  [copper, 1],
  [aluminum, 2],
]);
const tauGradeRheostat = new Recipe("tau grade rheostat", "uncommon", [
  [beryllium, 1],
  [copper, 1],
]);
const zeroWire = new Recipe("zero wire", "common", [
  [silver, 1],
  [copper, 1],
]);

export { recipes, Recipe };
