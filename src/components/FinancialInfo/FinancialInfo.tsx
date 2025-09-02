import { useForm } from "react-hook-form";
import type { IFinance } from "../../types/financial";
import FinancialForm from "../FinancialForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { financialSchema, type FinancialFormType } from "../FinancialForm/lib";

interface FinancialInfoProps {
  finance: IFinance;
}

export default function FinancialInfo({ finance }: FinancialInfoProps) {
  const form = useForm<FinancialFormType>({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      month: finance.month,
      income: finance.income,
      type: finance.type,
      transactions: finance.transactions,
    },
  });

  return (
    <div>
      <FinancialForm disabled form={form} />
    </div>
  );
}
