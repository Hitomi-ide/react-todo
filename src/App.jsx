import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { ImcompleteTodos } from "./components/ImcompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [imcompleteTodos, setImcompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return alert("TODOを入力してください");
    const newTodos = [...imcompleteTodos, todoText];
    setImcompleteTodos(newTodos);
    setTodoText("");
  };

  const alldelClick = () => {
    //const pop = prompt("何を一括削除しますか？")
    //各種ボタン要素を取得
    var dialog = document.getElementById("dialog");
    var imcomp = document.getElementById("imcomp");
    var comp = document.getElementById("comp");
    var cancel = document.getElementById("cancel");

    dialog.style.display = "block";

    //「未完了のTODO」が選択されたら
    imcomp.addEventListener("click", function () {
      setImcompleteTodos([]);
      dialog.style.display = "none";
      return;
    });

    //「完了したTODO」が選択されたら
    comp.addEventListener("click", function () {
      setCompleteTodos([]);
      dialog.style.display = "none";
      return;
    });

    //「キャンセル」がクリックされたら
    cancel.addEventListener("click", function () {
      console.log("cancel");
      dialog.style.display = "none";
      return;
    });
  };

  const onClickDelete = (index) => {
    const newTodos = [...imcompleteTodos];
    newTodos.splice(index, 1);
    setImcompleteTodos(newTodos);
  };

  const onClickDelete2 = (index) => {
    const newTodos = [...completeTodos];
    newTodos.splice(index, 1);
    setCompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newImcompleteTodos = [...imcompleteTodos];
    newImcompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, imcompleteTodos[index]];
    setImcompleteTodos(newImcompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newImcompleteTodos = [...imcompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setImcompleteTodos(newImcompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={imcompleteTodos.length >= 5}
        delClick={alldelClick}
      />

      <div id="dialog">
        <p>何を一括削除しますか？</p>
        <button id="imcomp">未完了のTODO</button>
        <button id="comp">完了したTODO</button>
        <button id="cancel">キャンセル</button>
      </div>

      {imcompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodo5個までだよ～。消化しろ～。
        </p>
      )}

      <ImcompleteTodos
        todos={imcompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
        onClickDelete={onClickDelete2}
      />
    </>
  );
};
