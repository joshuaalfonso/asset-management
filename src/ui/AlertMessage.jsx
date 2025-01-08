

export const AlertMessage = ({ message }) => {
    return (
        <div role="alert" className="alert">
            <i className="fi fi-rr-exclamation text-error flex text-xl"></i>
            <span>{`${message} Please contact the admin.`}</span>
        </div>
    )
}