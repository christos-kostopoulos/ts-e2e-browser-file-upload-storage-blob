import { Navigate, useOutlet } from "react-router-dom";
import { auth } from "../firebase";
import useAuthState from "../hooks/useAuth";

export const HomeLayout = () => {
  const [user] = useAuthState(auth);
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};


