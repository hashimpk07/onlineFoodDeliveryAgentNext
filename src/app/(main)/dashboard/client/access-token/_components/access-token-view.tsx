/* eslint-disable */
"use client";
"use no memo";

import { useMemo, useState } from "react";

import { KeyRound, Plus, Radio } from "lucide-react";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { WebhookCard } from "@/app/[locale]/(main)/dashboard/client/access-token/_components/_cards/web-hook-cards";
import { WebhookCardSkeleton } from "@/app/[locale]/(main)/dashboard/client/access-token/_components/_cards/webhook-card-skelton";
import { columns } from "@/app/[locale]/(main)/dashboard/client/access-token/_components/access-token-table/column";
import { CreateApiKeyModal } from "@/app/[locale]/(main)/dashboard/client/access-token/_components/modal/create-api-modal";
import {
  useAccessTokenConfig,
  useCreateAccessToken,
} from "@/app/[locale]/(main)/dashboard/client/access-token/_hooks/use-access-token";
import { useAccessTokenParams } from "@/app/[locale]/(main)/dashboard/client/access-token/_hooks/use-access-token-params";
import { useWebhooks } from "@/app/[locale]/(main)/dashboard/client/access-token/_hooks/use-webhooks";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

const AccessTokenView = () => {
  const { accessToken, isLoading: isTokenLoading } = useAccessTokenConfig();
  const [open, setOpen] = useState(false);
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const createTokenMutation = useCreateAccessToken();
  const { webhooks, isLoading } = useWebhooks();
  const [{ page, per_page }, setParams] = useAccessTokenParams();

  const pageCount = Math.max(1, Math.ceil(accessToken.length / per_page));

  const paginatedTokens = useMemo(() => {
    const start = (page - 1) * per_page;
    return accessToken.slice(start, start + per_page);
  }, [accessToken, page, per_page]);

  const table = useDataTableInstance({
    data: paginatedTokens,
    columns: columns as any,
    manualPagination: true,
    pageCount,
    pagination: { pageIndex: page - 1, pageSize: per_page },
  });

  const handleCreateKey = (name: string) => {
    createTokenMutation.mutate(name, {
      onSuccess: (data) => {
        if (data.status === "success" && data.data?.token) {
          setCreatedToken(data.data.token);
        }
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCreatedToken(null);
  };

  const hasKeys = accessToken.length > 0;

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Integrations
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            API access
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl text-sm">
            Create keys for external services to call your account, and
            configure where order events get delivered.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4" />
          Create API key
        </Button>
      </div>

      {/* API keys */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <KeyRound className="text-muted-foreground h-4 w-4" />
          <h2 className="text-sm font-semibold">API keys</h2>
          {!isTokenLoading && (
            <span className="text-muted-foreground text-xs">
              {accessToken.length}
            </span>
          )}
        </div>

        {isTokenLoading ? (
          <div className="bg-card rounded-xl border p-4">
            <DataTableSkeleton
              columnCount={2}
              rowCount={4}
              showViewOptions={false}
            />
          </div>
        ) : hasKeys ? (
          <div className="bg-card w-full min-w-0 overflow-hidden rounded-xl border">
            <DataTable
              columns={columns as any}
              table={table}
              showViewOptions={false}
            />
            <div className="border-t">
              <DataTablePagination
                table={table}
                totalCount={accessToken.length}
                page={page}
                pageSize={per_page}
                setPage={(p) => setParams({ page: p })}
                setPageSize={(ps) => setParams({ per_page: ps })}
              />
            </div>
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <span className="bg-muted flex h-11 w-11 items-center justify-center rounded-full">
                <KeyRound className="text-muted-foreground h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">No API keys yet</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Create a key to let an external service authenticate as your
                  account.
                </p>
              </div>
              <Button size="sm" onClick={() => setOpen(true)}>
                <Plus className="h-4 w-4" />
                Create API key
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <CreateApiKeyModal
        open={open}
        onClose={handleClose}
        onSubmit={handleCreateKey}
        createdToken={createdToken}
      />

      {/* Webhooks */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Radio className="text-muted-foreground h-4 w-4" />
          <h2 className="text-sm font-semibold">Webhooks</h2>
        </div>
        <p className="text-muted-foreground -mt-1 max-w-2xl text-sm">
          Point these at an endpoint you control to receive order events as they
          happen.
        </p>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {isLoading ? (
            <>
              <WebhookCardSkeleton />
              <WebhookCardSkeleton />
              <WebhookCardSkeleton />
            </>
          ) : (
            <>
              <WebhookCard
                title="Order status changes"
                data={webhooks?.webhook}
                type="status"
              />
              <WebhookCard
                title="Captain live location"
                data={webhooks?.webhook_captain_location}
                type="captain_location"
              />
              <WebhookCard
                title="Shop status changes"
                data={webhooks?.webhook_shop_status}
                type="shop_status"
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AccessTokenView;
