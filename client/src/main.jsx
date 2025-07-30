// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom/client'
// import React from 'react'
// import App from './App.jsx'
// import {BrowserRouter,RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
// import Login from './pages/Login.jsx'
// import Blogs from './pages/Blogs.jsx'
// import Register from './pages/Register.jsx'

// const router=createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='' element={<App/>}>
//        <Route path='/' element={<Blogs/>}/>
//        <Route path='/login' element={<Login/>}/>
//        <Route path='/register' element={<Register/>}/>
//     </Route>

//   )
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )
   

// easy method

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  </BrowserRouter>
  </Provider>
)