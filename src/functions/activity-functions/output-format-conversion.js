// const df = require("durable-functions");
// const xml2js = require('xml2js');  // Import the xml2js package

// // Define the transformations
// const transformations = {
//   toUpperCase: (value) => value.toUpperCase(),
//   toCommaFormat: (value) => {
//     if (typeof value === 'number') {
//       return value.toLocaleString();  // Adds commas to numbers like 112519 => 112,519
//     }
//     return value;
//   },
//   // Add other transformations here if needed
// };

// // Helper function to sanitize XML element names
// function sanitizeForXML(name) {
//   return name.replace(/[^a-zA-Z0-9_]/g, '_');  // Replaces non-XML-compatible characters with '_'
// }

// df.app.activity("OutputFormatConversion", {
//   handler: (input) => {
//     const groupedResults = input.results;
//     const fieldsetConfig = input.metaData.fieldset;
//     const outputFormat = input.metaData.outputFormat;  // Assuming this is passed in the input

//     console.log("++++++++++++++++++ Input ", input);

//     // Apply the transformations based on the config
//     fieldsetConfig.forEach((config) => {
//       const fromField = config.fromEach.field;
//       const toGroupField = config.fromEach.to;
//       const fieldset = config.fromEach.fieldset;

//       Object.keys(groupedResults[fromField]).forEach((regionKey) => {
//         groupedResults[fromField][regionKey] = groupedResults[fromField][regionKey].map((entry) => {
//           const newEntry = {};

//           fieldset.forEach((fieldConfig) => {
//             const fromFieldName = fieldConfig.from;
//             const toFieldName = fieldConfig.to || fromFieldName;
//             let value = entry[fromFieldName];

//             // Apply transformations
//             if (fieldConfig.transform) {
//               fieldConfig.transform.forEach((transform) => {
//                 if (transformations[transform.name]) {
//                   value = transformations[transform.name](value);
//                   console.log(
//                     `Applied transformation: ${transform.name} on field ${fromFieldName} resulting in ${value}`
//                   );
//                 }
//               });
//             }

//             // Sanitize the field name for XML
//             newEntry[sanitizeForXML(toFieldName)] = value;
//           });

//           // Include any remaining fields without transformations
//           Object.keys(entry).forEach((key) => {
//             if (!newEntry.hasOwnProperty(key)) {
//               newEntry[sanitizeForXML(key)] = entry[key];
//             }
//           });

//           return newEntry;
//         });
//       });

//       // Assign modified data to the new field and remove old field if required
//       groupedResults[toGroupField] = groupedResults[fromField];
//       delete groupedResults[fromField];

//       console.log(`Finished transformation for field ${fromField}`);
//     });

//     // console.log(`Modified groupedResults:`, JSON.stringify(groupedResults, null, 2));

//     // If the output format is XML, convert the result to XML
//     if (outputFormat === "XML") {
//       const builder = new xml2js.Builder({ headless: true });
//       // Convert the result to XML format with sanitized keys
//       const xmlResult = builder.buildObject({ results: groupedResults });  
//       console.log(`\n=========== XML Output ============\n`, xmlResult);
//       return xmlResult;  // Return the XML formatted result
//     }
//     // If the output format is JSON, return the JSON result 
//     else if (outputFormat === "JSON") {
//         const jsonResult = JSON.stringify(groupedResults, null, 2)
//         console.log(`\n=========== JSON Output ============\n`, jsonResult);
//         return jsonResult;
//     }


//     // return groupedResults;  // Otherwise, return the transformed data as JSON
//   },
// });

// ==============================================================================
// Remove fromField output from the XML and Save the relevent XML or JSON output under Output Folder

// const df = require("durable-functions");
// const xml2js = require("xml2js"); // Import the xml2js package
// const fs = require("fs");
// const path = require("path");

