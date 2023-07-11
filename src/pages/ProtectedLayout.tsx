import { Navigate, useOutlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import NavBar from "../components/NavBar";


export const ProtectedLayout = () => {
  const [user] = useAuthState(auth);
  const outlet = useOutlet();

  const logOut = () => {
    auth.signOut();
  };
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <NavBar />
     
      {outlet}
    </div>
  );
};
