import PurchaseRequestRow from "./PurchaseRequestRow";
import usePurchaseRequest from "./usePurchaseRequest";







const PurchaseRequestTable = () => {


     const { purchaseRequest, isLoading, error } = usePurchaseRequest();

     if (isLoading) return <div>Loading...</div>;

     if (error) return <div> {error.message || 'Failed to load purchase request'} </div>

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>PR Date</th>
                        <th>PR #</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>

                    {purchaseRequest.map((row, index) => (
                        <PurchaseRequestRow 
                            row={row} 
                            key={row.id} 
                            index={index} 
                        />
                    ))}

                    </tbody>
                    
                </table>

            </div>
        </>
    )
}

export default PurchaseRequestTable;