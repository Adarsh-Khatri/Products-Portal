
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Products from './Products';
import Product from './Product';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import Login from './Login';
import Logout from './Logout';
import Users from './Users';
import NotAllowed from './NotAllowed';
import { getUser } from '../services/AuthService.js'
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';

export default class MainComponent extends Component {

    render() {
        let user = getUser()
        return (
            <>
                <div className="container">
                    <NavBar user={user} />
                    <Switch>

                        <Route path="/products/add" render={props => user ? <AddProduct {...props} /> : < Redirect to="/notallowed" />} />

                        <Route path="/products/:id/edit" render={props => user ? user.role === 'admin' ? <AddProduct {...props} /> : <Redirect to="/notallowed" /> : <Redirect to="/login" />} />

                        <Route path="/products/:id/delete" render={props => user ? user.role === 'admin' ? <DeleteProduct {...props} /> : <Redirect to="/notallowed" /> : <Redirect to="/login" />} />

                        <Route path="/products/:id" component={Product} />

                        <Route path="/products" component={Products} />

                        <Route path="/login" component={Login} />

                        <Route path="/logout" component={Logout} />

                        <Route path="/users/add" render={props => user ? user.role === 'admin' ? <AddUser {...props} /> : <Redirect to="/notallowed" /> : <Redirect to="/login" />} />

                        <Route path="/users/:username/edit" render={props => user ? user.role === 'admin' ? <AddUser {...props} /> : <Redirect to="/notallowed" /> : <Redirect to="/login" />} />

                        <Route path="/users/:username/delete" render={props => user ? user.role === 'admin' ? <DeleteUser {...props} /> : <Redirect to="/notallowed" /> : <Redirect to="/login" />} />

                        <Route path="/users" render={props => user ? user.role === 'admin' ? <Users {...props} /> : <Redirect to="/notallowed" /> : <Redirect to="/login" />} />

                        <Route path="/notallowed" component={NotAllowed} />

                        <Redirect from="/" to='/products' />

                    </Switch>

                </div >
            </>

        )
    }
}







// b

// 1. In the context of RESTful APIs, PUT is an HTTP method used to update or replace an existing resource on the server. It is one of the standard HTTP methods along with GET, POST, and DELETE.

// 2. PUT is typically used when you want to update the entire representation of a resource with a new version provided in the request. It replaces the existing resource with the new representation sent in the request payload.



// c

// 1. In the context of RESTful APIs, DELETE is an HTTP method used to delete or remove a specified resource from the server. It is one of the standard HTTP methods along with GET, POST, PUT, and others.

// 2. DELETE is typically used when you want to delete a specific resource identified by its unique identifier, such as a URL or request parameter.







// d

// 1. HTTP status codes are three-digit numbers that are returned by a server in response to a client's request made over the HTTP protocol.

// 2. These status codes provide information about the status of the requested resource or the outcome of the request.

//  Some important HTTP status codes:

// 1. 200 OK: The request was successful, and the server returns the requested resource as the response.

// 2. 400 Bad Request: The server cannot understand or process the client's request due to malformed syntax or invalid parameters.

// 3. 401 Unauthorized: The client must authenticate itself to access the requested resource. It usually requires providing valid credentials.

// 4. 403 Forbidden: The client is authenticated, but it does not have permission to access the requested resource.

// 5. 404 Not Found: The requested resource could not be found on the server.

// 6. 500 Internal Server Error: An unexpected error occurred on the server while processing the request. It indicates a server-side issue.



// e

// LocalStorage is a web browser API that allows web applications to store key-value pairs locally on the user's device. It provides a simple and persistent storage mechanism within the user's web browser.

// Advantages Of LocalStorage:

// 1. LocalStorage typically offers a larger storage capacity compared to alternatives like cookies.

// 2. LocalStorage adheres to the same-origin policy, which means that data stored in LocalStorage is only accessible by web pages from the same origin.

// 3. LocalStorage is generally faster compared to fetching data from a remote server.

// 4. Data stored in LocalStorage persists even when the user closes the browser or navigates away from the website.




//  f

// 1. JSON.stringify() is a method used to convert JavaScript objects or values into a JSON string representation.

// 2. It serves the purpose of serializing an object or value into a format that can be easily transmitted or stored, typically in the context of data interchange between a client and a server.





// g

// 1. JSON.parse() is a method used to parse a JSON string and convert it into a JavaScript object or value.

// 2. It serves the purpose of deserializing JSON data, allowing you to work with the data as JavaScript objects and values.




// h

// 1. LocalStorage is used for implementing login and logout functionality in web applications due to its ability to store data locally on the client's browser.

// 2. The stored data remains available even after the user closes the browser or refreshes the page. This is crucial for maintaining the login state of a user between different sessions.

// 3. Storing login-related data in Local Storage reduces the need for frequent server round-trips to authenticate the user for every request.




// i

// 1. window.location is an object that represents the current URL of the web page being displayed in the browser. It provides various properties and methods to access and manipulate the URL.

// 2. window.location is used to control the navigation or redirection of the user after a successful login or logout.



// j

// 1. To hide or show elements based on the status of the user, you can use conditional rendering in React.

// 2. Conditional rendering allows you to conditionally include or exclude elements from the component's JSX based on certain conditions











// k

// 1. The concept of a protected route is used to restrict access to certain routes or pages in a web application based on the user's authentication status. It ensures that only authenticated users can access certain parts of the application while redirecting unauthenticated users to a login page or displaying an appropriate error message.

// 2. Protected Routes are needed to control the access to sensitive areas of your application and ensure that only authorized users can access them. It helps maintain the security and privacy of user data within your application.


// Implementation:
//<Route path="/users" render={props =>
//     user
//         ? user.role === 'admin'
//             ? <Users {...props} />
//             : <Redirect to="/notallowed" />
//         : <Redirect to="/login" />}
// />

// The above code demonstrates that how we can conditionally render components based on the user's authentication status and role. If the user meets the required conditions, the Users component is rendered. Otherwise, they are redirected to the appropriate route for login or access denied.