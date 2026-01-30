import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { customersService } from "../../shared/services/customers";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import {
  customerSchema,
  type CustomerFormType,
} from "../../components/CustomerForm/lib";
import CustomerForm from "../../components/CustomerForm";
import { CustomerReadonlyInfo } from "../../components/ui";
import { ButtonActions } from "../../components/ui";
import { queryKeys } from "../../shared/react-query/queryKeys";
import { useGetFinancial } from "../../shared/hooks/financial/useGetFinancial";
import MonthBadge from "../../shared/ui/MonthBadge";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("uk-UA").format(value);

export default function CustomerDetails() {
  const { customerId = "" } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const form = useForm<CustomerFormType, unknown, CustomerFormType>({
    resolver: yupResolver<CustomerFormType, unknown, CustomerFormType>(
      customerSchema
    ),
  });

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.customers.details(customerId),
    queryFn: () => customersService.getCustomerById(customerId),
    enabled: !!customerId,
  });

  const { data: operations = [], isLoading: operationsLoading } =
    useGetFinancial({
      customerId,
      page: 1,
      limit: 5,
    });

  const operationsCount = operations.length;
  const totalProfit = operations.reduce((sum, item) => sum + item.profit, 0);

  const queryClient = useQueryClient();

  const { mutate: updateCustomer, isPending: isUpdating } = useMutation({
    mutationFn: customersService.updateCustomer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.details(data.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
    onError: (error) => {
      handleError(error, "Failed to update customer. Please, try again later.");
    },
  });

  const { mutate: deleteCustomer, isPending: isDeleting } = useMutation({
    mutationFn: customersService.deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
    onError: (error) => {
      handleError(error, "Failed to delete customer. Please, try again later.");
    },
  });

  const handleUpdateCustomer: SubmitHandler<CustomerFormType> = (data) => {
    if (!customer) return;
    updateCustomer(
      { ...data, id: customer.id },
      { onSuccess: () => setEditMode(false) }
    );
  };

  const handleDeleteCustomer = () => {
    if (!customer) return;

    deleteCustomer(customer.id, {
      onSuccess: () => navigate("/customers", { replace: true }),
    });
  };

  useEffect(() => {
    if (!customer) return;
    form.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company ?? "",
      notes: customer.notes ?? "",
    });
  }, [customer, form]);

  if (isLoading) return <CircularIndeterminate />;

  if (isError) return <p>Not found</p>;

  if (!customer) return null;

  return (
    <>
      <CustomerReadonlyInfo customer={customer} />

      <CustomerForm disabled={!editMode || isUpdating} form={form} />

      <ButtonActions
        editMode={editMode}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEnableEdit={() => setEditMode(true)}
        onReset={() => {
          setEditMode(false);
          form.reset({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            company: customer.company ?? "",
            notes: customer.notes ?? "",
          });
        }}
        onSave={form.handleSubmit(handleUpdateCustomer)}
        onDelete={handleDeleteCustomer}
        onGoBack={() => navigate("/customers")}
      />

      <Paper sx={{ p: 3, mt: 4 }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6">Recent operations</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={`Ops: ${operationsCount}`} size="small" />
            <Chip
              label={`Profit: ${formatNumber(totalProfit)}`}
              size="small"
              color={totalProfit >= 0 ? "success" : "error"}
            />
          </Stack>
        </Box>

        {operationsLoading ? (
          <Typography variant="body2" color="text.secondary">
            Loading operations...
          </Typography>
        ) : operations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No operations yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {operations.map((item) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">{item.type}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MonthBadge month={item.month} />
                      <Typography variant="caption" color="text.secondary">
                        {item.year}
                      </Typography>
                      <Chip label={`${item.transactions} tx`} size="small" />
                    </Stack>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" color="success.main">
                      +{formatNumber(item.income)}
                    </Typography>
                    <Typography variant="body2" color="error.main">
                      -{formatNumber(item.outcome)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    </>
  );
}