/**
 * Root layout component (code walkthrough).
 * AuthProvider wraps the app so any child can use useAuth(). Header, main content (routes), and Footer stay fixed.
 */
import { Header, Footer } from "./components";
import { AllRoutes } from "./routes/AllRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
