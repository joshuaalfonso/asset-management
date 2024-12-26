import useGetAsset from "../../services/useGetAssets";




const ConsumablesTable = () => {

    const {assets, loading, error} = useGetAsset();

    if (loading) return <span className="loading loading-spinner text-primary"></span>;

    if (error) return <div>{error.message || 'Failed to load assets'}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Assigned To</th>
                </tr>
                </thead>
                <tbody>

                {assets.map((asset, index) => (
                    <tr key={asset.id}>
                        <th>{index + 1}</th>
                        <td>
                            <img src={asset.image} width={50}/>
                        </td>
                        <td>{asset.name}</td>
                        <td>{asset.type}</td>
                        <td>{asset.expand?.assigned_to?.name}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}

export default ConsumablesTable