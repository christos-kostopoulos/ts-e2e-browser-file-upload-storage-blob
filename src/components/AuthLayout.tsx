import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";

export const AuthLayout = () => {
    const outlet = useOutlet();

    const { userPromise }: any = useLoaderData();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Await
                resolve={userPromise}
                errorElement={<Alert severity="error">Something went wrong!</Alert>}
                children={(user) => (
                    <AuthProvider userData={user}>{outlet}</AuthProvider>
                )}
            />
        </Suspense>
    );
};


const LinearProgress = () => {
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}

const Alert = ({ severity, children }: any) => {
    return (
        <div>
            <p>{children}</p>
        </div>
    );
}
