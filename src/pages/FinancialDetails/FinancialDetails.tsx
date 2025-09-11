import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IFinance, IUpdateFinanceBody } from "../../types/financial";
import { financialService } from "../../shared/services/financial";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import FinancialInfo from "../../components/FinancialInfo";
import { financialStore } from "../../shared/store/financial";

export default function FinancialDetails() {
  const { financeId = "" } = useParams();
  const navigate = useNavigate();

  const [finance, setFinance] = useState<IFinance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchFinance = async (financeId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const finance = await financialService.getFinanceById(financeId);
      setFinance(finance);
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

  const handleUpdateFinance = async (data: IUpdateFinanceBody) => {
    await financialStore.updateFinance(data);
    await fetchFinance(data.id);
  };

  const handleDeleteFinance = async (financeId: string) => {
    try {
      await financialStore.deleteFinance(financeId);
      navigate("/financial", { replace: true });
    } catch (error) {
      handleError(
        error,
        "Failed to delete calculation. Please, try again later."
      );
    }
  };

  useEffect(() => {
    fetchFinance(financeId);
  }, [financeId]);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return <p>Not found</p>;

  if (!finance) return null;

  return (
    <FinancialInfo
      finance={finance}
      onUpdateFinance={handleUpdateFinance}
      onDeleteFinance={handleDeleteFinance}
    />
  );
}
