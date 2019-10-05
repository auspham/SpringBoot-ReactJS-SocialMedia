package com.sept.rest.webservices.restfulwebservices.post;

import java.net.URI;
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

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class PostJpaResource {
	
	// @Autowired
	// private TodoHardcodedService todoService;

	@Autowired
	private PostJpaRepository postJpaRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/jpa/users/")
	public List<DAOUser> getAllUser() {
		return userRepository.findAll();
	}
	@GetMapping("/jpa/users/todos")
	public List<Post> getAll() {
		return postJpaRepository.findAll();
	}

	@GetMapping("/jpa/users/{username}/todos")
	public List<Post> getAllTodos(@PathVariable String username){
		return postJpaRepository.findByUsername(username);
		//return todoService.findAll();
	}

	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Post getTodo(@PathVariable String username, @PathVariable long id){
		return postJpaRepository.findById(id).get();
		//return todoService.findById(id);
	}

	@GetMapping("/jpa/users/{username}/todos/{id}/comments")
	public List<PostComment> getComments(@PathVariable String username, @PathVariable long id){
		return postJpaRepository.findById(id).get().getComments();
	}

	@PostMapping("/jpa/users/{username}/todos/{id}/comments")
	public ResponseEntity<Void> PostMapping(@PathVariable String username, @PathVariable long id, @RequestBody PostComment comment){
		System.out.println("id " + id);
		System.out.println("Comment: " + comment);
		Post updatedPost = postJpaRepository.findById(id).get().addComment(comment);

		updatedPost.setUsername(username);

		System.out.println("updatedTodo ID: " + updatedPost.getId());
		System.out.println("updatedTodo Username: " + updatedPost.getUsername());

		postJpaRepository.save(updatedPost); // here lies the problem

		return ResponseEntity.noContent().build();
	}

	// DELETE /users/{username}/todos/{id}
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
		postJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	

	//Edit/Update a Todo
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Post> updateTodo(
			@PathVariable String username,
			@PathVariable long id, @RequestBody Post post){
		
		post.setUsername(username);
		post.setComments(postJpaRepository.findById(id).get().getComments());
		Post postUpdated = postJpaRepository.save(post);
		
		return new ResponseEntity<Post>(post, HttpStatus.OK);
	}
	
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(
			@PathVariable String username, @RequestBody Post post){
		
		post.setUsername(username);

		Post createdPost = postJpaRepository.save(post);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdPost.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}
