import { Outlet, ScrollRestoration } from "react-router";
import { MobileBottomNav } from "../components/layout/MobileBottomNav";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0">
      <ScrollRestoration />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}

export const RootLayout = MainLayout;
export default MainLayout;
