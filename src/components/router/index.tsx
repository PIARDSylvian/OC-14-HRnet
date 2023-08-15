import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Employees from '../../pages/Employees'

const router = createBrowserRouter([
    {
        errorElement: <Navigate replace to="/" />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/employees',
                element: <Employees />,
            },
        ],
    },
])

function Router() {
    return <RouterProvider router={router} />
}
export default Router
