import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  title: string = '';
  priority: 'none' | 'low' | 'medium' | 'high' = 'none';

  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  addTodo() {
    // vérifier que le titre n'est pas vide
    if (!this.title.trim()) return;

    const newTodo: Todo = {
      title: this.title,
      completed: false,
      priority: this.priority || 'none',
    };

    // envoyer au backend
    this.todoService.addTodo(newTodo).subscribe(todo => {
      this.todoAdded.emit(todo);
      this.title = '';
      this.priority = 'none';
    });
  }
}
