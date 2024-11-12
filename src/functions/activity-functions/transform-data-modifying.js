// // const df = require("durable-functions");
// // const Liquid = require("liquidjs");
// // const engine = new Liquid.Liquid();

// // // Register a custom filter to format numbers with commas
// // engine.registerFilter("comma_format", (num) => {
// //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// // });

// // df.app.activity("TransformDataModification", {
// //   handler: async (input) => {
// //     let results = input.results;
// //     const templateName = input.metaData.templateName;

// //     console.log("Template Name ===============>>>>>>>>>>", templateName);
// //     console.log("================= Input ==================>", input);

// //     if (!templateName) {
// //       throw new Error("Missing required template: templateName.");
// //     }

// //     // Ensure results is an array
// //     if (!Array.isArray(results)) {
// //       console.log("Received `results` as an object. Wrapping it in an array.");
// //       results = [results];
// //     }

// //     // Load the template dynamically based on `templateName`
// //     const template = getTemplate(templateName);

// //     // Apply the transformation to each data item using the template
// //     const transformedResults = await Promise.all(
// //       results.map(async (item) => {
// //         return await applyTemplate(template, item);
// //       })
// //     );

// //     console.log("Transformed Results:", transformedResults);
// //     return transformedResults;
// //   },
// // });

// // /**
// //  * Retrieves the LiquidJS template based on template name.
// //  * @param {string} templateName - Name of the template to use for transformation.
// //  * @returns {string} - The LiquidJS template string.
// //  */
// // function getTemplate(templateName) {
// //   const templates = {
// //     "ABC": `{
// //       "formattedNumber": "{ number | comma_format }"
// //     }`,
// //     "XYZ": `{
// //       "title": "{{ title }}",
// //       "summary": "{{ summary | truncate: 100 }}",
// //       "author": "{{ author.name }}",
// //       "tags": [{% for tag in tags %}"{{ tag }}"{% if forloop.last == false %},{% endif %}{% endfor %}]
// //     }`
// //     // Add more templates as needed
// //   };

// //   console.log("Template ==================>", templates[templateName]);

// //   return templates[templateName];
// // }

// // /**
// //  * Applies a LiquidJS template to a single data item.
// //  * @param {string} template - The LiquidJS template string.
// //  * @param {Object} data - The data object to transform.
// //  * @returns {Promise<Object>} - The transformed data object.
// //  */
// // async function applyTemplate(template, data) {
// //   try {
// //     const renderedTemplate = await engine.parseAndRender(template, data);
// //     return JSON.parse(renderedTemplate);
// //   } catch (error) {
// //     console.error("Error rendering template:", error);
// //     throw new Error("Template rendering failed.");
// //   }
// // }

// // ============================================

// // const df = require("durable-functions");
// // const Liquid = require("liquidjs");
// // const engine = new Liquid.Liquid();

// // // Register a custom filter to format numbers with commas
// // engine.registerFilter("comma_format", (num) => {
// //   // Check if num is a valid number
// //   if (isNaN(num)) {
// //     return num; // If it's not a number, return as-is
// //   }
// //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// // });

// // df.app.activity("TransformDataModification", {
// //   handler: async (input) => {
// //     let results = input.results;
// //     const templateName = input.metaData.templateName;

// //     console.log("Template Name ===============>>>>>>>>>>", templateName);
// //     console.log("================= Input ==================>", input);

// //     if (!templateName) {
// //       throw new Error("Missing required template: templateName.");
// //     }

// //     // Ensure results is an array
// //     if (!Array.isArray(results)) {
// //       console.log("Received `results` as an object. Wrapping it in an array.");
// //       results = [results];
// //     }

// //     // Load the template dynamically based on `templateName`
// //     const template = getTemplate(templateName);

// //     // Apply the transformation to each data item using the template
// //     const transformedResults = await Promise.all(
// //       results.map(async (item) => {
// //         return await applyTemplate(template, item);
// //       })
// //     );

// //     console.log("Transformed Results:", transformedResults);
// //     return transformedResults;
// //   },
// // });

