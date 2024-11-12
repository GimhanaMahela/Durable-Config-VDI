// const df = require("durable-functions");

// df.app.orchestration("DefaultSubOrchestrator", function* (context) {

//    const config = context.df.getInput();

//    // console.log("*********************",config)
//    const step = config.step;
//    let results = config.results;
//    // results =  [config.results[1]]

//    if (step.metaData.isArray) {
//     if (results && Object.keys(results).length > 0) {
//        if (step.metaData.batchSize) {
//           const batchSize = step.metaData.batchSize ?? 1;

//           let batchResults = [];
//           for (let i = 0; i < 1; i += batchSize) { // batchwise processing
//              const batch = results.slice(i, i + batchSize);

//              // ---------------fan-out/fan-in-------------
//              const tasks = batch.map((result) =>
//                 context.df.callActivity(getActivityFunctionForUseCase(step.type, step.connectorType), {
//                    metaData: step.metaData,
//                    result,
//                 })
//              );

//              const batchResult = yield context.df.Task.all(tasks);
//              // ---------------fan-out/fan-in-------------

//              batchResults = batchResults.concat(batchResult);
//           }
//          //  console.log("/////////////////",batchResults)
//           return { results: batchResults }

//        } else {

//           results = yield context.df.callActivity(getActivityFunctionForUseCase(step.type, step.connectorType), {
//              metaData: step.metaData,
//              results,
//           });

//           return results;
//        }
//     }
//  } else {

//     results = yield context.df.callActivity(getActivityFunctionForUseCase(step.type, step.connectorType), {
//        metaData: step.metaData,
//        results,
//     });

//     return results;

// }

// });

// function getActivityFunctionForUseCase(type, connectorType) {
//   if (type == "connector") {
//     switch (connectorType) {
//       case "API":
//         return "FetchDataFromApi";
//         break;
//     }
//   } else {
//     if (type == "transformation") {
//       switch (transformationName) {
//         case "Grouping":
//           return "TransformData";

//       //   case "dataModfication":
//       //     return "TransformDataModifying";
//           break;
//       }
//     }
//   }
// }

const df = require("durable-functions");

df.app.orchestration("DefaultSubOrchestrator", function* (context) {
  const config = context.df.getInput();
  const step = config.step;
  let results = config.results;

  // Ensure transformationName is defined and passed from the step metadata
  const transformationName =
    step.metaData.transformationName || "DefaultTransformation"; // Default value if not provided

  // console.log("Step Metadata:", step.metaData); // For debugging

  if (step.metaData.isArray) {
    if (results && Object.keys(results).length > 0) {
      if (step.metaData.batchSize) {
        const batchSize = step.metaData.batchSize ?? 1;
        let batchResults = [];

        for (let i = 0; i < 1; i += batchSize) {
          // batchwise processing
          const batch = results.slice(i, i + batchSize);

          // ---------------fan-out/fan-in-------------
          const tasks = batch.map((result) =>
            context.df.callActivity(getActivityFunctionForUseCase(step), {
              metaData: step.metaData,
              result,
            })
          );

          const batchResult = yield context.df.Task.all(tasks);
          // ---------------fan-out/fan-in-------------

          batchResults = batchResults.concat(batchResult);
        }

        return { results: batchResults };
      } else {
        results = yield context.df.callActivity(
          getActivityFunctionForUseCase(step),
          {
            metaData: step.metaData,
            results,
          }
        );

        return results;
      }
    }
  } else {
    results = yield context.df.callActivity(
      getActivityFunctionForUseCase(step),
      {
        metaData: step.metaData,
        results,
      }
    );

    return results;
  }
});

function getActivityFunctionForUseCase(step) {
  if (step.type === "connector") {
    switch (step.connectorType) {
      case "API":
        return "FetchDataFromApi";
      default:
        return null;
    }
  } else if (step.type === "transformation") {
    switch (step.transformationName) {
      case "Grouping":
        return "TransformData";
      case "DataModification":
        return "OutputFormatConversion";
      default:
        return null;
    }
  } else {
    return null;
  }
}
