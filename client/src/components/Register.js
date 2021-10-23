import { useState } from "react";
import {
    Container, Row, Col, InputGroup, FormControl, Button, Alert
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../services/auth.service';

const Register = ({ setUserInfo }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const history = useHistory();

    const doRegister = () => {
        setErrorMessage(null);
        AuthService.register(username, password).then((data) => {
            if (!data || data.message) {
                setErrorMessage(data.message);
            } else {
                let userInfo = AuthService.getCurrentUser();
                setUserInfo(userInfo);
                history.push('/');
            }
        });
    }

    return (
        <Container>
            {[1, 2, 3].map(() => <br />)}
            <Row className="justify-content-md-center" style={{ minHeight: '450px' }}>
                <Col xs lg="6">
                    <div className="panel">
                        <div className="panel-heading">
                            <div className="panel-title">
                                <h2>Register</h2>
                            </div>
                        </div>
                        <div className="panel-body">
                            <hr />
                            <InputGroup className="mb-2">
                                <FormControl maxLength="20" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <FormControl maxLength="20" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </InputGroup>
                            <hr />
                            <Button variant="primary" size="md" block onClick={doRegister} disabled={!username || !password || !username.trim() || !password.trim()}><FontAwesomeIcon icon={faSignInAlt} /> Register </Button>
                            <br />
                            <Alert variant='danger' show={errorMessage}>
                                {errorMessage}
                            </Alert>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;