// // /**
// //  * Retrieves the LiquidJS template based on template name.
// //  * @param {string} templateName - Name of the template to use for transformation.
// //  * @returns {string} - The LiquidJS template string.
// //  */
// // function getTemplate(templateName) {
// //   const templates = {
// //     "ABC": `{
// //       "formattedPopulation": "{ population | comma_format }"
// //     }`,
// //     "XYZ": `{
// //       "title": "{{ title }}",
// //       "summary": "{{ summary | truncate: 100 }}",
// //       "author": "{{ author.name }}",
// //       "tags": [{% for tag in tags %}"{{ tag }}"{% if forloop.last == false %},{% endif %}{% endfor %}]
// //     }`
// //     // Add more templates as needed
// //   };

// //   console.log("Template ==================>", templates[templateName]);

// //   return templates[templateName];
// // }

// // /**
// //  * Applies a LiquidJS template to a single data item.
// //  * @param {string} template - The LiquidJS template string.
// //  * @param {Object} data - The data object to transform.
// //  * @returns {Promise<Object>} - The transformed data object.
// //  */
// // async function applyTemplate(template, data) {
// //   try {
// //     const renderedTemplate = await engine.parseAndRender(template, data);
// //     return JSON.parse(renderedTemplate);
// //   } catch (error) {
// //     console.error("Error rendering template:", error);
// //     throw new Error("Template rendering failed.");
// //   }
// // }

// // ==================================
// const df = require("durable-functions");
// const Liquid = require("liquidjs");
// const engine = new Liquid.Liquid();

// df.app.activity("TransformDataModification", {
//   handler: async (input) => {
//     let results = input.results;
//     const templateName = input.metaData.templateName;

//     console.log("Template Name ===============>>>>>>>>>>", templateName);
//     console.log("================= Input ==================>", input);

//     if (!templateName) {
//       throw new Error("Missing required template: templateName.");
//     }

//     // Ensure results is an array
//     if (!Array.isArray(results)) {
//       console.log("Received `results` as an object. Wrapping it in an array.");
//       results = [results];
//     }

//     // Register a custom filter to format numbers with commas
//     engine.registerFilter("comma_format", (num) => {
//       return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     });

//     // Load the template dynamically based on `templateName`
//     const template = getTemplate(templateName);

//     // Apply the transformation to each data item using the template
//     const transformedResults = await Promise.all(
//       results.map(async (item) => {
//         return await applyTemplate(template, item);
//       })
//     );

//     console.log("Transformed Results:", transformedResults);

//     // Print the formatted population value from transformedResults
//     transformedResults.forEach((transformedItem) => {
//       if (transformedItem.formattedPopulation) {
//         console.log(
//           "Formatted Population:",
//           transformedItem.formattedPopulation
//         );
//       } else {
//         console.log("No formattedPopulation found.");
//       }
//     });

//     return transformedResults;
//   },
// });

// /**
//  * Retrieves the LiquidJS template based on template name.
//  * @param {string} templateName - Name of the template to use for transformation.
//  * @returns {string} - The LiquidJS template string.
//  */
// function getTemplate(templateName) {
//   const templates = {
//     ABC: `{
//       "formattedPopulation": "{{ population | comma_format }}"
//     }`,
//     XYZ: `{
//       "title": "{{ title }}",
//       "summary": "{{ summary | truncate: 100 }}",
//       "author": "{{ author.name }}",
//       "tags": [{% for tag in tags %}"{{ tag }}"{% if forloop.last == false %},{% endif %}{% endfor %}]
//     }`,
//     // Add more templates as needed
//   };

//   console.log("Template ==================>", templates[templateName]);

//   return templates[templateName];
// }

// /**
//  * Applies a LiquidJS template to a single data item.
//  * @param {string} template - The LiquidJS template string.
//  * @param {Object} data - The data object to transform.
//  * @returns {Promise<Object>} - The transformed data object.
//  */
// async function applyTemplate(template, data) {
//   try {
//     const renderedTemplate = await engine.parseAndRender(template, data);

//     // Parse the rendered JSON string into a JSON object
//     const result = JSON.parse(renderedTemplate);
//     console.log("Input JSON:", data);
//     console.log("Transformed JSON:", result);

//     return result;
//   } catch (error) {
//     console.error("Error rendering template:", error);
//     throw new Error("Template rendering failed.");
//   }
// }
