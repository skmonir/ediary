package com.skmonir.webdiary.model;

import javax.persistence.*;

@Entity(name = "USER")
@Table(
        name = "USERS",
        uniqueConstraints = {
                @UniqueConstraint(name = "USERNAME_UNIQUE", columnNames = {"USERNAME"})
        }
)
public class User {
    @Id
    @SequenceGenerator(
            name = "USERS_SEQUENCE",
            sequenceName = "USERS_SEQUENCE",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "USERS_SEQUENCE"
    )
    @Column(name = "USER_ID", updatable = false)
    private long userId;

    @Column(name = "USERNAME", nullable = false, length = 20)
    private String username;

    @Column(name = "PASSWORD", nullable = false, length = 20)
    private String password;

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username) {
        this.username = username;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
