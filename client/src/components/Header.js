import { Navbar, Nav, ButtonGroup, Dropdown, DropdownButton, Form, FormControl, Button, InputGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faStickyNote, faBook } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import AuthService from './../services/auth.service';

const Header = ({ userInfo, setUserInfo }) => {
    const history = useHistory();

    const [queryParams, setQueryParams] = useState({});
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);

    const goToNotes = () => {
        history.push('/notes');
    };

    const goToLoginPage = () => {
        history.push('/login');
    };

    const logout = () => {
        AuthService.logout();
        setUserInfo(null);
        goToLoginPage();
    };

    const openSearchModal = () => {
        setQueryParams({});
        setSearchModalOpen(true);
    };

    const setNoteTitle = (title) => {
        setQueryParams({ ...queryParams, ...{ 'title': title } });
    };

    const setNoteText = (noteText) => {
        setQueryParams({ ...queryParams, ...{ 'noteText': noteText } });
    };

    const setNoteDate = (dateCreated) => {
        setQueryParams({ ...queryParams, ...{ 'dateCreated': dateCreated } });
    };

    const goToNotesForSearchResult = () => {
        setSearchModalOpen(false);
        history.push('/notes', { state: { queryParams: queryParams } });
    };

    return (
        <div>
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/"><FontAwesomeIcon icon={faBook} /> eDiary</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/"><FontAwesomeIcon icon={faListAlt} /> Nootbooks</Nav.Link>
                        <Nav.Link onClick={goToNotes}><FontAwesomeIcon icon={faStickyNote} /> All Notes</Nav.Link>
                    </Nav>
                    <Form inline>
                        {
                            userInfo ? (
                                <div>
                                    <Button variant="outline-success" onClick={openSearchModal} >Search</Button> &nbsp;
                                    <DropdownButton as={ButtonGroup} title={userInfo.username} id="bg-nested-dropdown">
                                        <Dropdown.Item eventKey="1" onSelect={logout}>Logout</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            ) : (
                                    <Button variant="outline-success" onClick={goToLoginPage}>Login</Button>
                                )
                        }
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={isSearchModalOpen} onHide={() => setSearchModalOpen(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Search Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl maxLength="30" placeholder="Enter Note Title" onChange={(e) => setNoteTitle(e.target.value)} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <FormControl maxLength="1500" as="textarea" placeholder="Enter Your Note Here" onChange={(e) => setNoteText(e.target.value)} />
                    </InputGroup>
                    <br />
                    <Form.Group controlId="dateCreated">
                        <Form.Control type="date" name="dateCreated" placeholder="Enter Date" onChange={(e) => setNoteDate(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSearchModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={goToNotesForSearchResult}>Search</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Header;