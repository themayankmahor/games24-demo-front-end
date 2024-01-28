import CustomFooter from "./CustomFooter";
import CustomNavbar from "./CustomNavbar"

const Base = ({title="Welcome to our website", children}) => {

    return(
        <div className="container-fluid p-0 m-0 d-flex flex-column min-vh-100">
            <CustomNavbar />

            <div className="flex-grow-1">
                {children}
            </div>

            <CustomFooter />

        </div>
    )

}

export default Base;