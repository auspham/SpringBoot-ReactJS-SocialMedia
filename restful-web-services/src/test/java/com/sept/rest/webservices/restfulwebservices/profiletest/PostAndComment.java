package com.sept.rest.webservices.restfulwebservices.profiletest;

import static org.junit.Assert.assertEquals;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.model.ProfileDTO;
import com.sept.rest.webservices.restfulwebservices.model.ProfileRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;
import com.sept.rest.webservices.restfulwebservices.todo.Todo;
import com.sept.rest.webservices.restfulwebservices.todo.TodoComment;
import com.sept.rest.webservices.restfulwebservices.todo.TodoJpaRepository;

import io.restassured.RestAssured;


@RunWith(SpringRunner.class)
@SpringBootTest()
@Transactional
public class PostAndComment {
	
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;

	
	ProfileDTO newProfile1 = new ProfileDTO();
	ProfileDTO newProfile2 = new ProfileDTO();
	Todo todo1 = new Todo();
	TodoComment comment1 = new TodoComment();
	TodoComment comment2 = new TodoComment();
	

	@Before
	public void setUp() throws Exception {
		RestAssured.baseURI = "https://localhost";
		RestAssured.port = 8080;
		
		newProfile1.setUsername("lam");
		newProfile1.setFirstname("Lam");
		newProfile1.setLastname("Tran");
		newProfile1.setEmail("lamtran@gmail.com");
		newProfile1.setStudentnumber("s3714110");
		newProfile1.setPhonenumber("0432691030");
		
		
		newProfile2.setUsername("sept");
		newProfile2.setFirstname("Sept");
		newProfile2.setLastname("Class");
		newProfile2.setEmail("sept@gmail.com");
		newProfile2.setStudentnumber("s1111111");
		newProfile2.setPhonenumber("0432111111");
		
		todo1.setDescription("Description 1");
		todo1.setTargetDate(new Date());
		comment1 = new TodoComment("lam","Comment 1", new Date());
		comment2 = new TodoComment("sept","Comment 2", new Date());
	}

	@Test
	public void testPost() {
		
		todo1.setUsername("lam");
		todoJpaRepository.save(todo1);
		List<Todo> found = todoJpaRepository.findByUsername("lam");
		assertEquals("Description 1", found.get(0).getDescription());
	}
	
	@Test
	public void testEditPost() {

		todo1.setUsername("lam");
		todo1.setDescription("Edit 1");
		todoJpaRepository.save(todo1);
		List<Todo> found = todoJpaRepository.findByUsername("lam");
		assertEquals("Edit 1", found.get(0).getDescription());
	}
	
	@Test
	public void testCommentOnPost() {

		todo1.setUsername("lam");
		todo1.setDescription("Edit 1");
		todo1.addComment(comment1);
		todo1.addComment(comment2);
		todoJpaRepository.save(todo1);
		List<Todo> found = todoJpaRepository.findByUsername("lam");
		List<TodoComment> commentsFound = found.get(0).getComments();
		TodoComment comment1found = commentsFound.get(0);
		TodoComment comment2found = found.get(0).getComments().get(1);
		
		assertEquals("Comment 1", comment1found.getDescription());
		assertEquals("lam",comment1found.getUsername());
		assertEquals("Comment 2",comment2found.getDescription());
		assertEquals("sept",comment2found.getUsername());
	}
	
	@After
	public void cleanUp() {
		todoJpaRepository.deleteAll();
	}

}
