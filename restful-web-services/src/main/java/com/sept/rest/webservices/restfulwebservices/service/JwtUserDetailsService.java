package com.sept.rest.webservices.restfulwebservices.service;

import com.sept.rest.webservices.restfulwebservices.Exception.DuplicateValueException;
import com.sept.rest.webservices.restfulwebservices.Exception.InvalidInputException;
import com.sept.rest.webservices.restfulwebservices.Exception.UserExistedException;
import com.sept.rest.webservices.restfulwebservices.dao.DBFileRepository;
import com.sept.rest.webservices.restfulwebservices.dao.UserDao;
import com.sept.rest.webservices.restfulwebservices.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	private static final String usernameRegex = "^[a-zA-Z0-9._-]*$";
	private static final String nameRegex = "^[a-zA-Z\\s]*$";
	private static final String phonenumberRegex = "^\\(?(?:\\+?61|0)(?:(?:2\\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$";
	private static final String emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
	private static final String studentnumberRegex = "^s[0-9]{7}$";
	private static final String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$";

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private DBFileRepository dbFileRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, InvalidInputException {

		boolean validUsername = Pattern.matches(usernameRegex, username);
		if (validUsername == false) {
			throw new InvalidInputException("Username: " + username + " is invalid");
		}

		DAOUser user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}

	public DAOUser save(UserDTO user) throws UserExistedException, InvalidInputException {
		boolean validUsername = Pattern.matches(usernameRegex, user.getUsername());
		boolean validPassword = Pattern.matches(passwordRegex, user.getPassword());

		if (validUsername == false) {
			throw new InvalidInputException("Username: " + user.getUsername() + " is invalid");
		}

		if (validPassword == false) {
			throw new InvalidInputException("Password: " + user.getPassword() + " is invalid");

		}

		List<DAOUser> exists = userRepository.findByUsername(user.getUsername());
		if (exists.isEmpty()) {
			DAOUser newUser = new DAOUser();
			newUser.setUsername(user.getUsername());
			newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
			return userDao.save(newUser);
		} else {
			throw new UserExistedException("User with username: " + user.getUsername() + " already existed");

		}
	}

	public Profile assignAvatar(String username, DBFile file) {
		Profile profile = profileRepository.findByUsername(username);
		profile.setAvatar(file.getFileURL());

		return profileRepository.save(profile);
	}

	public Profile assignBackground(String username, DBFile file) {
		Profile profile = profileRepository.findByUsername(username);
		profile.setBackground(file.getFileURL());

		return profileRepository.save(profile);
	}

	public Profile update(ProfileDTO profile) throws InvalidInputException,DuplicateValueException{
		
		boolean validUsername = Pattern.matches(usernameRegex, profile.getUsername());
		boolean validFirstname = Pattern.matches(nameRegex, profile.getFirstname());
		boolean validLastname = Pattern.matches(nameRegex, profile.getLastname());
		boolean validStudentnumber = Pattern.matches(studentnumberRegex, profile.getStudentnumber());
		boolean validPhonenumber = Pattern.matches(phonenumberRegex, profile.getPhonenumber());
		boolean validEmail = Pattern.matches(emailRegex, profile.getEmail());
	
		
		if (validUsername == false) {
			throw new InvalidInputException("Username: " + profile.getUsername() + " is invalid");
		}
		
		if (validFirstname == false) {
			throw new InvalidInputException("First name: " + profile.getFirstname() + " is invalid");
		}
		
		if (validLastname == false) {
			throw new InvalidInputException("Last name: " + profile.getLastname() + " is invalid");
		}
		
		if (validStudentnumber == false) {
			throw new InvalidInputException("Student number: " + profile.getStudentnumber() + " is invalid");
		}
		
		if (validPhonenumber == false) {
			throw new InvalidInputException("Phone number: " + profile.getPhonenumber() + " is invalid");
		}
		
		if (validEmail == false) {
			throw new InvalidInputException("Email: " + profile.getEmail() + " is invalid");
		}
		
		
		Profile exists = profileRepository.findByUsername(profile.getUsername());
		Profile newProfile = new Profile();

		if (exists == null) {
			newProfile.setUsername(profile.getUsername());
			newProfile.setAvatar("https://i.imgur.com/mri28UW.jpg");
			newProfile.setBackground("https://i.imgur.com/0UCsTsa.png");

		} else {
			newProfile = exists;

		}

		newProfile.setFirstname(profile.getFirstname());
		newProfile.setLastname(profile.getLastname());
		newProfile.setStudentnumber(profile.getStudentnumber());
		newProfile.setPhonenumber(profile.getPhonenumber());
		newProfile.setEmail(profile.getEmail());
		newProfile.setAboutme(profile.getAboutme());

		return profileRepository.save(newProfile);

	}

	public boolean checkUsername(String username)  {
		boolean exist = false;
		List<DAOUser> found = userRepository.findByUsername(username);
		if (found.isEmpty()) {
			exist = false;
		} else {
			exist = true;
		}
		return exist;
	}

	public boolean checkStudentnumber(String studentnumber) {
		boolean exist = false;
		Profile found = profileRepository.findByStudentnumber(studentnumber);
		if (found == null) {
			exist = false;
		} else {
			exist = true;

		}
		return exist;
	}

	public boolean checkEmail(String email) {
		boolean exist = false;
		Profile found = profileRepository.findByEmail(email);
		if (found == null) {
			exist = false;
		} else {
			exist = true;
		}
		return exist;
	}

	public boolean checkPhonenumber(String phonenumber) {
		boolean exist = false;
		Profile found = profileRepository.findByPhonenumber(phonenumber);
		if (found == null) {
			exist = false;
		} else {
			exist = true;
		}
		return exist;
	}

	/*
	 * Edit the username of a current user on the database,passes a Data Transfer
	 * Object of a user, and the username to be set
	 */
	public DAOUser editUsername(UserDTO user, String username) throws UserExistedException, InvalidInputException {
		List<DAOUser> exists = userRepository.findByUsername(user.getUsername());
		if (exists.isEmpty()) {
			DAOUser newUser = new DAOUser();
			newUser.setUsername(username);
			return userDao.save(newUser);
		} else {
			return null;
		}
	}
}