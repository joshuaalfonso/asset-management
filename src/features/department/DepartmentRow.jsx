






export const DepartmentRow = ({row, index}) => {
    return (
        <>
            <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.departmentName}</td>
            </tr>
        </>
    )
}