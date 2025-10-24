import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
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
    this.todoService.getTodos().subscribe(todos => {
      const savedOrder: number[] = JSON.parse(localStorage.getItem('todosOrder') || '[]');
      if (savedOrder.length) {
        this.todos = savedOrder
          .map((id: number) => todos.find(t => t.id === id))
          .filter((t): t is Todo => t !== undefined);
        this.todos.push(...todos.filter(t => !savedOrder.includes(t.id!)));
      } else {
        this.todos = todos;
      }
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
      this.saveOrder();
    });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.saveOrder();
  }

  saveOrder() {
    const order: number[] = this.todos.map(t => t.id!);
    localStorage.setItem('todosOrder', JSON.stringify(order));
  }
}
