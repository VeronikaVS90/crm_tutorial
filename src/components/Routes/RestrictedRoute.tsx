import { Navigate } from "react-router";
import { authStore } from "../../shared/store/auth";
import { observer } from "mobx-react-lite";

interface RestrictedRouteProps extends React.PropsWithChildren {
  redirectTo?: string;
}

const RestrictedRoute = observer(
  ({ redirectTo = "/", children }: RestrictedRouteProps) => {
    if (!authStore.isLoggedIn) return <>{children}</>;
    return <Navigate to={redirectTo} />;
  }
);

export default RestrictedRoute;
