import { getCustomer } from "@/lib/queries/getCustomers";
import { getTicket } from "@/lib/queries/getTickets";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;
  if (!customerId && !ticketId)
    return { title: "Missing Ticket ID or Customer ID" };
  if (customerId) return { title: `New Ticket for Customer #${customerId}` };
  if (ticketId) return { title: `Edit Ticket #${ticketId}` };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2>Ticket ID or Customer ID required to load ticket form</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted;

    let customer = null;

    // --- CUSTOMER LOGIC ---
    if (customerId) {
      customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2>Customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2>Customer ID #{customerId} is not active</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      console.log("customer:", customer);
      if (isManager) {
        KindeInit();
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // --- TICKET LOGIC ---
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2>Ticket ID #{ticketId} not found</h2>
            <BackButton title="GoBack" variant="default" />
          </>
        );
      }

      // si viene el ticket, obtenemos el customer desde ticket
      customer = await getCustomer(ticket.customerId);

      if (isManager) {
        KindeInit();
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable =
          !!user && !!user.email
            ? user.email.toLowerCase() === ticket.tech.toLowerCase()
            : false;
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
