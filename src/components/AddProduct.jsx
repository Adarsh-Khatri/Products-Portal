import React, { Component } from 'react';
import { post, get, put } from '../services/HttpService.jsx'

export default class AddProduct extends Component {
    state = {
        product: { id: '', name: '', price: '' },
        edit: false
    }

    fetchData = async () => {
        let { id } = this.props.match.params;
        if (id) {
            let response = await get(`/productApp/products/${id}`)
            let { data } = response;
            this.setState({ product: data, edit: true })
        } else {
            let product = { id: '', name: '', price: '' };
            this.setState({ product, edit: false, errors: null })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.fetchData()
        }
    }

    handleChange = (e) => {
        const { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.product[input.name] = input.value
        this.setState(s1);
    };

    async postData(url, obj) {
        try {
            await post(url, obj);
            this.props.history.push('/products');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                let errors = {};
                errors.id = err.response.data;
                this.setState({ errors });
            }
        }
    }

    async putData(url, obj) {
        await put(url, obj);
        this.props.history.push('/products');
    }

    handleSubmit = (e) => {
        let { product, edit } = this.state;
        e.preventDefault();
        edit ? this.putData(`/productApp/products/${product.id}`, product) : this.postData('/productApp/products', product)
    }


    render() {
        let { id, name, price } = this.state.product;
        let { edit, errors = null } = this.state;
        return (
            <div className="container my-3">
                <div className="form-group my-4">
                    <label htmlFor='id' className='fw-bold'>Product Id</label>
                    <input type="text" className='form-control' id='id' name="id" placeholder='Enter Product Id' value={id} disabled={edit} onChange={(e) => this.handleChange(e)} />
                    {errors && <span className='text-danger fw-bold'>{errors.id}</span>}
                </div>

                <div className="form-group my-4">
                    <label htmlFor='name' className='fw-bold'>Product Name</label>
                    <input type="text" className='form-control' id='name' name="name" placeholder='Enter Product Name' value={name} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group my-4">
                    <label htmlFor='price' className='fw-bold'>Product Price</label>
                    <input type="text" className='form-control' id='price' name="price" placeholder='Enter Product Price' value={price} onChange={(e) => this.handleChange(e)} />
                </div>
                <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
        )
    }
}
