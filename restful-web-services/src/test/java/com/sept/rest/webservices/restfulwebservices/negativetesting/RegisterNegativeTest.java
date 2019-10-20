package com.sept.rest.webservices.restfulwebservices.negativetesting;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.Exception.InvalidInputException;
import com.sept.rest.webservices.restfulwebservices.Exception.UserExistedException;
import com.sept.rest.webservices.restfulwebservices.model.UserDTO;
import com.sept.rest.webservices.restfulwebservices.model.UserRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class RegisterNegativeTest {
	private UserDTO user1;
	private UserDTO user2;
	private UserDTO user3;
	private UserDTO user4;
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;
	

	@Before
	public void setUp() {
		user1 = new UserDTO();
		user2 = new UserDTO();
		user3 = new UserDTO();
		user4 = new UserDTO();
		
		
		user1.setUsername("@&Y@ invalid username 12 #$@!");
		user1.setPassword("Hello123"); //correct password
		
		user2.setUsername("user2"); //correct username
		user2.setPassword("123aaa"); //invalid password
		
		
		//creating 2 identical users
		user3.setUsername("user3");
		user3.setPassword("Dummy12345");
		user4.setUsername("user3");
		user4.setPassword("Dummy12345");
	}
	
	@Test(expected = InvalidInputException.class)
	public void testInvalidUsername() {
		jwtInMemoryUserDetailsService.save(user1);
	}
	
	@Test(expected = InvalidInputException.class)
	public void testInvalidPassword() {
		jwtInMemoryUserDetailsService.save(user2);
	}
	
	@Test(expected = UserExistedException.class)
	public void testDuplicateUsers() {
		jwtInMemoryUserDetailsService.save(user3);
		jwtInMemoryUserDetailsService.save(user4);
	}
	
	@Test(expected = NullPointerException.class)
	public void userWithNoUsername() {
		UserDTO user5 = new UserDTO();
		user5.setPassword("Hello123456");
		jwtInMemoryUserDetailsService.save(user5);
	}
	
	@Test(expected = NullPointerException.class)
	public void userWithNoPassword() {
		UserDTO user6 = new UserDTO();
		user6.setUsername("user6");
		jwtInMemoryUserDetailsService.save(user6);
	}
	
	@After
	public void cleanUp() {
		userRepository.deleteAll();
	}

}
