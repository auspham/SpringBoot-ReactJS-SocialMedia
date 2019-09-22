package com.sept.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import com.sept.rest.webservices.restfulwebservices.model.DAOUser;
import com.sept.rest.webservices.restfulwebservices.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sept.rest.webservices.restfulwebservices.todo.Todo;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoJpaResource {
	
	// @Autowired
	// private TodoHardcodedService todoService;

	@Autowired
	private TodoJpaRepository todoJpaRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/jpa/users/")
	public List<DAOUser> getAllUser() {
		return userRepository.findAll();
	}
	@GetMapping("/jpa/users/todos")
	public List<Todo> getAll() {
		return todoJpaRepository.findAll();
	}

	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoJpaRepository.findByUsername(username);
		//return todoService.findAll();
	}

	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		return todoJpaRepository.findById(id).get();
		//return todoService.findById(id);
	}

	@GetMapping("/jpa/users/{username}/todos/{id}/comments")
	public List<TodoComment> getComments(@PathVariable String username, @PathVariable long id){
		return todoJpaRepository.findById(id).get().getComments();
	}

	@PostMapping("/jpa/users/{username}/todos/{id}/comments")
	public ResponseEntity<Void> PostMapping(@PathVariable String username, @PathVariable long id, @RequestBody TodoComment comment){
		System.out.println("id " + id);
		System.out.println("Comment: " + comment);
		Todo updatedTodo = todoJpaRepository.findById(id).get().addComment(comment);

		updatedTodo.setUsername(username);

		System.out.println("updatedTodo ID: " + updatedTodo.getId());
		System.out.println("updatedTodo Username: " + updatedTodo.getUsername());

		todoJpaRepository.save(updatedTodo); // here lies the problem

		return ResponseEntity.noContent().build();
	}

	// DELETE /users/{username}/todos/{id}
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
		todoJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	

	//Edit/Update a Todo
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String username,
			@PathVariable long id, @RequestBody Todo todo){
		
		todo.setUsername(username);
		todo.setComments(todoJpaRepository.findById(id).get().getComments());
		Todo todoUpdated = todoJpaRepository.save(todo);
		
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(
			@PathVariable String username, @RequestBody Todo todo){
		
		todo.setUsername(username);

		Todo createdTodo = todoJpaRepository.save(todo);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}
