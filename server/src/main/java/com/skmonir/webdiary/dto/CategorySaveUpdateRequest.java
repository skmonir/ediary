package com.skmonir.webdiary.dto;

import com.skmonir.webdiary.model.Category;

public class CategorySaveUpdateRequest {
    Category category;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
