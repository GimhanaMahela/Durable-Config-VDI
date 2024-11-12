// utils/transformations.js

// Define the available transformations
const transformations = {
    toUpperCase: (value) => value.toUpperCase(),
  
    // New transformation to format population with commas
    formatPopulation: (value) => {
      if (typeof value === 'number') {
        return value.toLocaleString();  // Format number with commas
      }
      return value;  // Return value as is if it's not a number
    }
  };
  
  module.exports = transformations;
  