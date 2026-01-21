import dayjs from "dayjs";
import type { ICustomerResponse } from "../../types/customers";

export class Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    createdAt: string;
    notes?: string;

    constructor(customer: ICustomerResponse) {
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
        this.phone = customer.phone;
        this.company = customer.company;
        this.createdAt = customer.createdAt;
        this.notes = customer.notes;
    }

    get formattedCreatedAt() {
        return dayjs(this.createdAt).format("DD.MM.YYYY, HH:mm");
    }
}
