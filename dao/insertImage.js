module.exports = function (req, nameFolder, callback) {
    // let uploadPath;

    if (req.files && Object.keys(req.files).length !== 0) {
        try {
            const sampleFile = req.files.image;
            const dataString = sampleFile.data.toString("base64");
            const dataImage = `data:${sampleFile.mimetype};base64,${dataString}`;
            callback(false, dataImage);
        } catch (e) {
            callback(e, "");
            console.log("🚀 ~ file: insertImage.js ~ line 12 ~ e", e);
        }
    } else {
        callback("No file Upload", "");
    }
};
