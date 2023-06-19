import React, { Component } from 'react';
import { get } from '../services/HttpService.jsx'
import { Link } from 'react-router-dom';

export default class Users extends Component {

    state = {
        users: []
    }

    fetchUsers = async () => {
        let { data } = await get('/productApp/users')
        this.setState({ users: data })
    }

    componentDidMount() {
        this.fetchUsers()
    }

    render() {
        let { users } = this.state;
        return (
            <div className="container text-center my-5">
                <h3 className='alert alert-primary mb-4'>WELCOME TO THE LIST OF USERS</h3>
                <div className='row bg-dark text-light'>
                    <div className="col-sm-3 border">Username</div>
                    <div className="col-sm-3 border">Name</div>
                    <div className="col-sm-2 border">Role</div>
                    <div className="col-sm-2 border"></div>
                    <div className="col-sm-2 border"></div>
                </div>
                {
                    users.map(user =>
                        <div className="row">
                            <div className="col-sm-3 border">{user.username}</div>
                            <div className="col-sm-3 border">{user.name}</div>
                            <div className="col-sm-2 border">{user.role}</div>
                            <div className="col-sm-2 border">
                                <Link className='btn btn-warning btn-sm' to={`/users/${user.username}/edit`} >Edit User</Link>
                            </div>
                            <div className="col-sm-2 border">
                                <Link className='btn btn-danger btn-sm' to={`/users/${user.username}/delete`} >Delete User</Link>
                            </div>
                        </div>
                    )
                }
                <div className='row my-4'>
                    <div>
                        <Link className='btn btn-primary' to="/users/add" >Add User</Link>
                    </div>
                </div>
            </div>
        )
    }
}
