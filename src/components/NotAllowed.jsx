import React, { Component } from 'react'

export default class NotAllowed extends Component {
    render() {
        return (
            <div className='container mt-5'>
                <h3 className='w-75  mx-auto alert alert-danger text-center fw-bold'>THIS FUNCTIONALITY IS NOT ALLOWED</h3>
            </div>
        )
    }
}
