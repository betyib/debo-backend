import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description:
        "REST API for managing users, projects, and tasks with authentication",
      contact: {
        name: "Backend Team",
        email: "support@yourproject.com",
      },
    },

    servers: [
      {
        url: process.env.NODE_ENV === "production"
      ? "https://debo-backend-cqz4.onrender.com"
      : "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [path.join(process.cwd(), "src/routes/**/*.js")],
};

const specs = swaggerJSDoc(options);

export default specs;