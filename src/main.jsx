import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import AppLayout from './AppLayout.jsx'
import Consumables from './pages/Consumables.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <Dashboard /> 
      },
      {
        path: '/consumables',
        element: <Consumables /> 
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
