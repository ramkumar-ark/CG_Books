import SubHeader from "../individual components/SubHeader";
import { Typography } from "antd";
import { useLocation, Link } from "react-router-dom";

const {Title, Text } = Typography;

const ReportsHomePage = () => {
    const {pathname} = useLocation();
    return (
        <>
            <SubHeader topOffset={0}>
                <Title level={2} style={{marginTop: 15}}>View Financial Reports</Title>
            </SubHeader>
            <div className="reports-card">
                <div className="reports-card__header">
                    <Title level={2}>View Reports</Title>
                </div>
                <Link to={`${pathname}/incomestatement`}>
                    <div className="reports-card__row">
                        <Text>Profit and Loss Statement</Text>
                    </div>
                </Link>
                <Link>
                    <div className="reports-card__row">
                        <Text>Balance Sheet</Text>
                    </div>
                </Link>
                <Link>
                    <div className="reports-card__row">
                        <Text>Day Book</Text>
                    </div>
                </Link>
                <Link>
                    <div className="reports-card__row">
                        <Text>Trial Balance</Text>
                    </div>
                </Link>
                <Link>
                    <div className="reports-card__row">
                        <Text>Ledger Statement</Text>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default ReportsHomePage;
