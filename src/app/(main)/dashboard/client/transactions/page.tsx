import TransactionView from "@/app/[locale]/(main)/dashboard/client/transactions/_components/transaction-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function TransactionsPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Client Transactions" },
        ]}
      />
      <PlaceholderContent>
        <TransactionView />
      </PlaceholderContent>
    </>
  );
}
