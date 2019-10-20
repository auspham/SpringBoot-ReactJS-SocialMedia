package com.sept.rest.webservices.restfulwebservices.negativetesting;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.Exception.InvalidInputException;
import com.sept.rest.webservices.restfulwebservices.model.UserDTO;
import com.sept.rest.webservices.restfulwebservices.model.UserRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class LoginNegativeTest {

	private UserDTO user1;
	private UserDTO user2;
	private UserDTO user3;
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;
	

	@Before
	public void setUp() {
		user1 = new UserDTO();
		user2 = new UserDTO();
		
		//create 2 users and registers into database
		user1.setUsername("lam");
		user1.setPassword("Hello123");
		jwtInMemoryUserDetailsService.save(user1);
		
		user2.setUsername("thang");
		user2.setPassword("Sept5678");
		jwtInMemoryUserDetailsService.save(user2);
		
	
	}
	
	@Test (expected = InvalidInputException.class)
	public void invalidUsernameTest() {
		String invalidUsername = "#$^&!@#RMIT@#$#@%3929";
		jwtInMemoryUserDetailsService.loadUserByUsername(invalidUsername);
		
	}
	
	@Test (expected = UsernameNotFoundException.class)
	public void usernameNotFoundTest() {
		String usernameThatNotInDatabase = "yoyo";
		jwtInMemoryUserDetailsService.loadUserByUsername(usernameThatNotInDatabase);
	}
	
	@Test (expected = NullPointerException.class)
	public void nullUsernameTest() {
		String nullString = null;
		jwtInMemoryUserDetailsService.loadUserByUsername(nullString);
	}
	
	@After
	public void cleanUp() {
		userRepository.deleteAll();
	}
	
}