// // Define the transformations
// const transformations = {
//   toUpperCase: (value) => value.toUpperCase(),
//   toCommaFormat: (value) => {
//     if (typeof value === "number") {
//       return value.toLocaleString(); // Adds commas to numbers like 112519 => 112,519
//     }
//     return value;
//   },
//   // Add other transformations here if needed
// };

// // Helper function to sanitize XML element names
// function sanitizeForXML(name) {
//   return name.replace(/[^a-zA-Z0-9_]/g, "_"); // Replaces non-XML-compatible characters with '_'
// }

// df.app.activity("OutputFormatConversion", {
//   handler: (input) => {
//     const groupedResults = input.results;
//     const fieldsetConfig = input.metaData.fieldset;
//     const outputFormat = input.metaData.outputFormat; // Assuming this is passed in the input

//     console.log("++++++++++++++++++ Input ", input);

//     // Apply the transformations based on the config
//     fieldsetConfig.forEach((config) => {
//       const fromField = config.fromEach.field;
//       const toGroupField = config.fromEach.to;
//       const fieldset = config.fromEach.fieldset;

//       // Process each entry in groupedResults based on region
//       Object.keys(groupedResults[fromField]).forEach((regionKey) => {
//         groupedResults[fromField][regionKey] = groupedResults[fromField][
//           regionKey
//         ].map((entry) => {
//           const newEntry = {}; // New entry will only contain transformed fields

//           fieldset.forEach((fieldConfig) => {
//             const fromFieldName = fieldConfig.from;
//             const toFieldName = fieldConfig.to || fromFieldName;
//             let value = entry[fromFieldName];

//             // Apply transformations
//             if (fieldConfig.transform) {
//               fieldConfig.transform.forEach((transform) => {
//                 if (transformations[transform.name]) {
//                   value = transformations[transform.name](value);
//                   console.log(
//                     `Applied transformation: ${transform.name} on field ${fromFieldName} resulting in ${value}`
//                   );
//                 }
//               });
//             }

//             // Only add transformed fields to newEntry
//             if (value !== undefined) {
//               newEntry[sanitizeForXML(toFieldName)] = value;
//             }
//           });

//           // Only include transformed fields (i.e., skip untransformed fields like Country_Name, Population)
//           return newEntry;
//         });
//       });

//       // Assign modified data to the new field and remove old field if required
//       groupedResults[toGroupField] = groupedResults[fromField];
//       delete groupedResults[fromField];

//       console.log(`Finished transformation for field ${fromField}`);
//     });

//     // Specify your desired output folder
//     const outputFolder = path.join(__dirname, "outputFolder");

//     // Ensure the output folder exists, if not, create it
//     if (!fs.existsSync(outputFolder)) {
//       fs.mkdirSync(outputFolder, { recursive: true });
//     }

//     // If the output format is XML, convert the result to XML
//     if (outputFormat === "XML") {
//       const builder = new xml2js.Builder({ headless: true });
//       // Convert the result to XML format with sanitized keys
//       const xmlResult = builder.buildObject({ results: groupedResults });
//       console.log(`\n=========== XML Output ============\n`, xmlResult);

//       // Define the file path for XML output
//       const xmlFilePath = path.join(outputFolder, "output.xml");

//       // Write the XML result to a file in the specified folder
//       fs.writeFileSync(xmlFilePath, xmlResult, "utf8");

//       return xmlResult; // Return the XML formatted result
//     }
//     // If the output format is JSON, return the JSON result
//     else if (outputFormat === "JSON") {
//       const jsonResult = JSON.stringify(groupedResults, null, 2);
//       console.log(`\n=========== JSON Output ============\n`, jsonResult);

//       // Define the file path for JSON output
//       const jsonFilePath = path.join(outputFolder, "output.json");

//       // Write the JSON result to a file in the specified folder
//       fs.writeFileSync(jsonFilePath, jsonResult, "utf8");

//       return jsonResult;
//     }
//   },
// });


// Add more Configurations like isSave is true and saveLocation should be define, if isSave is true
const df = require("durable-functions");
const xml2js = require("xml2js"); // Import the xml2js package
const fs = require("fs");
const path = require("path");

