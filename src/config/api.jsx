const { VITE_PORT_API_APP } = import.meta.env;

const apiConfig = {
  development: {
    API_APP: `http://localhost:${VITE_PORT_API_APP}/api/v1`,
  },
  production: {
    API_APP: `http://localhost:${VITE_PORT_API_APP}/api/v1`,
  },
  testing: {
    API_APP: `http://localhost:${VITE_PORT_API_APP}/api/v1`,
  },
};

export default apiConfig;
