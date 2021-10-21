import { useState, useEffect } from "react";
import {
    Container, Row, Col, OverlayTrigger, Button, Tooltip, Modal,
    Card, ButtonGroup, ButtonToolbar, InputGroup, FormControl
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faExternalLinkAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DataService from './../services/data.service';

const Notebooks = ({ userInfo }) => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [modalCategoryName, setModalCategoryName] = useState("");
    // const [newCategoryDesc, setNewCategoryDesc] = useState("");

    const openCategoryModal = () => setIsCategoryModalOpen(true);
    const closeCategoryModal = () => setIsCategoryModalOpen(false);

    const history = useHistory();

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            fetchAllCategories();
        }
    }, []);

    const addNewCategory = () => {
        setModalCategoryName("");
        // setNewCategoryDesc("");
        setCurrentCategoryIndex(-1);
        openCategoryModal();
    }

    const editCategory = (index) => {
        setCurrentCategoryIndex(index);
        setModalCategoryName(categoryList[index].categoryName);
        // setNewCategoryDesc(categoryList[index].categoryDesc);

        openCategoryModal();
    };

    const triggerDeleteCategory = (index) => {
        setCurrentCategoryIndex(index);
        setShowDeleteWarningModal(true);
    }

    const saveCategory = () => {
        let category = {};
        if (currentCategoryIndex != -1) {
            category = { ...categoryList[currentCategoryIndex] };
        } else {
            category.owner = userInfo.username;
        }

        category.categoryName = modalCategoryName;
        // category.categoryDesc = newCategoryDesc;

        if (validateCategory(category)) {
            saveCategoryToDB(category);
        }
    };

    const validateCategory = (categoryToSave) => {
        let errorMessage = "";
        if (!categoryToSave.categoryName) {
            errorMessage += "Category name can not be empty";
        }
        if (errorMessage) {
            // show message
            return false;
        }
        return true;
    };

    const fetchAllCategories = () => {
        DataService.getAllCategories().then(data => {
            if (data.categoryList) {
                data.categoryList.sort((a, b) => {
                    return a.categoryId - b.categoryId;
                });
                setCategoryList(data.categoryList);
            }
        });
    };

    const saveCategoryToDB = (categoryToSave) => {
        let params = {
            "category": categoryToSave
        }

        DataService.saveCategory(params).then(data => {
            if (data.category) {
                if (currentCategoryIndex == -1) {
                    setCategoryList([...categoryList, data.category]);
                } else {
                    categoryList.splice(currentCategoryIndex, 1, data.category);
                    setCategoryList(categoryList);
                }
                setCurrentCategoryIndex(-1);
                closeCategoryModal();
            }
        });
    }

    const deleteCategory = () => {
        let params = {
            ...categoryList[currentCategoryIndex]
        };

        DataService.deleteCategory(params).then(data => {
            if (!data.message) {
                categoryList.splice(currentCategoryIndex, 1);
                setCategoryList(categoryList);
                setShowDeleteWarningModal(false);
            }
        });
    }

    const goToNotes = (idx) => {
        history.push('/notes/' + categoryList[idx].categoryId);
    };

    async function getCoverPhoto() {
        let response = await axios.get('https://picsum.photos/275/165');
        if (response.data) {
            console.log(response.data);
            return response.data;
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <h4>Categories</h4>
            </Row>
            <Row >
                <Col xs lg="4">
                    <Button variant="primary" onClick={addNewCategory}><FontAwesomeIcon icon={faPlus} /> Add Category</Button>
                </Col>
            </Row>
            {[1, 2].map(() => <br />)}
            <Row style={{ minHeight: '450px' }}>
                {
                    categoryList.map((category, idx) => (
                        <Col xs lg="4" style={{ marginBottom: "15px" }}>
                            <Card style={{ textAlign: "center" }} key={idx}>
                                <img src={require("./../../assets/pic_" + (idx % 10) + ".jpeg").default} width="275" height="165"></img>
                                {/* <img src={getCoverPhoto()}></img> */}
                                <Card.Body>
                                    <Card.Title>
                                        {category.categoryName}
                                    </Card.Title>
                                    {/* <Card.Text>
                                        {category.categoryDesc}
                                    </Card.Text> */}

                                    <ButtonToolbar className="justify-content-md-center" aria-label="Toolbar with button groups">
                                        <ButtonGroup className="me-2" aria-label="First group">
                                            <OverlayTrigger
                                                key={'bottom'} placement={'bottom'}
                                                overlay={
                                                    <Tooltip id={`tooltip-${'bottom'}`}>Open all the notes of this notebook</Tooltip>
                                                }>
                                                <Button variant="outline-success" onClick={() => goToNotes(idx)}><FontAwesomeIcon icon={faExternalLinkAlt} /></Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                key={'bottom'} placement={'bottom'}
                                                overlay={
                                                    <Tooltip id={`tooltip-${'bottom'}`}>Edit notebook</Tooltip>
                                                }>
                                                <Button variant="outline-info" onClick={() => editCategory(idx)}><FontAwesomeIcon icon={faEdit} /></Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                key={'bottom'} placement={'bottom'}
                                                overlay={
                                                    <Tooltip id={`tooltip-${'bottom'}`}>Delete notebook</Tooltip>
                                                }>
                                                <Button variant="outline-danger" onClick={() => triggerDeleteCategory(idx)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                            </OverlayTrigger>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                    {/* <Badge bg="success">555 notes available in this Notebook</Badge> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

            {/* Add category modal */}
            <Modal show={isCategoryModalOpen} onHide={closeCategoryModal} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{(currentCategoryIndex == -1 ? "Add New" : "Edit") + "  Category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl placeholder="Enter category name" value={modalCategoryName} onChange={(e) => setModalCategoryName(e.target.value)} />
                    </InputGroup>
                    <br />
                    {/* <InputGroup>
                        <FormControl as="textarea" placeholder="Enter category description" value={newCategoryDesc} onChange={(e) => setNewCategoryDesc(e.target.value)} />
                    </InputGroup> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCategoryModal}>Cancel</Button>
                    <Button variant="primary" onClick={saveCategory} disabled={!modalCategoryName}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* delete warning modal */}
            <Modal show={showDeleteWarningModal} onHide={() => setShowDeleteWarningModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleting category will also delete all notes associated with this category. Want to proceed?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteWarningModal(false)}>NO</Button>
                    <Button variant="primary" onClick={() => deleteCategory()}>YES</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default Notebooks;