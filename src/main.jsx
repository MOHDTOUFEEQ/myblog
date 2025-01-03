import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './components/Login.jsx'
import  Home  from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Protection from './components/protection/Protection.jsx'
import Allblogs from './components/Allblogs.jsx'
import Postform from './components/PostForm/Postform.jsx'
import ViewBlog from './components/ViewBlog.jsx'
import HomeViewBlog from './components/HomeViewBlog.jsx'
import Edit from './components/edit/Edit.jsx'
import { Analytics } from "@vercel/analytics/react"
const router = createBrowserRouter([
  {
    path: "/",
    element : <App />,
    children : [
      {
        path: "/",
        element:(
          <Home />
        ),
        
      },
      {
        path: "/login",
        element:(
          <Login />
        ),
      },
      {
        path: "/Sign-up",
        element:(
          <Signup />
        ),
      }, 
      {
        path: "/all-Blog",
        element:(
          <Protection >

            <Allblogs />
          </Protection>
        ),
      },
      {
        path: "/create-post",
        element:(
          <Protection>
            <Postform/>   
          </Protection>
            
        ),
      }, 
      {
        path : "/all-Blog/:id",
        element:(
          <Protection>
            <ViewBlog/>  
          </Protection>
      ),
      },{
        path: "/homeview/:id",
        element:(
            <HomeViewBlog />
        )
      },
      {
        path:"/Edit/:id",
        element:(
          <Edit/>
        )
      } ,  
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Analytics />
  </React.StrictMode>,
)
