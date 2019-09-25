package com.sept.rest.webservices.restfulwebservices.profiletest;

import static org.junit.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import static io.restassured.RestAssured.given;
import com.sept.rest.webservices.restfulwebservices.model.ProfileDTO;
import com.sept.rest.webservices.restfulwebservices.model.ProfileRepository;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UploadAvatarBackground extends HttpServlet  {
	
	@Autowired
	private ProfileRepository profileRepository; 
	
	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;
	

	
	
	
	ProfileDTO newProfile1 = new ProfileDTO();
	MultipartFile avatar;
	MultipartFile background;
	
	@Before
	public void setUp() throws Exception {
		newProfile1.setUsername("lam");
		newProfile1.setFirstname("Lam");
		newProfile1.setLastname("Tran");
		newProfile1.setEmail("lamtran@gmail.com");
		newProfile1.setStudentnumber("s3714110");
		newProfile1.setPhonenumber("0432691030");
	
		jwtInMemoryUserDetailsService.update(newProfile1);
		String avatarpath = this.getClass().getResourceAsStream("/rmit-avatar.jpg").toString();
		System.out.println("Avatar path "+ avatarpath);
		String backgroundpath = this.getClass().getResourceAsStream("rmit-background.png").toString();
		// not working atm
		 avatar =  new MockMultipartFile("rmit-avatar.jpg", new FileInputStream(new File(avatarpath)));
		 background = new MockMultipartFile("rmit-background.png", new FileInputStream(new File(backgroundpath)));
	}
	
	//fails atm
	@Test
	public void testUploadAvatar() throws Exception {
		RestAssured.baseURI = "https://localhost:8080";
		   given().urlEncodingEnabled(true)
		   .body(avatar)
		   .post("/jpa/uploadAvatar/lam")
		   .then().statusCode(200);
	}

}
