package com.exemple.todo.controller;

import com.exemple.todo.model.Todo;
import com.exemple.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    // récupérer tous les todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // créer un nouveau todo
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        if (todo.getPriority() == null) {
            todo.setPriority("none");
        }
        return todoRepository.save(todo);
    }

    // récupérer un todo par son id
    @GetMapping("/{id}")
    public Optional<Todo> getTodoById(@PathVariable Long id) {
        return todoRepository.findById(id);
    }

    // mettre à jour un todo
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id " + id));

        todo.setTitle(todoDetails.getTitle());
        todo.setCompleted(todoDetails.isCompleted());
        todo.setPriority(todoDetails.getPriority());

        return todoRepository.save(todo);
    }

    // supprimer un todo
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
