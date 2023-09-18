const resources = (function () {
  const all = [];
  const findByName = (name) => all.find((item) => item.name === name);

  return { all, findByName };
})();

class Resource {
  constructor(element, name, rarity) {
    this.name = name;
    this.element = element;
    this.rarity = rarity;
    this.type = "resource";
    resources.all.push(this);
  }
}

const iron = new Resource("fe", "iron", "common");
const benzene = new Resource("c6hn", "benzene", "common");
const membrane = new Resource("membrane", "membrane", "common");
const memorySubstrate = new Resource("memory", "memory substrate", "common");
const aluminum = new Resource("al", "aluminum", "common");
const tantalum = new Resource("ta", "tantalum", "common");
const tungsten = new Resource("W", "tungsten", "common");
const beryllium = new Resource("be", "beryllium", "common");
const copper = new Resource("cu", "copper", "common");
const nickel = new Resource("ni", "nickel", "common");
const cobalt = new Resource("co", "cobalt", "common");
const xenon = new Resource("xe", "xenon", "common");
const argon = new Resource("ar", "argon", "common");
const titanium = new Resource("ti", "titanium", "common");
const alkanes = new Resource("hncn", "alkanes", "common");
const chlorine = new Resource("cl", "chlorine", "common");
const tetraflourides = new Resource("xf4", "tetraflourides", "common");
const ionicLiquids = new Resource("il", "ionic liquids", "common");
const gold = new Resource("au", "gold", "common");
const neodymium = new Resource("nd", "neodymium", "common");
const antimony = new Resource("sb", "antimony", "common");
const vanadium = new Resource("v", "vanadium", "common");
const paladium = new Resource("pd", "paladium", "common");
const rothicite = new Resource("rc", "rothicite", "common");
const lithium = new Resource("li", "lithium", "common");
const tasine = new Resource("tsn", "tasine", "common");
const ytterbium = new Resource("yb", "ytterbium", "common");
const veryl = new Resource("vr", "veryl", "common");
const vytinium = new Resource("vy", "vytinium", "common");
const plutonium = new Resource("pu", "plutonium", "common");
const silver = new Resource("ag", "silver", "common");
const lubricant = new Resource("lube", "lubricant", "common");
const solvent = new Resource("solv", "solvent", "common");
const caesium = new Resource("cs", "caesium", "common");
const indicite = new Resource("ie", "indicite", "common");
const europium = new Resource("eu", "europium", "common");
const fiber = new Resource("fibr", "fiber", "common");
const cosmetic = new Resource("cos", "cosmetic", "common");
const polymer = new Resource("poly", "polymer", "common");
const dysporium = new Resource("dy", "dysporium", "common");
const uranium = new Resource("u", "uranium", "common");
const aldumite = new Resource("ad", "aldumite", "common");
const biosuppressant = new Resource("bio", "biosuppressant", "common");
const adhesive = new Resource("adh", "adhesive", "common");
const sealant = new Resource("adh", "sealant", "common");

export { resources };
