import Header from './components/Header';
import Notebooks from './components/Notebooks';
import Notes from './components/Notes';
import Note from './components/Note';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AuthService from './services/auth.service';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    let userInfo = AuthService.getCurrentUser();
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);

  return (
    <Router>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="10">
            <div className="App" style={{ backgroundColor: '#E7E9EB', minHeight: '660px' }}>
              <Header userInfo={userInfo} setUserInfo={setUserInfo} />
              <div className="content">
                <Switch>
                  <Route exact path="/">
                    <Notebooks userInfo={userInfo} />
                  </Route>
                  <Route path="/notes/:categoryId?">
                    <Notes userInfo={userInfo} />
                  </Route>
                  <Route path="/note/:noteId">
                    <Note userInfo={userInfo} />
                  </Route>
                  <Route path="/login">
                    <Login setUserInfo={setUserInfo} />
                  </Route>
                  <Route path="/register">
                    <Register setUserInfo={setUserInfo} />
                  </Route>
                  {/* <Route path="*">
                  <NotFound />
                </Route> */}
                </Switch>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
