package com.sept.rest.webservices.restfulwebservices.jwt.resource;

import com.sept.rest.webservices.restfulwebservices.jwt.JwtTokenUtil;
import com.sept.rest.webservices.restfulwebservices.jwt.JwtUserDetails;
import com.sept.rest.webservices.restfulwebservices.model.*;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JwtAuthenticationRestController {

	@Value("${jwt.http.request.header}")
	private String tokenHeader;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService jwtInMemoryUserDetailsService;

	@RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest)
			throws AuthenticationException {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = jwtInMemoryUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtTokenResponse(token));
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
		DAOUser result = jwtInMemoryUserDetailsService.save(user);
		if (result != null) {
			return ResponseEntity.ok(result);
		} else {
			return ResponseEntity.badRequest().body("Duplicated User");
		}
	}



	@GetMapping("/jpa/checkuser/username/{username}")
	public boolean checkDuplicateUser(@PathVariable String username) {
		boolean exist = jwtInMemoryUserDetailsService.checkUsername(username);
		return exist;

	}

	@GetMapping("/jpa/checkuser/studentnumber/{studentnumber}")
	public boolean checkDuplicateStudentnumber(@PathVariable String studentnumber) {
		boolean exist = jwtInMemoryUserDetailsService.checkStudentnumber(studentnumber);
		return exist;

	}
	
	@GetMapping("/jpa/checkuser/email/{email}")
	public boolean checkDuplicateEmail(@PathVariable String email) {
		boolean exist = jwtInMemoryUserDetailsService.checkEmail(email);
		return exist;

	}
	
	@GetMapping("/jpa/checkuser/phonenumber/{phonenumber}")
	public boolean checkDuplicatePhonennumber(@PathVariable String phonenumber) {
		boolean exist = jwtInMemoryUserDetailsService.checkPhonenumber(phonenumber);
		return exist;

	}


	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
	public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profile) throws Exception {
		Profile updated = jwtInMemoryUserDetailsService.update(profile);

		return ResponseEntity.ok(updated);

	}

	@RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
		String authToken = request.getHeader(tokenHeader);
		final String token = authToken.substring(7);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		JwtUserDetails user = (JwtUserDetails) jwtInMemoryUserDetailsService.loadUserByUsername(username);

		if (jwtTokenUtil.canTokenBeRefreshed(token)) {
			String refreshedToken = jwtTokenUtil.refreshToken(token);
			return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@ExceptionHandler({ AuthenticationException.class })
	public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}

	private void authenticate(String username, String password) {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new AuthenticationException("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new AuthenticationException("INVALID_CREDENTIALS", e);
		}
	}
}
