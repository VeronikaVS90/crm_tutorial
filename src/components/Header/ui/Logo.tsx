import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <Typography
      onClick={() => navigate("/")}
      variant="h5"
      noWrap
      sx={{
        mr: 2,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      LOGO
    </Typography>
  );
}
