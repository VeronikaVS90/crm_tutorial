import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IFinance } from "../../types/financial";
import { financialService } from "../../shared/services/financial";
import { handleError } from "../../shared/services/errorHandler";
import CircularIndeterminate from "../../components/Loader/Loader";
import FinancialInfo from "../../components/FinancialInfo";

export default function FinancialDetails() {
  const { financeId = "" } = useParams();

  const [finance, setFinance] = useState<IFinance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setIsLoading(true);
        const finance = await financialService.getFinanceById(financeId);
        setFinance(finance);
      } catch (error) {
        setError(error);
        handleError(
          error,
          "Failed to load financial information. Please, try again later."
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [financeId]);

  if (isLoading) return <CircularIndeterminate />;

  if (error) return <p>Not found</p>;

  if (!finance) return null;

  return <FinancialInfo finance={finance} />;
}
