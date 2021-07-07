import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { maxLength, minLength, required } from './ContactComponents';
import { Control, LocalForm, Errors } from 'react-redux-form';


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );

}
function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}<br />
                                - {comment.author},
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    );
                })}
                <CommentForm />
            </div>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}
// This is the class component created for 7/3/21 
class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        console.log("Current state is: ", JSON.stringify(values));
        alert("Current state is:" + JSON.stringify(values));
        this.toggleModal();
        values.preventDefault();
    }

    render() {
        return <React.Fragment>

            <Button outline color="secondary" onClick={this.toggleModal}><i class="fa fa-pencil fa-lg" /> Submit Comment</Button>


            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select type="select" model=".rating" name="rating" id="rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" name="author" id="author" placeholder="Your Name"  className="form-control"
                            validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }} 
                        />
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            component="div"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be at least 2 characters',
                                maxLength: 'Must be 15 characters or less' 
                            }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comments">Comment</Label>
                            <Control.textarea model=".text" name="text" id="text" className="form-control" />
                        </FormGroup>
                        <ModalFooter>
                            <Button type="submit" outline color="primary">Submit comments</Button>
                        </ModalFooter>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
    };
};


export default CampsiteInfo;