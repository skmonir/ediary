package com.skmonir.webdiary.service;

import com.skmonir.webdiary.dto.*;
import com.skmonir.webdiary.model.Category;
import com.skmonir.webdiary.model.Note;
import com.skmonir.webdiary.repository.CategoryRepo;
import com.skmonir.webdiary.repository.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    NoteRepo noteRepo;

    public CategoryResponse saveUpdateCategory(CategorySaveUpdateRequest request) {
        CategoryResponse response = new CategoryResponse();
        Category categoryToSave = request.getCategory();

        categoryToSave = categoryRepo.save(categoryToSave);

        response.setCategory(categoryToSave);

        return response;
    }

    public BaseResponseDto deleteCategory(Category categoryToDelete) {
        BaseResponseDto response = new BaseResponseDto();

        categoryRepo.delete(categoryToDelete);

        List<Note> noteListToDelete = noteRepo.findByOwnerAndCategoryId(
                categoryToDelete.getOwner(),
                categoryToDelete.getCategoryId()
        );
        noteRepo.deleteAll(noteListToDelete);

        return response;
    }

    public CategoryListResponse getCategoryListByOwner(String owner) {
        CategoryListResponse response = new CategoryListResponse();
        response.setCategoryList(categoryRepo.findByOwner(owner));
        return response;
    }
}
