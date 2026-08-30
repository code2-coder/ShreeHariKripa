import { Outlet, ScrollRestoration } from "react-router";
import { AdminSidebar } from "../components/layout/AdminSidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ScrollRestoration />
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
