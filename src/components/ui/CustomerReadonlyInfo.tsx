import { Box, Typography } from "@mui/material";
import type { Customer } from "../../shared/entities/customer";

interface CustomerReadonlyInfoProps {
    customer: Customer;
}

export defaullt function CustomerReadonlyInfo({
    customer,
}: CustomerReadonlyInfoProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1">
                <strong>Customer ID:</strong> { customer.id}
            </Typography>
            <Typography variant="body1">
                <strong>Created At:</strong> { customer.formattedCreatedAt}
            </Typography>
            <Typography variant="body1">
                <strong>Email:</strong> { customer.email}
            </Typography>
            <Typography variant="body1">
                <strong>Phone:</strong> { customer.phone}
            </Typography>
        </Box>
    )
}