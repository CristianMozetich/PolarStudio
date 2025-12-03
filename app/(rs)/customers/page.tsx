import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResult } from "@/lib/queries/getCustomersSearchResults";

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

  const results = await getCustomerSearchResult(searchText);

  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}
