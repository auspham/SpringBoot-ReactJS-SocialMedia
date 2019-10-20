package com.sept.rest.webservices.restfulwebservices.negativetesting;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.Exception.DuplicateValueException;
import com.sept.rest.webservices.restfulwebservices.Exception.InvalidInputException;
import com.sept.rest.webservices.restfulwebservices.model.ProfileDTO;
import com.sept.rest.webservices.restfulwebservices.model.ProfileRepository;
import com.sept.rest.webservices.restfulwebservices.model.UserRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class ProfileNegativeTest {
	ProfileDTO profile1;
	ProfileDTO profile2;
	ProfileDTO profile3;
	

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;

	@Before
	public void setUp() {
		profile1 = new ProfileDTO();
		profile2 = new ProfileDTO();
		profile3 = new ProfileDTO();
		

		profile3.setUsername("sept");
		profile3.setFirstname("Sept");
		profile3.setLastname("Class");
		profile3.setEmail("sept@gmail.com");
		profile3.setStudentnumber("s1111111");
		profile3.setPhonenumber("0432111111");
		jwtInMemoryUserDetailsService.update(profile3);
	}

	
	@Test(expected = InvalidInputException.class)
	public void testInvalidUsername() {
		profile1.setUsername("#@$@#!$! 13123 HELLO !#$!");
		profile1.setFirstname("Lam");
		profile1.setLastname("Tran");
		profile1.setEmail("lamtran@gmail.com");
		profile1.setStudentnumber("s3714110");
		profile1.setPhonenumber("0432691030");
		jwtInMemoryUserDetailsService.update(profile1);
	}

	@Test(expected = InvalidInputException.class)
	public void testInvalidFirstname() {
		profile1.setUsername("lam");
		profile1.setFirstname("13123121 THIS IS !@#@!#!@ NOT A NAME");
		profile1.setLastname("Tran");
		profile1.setEmail("lamtran@gmail.com");
		profile1.setStudentnumber("s3714110");
		profile1.setPhonenumber("0432691030");
		jwtInMemoryUserDetailsService.update(profile1);
	}

	@Test(expected = InvalidInputException.class)
	public void testInvalidLastname() {
		profile1.setUsername("lam");
		profile1.setFirstname("Lam");
		profile1.setLastname("13123121 THIS IS !@#@!#!@ NOT A NAME");
		profile1.setEmail("lamtran@gmail.com");
		profile1.setStudentnumber("s3714110");
		profile1.setPhonenumber("0432691030");
		jwtInMemoryUserDetailsService.update(profile1);
	}

	@Test(expected = InvalidInputException.class)
	public void testInvalidEmail() {
		profile1.setUsername("lam");
		profile1.setFirstname("Lam");
		profile1.setLastname("Tran");
		profile1.setEmail("ksadjakdklsndalkndl");
		profile1.setStudentnumber("s3714110");
		profile1.setPhonenumber("0432691030");
		jwtInMemoryUserDetailsService.update(profile1);
	}

	@Test(expected = InvalidInputException.class)
	public void testInvalidStudentnumber() {
		profile1.setUsername("lam");
		profile1.setFirstname("Lam");
		profile1.setLastname("Tran");
		profile1.setEmail("lamtran@gmail.com");
		profile1.setStudentnumber("19203u120932109312");
		profile1.setPhonenumber("0432691030");
		jwtInMemoryUserDetailsService.update(profile1);
	}

	@Test(expected = InvalidInputException.class)
	public void testInvalidPhonenumber() {
		profile1.setUsername("lam");
		profile1.setFirstname("Lam");
		profile1.setLastname("Tran");
		profile1.setEmail("lamtran@gmail.com");
		profile1.setStudentnumber("s3714110");
		profile1.setPhonenumber("9129381290382109");
		jwtInMemoryUserDetailsService.update(profile1);
	}
	
	@Test(expected = NullPointerException.class)
	public void testProfileWithNoUsername() {
		ProfileDTO profile5 = new ProfileDTO();
		profile5.setFirstname("Apple");
		profile5.setLastname("Banana");
		profile5.setEmail("applebanana@gmail.com");
		profile5.setStudentnumber("s4562349");
		profile5.setPhonenumber("0432461248");
		jwtInMemoryUserDetailsService.update(profile5);
	}
	
	@Test(expected = NullPointerException.class)
	public void testProfileWithNoFirstname() {
		ProfileDTO profile5 = new ProfileDTO();
		profile5.setUsername("rmit");
		profile5.setLastname("Banana");
		profile5.setEmail("applebanana@gmail.com");
		profile5.setStudentnumber("s4562349");
		profile5.setPhonenumber("0432461248");
		jwtInMemoryUserDetailsService.update(profile5);
	}
	
	@Test(expected = NullPointerException.class)
	public void testProfileWithNoLastname() {
		ProfileDTO profile5 = new ProfileDTO();
		profile5.setUsername("rmit");
		profile5.setFirstname("Apple");
		profile5.setEmail("applebanana@gmail.com");
		profile5.setStudentnumber("s4562349");
		profile5.setPhonenumber("0432461248");
		jwtInMemoryUserDetailsService.update(profile5);
	}
	
	@Test(expected = NullPointerException.class)
	public void testProfileWithNoEmail() {
		ProfileDTO profile5 = new ProfileDTO();
		profile5.setUsername("rmit");
		profile5.setFirstname("Apple");
		profile5.setLastname("Banana");
		profile5.setStudentnumber("s4562349");
		profile5.setPhonenumber("0432461248");
		jwtInMemoryUserDetailsService.update(profile5);
	}
	
	@Test(expected = NullPointerException.class)
	public void testProfileWithNoStudentnumber() {
		ProfileDTO profile5 = new ProfileDTO();
		profile5.setUsername("rmit");
		profile5.setFirstname("Apple");
		profile5.setLastname("Banana");
		profile5.setEmail("applebanana@gmail.com");
		profile5.setPhonenumber("0432461248");
		jwtInMemoryUserDetailsService.update(profile5);
	}
	
	@Test(expected = NullPointerException.class)
	public void testProfileWithNoPhonenumber() {
		ProfileDTO profile5 = new ProfileDTO();
		profile5.setUsername("rmit");
		profile5.setFirstname("Apple");
		profile5.setLastname("Banana");
		profile5.setEmail("applebanana@gmail.com");
		profile5.setStudentnumber("s4562349");
		jwtInMemoryUserDetailsService.update(profile5);
	}
	

	@After
	public void cleanUp() {
		profileRepository.deleteAll();
	}

}
