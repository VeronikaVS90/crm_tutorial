import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

export default function UserAvatar() {
  return (
    <IconButton sx={{ p: 0 }}>
      <Avatar alt="Remy Sharp" src="https://ninpl.com/avatar.png" />
    </IconButton>
  );
}
