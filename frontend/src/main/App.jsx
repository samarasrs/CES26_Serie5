import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import './App.css'
import React from 'react'

import Header from '../components/templates/Header'
import UserCrud from '../components/user/UserCrud'




export default props =>
    <div className="app">
        <Header title ="Série 5 - CES26"
            subtitle="Samara Ribeiro Silva - COMP22"/>
        
        <UserCrud />
        
    </div>