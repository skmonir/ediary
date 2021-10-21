import { useState, useEffect } from "react";
import {
    Container, Row, Col, OverlayTrigger, Button, Tooltip, Modal,
    Alert, ButtonGroup, ButtonToolbar, InputGroup, FormControl, ListGroup
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faExternalLinkAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import DataService from './../services/data.service';

const Notes = ({ userInfo }) => {
    const history = useHistory();

    const { categoryId } = useParams();

    const [currentCategory, setCurrentCategory] = useState(null);
    const [noteList, setNoteList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [newNote, setNewNote] = useState({});

    let noteVariants = [
        'primary', 'success', 'warning', 'info', 'secondary'
    ];

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            fetchAllCategories();
            fetchAllNotes();
        }
    }, [categoryId]);

    const addNewNote = () => {
        setNewNote({});
        setErrorMessage(null);
        setIsAddNoteModalOpen(true);
    };

    const setNoteTitle = (title) => {
        setNewNote({ ...newNote, ...{ 'title': title } });
    };

    const setNoteText = (noteText) => {
        setNewNote({ ...newNote, ...{ 'noteText': noteText } });
    };

    const openNote = (noteIndex) => {
        history.push('/note/' + noteList[noteIndex].noteId);
    };

    const validateNote = () => {
        let validationOkay = true;
        if (!newNote.title) {
            validationOkay = false;
            setErrorMessage('Note Title Can Not Be Empty');
        } else if (!currentCategory) {
            validationOkay = false;
            setErrorMessage('Category Can Not Be Empty');
        }
        return validationOkay;
    };

    const fetchAllCategories = () => {
        DataService.getAllCategories().then(data => {
            if (data.categoryList) {
                data.categoryList.sort((a, b) => {
                    return a.categoryId - b.categoryId;
                });
                setCategoryList(data.categoryList);

                let cat = data.categoryList.find((category) => category.categoryId == categoryId);
                setCurrentCategory(cat ? cat.categoryName : null);
            }
        });
    };

    const fetchAllNotes = () => {
        let params = {
            "owner": userInfo.username,
            "categoryId": categoryId ? categoryId : 0,
        };

        DataService.getAllNotes(params).then(data => {
            if (data.noteList) {
                data.noteList.sort((a, b) => {
                    return b.noteId - a.noteId; // descending order
                });
                setNoteList(data.noteList);
            }
        });
    };

    const saveNote = () => {
        if (!validateNote()) {
            return;
        }

        newNote.owner = userInfo.username;
        newNote.categoryId = categoryId ? categoryId : categoryList.find((cat) => cat.categoryName == currentCategory).categoryId;

        let params = {
            "note": newNote
        };

        DataService.saveNote(params).then(data => {
            if (data.note) {
                setNoteList([data.note, ...noteList]);
                setIsAddNoteModalOpen(false);
            }
        });
    }

    const deleteNote = (idx) => {
        let params = {
            ...noteList[idx]
        };

        DataService.deleteNote(params).then(data => {
            if (!data.message) {
                let tempNoteList = [...noteList];
                tempNoteList.splice(idx, 1);
                setNoteList(tempNoteList);
            }
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <h4> {currentCategory ? currentCategory : 'All Notes'}</h4>
            </Row>
            <Row >
                <Col xs lg="4">
                    <Button variant="primary" onClick={addNewNote}><FontAwesomeIcon icon={faPlus} /> Add Note</Button>
                </Col>
            </Row>
            {[1, 2].map(() => <br />)}
            <Row style={{ minHeight: '450px' }}>
                <Container>
                    {
                        noteList.map((note, idx) => (
                            <Row key={idx}>
                                <Col xs lg="12">
                                    <ListGroup className="my-2">
                                        <ListGroup.Item variant={noteVariants[idx % 5]}>
                                            <Row style={{ display: 'flex', alignItems: 'center' }}>
                                                <Col xs lg="3">{note.title}</Col>
                                                <Col xs lg="6" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                    {note.noteText}
                                                </Col>
                                                <Col xs lg="2">{note.dateModified}</Col>
                                                <Col xs lg="1">
                                                    <ButtonToolbar className="justify-content-md-center" aria-label="Toolbar with button groups">
                                                        <ButtonGroup className="me-2" aria-label="First group">
                                                            <OverlayTrigger
                                                                key={'external' + idx} placement={'bottom'}
                                                                overlay={
                                                                    <Tooltip id={`tooltip-${'bottom'}`}>Open note</Tooltip>
                                                                }>
                                                                <Button variant="outline-success" onClick={() => openNote(idx)} size="sm"><FontAwesomeIcon icon={faExternalLinkAlt} /></Button>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger
                                                                key={'delete' + idx} placement={'bottom'}
                                                                overlay={
                                                                    <Tooltip id={`tooltip-${'bottom'}`}>Delete note</Tooltip>
                                                                }>
                                                                <Button variant="outline-danger" onClick={() => deleteNote(idx)} size="sm"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                                            </OverlayTrigger>
                                                        </ButtonGroup>
                                                    </ButtonToolbar>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        ))
                    }
                </Container>
            </Row>

            {/* Add note modal */}
            <Modal show={isAddNoteModalOpen} onHide={() => setIsAddNoteModalOpen(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl placeholder="Enter Note Title" onChange={(e) => setNoteTitle(e.target.value)} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <FormControl as="select" disabled={categoryId} value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}>
                            {
                                categoryList.map((category, idx) => (
                                    <option>{category.categoryName}</option>
                                ))
                            }
                        </FormControl>
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <FormControl as="textarea" placeholder="Enter Your Note Here" onChange={(e) => setNoteText(e.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Alert variant='danger' show={errorMessage}>
                    {errorMessage}
                </Alert>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsAddNoteModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={saveNote}>Save</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Notes;