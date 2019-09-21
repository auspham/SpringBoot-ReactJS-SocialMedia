package com.sept.rest.webservices.restfulwebservices.todo;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Embeddable
public class TodoComment {
    @GeneratedValue
    private long id;
    private String username;
    private String description;
    private Date targetDate;

    public TodoComment() {
        // Default consturctor
    }

    public TodoComment(String username, String description, Date targetDate) {
        this.username = username;
        this.description = description;
        this.targetDate = targetDate;
    }

    public String getUsername() {
        return username;
    }

    public String getDescription() {
        return description;
    }

    public Date getTargetDate() {
        return targetDate;
    }

    @Override
    public String toString() {
        return String.format("%s: %s\n", username, description);
    }
}
