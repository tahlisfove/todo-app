import { Component, ViewChild } from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { Todo } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TodoListComponent) todoList!: TodoListComponent;

  onTodoAdded(todo: Todo) {
    this.todoList.loadTodos();
  }
}
