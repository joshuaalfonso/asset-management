import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./AppLayout";
import Consumables from "./pages/Consumables";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PurchaseRequest from "./pages/PurchaseRequest";
import { Toaster } from 'sonner'
import { UnitOfMeasure } from "./pages/UnitOfMeasure";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1,
        }
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <ReactQueryDevtools initialIsOpen="false" />
            <Toaster position="top-right" richColors/>
            
            <BrowserRouter>
                <Routes>

                    <Route element={<AppLayout />}>
                    
                        <Route index element={<Navigate replace to={'dashboard'} />}/>
                        <Route path="dashboard" element={<Dashboard />}/>
                        <Route path="purchase-request" element={<PurchaseRequest />}/>
                        <Route path="consumables" element={<Consumables />}/>
                        <Route path="unit-of-measure" element={<UnitOfMeasure />}/>

                    </Route>
                    <Route path="*" element={<PageNotFound />}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App; 
