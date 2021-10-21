package com.skmonir.webdiary.repository;

import com.skmonir.webdiary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    public User findByUsername(String username);
}
