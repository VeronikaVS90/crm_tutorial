import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import CircularIndeterminate from "../../components/Loader/Loader";
import { Table } from "../../components/Table";
import { financialColumns } from "./lib";
import { TableHeader } from "../../components/Table";
import { CreateFinancialModal } from "../../components/Modal";
import { financialService } from "../../shared/services/financial";
import { queryKeys } from "../../shared/react-query/queryKeys";

const Financial = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: financial = [], isLoading } = useQuery({
    queryKey: queryKeys.financial.list,
    queryFn: financialService.getFinance,
  });

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
};

export default Financial;
