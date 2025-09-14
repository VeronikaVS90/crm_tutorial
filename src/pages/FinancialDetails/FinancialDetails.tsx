import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IFinance } from "../../types/financial";
import { financialService } from "../../shared/services/financial";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import {
  financialSchema,
  type FinancialFormType,
} from "../../components/FinancialForm/lib";
import { financialStore } from "../../shared/store/financial";
import FinancialForm from "../../components/FinancialForm";
import { FinanceReadonlyInfo } from "../../components/ui";
import { ButtonActions } from "../../components/ui";

export default function FinancialDetails() {
  const { financeId = "" } = useParams();
  const navigate = useNavigate();

  const [finance, setFinance] = useState<IFinance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
    defaultValues: finance || {},
  });

  const fetchFinance = async (financeId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const finance = await financialService.getFinanceById(financeId);
      setFinance(finance);
      form.reset({
        month: finance.month,
        year: finance.year,
        income: finance.income,
        outcome: finance.outcome,
        type: finance.type,
        transactions: finance.transactions,
        comment: finance.comment,
      });
    } catch (error) {
      setError(error);
      handleError(
        error,
        "Failed to load calculation info. Please, try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateFinance: SubmitHandler<FinancialFormType> = async (
    data
  ) => {
    if (!finance) return;

    try {
      setIsUpdating(true);
      await financialStore.updateFinance({ ...data, id: finance.id });
      await fetchFinance(finance.id);
      setEditMode(false);
    } catch (error) {
      handleError(
        error,
        "Failed to update calculation. Please, try again later."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteFinance = async () => {
    if (!finance) return;

    try {
      setIsDeleting(true);
      await financialStore.deleteFinance(finance.id);
      navigate("/financial", { replace: true });
    } catch (error) {
      handleError(
        error,
        "Failed to delete calculation. Please, try again later."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchFinance(financeId);
  }, [financeId]);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return <p>Not found</p>;

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
