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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.model.ProfileDTO;
import com.sept.rest.webservices.restfulwebservices.post.Post;
import com.sept.rest.webservices.restfulwebservices.post.PostComment;
import com.sept.rest.webservices.restfulwebservices.post.PostJpaRepository;

import io.restassured.RestAssured;


@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest()
@Transactional
public class PostAndComment {
	
	
	@Autowired
	private PostJpaRepository postJpaRepository;

	
	ProfileDTO newProfile1 = new ProfileDTO();
	ProfileDTO newProfile2 = new ProfileDTO();
	Post post1 = new Post();
	PostComment comment1 = new PostComment();
	PostComment comment2 = new PostComment();
	

	@Before
	public void setUp() throws Exception {
		
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
		
		post1.setDescription("Description 1");
		post1.setTargetDate(new Date());
		comment1 = new PostComment("lam","Comment 1", new Date());
		comment2 = new PostComment("sept","Comment 2", new Date());
	}

	@Test
	public void testPost() {
		
		post1.setUsername("lam");
		postJpaRepository.save(post1);
		List<Post> found = postJpaRepository.findByUsername("lam");
		assertEquals("Description 1", found.get(0).getDescription());
	}
	
	@Test
	public void testEditPost() {

		post1.setUsername("lam");
		post1.setDescription("Edit 1");
		postJpaRepository.save(post1);
		List<Post> found = postJpaRepository.findByUsername("lam");
		assertEquals("Edit 1", found.get(0).getDescription());
	}
	
	@Test
	public void testCommentOnPost() {

		post1.setUsername("lam");
		post1.setDescription("Edit 1");
		post1.addComment(comment1);
		post1.addComment(comment2);
		postJpaRepository.save(post1);
		List<Post> found = postJpaRepository.findByUsername("lam");
		List<PostComment> commentsFound = found.get(0).getComments();
		PostComment comment1found = commentsFound.get(0);
		PostComment comment2found = found.get(0).getComments().get(1);
		
		assertEquals("Comment 1", comment1found.getDescription());
		assertEquals("lam",comment1found.getUsername());
		assertEquals("Comment 2",comment2found.getDescription());
		assertEquals("sept",comment2found.getUsername());
	}
	
	@After
	public void cleanUp() {
		postJpaRepository.deleteAll();
	}

}
