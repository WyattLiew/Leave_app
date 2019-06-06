import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { FaRegCheckCircle } from "react-icons/fa";
import {
    Container,
    Form,
    FormGroup,
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Col
} from 'reactstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            showError:0,
            username:'',
            password:'',

            hiddenPinValid:false,
            hiddenEmailBox:false,
            hiddenPinBox:false,
            hiddenPasswordBox:false,
            showResetError:0,
            showPinError:0,
            showPasswordError:0,
            resetEmail:'',
            resetPin:'',
            resetUserId:'',
            userId:[],
            validation:[],
            resetPassword:'',
            resetPassword2:''
        }
        // validator
        this.validator = new SimpleReactValidator();
        this.validator1 = new SimpleReactValidator();
        this.validator2 = new SimpleReactValidator();
        this.validator3 = new SimpleReactValidator();

        // handler
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.forgetPasswordToggle = this.forgetPasswordToggle.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleChangePin = this.handleChangePin.bind(this);
        this.handleChangeResetPassword = this.handleChangeResetPassword.bind(this);
        this.handleChangeResetPassword2 = this.handleChangeResetPassword2.bind(this);
        this.handleSavePassword = this.handleSavePassword.bind(this);

    }

    componentDidMount() {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
        window.history.go(1);
        };
    }

    // forget password button toggle
    forgetPasswordToggle() {
        this.setState({
            hiddenPinValid:false,
            hiddenEmailBox:false,
            hiddenPinBox:false,
            hiddenPasswordBox:false,
            showResetError:0,
            showPinError:0,
            showPasswordError:0,
            resetEmail:'',
            resetPin:'',
            validation:[],
            resetPassword:'',
            resetPassword2:''
        });
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    // Part 1 Email handler
    handleChangeEmail(event) {
        this.setState({
            resetEmail: event.target.value
        });
    }

    // get user id
    getUserId(){
        this.state.userId.map(reset =>
            this.setState({
                resetUserId:reset.id
            })
        )
    }

    // Part 1 Email Send handler
    handleSend(event) {
        this.setState({
            showResetError:1
        });
        if (this.validator1.allValid()) {
            this.setState({
                hiddenEmailBox:true,
                hiddenPinBox:true
            });
            var data = {
                    email:this.state.resetEmail
                };
            fetch('/send-resetPassword',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }); 
            this.checkUserId(this.state.resetEmail);
        } else {
            event.preventDefault();
            this.validator1.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }  
    }
    // Part 2 Pin handler
    handleChangePin(event) {
        this.setState({
            resetPin: event.target.value
        },()=>{
            this.setState({
                showPinError:1
            });
            if (this.validator2.allValid()) {
                this.checkValidation(this.state.resetEmail,this.state.resetPin);
            } else {
                this.validator2.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }  
        });
    }

    // part 3 Reset password 
    getResetPassword() {
        if(this.state.validation.length !==0){
            this.setState({
                hiddenPasswordBox:true,
                hiddenPinBox:false,
                hiddenPinValid:false
            });
        }else{
            this.setState({
                hiddenPinValid:true
            });
        }
    }

    // Part 3 Password handler
    handleChangeResetPassword(event) {
        this.setState({
            resetPassword: event.target.value
        });
    }

    // Part 3 Password2 handler
    handleChangeResetPassword2(event) {
        this.setState({
            resetPassword2: event.target.value
        });
    }

    // Part 3 Save reset password handler
    handleSavePassword(event) {
        this.setState({
            showPasswordError:1
        });
        if (this.validator3.allValid()) {
            if(this.state.resetPassword === this.state.resetPassword2){
                var data = {
                    resetUserId:this.state.resetUserId,
                    resetPassword:this.state.resetPassword,
                    resetPassword2:this.state.resetPassword2
                };
                fetch('/reset_password',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }); 
                alert('Your password has been reset successfully!');
                window.location='/';
            }else{
            alert('password doesn\'t match');
            }
        } else {
            this.validator3.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }  
    }

    // API Check account validation pin number
    checkValidation = (email,pin) => {
        fetch(`/account_validation_checking/${email}/${pin}`)
            .then(response => response.json())
            .then(response => this.setState({ validation: response.data},()=>{
              this.getResetPassword();
          })).catch(err=>console.error(err));
    }

    // API Check account validation pin number
    checkUserId = (email) => {
        fetch(`/account_validation_checking_user_id/${email}`)
            .then(response => response.json())
            .then(response => this.setState({ userId: response.data},()=>{
              this.getUserId();
          })).catch(err=>console.error(err));
    }

    // signout app
    getLogout = _ => {
        fetch(`/logout`)
          .then(response => {
              if(response.ok && window){
                window.location.href="/";
              }
            })
          .catch(err=>console.error(err));
    }

    // Email handler
    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    // Password handler
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    //Submit handler
    handleSubmit(event) {
        this.setState({
            showError:1
        });
        if (this.validator.allValid()) {
            //event.preventDefault();
        //     var data = {
        //         username:this.state.username,
        //         password:this.state.password,
        //     };
        // fetch('/login',{
        //     method:'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(data)
        // }); 

        } else {
            event.preventDefault();
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }  
    }

    
