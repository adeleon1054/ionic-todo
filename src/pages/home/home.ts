import { Component } from "@angular/core";
import { NavController, AlertController, reorderArray } from "ionic-angular";
import { TodoProvider } from "../../providers/todo/todo";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;

  constructor(
    private todoProvider: TodoProvider,
    public navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.todos = this.todoProvider.getTodos();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  ionItemReorder($event) {
    reorderArray(this.todos, $event);
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: inputData => {
            let todoText;
            todoText = inputData.addTodoInput;
            // this.todos.push(todoText);
            this.todoProvider.addTodos(todoText);
          }
        }
      ]
    });
    addTodoAlert.present();
  }
}
