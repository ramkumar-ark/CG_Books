import { Space, Typography } from "antd";
import {  } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Text } = Typography;

const AddressDisplayCard = ({datas}) => {
    const [addresses, setAddresses] = useState(datas);

    useEffect(
        () => {setAddresses(datas)},
        [datas]
    );

    if (addresses)
    return (
        <>
        {addresses.map(data => 
            <div>
                {data.attention && <><Text strong>{data.attention}</Text><br/></>}
                {data.street1 && <><Text>{data.street1}</Text><br/></>}
                {data.street2 && <><Text>{data.street2}</Text><br/></>}
                {data.city && <><Text>{data.city}</Text><br/></>}
                {(data.state || data.pincode) && <><Text>{(data.state || "") + " " + (data.pincode || "")}</Text><br/></>}
                {data.country && <><Text>{data.country}</Text><br/></>}
                {data.phone && <><Text>Phone: {data.phone}</Text><br/></>}
                {data.fax && <><Text>Fax: {data.fax}</Text><br/></>}
            </div>
        )}
        
        </>
    );
};

export default AddressDisplayCard;
