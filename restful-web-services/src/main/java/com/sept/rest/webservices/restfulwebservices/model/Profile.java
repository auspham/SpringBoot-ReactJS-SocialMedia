package com.sept.rest.webservices.restfulwebservices.model;

import javax.persistence.*;


@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String firstname;
    @Column
    private String lastname;
    @Column
    private String email;
    @Column
    private String studentnumber;
    @Column
    private String phonenumber;
    @Column
    private String aboutme;
    @Column
    private String courses;


    //oneToOne Relationship with UserID
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private DAOUser user;



    public Profile(String firstname, String lastname, String email, String studentnumber, DAOUser user) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.studentnumber = studentnumber;
        this.user = user;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStudentnumber() {
        return studentnumber;
    }

    public void setStudentnumber(String studentnumber) {
        this.studentnumber = studentnumber;
    }
}