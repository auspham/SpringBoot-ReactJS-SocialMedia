package com.sept.rest.webservices.restfulwebservices.post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostJpaRepository extends JpaRepository<Post, Long>{
	List<Post> findByUsername(String username);
}