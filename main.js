"use strict";
var app = new Vue({
  el: "#app",
  data: {
    filteredTodos: [],
    addTitle: "",
    deadline: null,
  },
  created: function () {
    this.deadline = this.formatDate(new Date());
  },
  methods: {
    formatDate: function (dt) {
      const y = dt.getFullYear();
      const m = ("00" + (dt.getMonth() + 1)).slice(-2);
      const d = ("00" + dt.getDate()).slice(-2);
      const result = y + "-" + m + "-" + d;
      return result;
    },
    addTasks: function () {
      if (!this.addTitle.length) {
        return;
      }
      this.todos.push({
        id: this.getUniqueStr(this.todo),
        title: this.addTitle,
        deadline: this.deadline,
      });
      this.addTitle = "";
    },
    removeTask: function (todo) {
      if (confirm("本当に削除しますか？")) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
      }
    },
    getUniqueStr: function (myStrong) {
      let strong = 1000;
      if (myStrong) strong = myStrong;
      return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
      );
    },
    editTask(id) {
      let newTitle = window.prompt("以下内容で更新します。");
      if (newTitle === "") {
        alert("入力欄が空欄です。");
        return;
      }
      this.edit(id, newTitle);
    },
    edit(index, title) {
      this.todos[index].title = title;
    },
    changeToDo(id) {
      let changeIndex = "";
      this.todos.some(function (value, index) {
        if (value.id === id) {
          changeIndex = index;
        }
      });
      this.todos[changeIndex].flag = this.change(changeIndex);
    },
    change(changeIndex) {
      if (this.todos[changeIndex].flag === true) {
        return false;
      } else {
        return true;
      }
    },
  },
});
