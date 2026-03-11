/**
 * Root layout component (code walkthrough).
 * ToastProvider and AuthProvider wrap the app. Header, main content (routes), and Footer stay fixed.
 */
import { Header, Footer } from "./components";
import { AllRoutes } from "./routes/AllRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <div className="max-w-7xl mx-auto min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <AllRoutes />
          <Footer />
        </div>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
