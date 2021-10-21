import { Navbar, Nav, ButtonGroup, Dropdown, DropdownButton, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faStickyNote, faStar, faBook } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import AuthService from './../services/auth.service';

const Header = ({ userInfo, setUserInfo }) => {
    const history = useHistory();

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
    }

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/"><FontAwesomeIcon icon={faBook} /> eDiary</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><FontAwesomeIcon icon={faListAlt} /> Nootbooks</Nav.Link>
                    <Nav.Link onClick={goToNotes}><FontAwesomeIcon icon={faStickyNote} /> All Notes</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    {
                        userInfo ? (
                            <DropdownButton as={ButtonGroup} title={userInfo.username} id="bg-nested-dropdown">
                                <Dropdown.Item eventKey="1" onSelect={logout}>Logout</Dropdown.Item>
                            </DropdownButton>
                        ) : (
                                <Button variant="outline-success" onClick={goToLoginPage}>Login</Button>
                            )
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;