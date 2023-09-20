import { resources } from "./resource";
import { recipes, Recipe } from "./recipes";
import { compounds } from "./compounds";
import { exotics } from "./exotics";
import { uniques } from "./uniques";
import { building } from "./uniques";
import { todo } from "./todo";

const dom = (function () {
  const container = document.createElement("div");
  let currentCraft = -1;

  const setupLayout = () => {
    container.classList.add("resource-container");

    const title = document.createElement("div");
    title.classList.add("page-title");
    title.textContent = "Crafts";

    const content = document.createElement("div");
    content.classList.add("resource-content");

    const searchBar = document.createElement("input");
    searchBar.classList.add("search-bar");
    searchBar.placeholder = "search...";

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    container.appendChild(title);
    container.appendChild(searchBar);
    container.appendChild(content);
    container.appendChild(todoContainer);
    document.body.appendChild(container);
  };

  const hookSearchEvent = () => {
    const searchBar = document.querySelector(".search-bar");
    const cards = Array.from(document.querySelectorAll(".resource-card"));

    searchBar.addEventListener("input", () => {
      const shownCards = [];

      cards.forEach((card) => {
        card.classList.add("hide");
        card.classList.remove("selected");
        if (card.getAttribute("data-name").includes(searchBar.value)) {
          card.classList.remove("hide");
          shownCards.push(card);
        }
      });
      if (shownCards[0] !== undefined) {
        shownCards[0].classList.add("selected");
      }
    });
  };

  const renderResources = (inputArrays) => {
    const crafts = inputArrays;

    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe-container");

    const craftContainer = document.createElement("div");
    craftContainer.classList.add("craft-container");
    recipeContainer.appendChild(craftContainer);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");
    recipeContainer.appendChild(detailsContainer);

    container.appendChild(recipeContainer);

    crafts.forEach((craft, index) => {
      const card = document.createElement("div");
      const title = document.createElement("div");
      const content = document.createElement("div");

      /** @type {String}*/
      const name = craft.name;
      title.textContent = name;

      card.addEventListener("click", (e) => {
        currentCraft = craft;
        showCraft(e, craft);
      });

      card.addEventListener("focusin", (e) => {
        currentCraft = craft;
        showCraft(e, craft);
      });

      card.tabIndex = -1;
      card.classList.add("resource-card");
      card.classList.add(craft.rarity);
      card.classList.add(craft.type);
      title.classList.add("resource-card-title");
      content.classList.add("resource-card-content");

      card.appendChild(title);
      card.setAttribute("data-name", name);

      card.appendChild(content);
      const containerContent = document.querySelector(".resource-content");
      containerContent.appendChild(card);
      if (index == 0) {
        card.focus();
      }
    });
  };
  /**
   *
   * @param {Recipe} craft
   */
  const showCraft = function (e, craft, quantity = 1) {
    const recipeContainer = document.querySelector(".recipe-container");
    const craftContainer = document.querySelector(".craft-container");
    const detailsContainer = document.querySelector(".details-container");
    const quantityInput = document.createElement("input");

    quantityInput.classList.add("craft-quantity");
    craftContainer.classList.add("show");
    detailsContainer.classList.add("show");

    craftContainer.replaceChildren("");
    detailsContainer.replaceChildren("");

    const resourceDivs = document.querySelectorAll(".resource-card");
    resourceDivs.forEach((div) => {
      div.classList.remove("selected");
    });
    e.currentTarget.classList.add("selected");

    const content = document.createElement("div");
    content.classList.add("craft-content");

    craft.ingredients.forEach((item) => {
      // craft
      const craftCard = document.createElement("div");
      craftCard.classList.add("craft-card");

      const craftIngredient = document.createElement("div");
      craftIngredient.classList.add("craft-ingredient");
      craftIngredient.textContent = item.item.name;

      const craftAmount = document.createElement("div");
      craftAmount.classList.add("craft-amount");
      craftAmount.textContent = item.amount * quantity;

      craftCard.appendChild(craftIngredient);
      craftCard.appendChild(craftAmount);

      content.appendChild(craftCard);
      // details
    });

    craft.consolidate().forEach((item) => {
      const detailsCard = document.createElement("div");
      detailsCard.classList.add("details-card");

      const detailsIngredient = document.createElement("div");
      detailsIngredient.classList.add("details-ingredient");
      detailsIngredient.textContent = item.item.name;
      // console.log(item);
      if (item.parent) {
        detailsIngredient.textContent += ` (${item.parent})`;
      }

      const detailsAmount = document.createElement("div");
      detailsAmount.classList.add("details-amount");
      detailsAmount.textContent = item.amount * quantity;

      detailsCard.appendChild(detailsIngredient);
      detailsCard.appendChild(detailsAmount);

      detailsContainer.appendChild(detailsCard);
    });

    const label = document.createElement("div");
    label.classList.add("craft-label");

    const title = document.createElement("div");
    title.classList.add("craft-title");
    title.textContent = `${craft.name}`;
    quantityInput.value = quantity;

    label.appendChild(title);
    label.appendChild(quantityInput);
    hookQuantityEvent(quantityInput);

    craftContainer.appendChild(label);
    craftContainer.appendChild(content);

    const btn = document.querySelector(".craft-add-btn");
    const addBtn = document.createElement("button");
    addBtn.classList.add("craft-add-btn");
    addBtn.textContent = "Add";

    if (btn) {
      recipeContainer.replaceChild(addBtn, btn);
    } else {
      recipeContainer.prepend(addBtn);
    }

    addBtn.addEventListener("click", () => {
      hookAddBtnEvent(craft);
    });
  };

  const hookAddBtnEvent = (item) => {
    const quantity = document.querySelector(".craft-quantity");
    todo.add(item, quantity.value * 1);
    renderTodo();
  };

  const hookQuantityEvent = (input) => {
    input.addEventListener("change", (e) => {
      showCraft(e, currentCraft, e.target.value);
      const cards = Array.from(document.querySelectorAll(".resource-card"));
      const currentDiv = cards.find((div) => {
        return div.getAttribute("data-name") == currentCraft.name;
      });
      currentDiv.classList.add("selected");
    });
  };

  const hookKeyboardNavigation = () => {
    const searchBar = document.querySelector(".search-bar");
    window.addEventListener("keydown", (e) => {
      const input = document.querySelector(".craft-quantity");
      const cards = Array.from(
        document.querySelectorAll(".resource-card:not(.hide)")
      );

      let selected = cards.find((div) => {
        return div.classList.contains("selected");
      });

      if (selected === undefined) {
        selected = cards[0];
      }

      let index = cards.indexOf(selected);

      const codes = { ArrowDown: 1, ArrowUp: -1 };
      if (cards.length === 0) {
        if (
          document.activeElement.body ||
          document.activeElement.classList.contains("craft-quantity")
        ) {
          if (e.code === "ArrowUp") {
            e.preventDefault();
            searchBar.focus();
            searchBar.select();
          }
        }
        if (
          document.activeElement.body ||
          document.activeElement.classList.contains("search-bar")
        ) {
          if (e.code === "ArrowDown") {
            e.preventDefault();
            input.focus();
            input.select();
          }
        }
      } else if (document.activeElement.classList.contains("craft-quantity")) {
        if (e.code === "ArrowUp") {
          e.preventDefault();
          searchBar.focus();
          searchBar.select();
        }

        if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
          e.preventDefault();
          selected.focus();
        }
      } else if (document.activeElement.classList.contains("search-bar")) {
        if (e.code === "ArrowDown") {
          selected.focus();
        }

        if (e.code === "Enter") {
          input?.focus();
          input.select();
        }
      } else if (cards.length !== 0) {
        if (codes[e.code]) {
          if (codes[e.code]) {
            index += codes[e.code];
          }

          if (index == -1) {
            index = cards.length - 1;
          }
          if (index == cards.length) {
            index = 0;
          }
          selected = cards[index];

          selected.focus();
        } else if (e.code === "Enter" || e.code === "ArrowRight") {
          if (e.code === "ArrowRight") {
            e.preventDefault();
          }
          input?.focus();
          input?.select();
          input.select();
        }
      }
    });
  };

  const render = (input, pageTitle = "All") => {
    setupLayout();
    const title = document.querySelector(".page-title");
    title.textContent = pageTitle;
    renderResources(input);
    // hookQuantityEvent();
    hookKeyboardNavigation();
    hookSearchEvent();
  };

  const createTodoDiv = (craft) => {
    const todoGroup = document.createElement("div");
    const todoName = document.createElement("div");
    const todoAmount = document.createElement("div");

    todoGroup.classList.add("todo");
    todoName.classList.add("todo-name");
    todoAmount.classList.add("todo-amount");

    todoName.textContent = craft.item.name;
    todoAmount.textContent = craft.amount;

    todoGroup.appendChild(todoName);
    todoGroup.appendChild(todoAmount);

    return todoGroup;
  };

  const renderIngredient = (ingredient, quantity) => {
    const breakdownGroup = document.createElement("div");
    const breakdownName = document.createElement("div");
    const breakdownAmount = document.createElement("div");

    breakdownGroup.classList.add("breakdown");
    breakdownName.classList.add("breakdown-name");
    breakdownAmount.classList.add("breakdown-amount");

    breakdownName.textContent = ingredient.item.name;
    breakdownAmount.textContent = ingredient.amount * quantity;

    breakdownGroup.appendChild(breakdownName);
    breakdownGroup.appendChild(breakdownAmount);

    return breakdownGroup;
  };

  const renderTodo = () => {
    console.log("render todo");
    const todoContainer = document.querySelector(".todo-container");

    todoContainer.replaceChildren("");

    todo.all.forEach((item) => {
      const todoGroup = createTodoDiv(item);
      todoContainer.appendChild(todoGroup);

      const breakdownContainer = document.createElement("div");
      breakdownContainer.classList.add("breakdown-container");
      breakdownContainer.classList.add("hide");

      todoGroup.after(breakdownContainer);

      todoGroup.addEventListener("click", () => {
        breakdownContainer.classList.toggle("hide");
      });
      const quantity = item.amount;

      item.item.ingredients.forEach((ingredient) => {
        const breakdownGroup = renderIngredient(ingredient, quantity);

        breakdownContainer.appendChild(breakdownGroup);
      });
    });
    const totalDiv = updateTotalDiv();

    todoContainer.appendChild(totalDiv);
  };
  const updateTotalDiv = () => {
    const totalContainer = document.createElement("div");

    totalContainer.classList.add("todo-total-container");

    const consolidated = updateTotal();
    consolidated.sort((a, b) => {
      if (a.item.name > b.item.name) {
        return 1;
      }
      if (a.item.name < b.item.name) {
        return -1;
      }
      return 0;
    });

    consolidated.forEach((item) => {
      const totalDiv = document.createElement("div");
      const totalName = document.createElement("div");
      const totalAmount = document.createElement("div");

      totalName.classList.add("todo-total-name");
      totalAmount.classList.add("todo-total-amount");
      totalDiv.classList.add("todo-total");

      totalName.textContent = item.item.name;
      totalAmount.textContent = item.amount;
      totalDiv.appendChild(totalName);
      totalDiv.appendChild(totalAmount);
      totalContainer.appendChild(totalDiv);
    });
    return totalContainer;
  };
  const updateTotal = () => {
    const allResources = [];

    todo.all.forEach((item) => {
      const brokenDown = item.item.breakdown();
      brokenDown.forEach((brokenItem) => {
        brokenItem.amount *= item.amount;
      });
      allResources.push(brokenDown);
    });

    const reduced = allResources.flat().reduce((itemGroup, item) => {
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
  };

  return { render };
})();

export { dom };
