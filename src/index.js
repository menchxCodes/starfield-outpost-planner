import "./styles/style.css";
import { resources } from "./scripts/resource";
import { recipes } from "./scripts/recipes";
import { compounds } from "./scripts/compounds";
import { exotics } from "./scripts/exotics";
import { uniques } from "./scripts/uniques";
import { dom } from "./scripts/dom";
import { buildings } from "./scripts/builduings";

function print(array) {
  array.forEach((element) => {
    console.log(
      `${element.item.name} x${element.amount} (${element.item.type})`
    );
  });
}

const input = buildings.all.concat(
  recipes.all,
  compounds.all,
  exotics.all,
  uniques.all
);

console.log(uniques.all[3]);
const adas = uniques.all[3];
console.log(adas.bd());

dom.render(input);

// const array = [1, 2, 3, 4];
// console.log(array.splice(2, 1), array);
