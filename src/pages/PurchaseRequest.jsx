import AddPurchaseRequest from "../features/purchase-request/AddPurchaseRequest";
import PurchaseRequestTable from "../features/purchase-request/PurchaseRequestTable";






const PurchaseRequest = () => {
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Purchase Request</h1>
                <AddPurchaseRequest />
            </div>

            <PurchaseRequestTable />
        </>
    )
}

export default PurchaseRequest;