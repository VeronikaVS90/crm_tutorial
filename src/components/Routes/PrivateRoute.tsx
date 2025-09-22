import { Navigate } from "react-router";
import { authStore } from "../../shared/store/auth";
import { observer } from "mobx-react-lite";

interface PrivateRouteProps extends React.PropsWithChildren {
  redirectTo?: string;
}

const PrivateRoute = observer(
  ({ redirectTo = "/login", children }: PrivateRouteProps) => {
    if (authStore.isLoggedIn) return <>{children}</>;
    return <Navigate to={redirectTo} />;
  }
);

export default PrivateRoute;
