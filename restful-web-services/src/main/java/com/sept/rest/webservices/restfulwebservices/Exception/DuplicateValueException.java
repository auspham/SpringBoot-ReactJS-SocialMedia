package com.sept.rest.webservices.restfulwebservices.Exception;

public class DuplicateValueException extends RuntimeException {
    public DuplicateValueException(String message) {
        super(message);
    }

    public DuplicateValueException(String message, Throwable cause) {
        super(message, cause);
    }
}

