const chai = require("chai");
const expect = chai.expect;
const { mergeFiles, readCSVFile } = require("../app");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.use(require("chai-fs"));

describe("Generate merged CSV file with the combination of other files", () => {
  it("merged csv file is not empty", async () => {
    const names = ["./accessories.csv", "./clothing.csv"];
    await mergeFiles(names, "./mergedFile.csv");
    await readCSVFile("./mergedFile.csv");
    expect("./mergedFile.csv").to.be.a.file("not empty").and.not.empty;
  });
  it("length of the merged file is equal to sum of the requested files", async () => {
    const accessories = await readCSVFile("./accessories.csv");
    const clothing = await readCSVFile("./clothing.csv");
    const merged = await readCSVFile("./mergedFile.csv");
    expect(merged.length).to.be.eq(accessories.length + clothing.length);
  });
  it("stop execution if no files to merge", async () => {
    const filePaths = [];
    const checkFiles = await mergeFiles(filePaths);
    expect(checkFiles).to.be.eq(filePaths);
  });
});
