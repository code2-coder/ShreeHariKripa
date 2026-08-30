import { ProtectedRoute } from "./ProtectedRoute.jsx";

export function AdminRoute({ staffAllowed = false }) {
  return <ProtectedRoute adminOnly={true} staffAllowed={staffAllowed} />;
}

export default AdminRoute;
