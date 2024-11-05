// const df = require("durable-functions");
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");


// df.app.activity("TransformData", {
//   handler: (input) => {
//       // console.log("Input Object =============================>",input)
//       const results = input.results;
//       // const groupingMethods = input.metaData.groupFields;
//       const groupAttributes = input.metaData.groupData;

//       const groupFields = input.metaData.groupFields;
//       const data = input.results.results;
//       // const groupAttributes = input.metaData.groupData;

//       // console.log("Grouping Methods ====================>>>>>>>>>>",groupingMethods)
//       if (data.length == 0  || !groupFields) {
//         throw new Error(
//           "Missing required parameters: configfile and groupingmethods."
//         );
//       }

//       // const rawData = JSON.parse(fs.readFileSync(configfile, "utf8"));
//       // const data = Array.isArray(rawData) ? rawData : rawData.DataObject || [];

//       const groupedResults = {};

//       groupFields.forEach((method) => {
//         const result = groupData(results.results, method);
//         groupedResults[method] = result;
//       });

//       // console.log("////////////////////", groupedResults);

//       filterAttributes(groupedResults, groupAttributes);
      
   
//        return groupedResults;



//       // ========================================================

//       // console.log()
//     // groupingData(input);
//     // Function to group data based on a provided method and path
    

//     // Main function to engage with data and grouping methods directly
//     // function groupingData(input) {

//     //   const groupFields = input.metaData.groupFields;
//     //   const data = input.results.results;
//     //   const groupAttributes = input.metaData.groupData;

//     //   // console.log("Grouping Methods ====================>>>>>>>>>>",groupingMethods)
//     //   if (data.length == 0  || !groupFields) {
//     //     throw new Error(
//     //       "Missing required parameters: configfile and groupingmethods."
//     //     );
//     //   }

//     //   // const rawData = JSON.parse(fs.readFileSync(configfile, "utf8"));
//     //   // const data = Array.isArray(rawData) ? rawData : rawData.DataObject || [];

//     //   const groupedResults = {};

//     //   groupFields.forEach((method) => {
//     //     const result = groupData(results.results, method);
//     //     groupedResults[method] = result;
//     //   });

//     //   // console.log("////////////////////", groupedResults);

//     //   filterAttributes(groupedResults, groupAttributes);
      
   
//     //    return groupedResults;
//     // }

    
//   },
// });

// function groupData(data, groupingMethods) {
//   const groupedData = {};

//   // Helper function to recursively search for the grouping key within nested objects and arrays
//   function findAndGroup(items, keyPath) {
//     items.forEach((item) => {
//       let key = item;
//       for (let path of keyPath) {
//         if (Array.isArray(key)) {
//           key = key.map((subItem) => subItem[path]).flat();
//         } else {
//           key = key && key[path];
//         }
//       }

//       if (Array.isArray(key)) {
//         key.forEach((k) => {
//           if (k) {
//             if (!groupedData[k]) {
//               groupedData[k] = [];
//             }
//             groupedData[k].push(item);
//           }
//         });
//       } else if (key) {
//         if (!groupedData[key]) {
//           groupedData[key] = [];
//         }
//         groupedData[key].push(item);
//       } else {
//         console.warn(
//           `Warning: Grouping key '${keyPath.join(
//             "."
//           )}' not found in some items.`
//         );
//       }
//     });
//   }

//   if (!Array.isArray(data)) {
//     throw new TypeError(
//       "Data is not an array. Please check your data structure."
//     );
//   }

//   const keyPath = groupingMethods.split(".");
//   findAndGroup(data, keyPath);

//   return groupedData;
// }

// const getPropertyByPath = (obj, path) => {
//   return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
// };


// function filterAttributes(groupedResults, groupAttributes) { 

//   Object.keys(groupedResults).forEach((criteria) => {

//     const baseGroup = groupedResults[criteria];
//     // console.log("======================>>group:", baseGroup); 
    
//     Object.keys(baseGroup).forEach((group) => {

//       baseGroup[group].forEach((element) => {

//         const newElement = {};
    
//         // assign new attributes from groupAttributes
//         for (let index = 0; index < groupAttributes.length; index++) {
//           const propertyName = groupAttributes[index].name.toString();
//           newElement[propertyName] = getPropertyByPath(element, groupAttributes[index].path);
//         }

//         // clear existing object
//         Object.keys(element).forEach((key) => {
//           delete element[key]; 
//         });


//         // replacing the element
//         Object.assign(element, newElement);

        

//       });

//       // console.log("🚀 ~ baseGroup[group].forEach ~ baseGroup[group]:", baseGroup[group])



//     })

//   });

//   console.log("🚀 ~ filterAttributes ~ groupedResults:", groupedResults)

//   return groupedResults;
  
// }

//*/////=================================================================================================================*/

// const df = require("durable-functions");
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");

// df.app.activity("TransformData", {
//   handler: (input) => {
//     const results = input.results;
//     const groupAttributes = input.metaData.groupData;
//     const groupFields = input.metaData.groupFields;
//     const data = input.results.results;

//     if (data.length == 0 || !groupFields) {
//       throw new Error(
//         "Missing required parameters: configfile and groupingmethods."
//       );
//     }

