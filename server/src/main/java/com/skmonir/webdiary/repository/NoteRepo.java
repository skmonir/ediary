package com.skmonir.webdiary.repository;

import com.skmonir.webdiary.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepo extends JpaRepository<Note, Long> {

    public List<Note> findByOwnerAndCategoryId(String owner, long categoryId);

    public List<Note> findByCategoryId(long categoryId);

    public List<Note> findByOwner(String owner);

    public Note findByNoteId(long noteId);
}
