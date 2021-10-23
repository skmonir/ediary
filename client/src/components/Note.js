import { useState, useEffect } from "react";
import {
    Container, Row, Button, Card, Alert, ButtonGroup, ButtonToolbar, InputGroup, FormControl
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import DataService from './../services/data.service';

const Note = ({ userInfo }) => {
    const history = useHistory();

    const { noteId } = useParams();

    const [currentNote, setCurrentNote] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [editedNote, setEditedNote] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            fetchCurrentNote();
            fetchAllCategories();
        }
    }, [noteId]);

    const startEditing = () => {
        let tempCurrentNote = { ...currentNote };
        tempCurrentNote.category = categoryList.find((cat) => cat.categoryId == currentNote.categoryId).categoryName;
        setEditedNote(tempCurrentNote);
        setIsEditing(true);
    };

    const setNoteTitle = (title) => {
        let tempEditedNote = { ...editedNote };
        tempEditedNote.title = title;
        setEditedNote(tempEditedNote);
    };

    const setNoteCategory = (category) => {
        let tempEditedNote = { ...editedNote };
        tempEditedNote.category = category;
        tempEditedNote.categoryId = categoryList.find((cat) => cat.categoryName == category).categoryId;
        setEditedNote(tempEditedNote);
    };

    const setNoteText = (noteText) => {
        let tempEditedNote = { ...editedNote };
        tempEditedNote.noteText = noteText;
        setEditedNote(tempEditedNote);
    };

    const goToNotes = (categoryId) => {
        history.push('/notes/' + categoryId);
    };

    const validateNote = () => {
        let validationOkay = true;
        if (!editedNote.title) {
            validationOkay = false;
            setErrorMessage('Note Title Can Not Be Empty');
        } else if (!editedNote.category) {
            validationOkay = false;
            setErrorMessage('Category Can Not Be Empty');
        }
        return validationOkay;
    };

    const fetchCurrentNote = () => {
        DataService.getNote(noteId).then(data => {
            if (data.note) {
                setCurrentNote(data.note);
            }
        })
    };

    const fetchAllCategories = () => {
        DataService.getAllCategories().then(data => {
            if (data.categoryList) {
                data.categoryList.sort((a, b) => {
                    return a.categoryId - b.categoryId;
                });
                setCategoryList(data.categoryList);
            }
        })
    };

    const saveNote = () => {
        if (!validateNote()) {
            return;
        }

        editedNote.owner = userInfo.username;

        let params = {
            "note": editedNote
        }

        DataService.saveNote(params).then(data => {
            if (data.note) {
                setCurrentNote(data.note);
                setIsEditing(false);
            }
        });
    }

    const deleteNote = () => {
        let params = {
            ...currentNote
        };

        DataService.deleteNote(params).then(data => {
            if (!data.message) {
                goToNotes(currentNote.categoryId);
            }
        });
    }

    return (
        <Container>
            <Row style={{ minHeight: '450px' }}>
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{ textAlign: "center" }}>
                                {
                                    isEditing ? (
                                        <div>
                                            <InputGroup>
                                                <FormControl maxLength="30" placeholder="Enter Note Title" value={editedNote.title} onChange={(e) => setNoteTitle(e.target.value)} />
                                            </InputGroup> <br />
                                            <InputGroup>
                                                <FormControl as="select" value={editedNote.category} onChange={(e) => setNoteCategory(e.target.value)}>
                                                    {
                                                        categoryList.map((category, _) => (
                                                            <option>{category.categoryName}</option>
                                                        ))
                                                    }
                                                </FormControl>
                                            </InputGroup>
                                            <br />
                                            <InputGroup>
                                                <FormControl maxLength="1500" as="textarea" value={editedNote.noteText} placeholder="Enter Your Note Here" onChange={(e) => setNoteText(e.target.value)} />
                                            </InputGroup>
                                        </div>
                                    ) : currentNote.title
                                }
                            </Card.Title>
                            <Card.Text>
                                {
                                    isEditing ? null : currentNote.noteText
                                }
                            </Card.Text>
                            <ButtonToolbar aria-label="Toolbar with button groups">
                                {
                                    isEditing ? (
                                        <ButtonGroup className="me-2" aria-label="First group">
                                            <Button variant="secondary" onClick={() => setIsEditing(false)} >Cancel</Button>
                                            <Button variant="success" onClick={() => saveNote(false)} >Save</Button>
                                        </ButtonGroup>
                                    ) : (
                                            <ButtonGroup className="me-2" aria-label="First group">
                                                <Button variant="outline-info" onClick={() => startEditing()} size="sm"><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button variant="outline-danger" onClick={() => deleteNote()} size="sm"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                            </ButtonGroup>
                                        )
                                }
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                    <Alert variant='danger' show={errorMessage}>
                        {errorMessage}
                    </Alert>
                </Container>
            </Row>
        </Container>
    );
}

export default Note;