import { Outlet, ScrollRestoration, Link } from "react-router";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100/30 to-[#800000]/10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ScrollRestoration />
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-block">
          <h2 className="text-3xl font-serif font-bold text-[#800000] tracking-wider">
            SHREEHARIKRIPA
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#B8934E] mt-1 font-medium">
            Divine Heritage & Jewellery
          </p>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
