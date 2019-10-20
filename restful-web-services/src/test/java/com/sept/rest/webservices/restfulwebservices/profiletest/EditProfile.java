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
public class EditProfile {
	
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
	public void testEditName() {
		newProfile1.setFirstname("Thang");
		newProfile1.setLastname("Pham");
		jwtInMemoryUserDetailsService.update(newProfile1);
		
		Profile test = profileRepository.findByUsername("lam");
		
		assertEquals("Thang", test.getFirstname());
		assertEquals("Pham", test.getLastname());
		
	}
	
	@Test
	public void testEditEmail() {
		newProfile1.setEmail("thang@gmail.com");
		jwtInMemoryUserDetailsService.update(newProfile1);
		
		Profile test = profileRepository.findByUsername("lam");
		
		assertEquals("thang@gmail.com", test.getEmail());
	
		
	}
	
	@Test
	public void testEditStudentnumber() {
		newProfile1.setStudentnumber("s1111111");
		jwtInMemoryUserDetailsService.update(newProfile1);
		
		Profile test = profileRepository.findByUsername("lam");
		
		assertEquals("s1111111", test.getStudentnumber());
	
		
	}
	
	@Test
	public void testEditPhonenumber() {
		newProfile1.setPhonenumber("0432111111");
		jwtInMemoryUserDetailsService.update(newProfile1);
		
		Profile test = profileRepository.findByUsername("lam");
		
		assertEquals("0432111111", test.getPhonenumber());
	
		
	}
	
	@After
	public void cleanUpData() {
		profileRepository.deleteAll();
	}

}
