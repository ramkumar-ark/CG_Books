// import getMasters from "../../data/getMasters";

// export default async function(req, res){
//     try {
//         const data = await getMasters();
//         return res.json({data});
//     } catch (error) {
//         res.status(404).json({error});
//     }
// }
const data = [
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
    { name:"ABC Pvt Ltd", companyName:"ABC Private Limited", email:"abc@abc.com", phone:"790408531", receivalbe:5355},
];

export default async function(req,res){
    try {
        const result = data;
        res.json({result});
    } catch (error) {
        res.status(403).json({error});
    }
}