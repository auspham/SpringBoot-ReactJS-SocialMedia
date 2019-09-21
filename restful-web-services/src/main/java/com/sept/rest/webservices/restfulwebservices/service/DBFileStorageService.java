package com.sept.rest.webservices.restfulwebservices.service;

import com.sept.rest.webservices.restfulwebservices.Exception.FileStorageException;
import com.sept.rest.webservices.restfulwebservices.Exception.MyFileNotFoundException;
import com.sept.rest.webservices.restfulwebservices.dao.DBFileRepository;
import com.sept.rest.webservices.restfulwebservices.dao.UserDao;
import com.sept.rest.webservices.restfulwebservices.model.DBFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DBFileStorageService  {

    @Autowired
    private DBFileRepository dbFileRepository;

    @Autowired
    private UserDao userDao;

    public DBFile storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            //DBFile exists = dbFileRepository.findByUsername(dbfile.getUsername());
            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());
//            if(exists == null) {
//                dbFile.setUsername(dbfile.getUsername());
//            }

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DBFile getFile(String fileId) {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }
}