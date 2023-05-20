const sendFinalResponse = async (req, res) => {
    try {
        const result = req.result;
        res.json(result);
    } catch (error) {
        res.status(403).json({error});
    }
};

export default sendFinalResponse;
