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

  static breakdown(craft) {
    const output = JSON.parse(JSON.stringify(craft.item.ingredients));

    const result = [];

    while (!output.every((element) => element.item.type === "resource")) {
      output.forEach((ingredient, index) => {
        if (ingredient.item.type === "resource") {
          result.push(ingredient);
        } else {
          ingredient.item.ingredients.forEach((subIngredient) => {
            const sub = JSON.parse(JSON.stringify(subIngredient));
            sub.amount *= ingredient.amount;
            output.push(sub);
          });
        }
        output.splice(index, 1);
        // console.log(JSON.parse(JSON.stringify(output)));
      });
    }

    output.forEach((element) => {
      result.push(element);
    });

    const consolidated = Recipe.consolidate(result);

    return { result, consolidated };
  }

  static consolidate(itemsArray) {
    const costs = JSON.parse(JSON.stringify(itemsArray));

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
const iron = resources.findByName("iron");
const benzene = resources.findByName("benzene");
const membrane = resources.findByName("membrane");
const memorySubstrate = resources.findByName("memory substrate");
const aluminum = resources.findByName("aluminum");
const tantalum = resources.findByName("tantalum");
const tungsten = resources.findByName("tungsten");
const beryllium = resources.findByName("beryllium");
const copper = resources.findByName("copper");
const nickel = resources.findByName("nickel");
const cobalt = resources.findByName("cobalt");
const xenon = resources.findByName("xenon");
const argon = resources.findByName("argon");
const titanium = resources.findByName("titanium");
const alkanes = resources.findByName("alkanes");
const chlorine = resources.findByName("chlorine");
const tetraflourides = resources.findByName("tetraflourides");
const ionicLiquids = resources.findByName("ionic liquids");
const gold = resources.findByName("gold");
const neodymium = resources.findByName("neodymium");
const antimony = resources.findByName("antimony");
const vanadium = resources.findByName("vanadium");
const paladium = resources.findByName("paladium");
const rothicite = resources.findByName("rothicite");
const lithium = resources.findByName("lithium");
const tasine = resources.findByName("tasine");
const ytterbium = resources.findByName("ytterbium");
const veryl = resources.findByName("veryl");
const vytinium = resources.findByName("vytinium");
const plutonium = resources.findByName("plutonium");
const silver = resources.findByName("silver");
const lubricant = resources.findByName("lubricant");
const solvent = resources.findByName("solvent");
const caesium = resources.findByName("caesium");
const indicite = resources.findByName("indicite");
const europium = resources.findByName("europium");
const fiber = resources.findByName("fiber");
const cosmetic = resources.findByName("cosmetic");
const polymer = resources.findByName("polymer");
const dysporium = resources.findByName("dysporium");
const uranium = resources.findByName("uranium");
const aldumite = resources.findByName("aldumite");
const biosuppressant = resources.findByName("biosuppressant");
const adhesive = resources.findByName("adhesive");
const sealant = resources.findByName("sealant");

// former recipes
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

// former compounds
const austenticManifold = new Recipe("austentic manifold", "uncommon", [
  [nickel, 2],
  [reactiveGauge, 1],
  [iron, 2],
]);

const commRelay = new Recipe("comm relay", "uncommon", [
  [tauGradeRheostat, 1],
  [isocenteredMagnet, 1],
]);

const drillingRig = new Recipe("drilling rig", "rare", [
  [tungsten, 3],
  [reactiveGauge, 1],
  [lubricant, 2],
]);

const molecularSieve = new Recipe("molecular sieve", "rare", [
  [magPressureTank, 1],
  [ionicLiquids, 2],
  [membrane, 2],
]);

const monopropellant = new Recipe("monopropellant", "rare", [
  [magPressureTank, 1],
  [reactiveGauge, 1],
  [alkanes, 2],
]);

const paramagnonConductor = new Recipe("paramagnon conductor", "rare", [
  [gold, 1],
  [neodymium, 1],
  [zeroWire, 3],
]);

const positronBattery = new Recipe("positron battery", "rare", [
  [tauGradeRheostat, 1],
  [antimony, 2],
  [vanadium, 2],
]);

const semimetalWafer = new Recipe("semimetal wafer", "rare", [
  [gold, 2],
  [antimony, 2],
  [zeroWire, 1],
]);

const supercooledMagnet = new Recipe("supercooled magnet", "rare", [
  [isotopicCoolant, 1],
  [isocenteredMagnet, 1],
  [neodymium, 3],
]);

const zeroGGimbal = new Recipe("zero-g gimbal", "rare", [
  [isocenteredMagnet, 1],
  [lubricant, 2],
  [tantalum, 2],
]);

// former exotics
const controlRod = new Recipe("control rod", "exotic", [
  [dysporium, 3],
  [austenticManifold, 1],
  [isotopicCoolant, 1],
]);

const microsendRegulator = new Recipe("microsend regulator", "exotic", [
  [lithium, 2],
  [tauGradeRheostat, 1],
  [supercooledMagnet, 1],
  [europium, 4],
]);

const nuclearFuelRod = new Recipe("nuclear fuel rod", "exotic", [
  [solvent, 2],
  [semimetalWafer, 1],
  [uranium, 3],
]);

const powerCircut = new Recipe("power circuit", "exotic", [
  [polymer, 2],
  [paramagnonConductor, 1],
  [paladium, 4],
  [positronBattery, 1],
]);

const sterileNanotubes = new Recipe("sterile nanotubes", "exotic", [
  [solvent, 2],
  [vanadium, 2],
  [molecularSieve, 1],
]);

// former uniques
const aldumiteDrillingRig = new Recipe("aldumite drilling rig", "unique", [
  [microsendRegulator, 1],
  [aldumite, 4],
  [drillingRig, 1],
  [caesium, 2],
]);

const indiciteWafer = new Recipe("indicite wafer", "unique", [
  [indicite, 4],
  [semimetalWafer, 1],
  [caesium, 2],
  [solvent, 2],
]);

const rothiciteMagnet = new Recipe("rothicite magnet", "unique", [
  [rothicite, 4],
  [semimetalWafer, 1],
  [supercooledMagnet, 1],
  [lithium, 2],
]);
const substrateMoluculeSieve = new Recipe(
  "substrate molucule sieve",
  "unique",
  [
    [sterileNanotubes, 2],
    [memorySubstrate, 3],
    [molecularSieve, 1],
    [biosuppressant, 2],
  ]
);

const verylTreatedManifold = new Recipe("veryl-treated manifold", "unique", [
  [ytterbium, 2],
  [austenticManifold, 1],
  [lubricant, 2],
  [veryl, 4],
]);
const vytiniumFuelRod = new Recipe("vytinium fuel rod", "unique", [
  [nuclearFuelRod, 1],
  [vytinium, 4],
  [indiciteWafer, 1],
  [plutonium, 2],
]);

// former buildings
const extractorChlorineMk1 = new Recipe("extractor chlorine mk1", "building", [
  [aluminum, 5],
  [nickel, 4],
  [copper, 3],
]);
const extractorChlorineMk2 = new Recipe("extractor chlorine mk2", "building", [
  [adaptiveFrame, 3],
  [molecularSieve, 2],
  [vanadium, 4],
  [reactiveGauge, 2],
]);

const extractorLiquidMk1 = new Recipe("extractor liquid mk1", "building", [
  [benzene, 1],
  [membrane, 4],
  [aluminum, 1],
]);

const extractorLiquidMk2 = new Recipe("extractor liquid mk2", "building", [
  [benzene, 1],
  [membrane, 4],
  [aluminum, 1],
]);

const extractorSolidMk1 = new Recipe("extractor solid mk1", "building", [
  [tungsten, 4],
  [iron, 1],
  [aluminum, 2],
]);

const extractorSolidMk2 = new Recipe("extractor solid mk2", "building", [
  [isotopicCoolant, 2],
  [drillingRig, 1],
  [tungsten, 4],
  [adaptiveFrame, 3],
]);

const extractorSolidMk3 = new Recipe("extractor solid mk3", "building", [
  [isotopicCoolant, 4],
  [aldumiteDrillingRig, 1],
  [tungsten, 6],
  [adaptiveFrame, 5],
]);

const extractorGasMk1 = new Recipe("extractor gas mk1", "building", [
  [benzene, 1],
  [membrane, 4],
  [aluminum, 1],
]);

const extractorGasMk2 = new Recipe("extractor gas mk2", "building", [
  [semimetalWafer, 2],
  [adaptiveFrame, 3],
  [austenticManifold, 1],
  [tantalum, 4],
]);

const solarArray = new Recipe("solar array", "building", [
  [beryllium, 2],
  [copper, 3],
  [aluminum, 4],
]);

const windTurbine = new Recipe("wind turbine", "building", [
  [nickel, 3],
  [cobalt, 2],
  [aluminum, 5],
]);

const windTurbineAdvanced = new Recipe("wind turbine - advanced", "building", [
  [isocenteredMagnet, 2],
  [aluminum, 5],
]);

const fueledGenerator = new Recipe("fueled generator", "building", [
  [austenticManifold, 1],
  [tungsten, 4],
  [isocenteredMagnet, 1],
  [tauGradeRheostat, 1],
]);

const poweredSwitch = new Recipe("powered switch", "building", [
  [copper, 2],
  [aluminum, 2],
]);

const industrialLightPost = new Recipe("industrial light post", "building", [
  [xenon, 4],
  [adaptiveFrame, 4],
  [zeroWire, 3],
]);

const lightPost = new Recipe("light post", "building", [
  [xenon, 2],
  [copper, 3],
  [aluminum, 4],
]);

const industrialWallLight = new Recipe("industrial wall light", "building", [
  [argon, 1],
  [copper, 1],
  [aluminum, 1],
]);

const transferContainer = new Recipe("transfer container", "building", [
  [tungsten, 5],
  [iron, 8],
  [lubricant, 4],
]);

const storageSolidSmall = new Recipe("storage - solid", "building", [
  [iron, 6],
  [adaptiveFrame, 3],
  [aluminum, 5],
]);

const storageSolidMedium = new Recipe("storage - solid - medium", "building", [
  [iron, 10],
  [adaptiveFrame, 5],
  [aluminum, 8],
]);

const storageSolidLarge = new Recipe("storage - solid - large", "building", [
  [iron, 20],
  [adaptiveFrame, 10],
  [aluminum, 16],
]);

const storageLiquidSmall = new Recipe("storage - liquid", "building", [
  [nickel, 5],
  [adaptiveFrame, 3],
  [aluminum, 6],
]);

const storageLiquidMedium = new Recipe(
  "storage - liquid - medium",
  "building",
  [
    [nickel, 8],
    [adaptiveFrame, 5],
    [aluminum, 10],
  ]
);

const storageLiquidLarge = new Recipe("storage - liquid - large", "building", [
  [nickel, 16],
  [adaptiveFrame, 10],
  [aluminum, 20],
]);

const storageGasSmall = new Recipe("storage - gas", "building", [
  [tungsten, 5],
  [adaptiveFrame, 3],
  [copper, 6],
]);

const storageGasMedium = new Recipe("storage - gas - medium", "building", [
  [tungsten, 8],
  [adaptiveFrame, 5],
  [copper, 10],
]);

const storageGasLarge = new Recipe("storage - gas - large", "building", [
  [tungsten, 16],
  [adaptiveFrame, 10],
  [copper, 20],
]);

const warehouseSmall = new Recipe("warehouse - small", "building", [
  [adaptiveFrame, 3],
  [titanium, 5],
  [aluminum, 6],
]);

const warehouseMedium = new Recipe("warehouse - medium", "building", [
  [adaptiveFrame, 5],
  [titanium, 8],
  [aluminum, 10],
]);

const warehouseLarge = new Recipe("warehouse - large", "building", [
  [adaptiveFrame, 10],
  [titanium, 16],
  [aluminum, 20],
]);

const simpleFabricator = new Recipe("simple fabricator", "building", [
  [sealant, 2],
  [tungsten, 4],
  [zeroWire, 3],
  [aluminum, 8],
]);

const compoundFabricator = new Recipe("compound fabricator", "building", [
  [tungsten, 8],
  [adhesive, 4],
  [zeroWire, 5],
  [isotopicCoolant, 2],
]);

const industrialWorkbench = new Recipe("industrial workbench", "building", [
  [iron, 3],
  [aluminum, 4],
]);

const cookingStation = new Recipe("cooking station", "building", [
  [alkanes, 3],
  [iron, 4],
  [copper, 3],
]);

const pharmaceuticalLab = new Recipe("pharmaceutical lab", "building", [
  [chlorine, 4],
  [iron, 3],
  [benzene, 3],
  [aluminum, 4],
]);

const weaponWorkbench = new Recipe("weapon workbench", "building", [
  [sealant, 3],
  [nickel, 2],
  [iron, 4],
  [adhesive, 3],
]);

const spacesuitWorkbench = new Recipe("spacesuit workbench", "building", [
  [fiber, 3],
  [cosmetic, 4],
  [aluminum, 4],
]);

const researchLab = new Recipe("research lab", "building", [
  [beryllium, 2],
  [copper, 2],
  [aluminum, 4],
]);

const scanBooster = new Recipe("scan booster", "building", [
  [beryllium, 2],
  [copper, 3],
  [aluminum, 4],
]);

const scanBoosterAdvanced = new Recipe("scan booster - advanced", "building", [
  [isocenteredMagnet, 1],
  [commRelay, 1],
  [zeroWire, 3],
  [aluminum, 5],
]);

const scanBoosterMillitaryGrade = new Recipe(
  "scan booster - millitary grade",
  "building",
  [
    [paramagnonConductor, 1],
    [supercooledMagnet, 1],
    [commRelay, 2],
    [aluminum, 6],
  ]
);

const cargoLink = new Recipe("cargo link", "building", [
  [beryllium, 2],
  [iron, 20],
  [zeroWire, 2],
  [aluminum, 12],
]);

const cargoLinkInterSystem = new Recipe(
  "cargo link - inter-system",
  "building",
  [
    [iron, 20],
    [reactiveGauge, 3],
    [commRelay, 1],
    [aluminum, 12],
  ]
);

const crewStation = new Recipe("crew station", "building", [
  [nickel, 3],
  [iron, 2],
  [aluminum, 5],
]);

const landingPadWithShipBuilder = new Recipe(
  "landing pad with shipbuilder",
  "building",
  [
    [beryllium, 2],
    [iron, 30],
    [adaptiveFrame, 18],
    [zeroWire, 2],
  ]
);

const landingPadSmall = new Recipe("landing pad - small", "building", [
  [iron, 2],
  [aluminum, 2],
]);

const missionBoard = new Recipe("mission board", "building", [
  [beryllium, 2],
  [zeroWire, 2],
  [aluminum, 4],
]);

const selfServiceBountyClearance = new Recipe(
  "self-service bounty clearance",
  "building",
  [
    [beryllium, 2],
    [copper, 2],
    [aluminum, 4],
  ]
);

export { recipes, Recipe };