//     const groupedResults = {};

//     groupFields.forEach((method) => {
//       const result = groupData(results.results, method);
//       groupedResults[method] = result;
//     });

//     filterAttributes(groupedResults, groupAttributes);

//     console.log("--------------------------------------",input)

//     console.log("--------------------------------------",groupedResults)
//   },
// });

// function groupData(data, groupingMethods) {
//   const groupedData = {};

//   // Helper function to recursively search for the grouping key within nested objects and arrays
//   function findAndGroup(items, keyPath) {
//     items.forEach((item) => {
//       let key = item;
//       for (let path of keyPath) {
//         if (Array.isArray(key)) {
//           key = key.map((subItem) => subItem[path]).flat();
//         } else {
//           key = key && key[path];
//         }
//       }

//       if (Array.isArray(key)) {
//         key.forEach((k) => {
//           if (k) {
//             if (!groupedData[k]) {
//               groupedData[k] = [];
//             }
//             groupedData[k].push(item);
//           }
//         });
//       } else if (key) {
//         if (!groupedData[key]) {
//           groupedData[key] = [];
//         }
//         groupedData[key].push(item);
//       } else {
//         console.warn(
//           `Warning: Grouping key '${keyPath.join(
//             "."
//           )}' not found in some items.`
//         );
//       }
//     });
//   }

//   if (!Array.isArray(data)) {
//     throw new TypeError(
//       "Data is not an array. Please check your data structure."
//     );
//   }

//   const keyPath = groupingMethods.split(".");
//   findAndGroup(data, keyPath);

//   return groupedData;
// }

// const getPropertyByPath = (obj, path) => {
//   return path
//     .split(".")
//     .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
// };

// function filterAttributes(groupedResults, groupAttributes) {
//   Object.keys(groupedResults).forEach((criteria) => {
//     const baseGroup = groupedResults[criteria];

//     Object.keys(baseGroup).forEach((group) => {
//       baseGroup[group].forEach((element) => {
//         const newElement = {};

//         // assign new attributes from groupAttributes
//         for (let index = 0; index < groupAttributes.length; index++) {
//           const propertyName = groupAttributes[index].name.toString();
//           newElement[propertyName] = getPropertyByPath(
//             element,
//             groupAttributes[index].path
//           );
//         }

//         // clear existing object
//         Object.keys(element).forEach((key) => {
//           delete element[key];
//         });

//         // replacing the element
//         Object.assign(element, newElement);
//       });
//     });
//   });
//   return groupedResults;
// }


const df = require("durable-functions");
const _ = require('lodash');

df.app.activity("TransformData", {
  handler: (input) => {
    const results = input.results;
    const groupAttributes = input.metaData.groupData;
    const groupFields = input.metaData.groupFields;
    const data = input.results.results;

    if (data.length == 0 || !groupFields) {
      throw new Error(
        "Missing required parameters: configfile and groupingmethods."
      );
    }
    const groupedResults = {};
    groupFields.forEach((method) => {
      const result = groupData(_.cloneDeep(results.results), method);
      groupedResults[method] = result;
    });

    filterAttributes(groupedResults, groupAttributes);
        console.log("--------------------------------------",input)

    console.log("--------------------------------------",groupedResults)
    return groupedResults;
  },
});

function groupData(data, groupingMethods) {
  const groupedData = {};

  // Helper function to recursively search for the grouping key within nested objects and arrays
  function findAndGroup(items, keyPath) {
    items.forEach((item) => {
      let key = item;
      for (let path of keyPath) {
        if (Array.isArray(key)) {
          key = key.map((subItem) => subItem[path]).flat();
        } else {
          key = key && key[path];
        }
      }

      if (Array.isArray(key)) {
        key.forEach((k) => {
          if (k) {
            if (!groupedData[k]) {
              groupedData[k] = [];
            }
            groupedData[k].push(item);
          }
        });
      } else if (key) {
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(item);
      } else {
        console.warn(
          `Warning: Grouping key '${keyPath.join(
            "."
          )}' not found in some items.`
        );
      }
    });
  }

  if (!Array.isArray(data)) {
    throw new TypeError(
      "Data is not an array. Please check your data structure."
    );
  }

  const keyPath = groupingMethods.split(".");
  findAndGroup(data, keyPath);

  return groupedData;
}

const getPropertyByPath = (obj, path) => {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

function filterAttributes(groupedResults, groupAttributes) {
  Object.keys(groupedResults).forEach((criteria) => {
    const baseGroup = groupedResults[criteria];

    Object.keys(baseGroup).forEach((group) => {
      baseGroup[group].forEach((element) => {
        const newElement = {};

        // assign new attributes from groupAttributes
        for (let index = 0; index < groupAttributes.length; index++) {
          const propertyName = groupAttributes[index].name.toString();
          newElement[propertyName] = getPropertyByPath(
            element,
            groupAttributes[index].path
          );
        }

        // clear existing object
        Object.keys(element).forEach((key) => {
          delete element[key];
        });

        // replacing the element
        Object.assign(element, newElement);
      });
    });
  });
  return groupedResults;
}