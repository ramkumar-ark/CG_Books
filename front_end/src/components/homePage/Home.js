import React from "react";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import './home.css';
import contactUsImg from '../../resources/images/contact-us-image.jpg';

const {Text, Title} = Typography;

const Home = () => {
    const viewPortHeight = useGetViewPortHeight();
    return (
        <div style={{height:viewPortHeight-64, overflow:'auto'}}>
        <div id="homeSection" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', 
            backgroundColor:'royalblue', color:'#e0f4ac', padding:'0px 40px 40px', 
            minWidth:375, minHeight:560}}>
            <h1 style={{fontSize:40}}>Simplified Yet Powerful Accounting Platform for your Business</h1>
            <Text style={{color:'white', fontSize:20}}>
            Are you tired of juggling multiple spreadsheets and struggling to keep track of your business finances? Look no further than our accounting application – the all-in-one solution for small Indian businesses.
            With our easy-to-use platform, you can manage invoices, track receivables, and keep an eye on payables all in one place. No more headaches from managing multiple systems or manually reconciling financial data.
            </Text>
            <Button size="large" style={{backgroundColor:'yellowgreen', marginTop:40, height:50}}
                href="/app/home/dashboard">
                <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>Access CG Books</Text>
            </Button>
        </div>
        <section id='featuresSection' className="features">
            <Row><Col span={24}><h1 className="title">Features</h1></Col></Row>
            <Row gutter={[30, 30]} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
                <Col md={8} sm={12} xs={24}>
                    <Card title="Invoice Management" bordered={false} hoverable={true}
                        headStyle={{backgroundColor:'royalblue', color:'#e0f4ac', fontSize:'large'}}>
                    Create and manage professional-looking invoices in minutes with our intuitive and easy-to-use invoice management system.
                    </Card>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Card title="Bills Management" bordered={false} hoverable={true}
                        headStyle={{backgroundColor:'royalblue', color:'#e0f4ac', fontSize:'large'}}>
                    Keep track of all your bills in one place and never miss a payment again. Our bills management system allows you to easily create bills and track due dates, so you can stay on top of your expenses.
                    </Card>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Card title="Receivables Management" bordered={false} hoverable={true}
                        headStyle={{backgroundColor:'royalblue', color:'#e0f4ac', fontSize:'large'}}>
                    Get paid faster and more efficiently with our receivables management system. You can easily track customer payments and generate reports to keep tabs on your outstanding receivables.
                    </Card>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Card title="Payables Management" bordered={false} hoverable={true}
                        headStyle={{backgroundColor:'royalblue', color:'#e0f4ac', fontSize:'large'}}>
                    Streamline your payment process and keep your cash flow healthy with our payables management system. You can easily track vendor bills, schedule payments, and generate reports to help you manage your cash flow more effectively.
                    </Card>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Card title="Reports and Analytics" bordered={false} hoverable={true}
                        headStyle={{backgroundColor:'royalblue', color:'#e0f4ac', fontSize:'large'}}>
                    Get insights into your business finances with our comprehensive reporting and analytics tools. You can generate a variety of reports, including profit and loss statements, balance sheets, and cash flow statements, and get a clear picture of your business's financial health.
                    </Card>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Card title="Multi-User Access" bordered={false} hoverable={true}
                        headStyle={{backgroundColor:'royalblue', color:'#e0f4ac', fontSize:'large'}}>
                    Our multi-user access feature allows you to give access to your accounting data to your accountant or team members. You can assign different roles and permissions to each user, so you can control who has access to sensitive financial information.
                    </Card>
                </Col>
            </Row>
            <Row><Col span={24}>
            <Card style={{margin:'40px 0', display:'flex'}}>
                <Row gutter={[40, 20]} style={{display:'flex', alignItems:"center"}}>
                    <Col lg={18} span={24}><Text style={{fontSize:20, color:'royalblue', fontWeight:'bold'}}>With these powerful features and more, our accounting application will help you streamline your financial management, save time, and grow your business. Try it today and see the difference it can make for your business!</Text></Col>
                    <Col lg={6} span={24}><Button href='/app/home/dashboard' type="primary" size="large">
                        Access CG Books</Button></Col>
                </Row>
            </Card>
            </Col></Row>
        </section>
        <section id='pricingSection' className='pricing'>
            <Row><Col span={24}><Title className="title">PRICING</Title></Col></Row>
            {/* <Title className="title">It's Completely Free</Title> */}
            <Title level={3} style={{color:'white'}}>
                We are Happy to annouce that CG Books is completely free to use.{'\n'}
                In order to facilitate Indian micro and small businesses, we have made CG Books as free to use platform.
            </Title>
        </section>
        <section id='contactSection' className="contactus">
            <Title level={3} className="title">Get In Touch!</Title>
            <Card
                style={{width:'100%', minHeight:560}}
                cover={<img height={300} alt="example" src={contactUsImg} />}>
                <Space size={"large"} direction="vertical">
                <Text style={{fontSize:25}}>Want to get in touch? We'd love to hear from you. Here's how you can reach us...</Text>
                <li style={{fontSize:18, textAlign:'left'}}>
                    <Text strong style={{fontSize:18}}>Talk to Support:</Text>   +91-7904012432
                </li>
                <li style={{fontSize:18, textAlign:'left'}}>
                    <Text strong style={{fontSize:18}}>Chat through email:</Text>   arktechsolutions@gmail.com
                </li>              
                </Space>
            </Card>
        </section>
        </div>
    );
};

export default Home;