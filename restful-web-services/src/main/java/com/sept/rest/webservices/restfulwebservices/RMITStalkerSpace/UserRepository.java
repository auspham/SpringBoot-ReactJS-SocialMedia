package com.sept.rest.webservices.restfulwebservices.RMITStalkerSpace;

import com.sept.rest.webservices.restfulwebservices.RMITStalkerSpace.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}