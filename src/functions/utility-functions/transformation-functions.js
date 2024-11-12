// util/transformations.js

let transformationFunctions = {
    toUpperCase: (value) => value.toUpperCase(),
    
    toLowerCase: (value) => value.toLowerCase(),
  
    capitalize: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  
    trim: (value) => value.trim(),
  
    reverseString: (value) => value.split('').reverse().join(''),
  
    replaceSpacesWithUnderscore: (value) => value.replace(/\s+/g, '_'),
  
    // Safely parse JSON string
    parseJSON: (value) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null; // or you could return {} or throw an error
      }
    },
  
    // Convert string to camel case
    toCamelCase: (value) =>
      value
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, ''),
  };
  
  export default transformationFunctions;
  