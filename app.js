const args = require("yargs");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");

const filePaths = args.argv._;

const readCSVFile = (file) => {
  const fileExt = file.substring(file.lastIndexOf("."));
  return new Promise((resolve, reject) => {
    if (fileExt === ".csv") {
      const readData = [];
      csv
        .parseFile(file, { headers: true })
        .on("data", (data) => {
          data["fileName"] = path.parse(file).base;
          readData.push(data);
        })
        .on("end", () => {
          resolve(readData);
        });
    } else {
      console.log("Cannot merge other than CSV files!");
    }
  });
};

const mergeFiles = async (files, mergedFile) => {
  if (files.length !== 0) {
    const promises = files.map(async (file) => await readCSVFile(file));
    const results = await Promise.all(promises);
    const formatCsv = csv.format({ headers: true });
    const writedata = fs.createWriteStream(mergedFile);
    writedata.on("finish", () => {
      console.log("Succesfully merged files to mergedFile.csv!");
    });
    formatCsv.pipe(writedata);
    results.forEach((result) => {
      result.forEach((data) => {
        formatCsv.write(data);
      });
    });
    formatCsv.end();
  } else {
    console.log("No files to merge, please enter the paths to merge the files");
    return files;
  }
};

mergeFiles(filePaths, "mergedFile.csv");

module.exports = {
  readCSVFile,
  mergeFiles
};
