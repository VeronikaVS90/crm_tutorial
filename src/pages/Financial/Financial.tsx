import { useEffect, useState } from "react";
import { financialStore } from "../../shared/store/financial";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { financialColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateFinancialModal } from "../../components/Modal";

const Financial = observer(() => {
  const { financial, isLoading } = financialStore;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    financialStore.getFinance();
  }, []);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  const handleCreate = () => {
    setOpen(true);
  };

  return (
    <>
      <TableHeader
        title="Financial"
        onCreate={handleCreate}
        onSearch={() => {}}
      />
      <Table rows={financial} columns={financialColumns} />

      <CreateFinancialModal open={open} onClose={() => setOpen(false)} />
    </>
  );
});

export default Financial;
