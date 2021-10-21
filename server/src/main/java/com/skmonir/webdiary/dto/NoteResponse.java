package com.skmonir.webdiary.dto;

import com.skmonir.webdiary.model.Note;

public class NoteResponse extends BaseResponseDto {
    Note note;

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }
}
