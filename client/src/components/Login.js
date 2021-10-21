import { useState, useEffect } from "react";
import {
    Container, Row, Col, InputGroup, FormControl, Button, Alert
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import AuthService from './../services/auth.service';

const Login = ({ setUserInfo }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const history = useHistory();

    useEffect(() => {
        let userInfo = AuthService.getCurrentUser();
        if (userInfo) {
            history.push('/');
        }
    }, []);

    const doLogin = () => {
        setErrorMessage(null);
        AuthService.login(username, password).then((data) => {
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
                                <h2>Login</h2>
                            </div>
                        </div>
                        <div className="panel-body">
                            <hr />
                            <InputGroup className="mb-2">
                                <FormControl placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <FormControl type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </InputGroup>
                            <hr />
                            <Button variant="primary" size="md" block onClick={doLogin} disabled={!username || !password || !username.trim() || !password.trim()}><FontAwesomeIcon icon={faSignInAlt} /> Log In </Button>
                            <br />
                            <Alert variant='danger' show={errorMessage}>
                                {errorMessage}
                            </Alert>
                            <h7>Don't have an account? </h7> <a href="/register"> Register</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;