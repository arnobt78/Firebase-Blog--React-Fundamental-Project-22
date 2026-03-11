import { Header, Footer } from "./components";
import { AllRoutes } from "./routes/AllRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
