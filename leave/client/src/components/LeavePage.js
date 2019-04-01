import React, { Component } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Col,
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import LeaveBalance from './LeavePageTable';

class LeavePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    
render() {
    return (
       <Container>
            <div>
            <h2><Button color="dark" onClick={this.toggle}>Apply</Button>  Leave Balance</h2>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <Form>
                    <ModalHeader toggle={this.toggle} charCode="Y">Apply for a leave</ModalHeader>
                    <ModalBody>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={4}>Select leave type</Label>
                        <Col sm={8}>
                            <Input type="select" name="select" id="exampleSelect"> 
                                <option>Annual Leave</option>
                                <option>Childcare Leave</option>
                                <option>National Service</option>
                                <option>Off in liue</option>
                                <option>Medical Leave</option>
                                <option>hospitalisation Leave</option>
                                <option>Unpaid Leave</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleDate" sm={4}>From date</Label>
                        <Col sm={8}>
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleDate" sm={4}>To date</Label>
                        <Col sm={8}>
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="checkbox2" sm={4}></Label>
                        <Col sm={{ size: 8 }}>
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkbox2" />{' '}
                                Half day?
                            </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={4}>Days Applied</Label>
                        <Col sm={8}>
                            <Input type="text" name="days" id="daysApplied" placeholder="0" disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleText" sm={4}>Reason</Label>
                        <Col sm={8}>
                            <Input type="textarea" name="text" id="exampleText" placeholder="Cannot be null" />
                        </Col>
                    </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Apply</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
      </div>
      <LeaveBalance />
       </Container>
    );
}
}




export default LeavePage;