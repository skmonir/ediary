package com.skmonir.webdiary.dto;

import com.skmonir.webdiary.model.Category;

import java.util.List;

public class CategoryListResponse extends BaseResponseDto {
    List<Category> categoryList;

    public List<Category> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<Category> categoryList) {
        this.categoryList = categoryList;
    }
}
