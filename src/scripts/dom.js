import { recipes, Recipe } from "./Recipe";
import { todo } from "./Todo";

const dom = (function () {
  const setupPageLayout = () => {
    const pageWrapper = document.createElement("div");
    pageWrapper.classList.add("page-wrapper");

    const searchBar = document.createElement("input");
    searchBar.classList.add("search-bar");
    searchBar.placeholder = "Search craft, building, ...";

    const craftsWrapper = document.createElement("div");
    craftsWrapper.classList.add("crafts-wrapper");

    const recipeWrapper = document.createElement("div");
    recipeWrapper.classList.add("recipe-wrapper");

    const breakdownWrapper = document.createElement("div");
    breakdownWrapper.classList.add("breakdown-wrapper");

    const todoWrapper = document.createElement("div");
    todoWrapper.classList.add("todo-wrapper");

    const totalWrapper = document.createElement("div");
    totalWrapper.classList.add("total-wrapper");

    document.body.appendChild(pageWrapper);
    craftsWrapper.appendChild(searchBar);
    pageWrapper.appendChild(craftsWrapper);
    pageWrapper.appendChild(recipeWrapper);
    pageWrapper.appendChild(todoWrapper);
    pageWrapper.appendChild(breakdownWrapper);
    pageWrapper.appendChild(totalWrapper);
  };

  const hookInputValidations = (input) => {
    input.addEventListener("keydown", (e) => {
      if (
        isNaN(e.key) &&
        e.key !== "Delete" &&
        e.key !== "Backspace" &&
        e.key !== "ArrowRight" &&
        e.key !== "ArrowLeft" &&
        e.key !== "Enter" &&
        e.key !== "Tab" &&
        e.key !== "Control"
      ) {
        if (
          !(e.key === "a" && e.ctrlKey === true) &&
          !(e.key === "c" && e.ctrlKey === true) &&
          !(e.key === "v" && e.ctrlKey === true)
        ) {
          e.preventDefault();
        }
      }
    });

    input.addEventListener("click", () => {
      if (document.activeElement !== input) {
        input.select();
      }
    });

    input.addEventListener("change", () => {
      if (input.value < 1) {
        input.value = 1;
      } else {
        input.value = 1 * input.value;
      }
    });
  };

  const showRecipe = (craft, quantity = 1) => {
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.replaceChildren("");

    const recipeTitle = document.querySelector(".recipe-title");
    recipeTitle.textContent = `${craft.name} (${quantity * 1})`;

    craft.ingredients.forEach((ingredient) => {
      const recipeIngredientContainer = document.createElement("div");
      recipeIngredientContainer.classList.add("recipe-ingredient-container");

      const recipeIngredient = document.createElement("div");
      recipeIngredient.classList.add("recipe-ingredient");

      const recipeIngredientName = document.createElement("div");
      recipeIngredientName.classList.add("recipe-ingredient-name");

      const recipeIngredientAmount = document.createElement("div");
      recipeIngredientAmount.classList.add("recipe-ingredient-amount");

      recipeIngredientName.textContent = ingredient.item.name;
      recipeIngredientAmount.textContent = ingredient.amount * quantity;

      recipeIngredient.appendChild(recipeIngredientName);
      recipeIngredient.appendChild(recipeIngredientAmount);

      recipeIngredientContainer.appendChild(recipeIngredient);
      recipeContainer.appendChild(recipeIngredientContainer);
    });
  };

  const hookInputEvents = (input, craft) => {
    input.addEventListener("input", () => {
      let multiplier = input.value;
      if (multiplier <= 1) {
        multiplier = 1;
      }
      showRecipe(craft, multiplier);
    });
  };

  const createRecipe = (craft) => {
    const recipeWrapper = document.querySelector(".recipe-wrapper");
    recipeWrapper.replaceChildren("");

    const recipeTitle = document.createElement("div");
    const recipeRarity = document.createElement("div");

    const recipeContainer = document.createElement("div");

    const btnGroup = document.createElement("div");
    const decreaseBtn = document.createElement("button");
    const quantityInput = document.createElement("input");
    const increaseBtn = document.createElement("button");

    recipeTitle.classList.add("recipe-title");
    recipeRarity.classList.add("recipe-rarity");
    recipeContainer.classList.add("recipe-container");

    btnGroup.classList.add("recipe-buttons");
    decreaseBtn.classList.add("decrease-btn");
    quantityInput.classList.add("recipe-quantity");
    increaseBtn.classList.add("increase-btn");

    const addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("recipe-add-btn");
    addTodoBtn.textContent = "Add";

    recipeRarity.textContent = craft.rarity;
    decreaseBtn.textContent = "-";
    increaseBtn.textContent = "+";

    quantityInput.value = 1;

    recipeWrapper.appendChild(recipeTitle);
    recipeWrapper.appendChild(recipeRarity);
    recipeWrapper.appendChild(recipeContainer);

    showRecipe(craft);

    addTodoBtn.addEventListener("click", () => {
      todo.addToList(craft, quantityInput.value);
      showTodo();
      showBreakdown();
    });

    increaseBtn.addEventListener("click", () => {
      quantityInput.value = quantityInput.value * 1 + 1;
      if (quantityInput.value < 1) {
        quantityInput.value = 1;
      }
      showRecipe(craft, quantityInput.value);
    });

    decreaseBtn.addEventListener("click", () => {
      quantityInput.value = quantityInput.value * 1 - 1;
      if (quantityInput.value < 1) {
        quantityInput.value = 1;
      }
      showRecipe(craft, quantityInput.value);
    });

    hookInputValidations(quantityInput);
    hookInputEvents(quantityInput, craft);

    btnGroup.appendChild(decreaseBtn);
    btnGroup.appendChild(quantityInput);
    btnGroup.appendChild(increaseBtn);

    recipeWrapper.appendChild(btnGroup);
    recipeWrapper.appendChild(addTodoBtn);
  };

  const createCrafts = () => {
    const craftsWrapper = document.querySelector(".crafts-wrapper");

    recipes.all.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name == b.name) {
        return 0;
      }
      return -1;
    });

    recipes.all.forEach((craft) => {
      const craftContainer = document.createElement("div");
      craftContainer.classList.add("craft-container");

      craftContainer.textContent = craft.name;
      craftContainer.setAttribute("data-name", craft.name);

      craftContainer.tabIndex = -1;

      craftContainer.addEventListener("click", () => {
        createRecipe(craft);
        selectCard(craftContainer);
      });

      craftContainer.addEventListener("focusin", () => {
        createRecipe(craft);
        selectCard(craftContainer);
      });

      craftsWrapper.appendChild(craftContainer);
    });
  };

  const selectCard = (card) => {
    const cards = Array.from(
      document.querySelectorAll(".craft-container:not(.hidden)")
    );

    cards.forEach((div) => {
      div.classList.remove("selected");
    });
    if (card != null) {
      card.classList.add("selected");
    }
  };
  const createTodo = () => {
    const todoWrapper = document.querySelector(".todo-wrapper");

    const todoTitle = document.createElement("div");
    const todoContainer = document.createElement("div");
    const clearListBtn = document.createElement("button");

    todoTitle.classList.add("todo-title");
    todoContainer.classList.add("todo-container");
    clearListBtn.classList.add("todo-clear-btn");
    clearListBtn.classList.add("hidden");

    todoTitle.textContent = "Todo List";

    clearListBtn.textContent = "Clear List";
    clearListBtn.addEventListener("click", () => {
      todo.clearList();
      showTodo();
      showBreakdown();
    });

    todoWrapper.appendChild(todoTitle);
    todoWrapper.appendChild(clearListBtn);
    todoWrapper.appendChild(todoContainer);
  };

  const createBreakdown = () => {
    const breakdownWrapper = document.querySelector(".breakdown-wrapper");

    const breakdownContainer = document.createElement("div");
    const breakdownTitle = document.createElement("div");

    breakdownContainer.classList.add("breakdown-container");
    breakdownTitle.classList.add("breakdown-title");

    breakdownTitle.textContent = "Todo Breakdown";

    breakdownWrapper.appendChild(breakdownTitle);
    breakdownWrapper.appendChild(breakdownContainer);
  };

  const createTotal = () => {
    const totalWrapper = document.querySelector(".total-wrapper");

    const totalContainer = document.createElement("div");
    const totalTitle = document.createElement("div");

    totalContainer.classList.add("total-container");
    totalTitle.classList.add("total-title");
    totalTitle.textContent = "Total";

    totalWrapper.appendChild(totalTitle);
    totalWrapper.appendChild(totalContainer);
  };

  const showBreakdown = () => {
    const breakdownContainer = document.querySelector(".breakdown-container");
    breakdownContainer.replaceChildren("");

    todo.all.forEach((item) => {
      const breakdownItemContainer = document.createElement("div");
      breakdownItemContainer.classList.add("breakdown-item-container");

      const breakdownChild = document.createElement("div");
      breakdownChild.classList.add("breakdown-child");

      const breakdownParent = document.createElement("div");
      breakdownParent.classList.add("breakdown-parent");

      const breakdownParentItem = document.createElement("div");
      breakdownParentItem.classList.add("breakdown-parent-item");

      const breakdownParentAmount = document.createElement("div");
      breakdownParentAmount.classList.add("breakdown-parent-amount");

      breakdownParentItem.textContent = item.item.name;
      breakdownParentAmount.textContent = item.amount;

      breakdownParent.appendChild(breakdownParentItem);
      breakdownParent.appendChild(breakdownParentAmount);

      breakdownItemContainer.appendChild(breakdownParent);

      Recipe.breakdown(item).consolidated.forEach((subItem) => {
        const breakdownItem = document.createElement("div");
        const breakdownItemName = document.createElement("div");
        const breakdownItemAmount = document.createElement("div");

        breakdownItem.classList.add("breakdown-item");
        breakdownItemName.classList.add("breakdown-item-name");
        breakdownItemAmount.classList.add("breakdown-item-amount");

        breakdownItemName.textContent = subItem.item.name;
        breakdownItemAmount.textContent = subItem.amount * item.amount;

        breakdownItem.appendChild(breakdownItemName);
        breakdownItem.appendChild(breakdownItemAmount);
        breakdownChild.appendChild(breakdownItem);

        breakdownChild.classList.add("hidden");
        breakdownItemContainer.appendChild(breakdownChild);
      });
      breakdownItemContainer.addEventListener("click", () => {
        breakdownChild.classList.toggle("hidden");
      });
      breakdownContainer.appendChild(breakdownItemContainer);
    });
    showTotal();
  };

  const showTotal = (quantity = 1) => {
    const totals = [];

    const totalWrapper = document.querySelector(".total-wrapper");

    const totalContainer = document.querySelector(".total-container");
    totalContainer.replaceChildren("");

    todo.all.forEach((item) => {
      Recipe.breakdown(item).consolidated.forEach((subItem) => {
        subItem.amount *= item.amount;
        totals.push(subItem);
      });
    });

    Recipe.consolidate(totals).forEach((item) => {
      const totalItemContainer = document.createElement("div");
      totalItemContainer.classList.add("total-item-container");

      const totalItem = document.createElement("div");
      totalItem.classList.add("total-item");

      const totalItemAmount = document.createElement("div");
      totalItemAmount.classList.add("total-item-amount");

      totalItem.textContent = item.item.name;
      totalItemAmount.textContent = item.amount;

      totalItemContainer.appendChild(totalItem);
      totalItemContainer.appendChild(totalItemAmount);

      totalContainer.appendChild(totalItemContainer);
    });

    // console.log(Recipe.consolidate(totals));
  };

  const showTodo = () => {
    const clearBtn = document.querySelector(".todo-clear-btn");

    todo.all.length === 0
      ? clearBtn.classList.add("hidden")
      : clearBtn.classList.remove("hidden");

    const todoWrapper = document.querySelector(".todo-wrapper");

    const todoContainer = document.querySelector(".todo-container");
    todoContainer.replaceChildren("");

    todo.all.forEach((item) => {
      const todoItem = document.createElement("div");
      const todoItemName = document.createElement("div");
      const todoButtons = document.createElement("div");
      const todoInput = document.createElement("input");
      const todoDecrease = document.createElement("button");
      const todoIncrease = document.createElement("button");

      todoItem.classList.add("todo-item");
      todoItemName.classList.add("todo-item-name");
      todoButtons.classList.add("todo-item-buttons");
      todoInput.classList.add("todo-item-amount");
      todoDecrease.classList.add("todo-item-decrease");
      todoIncrease.classList.add("todo-item-increase");

      const buttons = { todoInput, todoDecrease, todoIncrease };
      hookTodoButtonsEvents(item, buttons);

      todoItemName.textContent = item.item.name;
      todoInput.value = item.amount;
      todoDecrease.textContent = "-";
      todoIncrease.textContent = "+";

      todoButtons.appendChild(todoDecrease);
      todoButtons.appendChild(todoInput);
      todoButtons.appendChild(todoIncrease);

      todoItem.appendChild(todoItemName);
      todoItem.appendChild(todoButtons);

      todoContainer.appendChild(todoItem);
    });
  };

  const hookTodoButtonsEvents = (item, buttons) => {
    buttons.todoDecrease.addEventListener("click", () => {
      if (buttons.todoInput.value === "1") {
        todo.deleteItem(item);
        showTodo();
        showBreakdown();
      } else {
        todo.decreaseQuantity(item.item.name);
        buttons.todoInput.value = item.amount;
        showBreakdown();
      }
    });

    buttons.todoIncrease.addEventListener("click", () => {
      todo.increaseQuantity(item.item.name);
      buttons.todoInput.value = item.amount;
      showBreakdown();
    });

    hookInputValidations(buttons.todoInput);

    buttons.todoInput.addEventListener("input", () => {
      todo.findByName(item.item.name).amount = buttons.todoInput.value;
      //   buttons.todoInput.value = item.amount;
      showBreakdown();
    });
  };

  const hookKeyboardNavigation = () => {
    const searchBar = document.querySelector(".search-bar");

    const firstCraftContainer = document.querySelector(".craft-container");
    selectCard(firstCraftContainer);
    firstCraftContainer.focus();

    window.addEventListener("keydown", (e) => {
      //   console.log(e.code);
      const cards = Array.from(
        document.querySelectorAll(".craft-container:not(.hidden)")
      );

      let currentCard = cards.find((card) =>
        card.classList.contains("selected")
      );

      if (currentCard === undefined) {
        currentCard = cards[0];
        selectCard(currentCard);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = 1;

        const currentIndex = cards.indexOf(currentCard);
        if (currentIndex !== cards.length - 1) {
          currentCard.classList.remove("selected");
          const nextCard = cards[currentIndex + next];
          nextCard.classList.add("selected");
          nextCard.focus();
        }
      }

      if (e.key === "ArrowUp" && e.shiftKey == false) {
        e.preventDefault();
        const next = -1;

        const currentIndex = cards.indexOf(currentCard);
        if (currentIndex !== 0) {
          currentCard.classList.remove("selected");
          const nextCard = cards[currentIndex + next];
          nextCard.classList.add("selected");
          nextCard.focus();
        } else {
          searchBar.focus();
          searchBar.select();
        }
      }

      if (e.shiftKey === true && e.key === "ArrowUp") {
        e.preventDefault();
        searchBar.focus();
        searchBar.select();
      }

      if (!document.activeElement.classList.contains("search-bar")) {
        if (document.activeElement.tagName.toLocaleLowerCase() !== "input") {
          if (e.code >= "KeyA" && e.code <= "KeyZ" && e.ctrlKey === false) {
            searchBar.focus();
            searchBar.select();
          }
          if (e.key === "Backspace") {
            searchBar.focus();
          }
        }
      }

      if (
        document.activeElement.classList.contains("craft-container") &&
        e.key === "Enter"
      ) {
        const craft = recipes.findByName(
          document.activeElement.getAttribute("data-name")
        );
        todo.addToList(craft);
        showTodo();
        showBreakdown();
      }

      if (document.activeElement.classList.contains("search-bar")) {
        console.log("searchbar-enter");
        if (e.key === "Enter") {
          todo.addToList(
            recipes.findByName(currentCard.getAttribute("data-name"))
          );
          showTodo();
          showBreakdown();
        }
      }

      //   console.log(e.key);
    });
  };

  const hookSearchEvent = () => {
    const searchBar = document.querySelector(".search-bar");

    searchBar.addEventListener("input", (e) => {
      const input = searchBar.value.toLocaleLowerCase().trimStart();
      const cards = Array.from(document.querySelectorAll(".craft-container"));
      if (cards != null) {
        cards.forEach((card) => {
          card.classList.remove("hidden");
          if (!card.textContent.includes(input)) {
            card.classList.add("hidden");
          }
        });
        const firstVisible = document.querySelector(
          ".craft-container:not(.hidden)"
        );

        if (firstVisible != null) {
          selectCard(firstVisible);
        }
      }
    });
  };

  const render = () => {
    setupPageLayout();
    createCrafts();
    createBreakdown();
    createTodo();
    createTotal();
    showTodo();
    showBreakdown();
    hookKeyboardNavigation();
    hookSearchEvent();
    // console.log("render");
  };
  return { render };
})();

export { dom };
