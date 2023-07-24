import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

import Home from './component/Home/Home'
import Products from './page/Products'
import Cart from './page/Cart'
import ProductDetails from './page/ProductDetails'
import Contact from './page/Contact'
import Payment from './page/Payment'
import MyAccount from './page/MyAccount'
import EditAdd from './page/EditAdd'
import MyOrder from './page/MyOrder'
import { ConText } from './context/DataContext'
import Register from './page/Register'
import Login from './page/Login'
import Success from './page/Success'
import PayNow from './page/PayNow'

import { Provider } from 'react-redux'

import './App.css'
import store from './redux/store'
import PaymentForm from './Payment/PaymentForm'


const App = () => {
  return (
    <>
      <Provider store={store}><ConText>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/details/:id" component={ProductDetails} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/edit_address/:id" component={EditAdd} />
            <Route exact path="/myorder/:id" component={MyOrder} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/paynow/:pid" component={PayNow} />
          </Switch>
        </BrowserRouter>
      </ConText></Provider>
      {/* <PaymentForm/> */}
    </>
  )
}

export default App
