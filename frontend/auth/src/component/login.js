import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class Login extends Component {

    state = {
        email : '',
        password : ''
    }

    login = e =>{
        e.preventDefault();
        axios.post('http://localhost:4000/api/auth', this.state)
        .then(res=>{
            console.log("response:",res.data);
            localStorage.setItem('user',JSON.stringify(res.data));
            this.props.history.push('/profile');
        }).catch(err =>{
            console.log("error.response:",err.response);
            alert(err.response.data.msg);
        });

    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state);
    }
    render() {
        return (
            <div className="container">
                <h2 className="mt-3">
                    Login Here
                </h2>
                <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                    name="email"
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1"
                    onChange={this.handleChange}
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                     />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                    name="password"
                    onChange={this.handleChange}
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                    />
                </div>
                
                <button
                onClick={this.login}
                className="btn btn-primary">Login</button>
                <small className="float-right">Dont have any account? <Link to="/signup">SignUp</Link></small>                
                </form>
            </div>
        )
    }
}

export default Login;
