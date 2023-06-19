import React, { Component } from 'react'
import { get } from '../services/HttpService'

export default class Product extends Component {

    state = {
        product: []
    }

    async componentDidMount() {
        let { id } = this.props.match.params;
        let response = await get(`/productApp/products/${id}`)
        let { data } = response;
        this.setState({ product: data })
    }


    render() {
        const { product } = this.state;
        return (
            <div className="container">
                <h1>PRODUCT PAGE</h1>
                <h3>Product ID : {product.id}</h3>
                <h3>Name : {product.name}</h3>
                <h3>Price : {product.price}</h3>
            </div>
        )
    }
}
