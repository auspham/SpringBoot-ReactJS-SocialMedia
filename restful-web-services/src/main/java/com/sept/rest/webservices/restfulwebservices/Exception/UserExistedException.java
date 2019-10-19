package com.sept.rest.webservices.restfulwebservices.Exception;

public class UserExistedException extends RuntimeException {
    public UserExistedException(String message) {
        super(message);
    }

    public UserExistedException(String message, Throwable cause) {
        super(message, cause);
    }
}