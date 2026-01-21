import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../../shared/store/auth";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import MonthBadge from "../../shared/ui/MonthBadge";
import CircularIndeterminate from "../../components/Loader/Loader";
import { useGetFinancial } from "../../shared/hooks/financial/useGetFinancial";
import { useGetProducts } from "../../shared/hooks/products/useGetProducts";
import type { FinanceMonth, IFinanceResponse } from "../../types/financial";
import type { IProductResponse } from "../../types/products";

const MONTH_ORDER: Record<FinanceMonth, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("uk-UA").format(value);

const calcTrendPercent = (current: number, previous: number) => {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

const getSortedFinancial = (financial: IFinanceResponse[]) =>
  [...financial].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return MONTH_ORDER[a.month] - MONTH_ORDER[b.month];
  });

const Home = observer(() => {
  const { user } = authStore;

  const { data: financial = [], isLoading: financialLoading } =
    useGetFinancial({ page: 1, limit: 1000 });
  const { data: products = [], isLoading: productsLoading } = useGetProducts({
    page: 1,
    limit: 1000,
  });

  const isLoading = financialLoading || productsLoading;

  const {
    totalIncome,
    totalOutcome,
    totalProfit,
    totalStock,
    currentPeriod,
    incomeTrend,
    outcomeTrend,
    recentFinancial,
  } = useMemo(() => {
    const sortedFinancial = getSortedFinancial(financial);

    const totalIncomeLocal = financial.reduce(
      (sum, item) => sum + item.income,
      0
    );

    const totalOutcomeLocal = financial.reduce(
      (sum, item) => sum + item.outcome,
      0
    );

    const totalProfitLocal = financial.reduce(
      (sum, item) => sum + item.profit,
      0
    );

    const totalStockLocal = products.reduce(
      (sum, item: IProductResponse) => sum + item.amount,
      0
    );

    const latest = sortedFinancial[sortedFinancial.length - 1];
    const previous = sortedFinancial[sortedFinancial.length - 2];

    const currentPeriodLocal = latest ? `${latest.month} ${latest.year}` : "—";

    const incomeTrendLocal =
      latest && previous
        ? calcTrendPercent(latest.income, previous.income)
        : null;

    const outcomeTrendLocal =
      latest && previous
        ? calcTrendPercent(latest.outcome, previous.outcome)
        : null;
    const recentFinancialLocal = sortedFinancial.slice(-5).reverse();

    return {
      totalIncome: totalIncomeLocal,
      totalOutcome: totalOutcomeLocal,
      totalProfit: totalProfitLocal,
      totalStock: totalStockLocal,
      currentPeriod: currentPeriodLocal,
      incomeTrend: incomeTrendLocal,
      outcomeTrend: outcomeTrendLocal,
      recentFinancial: recentFinancialLocal,
    };
  }, [financial, products]);

  const statCards = [
    {
      label: "Income",
      value: formatNumber(totalIncome),
      caption: "Total income",
      color: "success.main",
    },
    {
      label: "Outcome",
      value: formatNumber(totalOutcome),
      caption: "Total outcome",
      color: "error.main",
    },
    {
      label: "Profit",
      value: formatNumber(totalProfit),
      caption: "Income - Outcome",
      color: "primary.main",
    },
    {
      label: "Stock",
      value: formatNumber(totalStock),
      caption: "Total items in stock",
      color: "warning.main",
    },
  ];

  const renderTrendChip = (value: number | null) => {
    if (value === null) return <Chip label="No data" size="small" />;
    const isPositive = value >= 0;
    return (
      <Chip
        label={`${isPositive ? "+" : ""}${value.toFixed(1)}%`}
        color={isPositive ? "success" : "error"}
        size="small"
      />
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user.username}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Dashboard overview for your business
        </Typography>
      </Box>

      {isLoading && <CircularIndeterminate />}

      <Grid container spacing={3}>
        {statCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
            <Paper sx={{ p: 3, height: "100%" }} elevation={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h5" sx={{ color: card.color }}>
                {card.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.caption}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: "100%" }} elevation={2}>
            <Typography variant="h6" gutterBottom>
              Trends
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current period: {currentPeriod}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Income trend</Typography>
                {renderTrendChip(incomeTrend)}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Outcome trend</Typography>
                {renderTrendChip(outcomeTrend)}
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: "100%" }} elevation={2}>
            <Typography variant="h6" gutterBottom>
              Recent operations
            </Typography>
            {recentFinancial.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No financial operations yet
              </Typography>
            ) : (
              <Stack spacing={2}>
                {recentFinancial.map((item) => (
                  <Box key={item.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          {item.type}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MonthBadge month={item.month} />
                          <Typography variant="caption" color="text.secondary">
                            {item.year}
                          </Typography>
                          <Chip
                            label={`${item.transactions} tx`}
                            size="small"
                          />
                        </Stack>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="body2" color="success.main">
                          +{formatNumber(item.income)}
                        </Typography>
                        <Typography variant="body2" color="error.main">
                          -{formatNumber(item.outcome)}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
});

Home.displayName = "Home";

export default Home;

