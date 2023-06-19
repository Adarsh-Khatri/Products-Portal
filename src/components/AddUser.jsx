import React, { Component } from 'react';
import { post, get, put } from '../services/HttpService';

export default class AddUser extends Component {

    state = {
        form: { username: '', password: '', name: '', role: '' },
        roleArr: ['user', 'admin'],
        edit: false
    }


    fetchUser = async () => {
        let { username } = this.props.match.params;
        if (username) {
            let { data } = await get(`/productApp/users/${username}`);
            let s1 = { ...this.state };
            s1.form = data;
            s1.edit = true;
            this.setState(s1)
        } else {
            this.setState({ edit: false, form: { username: '', password: '', name: '', role: '' } })
        }
    }

    componentDidMount() {
        this.fetchUser()
    }


    handleChange = ({ currentTarget: input }) => {
        this.setState(prevState => ({ form: { ...prevState.form, [input.name]: input.value } }))
    }


    isValid = () => {
        let { username, password, name, role } = this.state.form;
        let errors = { username: '', password: '', name: '', role: '' };
        if (username == '') {
            errors.username = 'Username is Required';
        }
        if (username && username.length < 6) {
            errors.username = 'Username should be more than 6 characters'
        }
        if (password == '') {
            errors.password = 'Password is Required';
        }
        if (password && password.length < 6) {
            errors.password = 'Password should be more than 6 characters'
        }
        if (name == '') {
            errors.name = 'Name is Required';
        }
        if (role == '') {
            errors.role = 'Please Select Role';
        }
        this.setState({ errors: errors })
        return !(errors.username || errors.password || errors.name || errors.role)
    }


    async postData(url, obj) {
        try {
            let { data } = await post(url, obj);
            // login(data)
            this.props.history.push('/users');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                let checking = {};
                checking.username = err.response.data;
                this.setState({ checking });
            }
        }
    }

    putData = async (url, obj) => {
        await put(url, obj);
        this.props.history.push('/users');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            let { form, edit } = this.state;
            let { username } = this.props.match.params;
            edit ? this.putData(`/productApp/users/${username}`, form) : this.postData("/productApp/users", form)
        }
    }


    makeDropDown = (label, startValue, arr, name) => (
        <div className='form-input'>
            <label htmlFor='role' className='form-label fw-bold'>{label}</label>
            <select className='form-select' name='role' value={name} id="role" onBlur={() => this.isValid()} onChange={(e) => this.handleChange(e)}>
                <option value="" disabled>{startValue}</option>
                {
                    arr.map(opt =>
                        <option value={opt}>{opt}</option>
                    )
                }
            </select>
            {this.state.errors && <span className='text-danger fw-bold'>{this.state.errors.role}</span>}
        </div>
    )

    render() {
        let { username, password, name, role } = this.state.form;
        let { checking = null, errors = null, roleArr = [], edit } = this.state;
        return (
            <div className="container my-3">
                <div className="form-group my-4">
                    <label htmlFor='username' className='fw-bold'>Username</label>
                    <input type="text" className='form-control' id='username' name="username" placeholder='Enter Username' value={username} disabled={edit} onBlur={() => this.isValid()} onChange={(e) => this.handleChange(e)} />
                    {checking && <span className='text-danger fw-bold'>{checking.username}</span>}
                    {errors && <span className='text-danger fw-bold'>{errors.username}</span>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor='password' className='fw-bold'>Password</label>
                    <input type="text" className='form-control' id='password' name="password" placeholder='Enter Password' value={password} onBlur={() => this.isValid()} onChange={(e) => this.handleChange(e)} />
                    {errors && <span className='text-danger fw-bold'>{errors.password}</span>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor='name' className='fw-bold'>Name</label>
                    <input type="text" className='form-control' id='name' name="name" placeholder='Enter Name' value={name} onBlur={() => this.isValid()} onChange={(e) => this.handleChange(e)} />
                    {errors && <span className='text-danger fw-bold'>{errors.name}</span>}
                </div>
                {this.makeDropDown('Select Role', 'Choose Role', roleArr, role)}
                <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
        )
    }
}
