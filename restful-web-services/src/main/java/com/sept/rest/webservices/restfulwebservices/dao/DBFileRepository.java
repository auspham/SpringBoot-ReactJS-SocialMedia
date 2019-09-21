package com.sept.rest.webservices.restfulwebservices.dao;

import com.sept.rest.webservices.restfulwebservices.model.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {
    DBFile findByUsername(String username);

}
