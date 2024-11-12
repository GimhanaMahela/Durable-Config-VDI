// const df = require("durable-functions");

// // Define the available transformations
// const transformations = {
//   toUpperCase: (value) => value.toUpperCase(),
// };

// // Activity function for data modification
// df.app.activity("ApplyDataModification", {
//   handler: (input) => {
//     const groupedResults = input.results;
//     const fieldsetConfig = input.metaData.fieldset;

//     // console.log(`[${new Date().toISOString()}] Received configuration:`, JSON.stringify(input, null, 2));
// console.log("++++++++++++++++++ Input ",input)
//     fieldsetConfig.forEach((config) => {
//       const fromField = config.fromEach.field;
//       const toGroupField = config.fromEach.to;
//       const fieldset = config.fromEach.fieldset;

//       Object.keys(groupedResults[fromField]).forEach((regionKey) => {
//         // console.log(`[${new Date().toISOString()}] Processing region: ${regionKey}`);

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
//                     `[${new Date().toISOString()}] Applied transformation: ${transform.name} on field ${fromFieldName} resulting in ${value}`
//                   );
//                 }
//               });
//             }

//             newEntry[toFieldName] = value;
//           });

//           // Include any remaining fields without transformations
//           Object.keys(entry).forEach((key) => {
//             if (!newEntry.hasOwnProperty(key)) {
//               newEntry[key] = entry[key];
//             }
//           });

//           return newEntry;
//         });
//       });

//       // Assign modified data to the new field and remove old field if required
//       groupedResults[toGroupField] = groupedResults[fromField];
//       delete groupedResults[fromField];

//       console.log(`[${new Date().toISOString()}] Finished transformation for field ${fromField}`);
//     });

//     console.log(`[${new Date().toISOString()}] Modified groupedResults:`, JSON.stringify(groupedResults, null, 2));
//     return groupedResults;
//   },
// });

// ===================================================
// const df = require("durable-functions");

// // Define the available transformations
// const transformations = {
//   toUpperCase: (value) => value.toUpperCase(),
//   addCommas: (value) => {
//     if (typeof value === 'number') {
//       return value.toLocaleString(); // Adds commas to numbers like 112519 => 112,519
//     }
//     return value;
//   }
// };

// // Activity function for data modification
// df.app.activity("ApplyDataModification", {
//   handler: (input) => {
//     const groupedResults = input.results;
//     const fieldsetConfig = input.metaData.fieldset;

//     console.log("++++++++++++++++++ Input ", input);

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
//                     `[${new Date().toISOString()}] Applied transformation: ${transform.name} on field ${fromFieldName} resulting in ${value}`
//                   );
//                 }
//               });
//             }

//             newEntry[toFieldName] = value;
//           });

//           // Include any remaining fields without transformations
//           Object.keys(entry).forEach((key) => {
//             if (!newEntry.hasOwnProperty(key)) {
//               newEntry[key] = entry[key];
//             }
//           });

//           return newEntry;
//         });
//       });

//       // Assign modified data to the new field and remove old field if required
//       groupedResults[toGroupField] = groupedResults[fromField];
//       delete groupedResults[fromField];

//       console.log(`[${new Date().toISOString()}] Finished transformation for field ${fromField}`);
//     });

//     console.log(`[${new Date().toISOString()}] Modified groupedResults:`, JSON.stringify(groupedResults, null, 2));
//     return groupedResults;
//   },
// });


// With the Population Value Modification =================================================

const df = require("durable-functions");

// Define the transformations
const transformations = {
  toUpperCase: (value) => value.toUpperCase(),
  toCommaFormat: (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();  // Adds commas to numbers like 112519 => 112,519
    }
    return value;
  },
  // Add other transformations here if needed
};

df.app.activity("ApplyDataModification", {
  handler: (input) => {
    const groupedResults = input.results;
    const fieldsetConfig = input.metaData.fieldset;

    console.log("++++++++++++++++++ Input ", input);

    fieldsetConfig.forEach((config) => {
      const fromField = config.fromEach.field;
      const toGroupField = config.fromEach.to;
      const fieldset = config.fromEach.fieldset;

      Object.keys(groupedResults[fromField]).forEach((regionKey) => {
        groupedResults[fromField][regionKey] = groupedResults[fromField][regionKey].map((entry) => {
          const newEntry = {};

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
                    `[${new Date().toISOString()}] Applied transformation: ${transform.name} on field ${fromFieldName} resulting in ${value}`
                  );
                }
              });
            }

            newEntry[toFieldName] = value;
          });

          // Include any remaining fields without transformations
          Object.keys(entry).forEach((key) => {
            if (!newEntry.hasOwnProperty(key)) {
              newEntry[key] = entry[key];
            }
          });

          return newEntry;
        });
      });

      // Assign modified data to the new field and remove old field if required
      groupedResults[toGroupField] = groupedResults[fromField];
      delete groupedResults[fromField];

      console.log(`[${new Date().toISOString()}] Finished transformation for field ${fromField}`);
    });

    console.log(`[${new Date().toISOString()}] Modified groupedResults:`, JSON.stringify(groupedResults, null, 2));
    return groupedResults;
  },
});

  