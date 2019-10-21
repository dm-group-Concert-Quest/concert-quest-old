import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {loginUser, getSession} from '../redux/reducers/userReducer';
import {connect} from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        this.props.getSession();
    }

    handleInput = e => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.username)
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;
        
        this.props.loginUser({username, password});
    }

    render(props) {
        return (
            <div className={`hidden-by-default ${this.props.boxStatus}`}>
                <h1 id='login-header'>Login</h1>
                <label className='login-label'>
                    Username
                    <input className='login-input' 
                    name='username'
                    onChange={this.handleInput}/>
                    </label>
                <label className='login-label'>
                    Password
                    <input className='login-input' 
                    name='password' 
                    type='password'
                    onChange={this.handleInput}
                    />
                    </label>
                <button className='login-btn' onClick={this.handleSubmit}><Link to={this.props.userId ? '/' : '/home'}>Log In</Link></button>
                <div>
                    <h4>Don't have an account?</h4>
                    <h4>Sign up <Link id='login-register' to='/register'>here!</Link></h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userId: reduxState.userReducer.userId
    }
};

export default connect(mapStateToProps, {loginUser, getSession})(Login);