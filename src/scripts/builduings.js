// @ts-check
import { recipes } from "./recipes";
import { resources } from "./resource";
import { compounds } from "./compounds";
import { exotics } from "./exotics";
import { uniques } from "./uniques";

const buildings = (function () {
  const all = [];
  const findByName = (name) => all.find((item) => item.name === name);

  return { all, findByName };
})();

class Building {
  constructor(name, rarity, ingredientsArray) {
    this.name = name;
    this.rarity = rarity;
    this.ingredients = Building.cost(ingredientsArray);
    this.type = "building";
    buildings.all.push(this);
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

const benzene = resources.findByName("benzene");
const iron = resources.findByName("iron");
const copper = resources.findByName("copper");
const aluminum = resources.findByName("aluminum");
const membrane = resources.findByName("membrane");
const tungsten = resources.findByName("tungsten");
const nickel = resources.findByName("nickel");
const lubricant = resources.findByName("lubricant");
const cobalt = resources.findByName("cobalt");
const xenon = resources.findByName("xenon");
const tantalum = resources.findByName("tantalum");
const beryllium = resources.findByName("beryllium");
const argon = resources.findByName("argon");
const titanium = resources.findByName("titanium");
const sealant = resources.findByName("sealant");
const alkanes = resources.findByName("alkanes");
const chlorine = resources.findByName("chlorine");
const fiber = resources.findByName("fiber");
const adhesive = resources.findByName("adhesive");
const cosmetic = resources.findByName("cosmetic");
const vanadium = resources.findByName("vanadium");

const adaptiveFrame = recipes.findByName("adaptive frame");
const zeroWire = recipes.findByName("zero wire");
const reactiveGauge = recipes.findByName("reactive gauge");
const tauGradeRheostat = recipes.findByName("tau grade rheostat");
const isotopicCoolant = recipes.findByName("isotopic coolant");
const isocenteredMagnet = recipes.findByName("isocentered magnet");

const drillingRig = compounds.findByName("drilling rig");
const superCooledMagnet = compounds.findByName("supercooled magnet");
const austenticManifold = compounds.findByName("austentic manifold");
const semimetalWafer = compounds.findByName("semimetal wafer");
const commRelay = compounds.findByName("comm relay");
const paramagnonConductor = compounds.findByName("paramagnon conductor");
const molecularSieve = compounds.findByName("molecular sieve");

const aldumiteDrillingRig = uniques.findByName("aldumite drilling rig");

const extractorChlorineMk1 = new Building(
  "extractor chlorine mk1",
  "building",
  [
    [aluminum, 5],
    [nickel, 4],
    [copper, 3],
  ]
);
const extractorChlorineMk2 = new Building(
  "extractor chlorine mk2",
  "building",
  [
    [adaptiveFrame, 3],
    [molecularSieve, 2],
    [vanadium, 4],
    [reactiveGauge, 2],
  ]
);
const extractorLiquidMk1 = new Building("extractor liquid mk1", "building", [
  [benzene, 1],
  [membrane, 4],
  [aluminum, 1],
]);

const extractorLiquidMk2 = new Building("extractor liquid mk2", "building", [
  [benzene, 1],
  [membrane, 4],
  [aluminum, 1],
]);

const extractorSolidMk1 = new Building("extractor solid mk1", "building", [
  [tungsten, 4],
  [iron, 1],
  [aluminum, 2],
]);

const extractorSolidMk2 = new Building("extractor solid mk2", "building", [
  [isotopicCoolant, 2],
  [drillingRig, 1],
  [tungsten, 4],
  [adaptiveFrame, 3],
]);

const extractorSolidMk3 = new Building("extractor solid mk3", "building", [
  [isotopicCoolant, 4],
  [aldumiteDrillingRig, 1],
  [tungsten, 6],
  [adaptiveFrame, 5],
]);

const extractorGasMk1 = new Building("extractor gas mk1", "building", [
  [benzene, 1],
  [membrane, 4],
  [aluminum, 1],
]);

const extractorGasMk2 = new Building("extractor gas mk2", "building", [
  [semimetalWafer, 2],
  [adaptiveFrame, 3],
  [austenticManifold, 1],
  [tantalum, 4],
]);

const solarArray = new Building("solar array", "building", [
  [beryllium, 2],
  [copper, 3],
  [aluminum, 4],
]);

const windTurbine = new Building("wind turbine", "building", [
  [nickel, 3],
  [cobalt, 2],
  [aluminum, 5],
]);

const windTurbineAdvanced = new Building(
  "wind turbine - advanced",
  "building",
  [
    [isocenteredMagnet, 2],
    [aluminum, 5],
  ]
);

const fueledGenerator = new Building("fueled generator", "building", [
  [austenticManifold, 1],
  [tungsten, 4],
  [isocenteredMagnet, 1],
  [tauGradeRheostat, 1],
]);

const poweredSwitch = new Building("powered switch", "building", [
  [copper, 2],
  [aluminum, 2],
]);

const industrialLightPost = new Building("industrial light post", "building", [
  [xenon, 4],
  [adaptiveFrame, 4],
  [zeroWire, 3],
]);

const lightPost = new Building("light post", "building", [
  [xenon, 2],
  [copper, 3],
  [aluminum, 4],
]);

const industrialWallLight = new Building("industrial wall light", "building", [
  [argon, 1],
  [copper, 1],
  [aluminum, 1],
]);

const transferContainer = new Building("transfer container", "building", [
  [tungsten, 5],
  [iron, 8],
  [lubricant, 4],
]);

const storageSolidSmall = new Building("storage - solid", "building", [
  [iron, 6],
  [adaptiveFrame, 3],
  [aluminum, 5],
]);

const storageSolidMedium = new Building(
  "storage - solid - medium",
  "building",
  [
    [iron, 10],
    [adaptiveFrame, 5],
    [aluminum, 8],
  ]
);

const storageSolidLarge = new Building("storage - solid - large", "building", [
  [iron, 20],
  [adaptiveFrame, 10],
  [aluminum, 16],
]);

const storageLiquidSmall = new Building("storage - liquid", "building", [
  [nickel, 5],
  [adaptiveFrame, 3],
  [aluminum, 6],
]);

const storageLiquidMedium = new Building(
  "storage - liquid - medium",
  "building",
  [
    [nickel, 8],
    [adaptiveFrame, 5],
    [aluminum, 10],
  ]
);

const storageLiquidLarge = new Building(
  "storage - liquid - large",
  "building",
  [
    [nickel, 16],
    [adaptiveFrame, 10],
    [aluminum, 20],
  ]
);

const storageGasSmall = new Building("storage - gas", "building", [
  [tungsten, 5],
  [adaptiveFrame, 3],
  [copper, 6],
]);

const storageGasMedium = new Building("storage - gas - medium", "building", [
  [tungsten, 8],
  [adaptiveFrame, 5],
  [copper, 10],
]);

const storageGasLarge = new Building("storage - gas - large", "building", [
  [tungsten, 16],
  [adaptiveFrame, 10],
  [copper, 20],
]);

const warehouseSmall = new Building("warehouse - small", "building", [
  [adaptiveFrame, 3],
  [titanium, 5],
  [aluminum, 6],
]);

const warehouseMedium = new Building("warehouse - medium", "building", [
  [adaptiveFrame, 5],
  [titanium, 8],
  [aluminum, 10],
]);

const warehouseLarge = new Building("warehouse - large", "building", [
  [adaptiveFrame, 10],
  [titanium, 16],
  [aluminum, 20],
]);

const simpleFabricator = new Building("simple fabricator", "building", [
  [sealant, 2],
  [tungsten, 4],
  [zeroWire, 3],
  [aluminum, 8],
]);

const compoundFabricator = new Building("compound fabricator", "building", [
  [tungsten, 8],
  [adhesive, 4],
  [zeroWire, 5],
  [isotopicCoolant, 2],
]);

const industrialWorkbench = new Building("industrial workbench", "building", [
  [iron, 3],
  [aluminum, 4],
]);

const cookingStation = new Building("cooking station", "building", [
  [alkanes, 3],
  [iron, 4],
  [copper, 3],
]);

const pharmaceuticalLab = new Building("pharmaceutical lab", "building", [
  [chlorine, 4],
  [iron, 3],
  [benzene, 3],
  [aluminum, 4],
]);

const weaponWorkbench = new Building("weapon workbench", "building", [
  [sealant, 3],
  [nickel, 2],
  [iron, 4],
  [adhesive, 3],
]);

const spacesuitWorkbench = new Building("spacesuit workbench", "building", [
  [fiber, 3],
  [cosmetic, 4],
  [aluminum, 4],
]);

const researchLab = new Building("research lab", "building", [
  [beryllium, 2],
  [copper, 2],
  [aluminum, 4],
]);

const scanBooster = new Building("scan booster", "building", [
  [beryllium, 2],
  [copper, 3],
  [aluminum, 4],
]);

const scanBoosterAdvanced = new Building(
  "scan booster - advanced",
  "building",
  [
    [isocenteredMagnet, 1],
    [commRelay, 1],
    [zeroWire, 3],
    [aluminum, 5],
  ]
);

const scanBoosterMillitaryGrade = new Building(
  "scan booster - millitary grade",
  "building",
  [
    [paramagnonConductor, 1],
    [superCooledMagnet, 1],
    [commRelay, 2],
    [aluminum, 6],
  ]
);

const cargoLink = new Building("cargo link", "building", [
  [beryllium, 2],
  [iron, 20],
  [zeroWire, 2],
  [aluminum, 12],
]);

const cargoLinkInterSystem = new Building(
  "cargo link - inter-system",
  "building",
  [
    [iron, 20],
    [reactiveGauge, 3],
    [commRelay, 1],
    [aluminum, 12],
  ]
);

const crewStation = new Building("crew station", "building", [
  [nickel, 3],
  [iron, 2],
  [aluminum, 5],
]);

const landingPadWithShipBuilder = new Building(
  "landing pad with shipbuilder",
  "building",
  [
    [beryllium, 2],
    [iron, 30],
    [adaptiveFrame, 18],
    [zeroWire, 2],
  ]
);

const landingPadSmall = new Building("landing pad - small", "building", [
  [iron, 2],
  [aluminum, 2],
]);

const missionBoard = new Building("mission board", "building", [
  [beryllium, 2],
  [zeroWire, 2],
  [aluminum, 4],
]);

const selfServiceBountyClearance = new Building(
  "self-service bounty clearance",
  "building",
  [
    [beryllium, 2],
    [copper, 2],
    [aluminum, 4],
  ]
);

export { buildings };