render() {
    return (
    <div className="login">
       <Container>
            <div>
                <Form className="box" method="POST" action="/login" onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                    {/** Error Message Here */}
                    <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <p>{this.validator.message('username', this.state.username, 'required|email')}</p>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="username"  placeholder="Your Email address" onChange={this.handleChangeUsername}/>
                    </FormGroup>
                     {/** Error Message Here */}
                     <FormGroup row hidden={this.state.showError===1 ? false : true}>
                        <p>{this.validator.message('password', this.state.password, 'required|min:6')}</p>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password"  placeholder="********" onChange={this.handleChangePassword} autoComplete="off"/>
                    </FormGroup>
                        <Input type="submit"  value="Login"/>
                        <Button color="link"  onClick={this.forgetPasswordToggle}>Forget password?</Button>
                    </Form>
      </div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <Form>
                    <ModalHeader toggle={this.toggle} charCode="Y">Password Reset Request</ModalHeader>
                    <ModalBody>
                    <div hidden={this.state.hiddenEmailBox ? true : false}>
                        <h6>Please enter your email address below to start the process of resetting your password.</h6>
                    {/** Error Message Here */}
                    <FormGroup row hidden={this.state.showResetError===1 ? false : true}>
                        <p className="warning_text_login">{this.validator1.message('email', this.state.resetEmail, 'required|email')}</p>
                    </FormGroup>
                    <FormGroup row>
                            <Col sm="8"><Input type="email" name="email" placeholder="Email Address" onChange={this.handleChangeEmail}  />  </Col>
                            <Col sm="4"><Button color="primary" className="btn-primary" onClick={this.handleSend}>Send</Button> </Col>
                    </FormGroup>
                    </div>
                    <div hidden={this.state.hiddenPinBox ? false : true}>
                    <p>{this.state.resetEmail} <FaRegCheckCircle /></p>
                    <h6>A 4 digit PIN has been sent to your email.</h6>
                     {/** Error Message Here */}
                     <FormGroup row hidden={this.state.showPinError===1 ? false : true}>
                        <p className="warning_text_login">{this.validator2.message('pin', this.state.resetPin, 'required|min:4|max:4')}</p>
                    </FormGroup>
                    <FormGroup>
                        <p className="warning_text_login" hidden={this.state.hiddenPinValid ? false: true}>Invalid Pin</p>
                    </FormGroup>
                    <FormGroup row>
                            <Label for="reason" sm="2">Pin</Label>
                            <Col sm="6"><Input type="number" name="pin" placeholder="4 Digit Pin" onChange={this.handleChangePin} />  </Col>
                    </FormGroup>
                    <h6>If you cannot find your reset password email, please check your spam/junk folder, or resend the reset email.</h6>
                    </div>
                    <div hidden={this.state.hiddenPasswordBox ? false : true}>
                    <p>{this.state.resetEmail}</p>
                    <h6>Please reset your new password.</h6>
                     {/** Error Message Here */}
                     <FormGroup row hidden={this.state.showPasswordError===1 ? false : true}>
                        <p className="warning_text_login">{this.validator3.message('resetPassword', this.state.resetPassword, 'required|min:6')}</p>
                        <p className="warning_text_login">{this.validator3.message('resetPassword2', this.state.resetPassword2, 'required|min:6')}</p>
                    </FormGroup>
                    <FormGroup row>
                            <Col sm={6}>
                                <Input type="password" name="resetPassword" placeholder="New Password" onChange={this.handleChangeResetPassword} autoComplete="off" />   
                            </Col>
                            <Col sm={6}>
                                <Input type="password" name="resetPassword2" placeholder="Confirm Password" onChange={this.handleChangeResetPassword2} autoComplete="off"/>   
                            </Col>
                        </FormGroup>
                        <Button color="primary" className="btn-primary" onClick={this.handleSavePassword}>Reset Password</Button>
                    </div>

                   <Input type="text" name="resetUserId" value={this.state.resetUserId} readOnly hidden/>
                
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.forgetPasswordToggle}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
       </Container>
       </div>
    );
}
}




export default Login;