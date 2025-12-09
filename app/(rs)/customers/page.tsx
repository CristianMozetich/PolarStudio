import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResult } from "@/lib/queries/getCustomersSearchResults";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "./form/CustomerTable";
export const metadata = {
  title: "Customers Search",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [id: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResult-2",
  });
  const results = await getCustomerSearchResult(searchText);
  span.end();

  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </>
  );
}
