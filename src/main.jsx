import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CreateAccount from './pages/CreateAccount'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import App from './App'
import store from './redux/store'
import './index.css'

import Search from './pages/Search'
import Event from './pages/Event'
import ErrorPage from './pages/ErrorPage'

import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        children: [
            { index: true, element: <Home /> },
            { path: "signup", element: <SignUp/>},
            { path: "search", element: <Search /> },
            { path: "events/:eventID", element: <Event /> }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
)