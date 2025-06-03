import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS file
import App from './App'; // Main App component

// Chakra UI imports
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Performance monitoring
import reportWebVitals from './reportWebVitals';

// React Router for routing
import { BrowserRouter } from 'react-router-dom';

// Custom context provider for chat features
import ChatProvider from './Context/ChatProvider';

// Chakra UI theme configuration
const config = {
  initialColorMode: "light", // Default color mode
  useSystemColorMode: false, // Do not use system color mode
};

// Create custom theme with the config
const theme = extendTheme({ config });

// Create root element for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside the root element
root.render(
  // BrowserRouter enables routing in the app
  <BrowserRouter>
    {/* ChatProvider provides global chat context */}
    <ChatProvider>
      {/* ChakraProvider applies Chakra UI theme */}
      <ChakraProvider theme={theme}>
        {/* Main application component */}
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);

// Report web vitals for performance analysis (optional)
reportWebVitals();
