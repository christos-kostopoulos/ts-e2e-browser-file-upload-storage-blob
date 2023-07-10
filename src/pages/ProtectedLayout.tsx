import { Navigate, useOutlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";


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
        <h1>Protected Layout</h1>
        <button onClick={logOut}>Sign out</button>
      {outlet}
    </div>
  );
};
