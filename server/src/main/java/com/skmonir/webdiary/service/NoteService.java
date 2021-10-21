package com.skmonir.webdiary.service;

import com.skmonir.webdiary.dto.*;
import com.skmonir.webdiary.model.Note;
import com.skmonir.webdiary.repository.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NoteService {

    @Autowired
    NoteRepo noteRepo;

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
}
