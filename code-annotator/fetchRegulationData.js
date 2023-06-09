const airtable = require("airtable");

let records = [];

// called for every page of records
const processPage = (partialRecords, fetchNextPage) => {
  records = [...records, ...partialRecords];
  fetchNextPage();
};

// called when all the records have been retrieved
const processRecords = (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //process the `records` array and do something with it
};

async function fetchRegulationData(techType) {
  airtable.configure({ apiKey: "keyuraR6wapELA8Vx" });
  const base = airtable.base("app0Z867nAUQu0K2v");
  const table = base("Bank Regulation");
  console.log(table);
  let regData = [];
  const records = await table
    .select({
      view: "viwHcuxCRO5129jue",
    })
    .all();

  // table
  //   .select({
  //     view: "viwHcuxCRO5129jue",
  //   })
  //   .firstPage((err, records) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     // console.log(records[0]["fields"]["Key"]);
  //     //all records are in the records array, do something with it
  //     for (let rec of records) {
  //       console.log(rec, rec["fields"]["Tech"]);
  //       console.log(String(rec["fields"]["Tech"]) === techType, techType);
  //       if (String(rec["fields"]["Tech"]) === techType) {
  //         regData.push(rec["fields"]);
  //         console.log("push", regData);
  //       }
  //     }
  //   })
  //   .then(() => {
  //     return regData;
  //   });
  //filter data
  for (let i = 0; i < records.length; i++) {
    if (String(records[i].get("Tech")) === techType) {
      regData.push({
        id: records[i].getId(),
        violation: records[i].get("Violation"),
        regulation: records[i].get("Details"),
        keywords: records[i].get("Key"),
      });
      console.log("push", regData);
    }
  }
  return regData;
}

module.exports = fetchRegulationData;
