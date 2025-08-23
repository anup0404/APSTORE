import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer/Footer";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* this will render your dashboard pages */}
        </main>

        {/* Footer (always after dashboard content) */}
        <Footer year={2025} />
      </div>
    </div>
  );
};

export default AdminLayout;
