import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

interface HeaderLinkProps extends React.PropsWithChildren {
  path: string;
}

export default function HeaderLink(props: HeaderLinkProps) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(props.path)}
      sx={{ my: 2, color: "white", display: "block" }}
    >
      {props.children}
    </Button>
  );
}

// export const First: React.FC<HeaderLinkProps> = (props) => {
//     return true;
// };
