package com.skmonir.webdiary.model;

import javax.persistence.*;

@Entity(name = "CATEGORY")
@Table(
        name = "CATEGORY",
        uniqueConstraints = {
                @UniqueConstraint(name = "CATEGORY_OWNER_UNIQUE", columnNames = {"CATEGORY_NAME" , "OWNER"})
        }
)
public class Category {
    @Id
    @SequenceGenerator(
            name = "CATEGORY_SEQUENCE",
            sequenceName = "CATEGORY_SEQUENCE",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "CATEGORY_SEQUENCE"
    )
    @Column(name = "CATEGORY_ID", updatable = false)
    private long categoryId;

    @Column(name = "OWNER", nullable = false, length = 15)
    private String owner;

    @Column(name = "CATEGORY_NAME", nullable = false, length = 15)
    private String categoryName;

    @Column(name = "CATEGORY_DESC", length = 150)
    private String categoryDesc;

    public Category() {}

    public Category(String owner, String categoryName) {
        this.owner = owner;
        this.categoryName = categoryName;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
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

    public String getCategoryDesc() {
        return categoryDesc;
    }

    public void setCategoryDesc(String categoryDesc) {
        this.categoryDesc = categoryDesc;
    }
}
