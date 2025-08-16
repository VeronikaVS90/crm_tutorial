import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import HeaderLink from "./ui/HeaderLink";
import { navLinks } from "./lib/constants";
import Logo from "./ui/Logo";
import UserAvatar from "./ui/Avatar";

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {navLinks.map((link) => (
              <HeaderLink key={link.path} path={link.path}>
                {link.label}
              </HeaderLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <UserAvatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
