/* eslint-disable */

"use client";
import { useState } from "react";

import {
  useTestWebhook,
  useUpdateWebhook,
} from "@/app/[locale]/(main)/dashboard/client/access-token/_hooks/use-webhooks";
import { Webhook } from "@/app/[locale]/(main)/dashboard/client/access-token/_types/webhook-types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Link2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const webhookSchema = z.object({
  webhooks_url: z.string().refine((value) => {
    if (!value) return true; // empty clears/disconnects the webhook
    try {
      // Full URL
      new URL(value);
      return true;
    } catch {
      // Domain without protocol
      return /^(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#].*)?$/.test(value);
    }
  }, "Please enter a valid URL"),
  access_token: z.string().optional(),
});

type WebhookFormValues = z.infer<typeof webhookSchema>;

interface WebhookCardProps {
  title: string;
  data?: Webhook;
  type: "status" | "captain_location" | "shop_status";
}

export function WebhookCard({ title, data, type }: WebhookCardProps) {
  const [showSecret, setShowSecret] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookSchema),
    mode: "onTouched",
    defaultValues: {
      webhooks_url: data?.webhooks_url ?? "",
      access_token: data?.access_token ?? "",
    },
  });

  const { updateWebhook, isPending } = useUpdateWebhook();
  const { testWebhook, isPending: isTesting } = useTestWebhook();
  const isConnected = Boolean(data?.webhooks_url);

  function onSubmit(values: WebhookFormValues) {
    updateWebhook({
      type,
      webhook_url: values.webhooks_url || null,
      webhook_secret_key: values.access_token ?? "",
    });
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="border-b px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
              isConnected
                ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                : "border-border bg-muted text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isConnected ? "bg-green-500" : "bg-muted-foreground/50",
              )}
            />
            {isConnected ? "Connected" : "Not connected"}
          </span>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 py-5">
          <div className="space-y-1.5">
            <Label htmlFor={`${type}-url`} className="gap-1.5">
              <Link2 className="text-muted-foreground h-3.5 w-3.5" />
              Endpoint URL
            </Label>
            <Input
              id={`${type}-url`}
              placeholder="https://your-app.com/webhooks"
              {...register("webhooks_url")}
              aria-invalid={!!errors.webhooks_url}
            />
            {errors.webhooks_url && (
              <p className="text-destructive text-xs">
                {errors.webhooks_url.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <Label htmlFor={`${type}-secret`}>Signing secret</Label>
              <span className="text-muted-foreground text-xs">
                sent as the request signature
              </span>
            </div>
            <div className="relative">
              <Input
                id={`${type}-secret`}
                type={showSecret ? "text" : "password"}
                placeholder="Enter a secret to verify requests"
                className="pr-10 font-mono"
                {...register("access_token")}
                aria-invalid={!!errors.access_token}
              />
              <button
                type="button"
                onClick={() => setShowSecret((v) => !v)}
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-9 items-center justify-center"
                aria-label={showSecret ? "Hide secret" : "Show secret"}
              >
                {showSecret ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.access_token && (
              <p className="text-destructive text-xs">
                {errors.access_token.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 justify-end gap-2 border-t px-5 py-4">
          <Button
            type="button"
            variant="outline"
            disabled={isTesting || !isConnected}
            onClick={() => testWebhook(type)}
          >
            {isTesting ? "Testing..." : "Test webhook"}
          </Button>
          <Button type="submit" disabled={isPending || !isDirty || !isValid}>
            {isPending ? "Saving..." : "Save webhook"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
