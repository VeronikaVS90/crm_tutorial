import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

interface TableHeaderProps {
  title: string;
  onCreate?: () => void;
  createLabel?: string;
  onSearch?: (value: string) => void;
}

export default function TableHeader({
  title,
  onCreate,
  createLabel = "Create",
  onSearch,
}: TableHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ fontFamily: "Roboto", textTransform: "uppercase" }}
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {onSearch && (
          <TextField
            size="small"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        {onCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreate}
          >
            {createLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}
