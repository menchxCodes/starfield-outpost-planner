import "./styles/style.css";
import { dom } from "./scripts/dom";
import { todo } from "./scripts/Todo";

if (localStorage.getItem("localTodo") != null) {
  const data = JSON.parse(localStorage.getItem("localTodo"));
  todo.all = data;
}

dom.render();
