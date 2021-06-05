const archiver = require("archiver");
var fs = require("fs");

var dir = "./release";

/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
function zipDirectory(source: string, out: string): Promise<void> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err: any) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

zipDirectory("./dist", "./release/basecamp_essentials.zip");
