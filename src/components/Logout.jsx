import React, { Component } from 'react'
import { logout } from '../services/AuthService'

export default class Logout extends Component {

    componentDidMount() {
        logout();
        this.props.history.push('/login')
        // window.location = '/login'
    }

    render() {
        return ('')
    }
}
