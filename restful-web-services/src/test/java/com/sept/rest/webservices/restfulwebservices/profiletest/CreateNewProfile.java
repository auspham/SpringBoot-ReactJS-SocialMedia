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

import com.sept.rest.webservices.restfulwebservices.model.Profile;
import com.sept.rest.webservices.restfulwebservices.model.ProfileDTO;
import com.sept.rest.webservices.restfulwebservices.model.ProfileRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class CreateNewProfile {
	
	@Autowired
	private ProfileRepository profileRepository; 
	
	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;
	
	ProfileDTO newProfile1 = new ProfileDTO();
	ProfileDTO newProfile2 = new ProfileDTO();
	
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
		
		
	}

	@Test
	public void putProfile1InDatabase() {
		jwtInMemoryUserDetailsService.update(newProfile1);
		Profile test = profileRepository.findByUsername(newProfile1.getUsername());
		
		assertNotNull("Profile 1 found in database",test);
		assertEquals(newProfile1.getUsername(), test.getUsername());
		assertEquals(newProfile1.getFirstname(), test.getFirstname());
		assertEquals(newProfile1.getLastname(), test.getLastname());
		assertEquals(newProfile1.getEmail(), test.getEmail());
		assertEquals(newProfile1.getStudentnumber(), test.getStudentnumber());
		assertEquals(newProfile1.getPhonenumber(), test.getPhonenumber());
		
	}
	
	@Test
	public void putProfile2InDatabase() {
		jwtInMemoryUserDetailsService.update(newProfile2);
		
		Profile test = profileRepository.findByUsername(newProfile2.getUsername());
		
		assertNotNull("Profile 2 found in database",test);
		assertEquals(newProfile2.getUsername(), test.getUsername());
		assertEquals(newProfile2.getFirstname(), test.getFirstname());
		assertEquals(newProfile2.getLastname(), test.getLastname());
		assertEquals(newProfile2.getEmail(), test.getEmail());
		assertEquals(newProfile2.getStudentnumber(), test.getStudentnumber());
		assertEquals(newProfile2.getPhonenumber(), test.getPhonenumber());
	}
	
	@After
	public void cleanUpData() {
		profileRepository.deleteAll();
	}
}
