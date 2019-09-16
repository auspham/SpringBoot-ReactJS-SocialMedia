package com.sept.rest.webservices.restfulwebservices.todo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;


@Entity
public class TodoComment {
    @Id
    @GeneratedValue
    private String username;
    private String description;
    private Date targetDate;

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
}
