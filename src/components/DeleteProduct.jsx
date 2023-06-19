import React, { Component } from 'react';
import { deleteApi } from '../services/HttpService';

export default class DeleteProduct extends Component {

    deleteProduct = async () => {
        let { id } = this.props.match.params;
        await deleteApi(`/productApp/products/${id}`);
        this.props.history.push(`/products`)
    }

    componentDidMount() {
        this.deleteProduct()
    }

    render() {
        return ('')
    }
}
