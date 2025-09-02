import { useEffect, useState } from "react";
import { financialStore } from "../../shared/store/financial";
import { observer } from "mobx-react-lite";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { financialColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateFinancialModal } from "../../components/Modal";
import { useNavigate } from "react-router";

const Financial = observer(() => {
  const { financial, isLoading } = financialStore;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    financialStore.getFinance();
  }, []);

  const handleCreate = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading && <CircularIndeterminate />}
      <TableHeader
        title="Financial"
        onCreate={handleCreate}
        onSearch={() => {}}
      />
      <Table
        rows={financial}
        columns={financialColumns}
        rowOnClick={({ id }) => navigate(`/financial/${id}`)}
      />

      <CreateFinancialModal open={open} onClose={() => setOpen(false)} />
    </>
  );
});

export default Financial;
