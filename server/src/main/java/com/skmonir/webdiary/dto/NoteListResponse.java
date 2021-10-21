package com.skmonir.webdiary.dto;

import com.skmonir.webdiary.model.Note;

import java.util.List;

public class NoteListResponse extends BaseResponseDto {
    List<Note> noteList;

    public List<Note> getNoteList() {
        return noteList;
    }

    public void setNoteList(List<Note> noteList) {
        this.noteList = noteList;
    }
}
