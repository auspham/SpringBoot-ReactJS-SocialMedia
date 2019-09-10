package com.sept.rest.webservices.restfulwebservices.service;

import com.sept.rest.webservices.restfulwebservices.dao.UserDao;
import com.sept.rest.webservices.restfulwebservices.model.DAOUser;
import com.sept.rest.webservices.restfulwebservices.model.UserDTO;
import com.sept.rest.webservices.restfulwebservices.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
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