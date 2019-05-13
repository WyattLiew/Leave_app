import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Col,
    Button,
    Input
} from 'reactstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showError:0,
            username:'',
            password:''
        }
        // validator
        this.validator = new SimpleReactValidator();

        // handler
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentDidMount() {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
        window.history.go(1);
        };
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
       <Container>
           <h2>Login</h2>
            <div>
                <Form method="POST" action="/login" onSubmit={this.handleSubmit}>
                    {/** Error Message Here */}
                    <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="username" sm={4}></Label>
                    <Col sm={8}>{this.validator.message('username', this.state.username, 'required|email')}</Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="username" sm={4}>Email</Label>
                        <Col sm={8}>
                            <Input type="email" name="username"  placeholder="Your Email address" onChange={this.handleChangeUsername}/>
                        </Col>
                    </FormGroup>
                     {/** Error Message Here */}
                     <FormGroup row hidden={this.state.showError===1 ? false : true}>
                    <Label for="password" sm={4}></Label>
                    <Col sm={8}>{this.validator.message('password', this.state.password, 'required|min:6')}</Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={4}>Password</Label>
                        <Col sm={8}>
                            <Input type="password" name="password"  placeholder="********" onChange={this.handleChangePassword} autoComplete="off"/>
                        </Col>
                    </FormGroup>
                        <Input type="submit" className="btn btn-primary " value="Log in"/>{' '}
                    </Form>
                    <Button color="link" className="float-right" onClick={this.applyToggle}>Forget password?</Button>
      </div>
       </Container>
    );
}
}




export default Login;