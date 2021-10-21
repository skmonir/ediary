package com.skmonir.webdiary.controller;

import com.skmonir.webdiary.dto.*;
import com.skmonir.webdiary.model.Category;
import com.skmonir.webdiary.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category/")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @PostMapping("createUpdate")
    public CategoryResponse createCategory(@RequestBody CategorySaveUpdateRequest request) {
        CategoryResponse response;
        try {
            response = categoryService.saveUpdateCategory(request);
        } catch (Exception ex) {
            response = new CategoryResponse();
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @DeleteMapping("delete")
    public BaseResponseDto deleteCategory(@RequestBody Category categoryToDelete) {
        BaseResponseDto response;
        try {
            response = categoryService.deleteCategory(categoryToDelete);
        } catch (Exception ex) {
            response = new BaseResponseDto();
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @GetMapping("{owner}")
    public CategoryListResponse getCategoryListByOwner(@PathVariable String owner) {
        CategoryListResponse response;
        try {
            response = categoryService.getCategoryListByOwner(owner);
        } catch (Exception ex) {
            response = new CategoryListResponse();
            response.setMessage(ex.getMessage());
        }
        return response;
    }
}