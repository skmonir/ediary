package com.skmonir.webdiary.dto;

import com.skmonir.webdiary.model.Category;

public class CategoryResponse extends BaseResponseDto {
    Category category;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
