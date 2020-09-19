import React, { Component } from 'react';
export class Profile extends Component {

    state = {
        userName: ''
    }

    componentDidMount = () =>{
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData){
            this.setState({
                userName: userData.user.name
            });
        } else{
            this.props.history.push('/');
        }
    }
    logout= e =>{
        e.preventDefault();
        localStorage.clear();
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <h1>Hello {this.state.userName}</h1>
                <button 
                onClick={this.logout}
                className="btn btn-warning">Logout</button>
                
            </div>
        )
    }
}

export default Profile;
