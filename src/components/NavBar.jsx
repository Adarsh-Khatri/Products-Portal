import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        let { user } = this.props;
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
                    <Link className="navbar-brand" to="/">MyPortal</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto w-100">
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            {
                                user && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/products/add">Add Product</Link>
                                    </li>
                                )
                            }
                            {
                                user && user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/users">Users</Link>
                                    </li>
                                )
                            }

                            <div className='d-flex ms-auto fw-bold'>
                                {
                                    !user &&
                                    (<li className="nav-item">
                                        <Link className="nav-link text-info" to="/login">Login</Link>
                                    </li>)
                                }
                                {
                                    user &&
                                    (<li className="nav-item">
                                        <Link className="nav-link text-danger" to="/logout">Logout</Link>
                                    </li>)
                                }
                            </div>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}
