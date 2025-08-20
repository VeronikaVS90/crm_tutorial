import { useEffect } from "react";
import { financialStore } from "../../shared/store/financial";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";

const Financial = observer(() => {
  const { financial, isLoading } = financialStore;

  useEffect(() => {
    financialStore.getFinance();
  }, []);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <h1>Financial</h1>
      <ul>
        {financial.map((finance) => (
          <li key={finance.id}>
            <p>{finance.month}</p>
            <p>{finance.transactions}</p>
          </li>
        ))}
      </ul>
    </>
  );
});

export default Financial;
