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
  filteredTodos: Todo[] = [];

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
      this.filteredTodos = [...this.todos];
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: updated => {
        // met à jour localement
        const index = this.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) this.todos[index] = updated;
      },
      error: err => console.error('Erreur mise à jour', err)
    });
  }

  deleteTodo(id?: number) {
    if (!id) return;
    this.todos = this.todos.filter(t => t.id !== id);
    this.filteredTodos = this.filteredTodos.filter(t => t.id !== id);
    this.saveOrder();

    // supprime côté backend
    this.todoService.deleteTodo(id).subscribe({
      error: err => console.error('Erreur suppression back', err)
    });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    moveItemInArray(this.filteredTodos, event.previousIndex, event.currentIndex);
    this.saveOrder();
  }

  saveOrder() {
    const order: number[] = this.todos.map(t => t.id!);
    localStorage.setItem('todosOrder', JSON.stringify(order));
  }
}
