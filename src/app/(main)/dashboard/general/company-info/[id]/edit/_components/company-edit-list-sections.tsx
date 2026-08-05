"use client";

import { Plus, Trash2 } from "lucide-react";
import { Control, UseFieldArrayReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { CompanyFormValues } from "./company-edit-form-schema";

export function TermsFields({
  control,
  fieldArray,
}: {
  control: Control<CompanyFormValues>;
  fieldArray: UseFieldArrayReturn<CompanyFormValues, "terms">;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Rules and conditions shown to customers before checkout.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => fieldArray.append({ term: "", condition: "" })}
        >
          <Plus className="w-4 h-4" />
          Add term
        </Button>
      </div>
      {fieldArray.fields.length === 0 && (
        <p className="text-sm text-muted-foreground italic text-center py-8 border border-dashed rounded-lg">
          No terms and conditions added yet.
        </p>
      )}
      {fieldArray.fields.map((item, index) => (
        <div key={item.id}>
          {index > 0 && <Separator className="mb-4" />}
          <div className="flex items-start gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <FormField
                control={control}
                name={`terms.${index}.term`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold">
                      Term
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted/30 focus-visible:ring-primary transition-all"
                        placeholder="e.g. Delivery"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`terms.${index}.condition`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold">
                      Condition
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted/30 focus-visible:ring-primary transition-all"
                        placeholder="e.g. Within 24 hours"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6"
              onClick={() => fieldArray.remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PrivacyFields({
  control,
  fieldArray,
}: {
  control: Control<CompanyFormValues>;
  fieldArray: UseFieldArrayReturn<CompanyFormValues, "policies">;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Privacy commitments shown on the company&apos;s public profile.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => fieldArray.append({ policy: "" })}
        >
          <Plus className="w-4 h-4" />
          Add policy
        </Button>
      </div>
      {fieldArray.fields.length === 0 && (
        <p className="text-sm text-muted-foreground italic text-center py-8 border border-dashed rounded-lg">
          No privacy policies added yet.
        </p>
      )}
      {fieldArray.fields.map((item, index) => (
        <div key={item.id}>
          {index > 0 && <Separator className="mb-4" />}
          <div className="flex items-start gap-3">
            <FormField
              control={control}
              name={`policies.${index}.policy`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-muted-foreground font-semibold">
                    Policy
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-muted/30 focus-visible:ring-primary transition-all"
                      placeholder="Describe the policy..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6"
              onClick={() => fieldArray.remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SocialFields({
  control,
  fieldArray,
}: {
  control: Control<CompanyFormValues>;
  fieldArray: UseFieldArrayReturn<CompanyFormValues, "social">;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Links shown as social icons on the company&apos;s public profile.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => fieldArray.append({ media_term: "", link: "" })}
        >
          <Plus className="w-4 h-4" />
          Add link
        </Button>
      </div>
      {fieldArray.fields.length === 0 && (
        <p className="text-sm text-muted-foreground italic text-center py-8 border border-dashed rounded-lg">
          No social media links added yet.
        </p>
      )}
      {fieldArray.fields.map((item, index) => (
        <div key={item.id}>
          {index > 0 && <Separator className="mb-4" />}
          <div className="flex items-start gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <FormField
                control={control}
                name={`social.${index}.media_term`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold">
                      Platform
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted/30 focus-visible:ring-primary transition-all"
                        placeholder="e.g. Instagram"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`social.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold">
                      Url
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
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6"
              onClick={() => fieldArray.remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
