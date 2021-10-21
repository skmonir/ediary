package com.skmonir.webdiary.repository;

import com.skmonir.webdiary.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category, Long> {

    public List<Category> findByOwner(String owner);
}
