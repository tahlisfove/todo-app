import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
