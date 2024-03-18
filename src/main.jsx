import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/Home'
import App from './App'
import Search from './pages/Search'
import Event from './pages/Event'
import Feed from './pages/Feed'
import ErrorPage from './pages/ErrorPage'

import './index.css'

import store from './redux/store'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <App><ErrorPage /></App>,
        children: [
            { index: true, element: <Home /> },
            { path: "search", element: <Search /> },
            { path: "events", element: <Feed /> },
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