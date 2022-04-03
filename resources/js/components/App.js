import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import SignIn from './SignIn'
import ClientsList from './ClientsList'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/dashboard' element={<ClientsList/>} />
                        <Route path='/register' element={<SignUp/>} />
                        <Route path='/login' element={<SignIn/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
