package com.sept.rest.webservices.restfulwebservices.dao;


import org.springframework.data.repository.CrudRepository;
import com.sept.rest.webservices.restfulwebservices.model.DAOUser;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Integer> {
    DAOUser findByUsername(String username);
}