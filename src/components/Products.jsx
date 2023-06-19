import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../services/HttpService'
import { getUser } from '../services/AuthService.js'


export default class Products extends Component {

  state = {
    products: []
  }

  async componentDidMount() {
    let response = await get('/productApp/products')
    let { data } = response;
    this.setState({ products: data })
  }


  editProduct = id => {
    this.props.history.push(`/products/${id}/edit`)
  }

  deleteProduct = id => {
    this.props.history.push(`/products/${id}/delete`)
  }

  render() {
    let { products } = this.state;
    let user = getUser();
    return (
      <div className="container text-center">
        <h1>PRODUCTS PAGE</h1>
        <div class="row bg-dark text-light">
          <div className={`${user && user.role === 'admin' ? 'col-sm-3' : 'col-sm-4'} border`}>ID</div>
          <div className={`${user && user.role === 'admin' ? 'col-sm-3' : 'col-sm-4'} border`}>Name</div>
          <div className={`${user && user.role === 'admin' ? 'col-sm-2' : 'col-sm-4'} border`}>Price</div>
          {
            user && user.role === 'admin' && (
              <>
                <div className="col-sm-2 border"></div>
                <div className="col-sm-2 border"></div>
              </>
            )
          }
        </div>
        {
          products.map(pr =>
            <div class="row">
              <div className={`${user && user.role === 'admin' ? 'col-sm-3' : 'col-sm-4'}  border fw-bold`}><Link className="text-decoration-none" to={`/products/${pr.id}`}>{pr.id}</Link></div>
              <div className={`${user && user.role === 'admin' ? 'col-sm-3' : 'col-sm-4'}  border`}>{pr.name}</div>
              <div className={`${user && user.role === 'admin' ? 'col-sm-2' : 'col-sm-4'}  border`}>{pr.price}</div>
              {
                user && user.role === 'admin' && (
                  <>
                    <div className="col-sm-2 border">
                      <button type='button' className='btn btn-warning btn-sm' onClick={() => this.editProduct(pr.id)}>Edit</button>
                    </div>
                    <div className="col-sm-2 border">
                      <button type='button' className='btn btn-danger btn-sm' onClick={() => this.deleteProduct(pr.id)}>Delete</button>
                    </div>
                  </>
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}
