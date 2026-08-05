"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { CompanyFormValues } from "./company-edit-form-schema";

export function GeneralInfoFields({
  control,
}: {
  control: Control<CompanyFormValues>;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Company Name
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/30 focus-visible:ring-primary transition-all"
                  placeholder="e.g. Acme Corp"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/30 focus-visible:ring-primary transition-all"
                  placeholder="hello@company.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Website
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/30 focus-visible:ring-primary transition-all"
                  placeholder="https://..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="mobile_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Mobile No
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/30 focus-visible:ring-primary transition-all"
                  placeholder="+123456789"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="vat_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Vat ID
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/30 focus-visible:ring-primary transition-all"
                  placeholder="e.g. 100123456700003"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground font-semibold">
              About
            </FormLabel>
            <FormControl>
              <Textarea
                className="bg-muted/30 focus-visible:ring-primary transition-all min-h-32"
                placeholder="Tell us about the company..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function AppDetailsFields({
  control,
}: {
  control: Control<CompanyFormValues>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="app_version"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground font-semibold">
              Android App Version
            </FormLabel>
            <FormControl>
              <Input
                className="bg-muted/30 focus-visible:ring-primary transition-all"
                placeholder="1.0.0"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="min_supported_version"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground font-semibold">
              Android Min Supported Version
            </FormLabel>
            <FormControl>
              <Input
                className="bg-muted/30 focus-visible:ring-primary transition-all"
                placeholder="1.0.0"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="app_version_ios"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground font-semibold">
              iOS App Version
            </FormLabel>
            <FormControl>
              <Input
                className="bg-muted/30 focus-visible:ring-primary transition-all"
                placeholder="1.0.0"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="min_supported_version_ios"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground font-semibold">
              iOS Min Supported Version
            </FormLabel>
            <FormControl>
              <Input
                className="bg-muted/30 focus-visible:ring-primary transition-all"
                placeholder="1.0.0"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
