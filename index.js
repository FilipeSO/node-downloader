var http = require("https");
var fs = require("fs");
const path = require("path");
const downloadLinks = require("./items_FFXII.json");

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};

downloadLinks.map((obj, index) => {
  console.log("downloading item", index);
  download(
    obj,
    path.resolve(
      __dirname,
      "final-fantasy-xii-original-piano-collection",
      `item${index}.jpg`
    )
  );
});

// download(
//   "https://html2-f.scribdassets.com/4qqg6rh6rk6542lm/images/3-59efd320ec.jpg",
//   path.resolve(
//     __dirname,
//     "final-fantasy-xii-original-piano-collection",
//     "img0.jpg"
//   ),
//   null
// );
