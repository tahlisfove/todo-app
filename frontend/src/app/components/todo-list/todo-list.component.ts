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

  filterPriority: string = 'all';
  sortOption: string = 'priority';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      // récupère l'ordre local
      const savedOrder: number[] = JSON.parse(localStorage.getItem('todosOrder') || '[]');

      if (savedOrder.length) {
        this.todos = savedOrder
          .map((id: number) => todos.find(t => t.id === id))
          .filter((t): t is Todo => t !== undefined);
        this.todos.push(...todos.filter(t => !savedOrder.includes(t.id!)));
      } else {
        this.todos = todos;
      }

      this.applyFiltersAndSort();
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: updated => {
        const index = this.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) this.todos[index] = { ...this.todos[index], ...updated };
        this.applyFiltersAndSort();
      },
      error: err => console.error('Erreur mise à jour', err)
    });
  }

  deleteTodo(id?: number) {
    if (!id) return;
    this.todos = this.todos.filter(t => t.id !== id);
    this.applyFiltersAndSort();
    this.saveOrder();

    this.todoService.deleteTodo(id).subscribe({
      error: err => console.error('Erreur suppression backend', err)
    });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    // drag & drop uniquement pour les non-complétées
    const nonCompleted = this.filteredTodos.filter(t => !t.completed);
    moveItemInArray(nonCompleted, event.previousIndex, event.currentIndex);

    const completed = this.filteredTodos.filter(t => t.completed);
    this.filteredTodos = [...nonCompleted, ...completed];
    this.todos = [...this.filteredTodos];
    this.saveOrder();
  }

  saveOrder() {
    const order: number[] = this.todos.map(t => t.id!);
    localStorage.setItem('todosOrder', JSON.stringify(order));
  }

  applyFiltersAndSort() {
    let result = [...this.todos];

    // filtrage par priorité
    if (this.filterPriority !== 'all') {
      result = result.filter(todo => todo.priority === this.filterPriority);
    }

    const notCompleted = result.filter(t => !t.completed);
    const completed = result.filter(t => t.completed);

    // tri uniquement des tâches non terminées
    switch (this.sortOption) {
      case 'title':
        notCompleted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'priority':
      default:
        const order = { high: 1, medium: 2, low: 3, none: 4 };
        notCompleted.sort(
          (a, b) => order[a.priority || 'none'] - order[b.priority || 'none']
        );
        break;
    }

    this.filteredTodos = [...notCompleted, ...completed];
  }

  onFilterChange() {
    this.applyFiltersAndSort();
  }
}
