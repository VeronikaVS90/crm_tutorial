import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomerForm from "../CustomerForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import { customerSchema, type CustomerFormType } from "../CustomerForm/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleError } from "../../shared/services/errorHandler";
import { customersService } from "../../shared/services/customers";
import { queryKeys } from "../../shared/react-query/queryKeys";

interface CreateCustomerModalProps {
    open: boolean;
    onClose: () => void;
}

function ModalBody({ onClose }: Pick<CreateCustomerModalProps, "onClose">) {
    const queryClient = useQueryClient();

    const { mutate: createCustomer, isPending } = useMutation({
        mutationFn: customersService.createCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
        },
        onError: (error) => {
            handleError(error, "Failed to create customer. Please, try again later.")
        },
    });

    const form = useForm<CustomerFormType>({
        resolver: yupResolver(customerSchema),
    });

    const onSubmit: SubmitHandler<CustomerFormType> = (data) => {
        createCustomer(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <>
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    textAlign: "center",
                    textTransform: "uppercase",
                    pb: 1,
                }}>Create a customer</DialogTitle>
            
            <DialogContent dividers>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <CustomerForm form={form} disabled={isPending} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: 2 }}>Cancel</Button>
                <Button
                    type="button"
                    variant="contained"
                    onClick={form.handleSubmit(onSubmit)}
                    sx={{ borderRadius: 2 }}
                    disabled={isPending}>Create</Button>
            </DialogActions>
        </>
    );
}

export default function CreateCustomerModal({
  open,
  onClose,
}: CreateCustomerModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          padding: 2,
          backgroundColor: "#fafafa",
        },
      }}
    >
      <ModalBody onClose={onClose} />
    </Dialog>
  );
}