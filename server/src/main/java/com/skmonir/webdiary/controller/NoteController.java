package com.skmonir.webdiary.controller;

import com.skmonir.webdiary.dto.*;
import com.skmonir.webdiary.model.Note;
import com.skmonir.webdiary.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/note/")
public class NoteController {

    @Autowired
    NoteService noteService;

    @PostMapping("createUpdate")
    public NoteResponse saveUpdateNote(@RequestBody NoteSaveUpdateRequest request) {
        NoteResponse response;
        try {
            response = noteService.saveUpdateNote(request);
        } catch (Exception ex) {
            response = new NoteResponse();
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @DeleteMapping("delete")
    public BaseResponseDto deleteNote(@RequestBody Note noteToDelete) {
        BaseResponseDto response;
        try {
            response = noteService.deleteNote(noteToDelete);
        } catch (Exception ex) {
            response = new BaseResponseDto();
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @GetMapping("getNoteList")
    public NoteListResponse getNoteList(@RequestParam String owner, long categoryId) {
        NoteListResponse response;
        try {
            response = noteService.getNoteList(owner, categoryId);
        } catch (Exception ex) {
            response = new NoteListResponse();
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @GetMapping("{noteId}")
    public NoteResponse getNoteById(@PathVariable long noteId) {
        NoteResponse response;
        try {
            response = noteService.getNote(noteId);
        } catch (Exception ex) {
            response = new NoteResponse();
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @PostMapping("search")
    public NoteListResponse searchNote(@RequestBody Note searchNote) {
        NoteListResponse response;
        try {
            response = noteService.searchNotes(searchNote);
        } catch (Exception ex) {
            response = new NoteListResponse();
            response.setMessage(ex.getMessage());
        }
        return response;
    }
}