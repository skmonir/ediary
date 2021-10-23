package com.skmonir.webdiary.model;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "NOTE")
@Table(name = "NOTE")
public class Note {
    @Id
    @SequenceGenerator(
            name = "NOTE_SEQUENCE",
            sequenceName = "NOTE_SEQUENCE",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "NOTE_SEQUENCE"
    )
    @Column(name = "NOTE_ID", updatable = false)
    private long noteId;

    @Column(name = "CATEGORY_ID", nullable = false)
    private long categoryId;

    @Column(name = "OWNER", nullable = false, length = 20)
    private String owner;

    @Column(name = "TITLE", nullable = false, length = 30)
    private String title;

    @Column(name = "NOTE_TEXT", length = 1500)
    private String noteText;

    @Column(name = "DATE_CREATED")
    private Date dateCreated;

    @Column(name = "DATE_MODIFIED")
    private Date dateModified;

    public Note() {}

    public Note(long categoryId, String owner, String title, String noteText, Date dateCreated, Date dateModified) {
        this.categoryId = categoryId;
        this.owner = owner;
        this.title = title;
        this.noteText = noteText;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }

    public long getNoteId() {
        return noteId;
    }

    public void setNoteId(long noteId) {
        this.noteId = noteId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public String getNoteText() {
        return noteText;
    }

    public void setNoteText(String noteText) {
        this.noteText = noteText;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public void setDateModified(Date dateModified) {
        this.dateModified = dateModified;
    }
}
