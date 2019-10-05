package com.sept.rest.webservices.restfulwebservices.post;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import java.util.Date;

@Embeddable
public class PostComment {
    @GeneratedValue
    private long id;
    private String username;
    private String description;
    private Date targetDate;

    public PostComment() {
        // Default consturctor
    }

    public PostComment(String username, String description, Date targetDate) {
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
