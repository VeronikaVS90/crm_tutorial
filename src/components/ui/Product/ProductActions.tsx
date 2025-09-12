import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface ProductActionsProps {
  editMode: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onEnableEdit: () => void;
  onReset: () => void;
  onSave: () => void;
  onDelete: () => void;
  onGoBack: () => void;
}

export default function ProductActions({
  editMode,
  isUpdating,
  isDeleting,
  onEnableEdit,
  onReset,
  onSave,
  onDelete,
  onGoBack,
}: ProductActionsProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ mt: 2 }}
    >
      <Button
        onClick={onGoBack}
        type="button"
        variant="outlined"
        sx={{ borderRadius: 2 }}
      >
        Go back
      </Button>

      <Stack direction="row" spacing={2}>
        {editMode && (
          <Button
            onClick={onSave}
            variant="contained"
            sx={{ borderRadius: 2 }}
            disabled={isUpdating}
          >
            Save
          </Button>
        )}
        {!editMode && (
          <Button
            onClick={onEnableEdit}
            startIcon={<EditIcon />}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Edit
          </Button>
        )}

        {editMode && (
          <Button
            onClick={onReset}
            variant="outlined"
            sx={{ borderRadius: 2 }}
            disabled={isUpdating}
          >
            Reset
          </Button>
        )}
        <Button
          onClick={onDelete}
          variant="contained"
          color="error"
          sx={{ borderRadius: 2 }}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
