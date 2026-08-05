/* eslint-disable */
"use client";

import { useMultipleAssetsByCategory } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_hooks/use-asset-store";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Loader2, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { BaseSelect } from "../_types/api";

interface AssetCategoryAssignmentProps {
  assets?: BaseSelect[];
}

export function AssetCategoryAssignment({
  assets,
}: AssetCategoryAssignmentProps) {
  const form = useFormContext();

  // Watch asset_category changes
  const assetCategories = form.watch("asset_category") as string[];

  // Fetch assets for all selected categories
  const assetQueries = useMultipleAssetsByCategory(assetCategories);

  return (
    <FormField
      control={form.control}
      name="asset_category"
      render={({ field }) => {
        const assetCategoryValues = field.value as string[];
        const assetValues = form.getValues("asset") as string[];

        return (
          <FormItem className="md:col-span-3">
            <FormLabel>Asset Category & Assignment</FormLabel>
            <div className="space-y-3">
              {assetCategoryValues.map((categoryValue, index) => {
                const currentQuery = assetQueries[index];
                const filteredAssets = currentQuery?.data || [];
                const isLoadingAssets = currentQuery?.isLoading || false;
                const hasError = currentQuery?.isError || false;

                return (
                  <div key={index} className="flex gap-2 items-start">
                    {/* Asset Category Select */}
                    <div className="flex-1">
                      <SearchableSelect
                        label=""
                        value={categoryValue || ""}
                        placeholder="Choose Asset Category"
                        options={
                          assets?.map((asset: BaseSelect) => ({
                            id: asset.id.toString(),
                            label: asset.name,
                          })) ?? []
                        }
                        onChange={(value) => {
                          const newValues = [...field.value];
                          newValues[index] = value;
                          field.onChange(newValues);

                          // Reset corresponding asset when category changes
                          const currentAssetValues = form.getValues("asset");
                          const assetArray = Array.isArray(currentAssetValues)
                            ? currentAssetValues
                            : [];
                          const newAssetValues = [...assetArray];
                          newAssetValues[index] = "";
                          form.setValue("asset", newAssetValues);
                        }}
                      />
                    </div>

                    {/* Assign Asset Select */}
                    <div className="flex-1">
                      <SearchableSelect
                        label=""
                        value={assetValues[index] || ""}
                        placeholder={
                          !categoryValue
                            ? "Select category first"
                            : isLoadingAssets
                              ? "Loading assets..."
                              : hasError
                                ? "Error loading assets"
                                : filteredAssets.length === 0
                                  ? "No assets available"
                                  : "Choose Asset"
                        }
                        loading={isLoadingAssets}
                        options={filteredAssets.map((asset: any) => ({
                          id: asset.id.toString(),
                          label: asset.name,
                        }))}
                        onChange={(value) => {
                          const currentAssetValues = form.getValues("asset");
                          const assetArray = Array.isArray(currentAssetValues)
                            ? currentAssetValues
                            : [];
                          const newValues = [...assetArray];
                          newValues[index] = value;
                          form.setValue("asset", newValues);
                        }}
                      />
                    </div>

                    {/* Remove Button - Only show if more than 1 item */}
                    {assetCategoryValues.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          // Remove from category array
                          const newCategoryValues = field.value.filter(
                            (_: any, i: number) => i !== index,
                          );
                          field.onChange(newCategoryValues);

                          // Remove from asset array - with safety check
                          const currentAssetValues = form.getValues("asset");
                          // Ensure it's an array before filtering
                          const assetArray = Array.isArray(currentAssetValues)
                            ? currentAssetValues
                            : [];
                          const newAssetValues = assetArray.filter(
                            (_: any, i: number) => i !== index,
                          );
                          form.setValue("asset", newAssetValues);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}

              {/* Add More Button - Always shown below all rows */}
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  // Add to category array
                  field.onChange([...field.value, ""]);

                  // Add to asset array - with safety check
                  const currentAssetValues = form.getValues("asset");
                  const assetArray = Array.isArray(currentAssetValues)
                    ? currentAssetValues
                    : [];
                  form.setValue("asset", [...assetArray, ""]);
                }}
              >
                Add More
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