// Define the transformations
const transformations = {
  toUpperCase: (value) => value.toUpperCase(),
  toCommaFormat: (value) => {
    if (typeof value === "number") {
      return value.toLocaleString(); // Adds commas to numbers like 112519 => 112,519
    }
    return value;
  },
  // Add other transformations here if needed
};

// Helper function to sanitize XML element names
function sanitizeForXML(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, "_"); // Replaces non-XML-compatible characters with '_'
}

df.app.activity("OutputFormatConversion", {
  handler: (input) => {
    const groupedResults = input.results;
    const fieldsetConfig = input.metaData.fieldset;
    const outputFormat = input.metaData.outputFormat; // Assuming this is passed in the input
    const isSave = input.metaData.isSave; // Flag to decide whether to save the file
    const saveLocation = input.metaData.saveLocation; // Folder path to save the file

    console.log("++++++++++++++++++ Input ", input);

    // Apply the transformations based on the config
    fieldsetConfig.forEach((config) => {
      const fromField = config.fromEach.field;
      const toGroupField = config.fromEach.to;
      const fieldset = config.fromEach.fieldset;

      // Process each entry in groupedResults based on region
      Object.keys(groupedResults[fromField]).forEach((regionKey) => {
        groupedResults[fromField][regionKey] = groupedResults[fromField][
          regionKey
        ].map((entry) => {
          const newEntry = {}; // New entry will only contain transformed fields

          fieldset.forEach((fieldConfig) => {
            const fromFieldName = fieldConfig.from;
            const toFieldName = fieldConfig.to || fromFieldName;
            let value = entry[fromFieldName];

            // Apply transformations
            if (fieldConfig.transform) {
              fieldConfig.transform.forEach((transform) => {
                if (transformations[transform.name]) {
                  value = transformations[transform.name](value);
                  console.log(
                    `Applied transformation: ${transform.name} on field ${fromFieldName} resulting in ${value}`
                  );
                }
              });
            }

            // Only add transformed fields to newEntry
            if (value !== undefined) {
              newEntry[sanitizeForXML(toFieldName)] = value;
            }
          });

          // Only include transformed fields (i.e., skip untransformed fields like Country_Name, Population)
          return newEntry;
        });
      });

      // Assign modified data to the new field and remove old field if required
      groupedResults[toGroupField] = groupedResults[fromField];
      delete groupedResults[fromField];

      console.log(`Finished transformation for field ${fromField}`);
    });

    // Check if the file should be saved
    if (isSave) {
      // Specify the desired save folder (from the input metadata)
      const outputFolder = path.join(__dirname, saveLocation);

      // Ensure the output folder exists, if not, create it
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      // If the output format is XML, convert the result to XML
      if (outputFormat === "XML") {
        const builder = new xml2js.Builder({ headless: true });
        // Convert the result to XML format with sanitized keys
        const xmlResult = builder.buildObject({ results: groupedResults });
        console.log(`\n=========== XML Output ============\n`, xmlResult);

        // Define the file path for XML output
        const xmlFilePath = path.join(outputFolder, "output.xml");

        // Write the XML result to a file in the specified folder
        fs.writeFileSync(xmlFilePath, xmlResult, "utf8");

        return xmlResult; // Return the XML formatted result
      }
      // If the output format is JSON, return the JSON result
      else if (outputFormat === "JSON") {
        const jsonResult = JSON.stringify(groupedResults, null, 2);
        console.log(`\n=========== JSON Output ============\n`, jsonResult);

        // Define the file path for JSON output
        const jsonFilePath = path.join(outputFolder, "output.json");

        // Write the JSON result to a file in the specified folder
        fs.writeFileSync(jsonFilePath, jsonResult, "utf8");

        return jsonResult;
      }
    } else {
      console.log("File not saved as isSave is false.");
      return null; // No file saved
    }
  },
});
