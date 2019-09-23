package com.sept.rest.webservices.restfulwebservices.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
	Profile findByUsername(String username);
	Profile findByStudentnumber(String studentnumber);
	Profile findByEmail(String email);
	Profile findByPhonenumber(String phonenumber);
}
