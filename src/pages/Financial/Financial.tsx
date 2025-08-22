import { useEffect } from "react";
import { financialStore } from "../../shared/store/financial";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";
import Table from "../../components/Table";
import { financialColumns } from "./lib";

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
      <Table rows={financial} columns={financialColumns} />
    </>
  );
});

export default Financial;
