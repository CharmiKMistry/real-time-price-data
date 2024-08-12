import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Real-time Price Data API",
    version: "1.0.0",
    description: "API documentation for Real-time Price Data project",
  },
  servers: [
    {
      url: "http://localhost:5000", // Change this to your server URL
      description: "Development server",
    },
  ],
};

// Options for the swagger docs
const options: OAS3Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [".src/routes/*.ts"], // Adjust the path according to your project structure
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
