package com.sept.rest.webservices.restfulwebservices.profiletest;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.sept.rest.webservices.restfulwebservices.model.ProfileDTO;
import com.sept.rest.webservices.restfulwebservices.model.ProfileRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class DuplicateValues {
	
	@Autowired
	private ProfileRepository profileRepository; 
	
	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;
	
	ProfileDTO newProfile1 = new ProfileDTO();
	
	@Before
	public void setUp() throws Exception {
		newProfile1.setUsername("lam");
		newProfile1.setFirstname("Lam");
		newProfile1.setLastname("Tran");
		newProfile1.setEmail("lamtran@gmail.com");
		newProfile1.setStudentnumber("s3714110");
		newProfile1.setPhonenumber("0432691030");
		
		jwtInMemoryUserDetailsService.update(newProfile1);
	}

	@Test
	public void testDuplicateEmail() {
		assertFalse("This email is not in use",jwtInMemoryUserDetailsService.checkEmail("test@gmail.com"));
		assertTrue("This email is already in use",jwtInMemoryUserDetailsService.checkEmail("lamtran@gmail.com"));
	}
	
	@Test
	public void testDuplicateStudentnumber() {
		assertFalse("This Student number is not in use",jwtInMemoryUserDetailsService.checkStudentnumber("s1111111"));
		assertTrue("This Student number is already in use",jwtInMemoryUserDetailsService.checkStudentnumber("s3714110"));
	}
	
	@Test
	public void testDuplicatePhonenumber() {
		assertFalse("This phone number is not in use",jwtInMemoryUserDetailsService.checkPhonenumber("0432111111"));
		assertTrue("This phone number is already in use",jwtInMemoryUserDetailsService.checkPhonenumber("0432691030"));
	}
	
	@After
	public void cleanUpData() {
		profileRepository.deleteAll();
	}

}
