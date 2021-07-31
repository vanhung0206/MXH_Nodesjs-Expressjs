

module.exports = function(req, nameFolder , callback) {
    let sampleFile;
    let uploadPath;
    sampleFile = req.files.image;
    var tempPath = __dirname.split("\\")
    tempPath.pop();
    tempPath.push("public","images", nameFolder);
    tempPath = tempPath.join("\\");
    uploadPath =  tempPath + "/"+ sampleFile.name;
    if (req.files && Object.keys(req.files).length !== 0) {
        sampleFile.mv(uploadPath, err => {
            var pathShow = `/images/${nameFolder}/${sampleFile.name}`;
            callback(err, pathShow );
        });
    } else {
        var pathShow = "";
        callback("No file Upload", pathShow)
    }
}