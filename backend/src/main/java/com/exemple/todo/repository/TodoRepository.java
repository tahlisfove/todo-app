package com.exemple.todo.repository;

import com.exemple.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // on hérite de toutes les méthodes CRUD de JpaRepository
}
