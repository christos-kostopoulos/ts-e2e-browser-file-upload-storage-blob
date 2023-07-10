import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";

export const AuthLayout = () => {
    const outlet = useOutlet();

    const { userPromise }: any = useLoaderData();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Await
                resolve={userPromise}
                errorElement={<Alert severity="error">Something went wrong!</Alert>}
                children={outlet}
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
