import { Button } from "antd";
import { Link } from "react-router-dom";
import { useGetCustomersQuery } from "../../service/fetchMasters";

const Customers = () => {
    const {data} = useGetCustomersQuery();
    let customers = [];
    if (data){
        console.log(data);
        customers = data.result;
    }
    if (customers.length === 0){
        return (
            <div style={{display:"flex", flexDirection:"column", placeContent:"space-around",minHeight:"70%"}}>
                <div>
                    <h3><i>"The customer's perception is your reality. Make every interaction count." </i>- Kate Zabriskie</h3>
                    <h2>Create and Manage your Customer all in one place.</h2>
                    <Link to="/app/home/customers/new">
                        <Button type="primary" size="large">Create Customer</Button>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <h1>Customers</h1>
    );
};

export default Customers;