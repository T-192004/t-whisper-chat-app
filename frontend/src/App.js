// Import global styles
import './App.css';

// Import routing components from React Router
import { Route, Routes } from "react-router-dom";

// Import custom page components
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    // Main container div with className "App"
    <div className="App">
      {/* Define application routes */}
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" Component={HomePage} />
        
        {/* Route for the chat page */}
        <Route path="/chats" Component={ChatPage} />
      </Routes>
    </div>
  );
}

// Export the App component as default
export default App;
