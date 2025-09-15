import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { financialService } from "../../shared/services/financial";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import {
  financialSchema,
  type FinancialFormType,
} from "../../components/FinancialForm/lib";
import FinancialForm from "../../components/FinancialForm";
import { FinanceReadonlyInfo } from "../../components/ui";
import { ButtonActions } from "../../components/ui";
import { queryKeys } from "../../shared/react-query/queryKeys";

export default function FinancialDetails() {
  const { financeId = "" } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      year: Math.min(2100, Math.max(2000, new Date().getFullYear())),
    },
  });

  const {
    data: finance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.financial.details(financeId),
    queryFn: () => financialService.getFinanceById(financeId),
    enabled: !!financeId,
  });

  const queryClient = useQueryClient();

  const { mutate: updateFinance, isPending: isUpdating } = useMutation({
    mutationFn: financialService.updateFinance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.financial.details(data.id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.financial.list,
      });
    },
    onError: (error) => {
      handleError(
        error,
        "Failed to update calculation. Please, try again later."
      );
    },
  });

  const { mutate: deleteFinance, isPending: isDeleting } = useMutation({
    mutationFn: financialService.deleteFinance,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.financial.list,
      });
    },

    onError: (error) => {
      handleError(
        error,
        "Failed to delete calculation. Please, try again later"
      );
    },
  });

  const handleUpdateFinance: SubmitHandler<FinancialFormType> = (data) => {
    if (!finance) return;

    updateFinance(
      { ...data, id: finance.id },
      { onSuccess: () => setEditMode(false) }
    );
  };

  const handleDeleteFinance = () => {
    if (!finance) return;

    deleteFinance(finance.id, {
      onSuccess: () => navigate("/financial", { replace: true }),
    });
  };

  useEffect(() => {
    if (!finance) return;
    form.reset({
      month: finance.month,
      year: finance.year,
      income: finance.income,
      outcome: finance.outcome,
      type: finance.type,
      transactions: finance.transactions,
      comment: finance.comment,
    });
  }, [finance, form]);

  if (isLoading) return <CircularIndeterminate />;

  if (isError) return <p>Not found</p>;

  if (!finance) return null;

  return (
    <>
      <FinanceReadonlyInfo finance={finance} />

      <FinancialForm disabled={!editMode || isUpdating} form={form} />

      <ButtonActions
        editMode={editMode}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEnableEdit={() => setEditMode(true)}
        onReset={() => {
          setEditMode(false);
          form.reset({
            month: finance.month,
            year: finance.year,
            income: finance.income,
            outcome: finance.outcome,
            type: finance.type,
            transactions: finance.transactions,
            comment: finance.comment,
          });
        }}
        onSave={form.handleSubmit(handleUpdateFinance)}
        onDelete={handleDeleteFinance}
        onGoBack={() => navigate("/financial")}
      />
    </>
  );
}
