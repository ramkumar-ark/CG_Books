import getMasters from "../../data/getMasters";

export default async function(req, res){
    try {
        const data = await getMasters();
        return res.json({data});
    } catch (error) {
        res.status(404).json({error});
    }
}