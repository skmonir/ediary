package com.skmonir.webdiary.dto;

public class CategoryDeleteRequest {
    private String owner;
    private String categoryName;

    public CategoryDeleteRequest() {
    }

    public CategoryDeleteRequest(String owner, String categoryName) {
        this.owner = owner;
        this.categoryName = categoryName;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
