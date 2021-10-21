package com.skmonir.webdiary.dto;

public class NoteListRequest {
    String owner;
    long categoryId;

    public NoteListRequest() {
    }

    public NoteListRequest(String owner, long categoryId) {
        this.owner = owner;
        this.categoryId = categoryId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }
}
