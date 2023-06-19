import React, { Component } from 'react';
import { post } from '../services/HttpService';
import { login } from '../services/AuthService';

export default class Login extends Component {

    state = {
        form: { username: '', password: '' }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState(prevState => ({ form: { ...prevState.form, [input.name]: input.value } }))
    }

    async login(url, obj) {
        try {
            let { data } = await post(url, obj);
            login(data)
            // this.props.history.push('/products');
            window.location = '/products'
        } catch (err) {
            if (err.response && err.response.status === 400) {
                let errors = {};
                errors.username = err.response.data;
                this.setState({ errors });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { form } = this.state;
        this.login("/productApp/login", form)
    }

    render() {
        let { username, password } = this.state.form;
        let { errors = null } = this.state;
        return (
            <div className="container my-3">

                <div className="form-group my-4">
                    <label htmlFor='username' className='fw-bold'>Username</label>
                    <input type="text" className='form-control' id='username' name="username" placeholder='Enter Username' value={username} onChange={(e) => this.handleChange(e)} />
                    {errors && <span className='text-danger fw-bold'>{errors.username}</span>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor='password' className='fw-bold'>Password</label>
                    <input type="text" className='form-control' id='password' name="password" placeholder='Enter Password' value={password} onChange={(e) => this.handleChange(e)} />
                </div>
                <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
        )
    }
}
