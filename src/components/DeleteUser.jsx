import React, { Component } from 'react'
import { deleteApi } from '../services/HttpService';

export default class DeleteUser extends Component {

    componentDidMount() {
        let { username } = this.props.match.params;
        deleteApi(`/productApp/users/${username}`)
        this.props.history.push('/users')
    }

    render() {
        return ('')
    }
}
