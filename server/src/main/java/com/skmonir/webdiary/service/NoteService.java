package com.skmonir.webdiary.service;

import com.skmonir.webdiary.dto.*;
import com.skmonir.webdiary.model.Note;
import com.skmonir.webdiary.repository.NoteRepo;
import com.skmonir.webdiary.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NoteService {

    @Autowired
    NoteRepo noteRepo;

    @Autowired
    EntityManager em;

    public NoteResponse saveUpdateNote(NoteSaveUpdateRequest request) {
        NoteResponse response = new NoteResponse();
        Note noteToSave = request.getNote();

        Date currentDate = new Date();

        // new record
        if (noteToSave.getNoteId() == 0) {
            noteToSave.setDateCreated(currentDate);
        }
        noteToSave.setDateModified(currentDate);

        noteToSave = noteRepo.save(noteToSave);

        response.setNote(noteToSave);

        return response;
    }

    public BaseResponseDto deleteNote(Note noteToDelete) {
        BaseResponseDto response = new BaseResponseDto();

        noteRepo.delete(noteToDelete);

        return response;
    }

    public BaseResponseDto deleteNoteList(List<Note> noteToDelete) {
        BaseResponseDto response = new BaseResponseDto();

        noteRepo.deleteAll(noteToDelete);

        return response;
    }

    public NoteListResponse getNoteList(String owner, long categoryId) {
        NoteListResponse response = new NoteListResponse();
        List<Note> noteList = new ArrayList<>();
        if (categoryId == 0) {
            noteList = noteRepo.findByOwner(owner);
        } else {
            noteList = noteRepo.findByOwnerAndCategoryId(owner, categoryId);
        }
        response.setNoteList(noteList);
        return response;
    }

    public NoteResponse getNote(long noteId) {
        NoteResponse response = new NoteResponse();
        response.setNote(noteRepo.findByNoteId(noteId));
        return response;
    }

    public NoteListResponse searchNotes(Note searchNote) {
        NoteListResponse response = new NoteListResponse();

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Note> cq = cb.createQuery(Note.class);

        Root<Note> note = cq.from(Note.class);

        cq.where(cb.equal(cb.upper(note.get("owner")), searchNote.getOwner().toUpperCase()));

        if (searchNote.getDateCreated() != null) {
            Date fromDate = DateUtil.getDateWithoutTime(searchNote.getDateCreated());
            Date toDate = DateUtil.getDateWithoutTime(DateUtil.getTomorrowDate(searchNote.getDateCreated()));

            cq.where(cb.greaterThanOrEqualTo(note.get("dateCreated"), fromDate));
            cq.where(cb.lessThan(note.get("dateCreated"), toDate));
        }

        if (searchNote.getTitle() != null) {
            Predicate titlePredicate = cb.like(cb.upper(note.get("title")), "%" + searchNote.getTitle().toUpperCase() + "%");
            cq.where(titlePredicate);
        }

        if (searchNote.getNoteText() != null) {
            Predicate noteTextPredicate = cb.like(cb.upper(note.get("noteText")), "%" + searchNote.getNoteText().toUpperCase() + "%");
            cq.where(noteTextPredicate);
        }

        TypedQuery<Note> query = em.createQuery(cq);

        response.setNoteList(query.getResultList());

        return response;
    }
}
