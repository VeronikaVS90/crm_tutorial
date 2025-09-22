import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import HeaderLink from "./ui/HeaderLink";
import { navLinks } from "./lib/constants";
import Logo from "./ui/Logo";
import UserAvatar from "./ui/Avatar";
import { authStore } from "../../shared/store/auth";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

          {authStore.isLoggedIn && (
            <>
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
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
