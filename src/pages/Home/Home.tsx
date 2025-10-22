import { observer } from "mobx-react-lite";
import { authStore } from "../../shared/store/auth";
import { Box, Container, Typography, Paper } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Home = observer(() => {
  const { user } = authStore;

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome back, {user.username}!
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Your Business Management Hub
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, mb: 6, maxWidth: 600, mx: "auto" }}
        >
          Streamline your operations with our comprehensive CRM system. Manage
          your inventory, track financial transactions, and keep your business
          running smoothly—all in one place.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: "1 1 300px", maxWidth: 400, display: "flex" }}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                width: "100%",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <InventoryIcon
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                Product Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track and manage your warehouse inventory with ease
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: "1 1 300px", maxWidth: 400, display: "flex" }}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                width: "100%",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <AccountBalanceWalletIcon
                sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                Financial Operations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor and record all your financial transactions
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
});

Home.displayName = "Home";

export default Home;
