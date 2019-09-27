package com.sept.rest.webservices.restfulwebservices.controller;

import com.sept.rest.webservices.restfulwebservices.dao.DBFileRepository;
import com.sept.rest.webservices.restfulwebservices.model.DBFile;
import com.sept.rest.webservices.restfulwebservices.model.Profile;
import com.sept.rest.webservices.restfulwebservices.payload.UploadFileResponse;
import com.sept.rest.webservices.restfulwebservices.service.DBFileStorageService;
import com.sept.rest.webservices.restfulwebservices.service.JwtUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private DBFileStorageService DBFileStorageService;

    @Autowired
    private DBFileRepository dbFileRepository;

    @Autowired
    JwtUserDetailsService jwtInMemoryUserDetailsService;

    
    @PostMapping("/jpa/uploadAvatar/{username}")
    public UploadFileResponse uploadAvatar( @PathVariable String username, @RequestBody MultipartFile file) {
    	
        DBFile dbFile = DBFileStorageService.storeFile(file);


        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/avatar/")
                .path(username)
                .toUriString();
        System.out.println("This user: " + username);
        System.out.println("File Avatar URL: " + fileDownloadUri);

        DBFile toDelete =  dbFileRepository.findByFileURL(fileDownloadUri);

        if(toDelete != null){
            dbFileRepository.deleteById(toDelete.getId());
        }

        dbFile.setFileURL(fileDownloadUri);

        dbFileRepository.save(dbFile);
        System.out.println(dbFile);


        Profile updated = jwtInMemoryUserDetailsService.assignAvatar(username, dbFile);


        return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }
    
    @PostMapping("/jpa/uploadBackground/{username}")
    public UploadFileResponse uploadBackground( @PathVariable String username, @RequestBody MultipartFile file) {
    	
        DBFile dbFile = DBFileStorageService.storeFile(file);


        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/background/")
                .path(username)
                .toUriString();

        DBFile toDelete =  dbFileRepository.findByFileURL(fileDownloadUri);

        if(toDelete != null){
            dbFileRepository.deleteById(toDelete.getId());
        }

        dbFile.setFileURL(fileDownloadUri);
        dbFileRepository.save(dbFile);


        Profile updated = jwtInMemoryUserDetailsService.assignBackground(username, dbFile);


        return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    

    /*
    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, DBFileDTO username) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

     */
    
    @GetMapping("/avatar/{username}")
    public ResponseEntity<Resource> downloadAvatarFile(@PathVariable String username) {
        // Load file from database
        DBFile dbFile = DBFileStorageService.getAvatarByProfile(username);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
    
    @GetMapping("/background/{username}")
    public ResponseEntity<Resource> downloadBackgroundFile(@PathVariable String username) {
        // Load file from database
        DBFile dbFile = DBFileStorageService.getBackgroundByProfile(username);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
    
    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        // Load file from database
        DBFile dbFile = DBFileStorageService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }

}
