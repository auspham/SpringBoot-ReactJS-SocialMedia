package com.sept.rest.webservices.restfulwebservices.service;

import com.sept.rest.webservices.restfulwebservices.dao.DBFileRepository;
import com.sept.rest.webservices.restfulwebservices.dao.UserDao;
import com.sept.rest.webservices.restfulwebservices.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        DAOUser user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public DAOUser save(UserDTO user) {
        List<DAOUser> exists = userRepository.findByUsername(user.getUsername());
        if(exists.isEmpty()) {
            DAOUser newUser = new DAOUser();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            return userDao.save(newUser);
        } else {
            return null;
        }
    }
    public Profile assignAvatar(String username, DBFile file){
    	Profile profile = profileRepository.findByUsername(username);
    	profile.setAvatar(file.getFileURL());

    	return profileRepository.save(profile);
	}

	public Profile assignBackground(String username, DBFile file){
		Profile profile = profileRepository.findByUsername(username);
		profile.setBackground(file.getFileURL());

		return profileRepository.save(profile);
	}


    public Profile update(ProfileDTO profile) {
    	Profile exists = profileRepository.findByUsername(profile.getUsername());
    	Profile newProfile = new Profile();

    	if(exists == null) {
    		newProfile.setUsername(profile.getUsername());
    		newProfile.setAvatar("https://i.imgur.com/mri28UW.jpg");
    		newProfile.setBackground("https://i.imgur.com/0UCsTsa.png");

    	}
    	else {
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
    
    public boolean checkUsername(String username) {
    	boolean exist = false;
    	List<DAOUser> found = userRepository.findByUsername(username);
    	if(found.isEmpty()) {
    		exist = false;
    	}
    	else {
    		exist = true;
    	}
    	return exist;
    }
    
    public boolean checkStudentnumber(String studentnumber) {
    	boolean exist = false;
    	Profile found = profileRepository.findByStudentnumber(studentnumber);
    	if(found == null) {
    		exist = false;
    	}
    	else {
    		exist = true;
    	}
    	return exist;
    }
    
    public boolean checkEmail(String email) {
    	boolean exist = false;
    	Profile found = profileRepository.findByEmail(email);
    	if (found == null) {
    		exist = false;
    	}
    	else {
    		exist = true;
    	}
    	return exist;
    }
    
    public boolean checkPhonenumber(String phonenumber) {
    	boolean exist = false;
    	Profile found = profileRepository.findByPhonenumber(phonenumber);
    	if (found == null) {
    		exist = false;
    	}
    	else {
    		exist = true;
    	}
    	return exist;
    }

    /* Edit the username of a current user on the database,passes a Data Transfer Object of a user, and the username to be set */
    public DAOUser editUsername(UserDTO user, String username) {
        List<DAOUser> exists = userRepository.findByUsername(user.getUsername());
        if(exists.isEmpty()) {
            DAOUser newUser = new DAOUser();
            newUser.setUsername(username);
            return userDao.save(newUser);
        } else {
            return null;
        }
    }
}