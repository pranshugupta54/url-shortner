const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            error: "url is required",
        });
    }

    const shortID = shortid.generate(); // Use shortid.generate() instead of shortid()

    try {
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        return res.json({ id: shortID });
    } catch (error) {
        console.error("Error creating URL:", error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    console.log(result);
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}



module.exports = {
    handleGenerateNewURL,
    handleGetAnalytics
};
