import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./AppLayout";
import Consumables from "./pages/Consumables";



const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<AppLayout />}>
                
                    <Route index element={<Navigate replace to={'dashboard'} />}/>
                    <Route path="dashboard" element={<Dashboard />}/>
                    <Route path="consumables" element={<Consumables />}/>

                </Route>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App; 
