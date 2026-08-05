/* eslint-disable */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  generateCaptainAgreement,
  updateCaptainAgreement,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_api/agreement";
import {
  createCaptain,
  updateCaptain,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_api/create-captain";
import { AssetCategoryAssignment } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_components/asset-category-assignment";
import { VehicleTypeAssignment } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_components/vehicle-type-assignment";
import { useCaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_hooks/use-captain-details";
import useCreateCaptain from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_hooks/use-captain-dropdowns";
import {
  captainCreateSchema,
  captainEditSchema,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_schema/validation";
import { BaseSelect } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";
import { CaptainFormProps } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/page";
import {
  getDefaultFormValues,
  mapCaptainToFormValues,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_utility/captain-form-values";
import {
  convertPathToExistingFile,
  ExistingFile,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_utility/file-upload";
import { downloadBase64PDF } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_utility/pdf-download";
import { processFormData } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_utility/process-form-data";
import {
  AreaFilter,
  Country,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import FileUpload from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { toApiDate } from "@/lib/date";
import {
  clearServerErrors,
  handleServerValidationErrors,
} from "@/lib/server-validation-error-handler";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CaptainForm({ id }: CaptainFormProps) {
  const queryClient = useQueryClient(); // Add this
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const router = useRouter();
  const isEdit = !!id && id !== "create";

  const [existingIqamaFiles, setExistingIqamaFiles] = useState<ExistingFile[]>(
    [],
  );

  const [existingDrivingLicense, setDrivingLicense] = useState<ExistingFile[]>(
    [],
  );

  const [existingAgreement, setExistingAgreement] = useState<ExistingFile[]>(
    [],
  );

  const [existingVehicleImages, setExistingVehicleImages] = useState<
    ExistingFile[]
  >([]);

  const [isGeneratingAgreement, setIsGeneratingAgreement] = useState(false);

  const {
    countries,
    areas,
    vehicleTypes,
    commissionRule,
    autoAssignPriority,
    assets,
  } = useCreateCaptain();

  const { captainData, isLoadingCaptain, isFetching } = useCaptainDetails(id, {
    enabled: isEdit,
  });

  // Use the correct schema based on mode
  const form = useForm<any>({
    resolver: zodResolver(isEdit ? captainEditSchema : captainCreateSchema),
    defaultValues: getDefaultFormValues(),
  });

  const hasInitializedForm = useRef(false);

  // Initialize form in create mode immediately
  useEffect(() => {
    if (!isEdit) {
      setFormReady(true);
    }
  }, [isEdit]);

  useEffect(() => {
    if (captainData?.files?.iqama_file_path) {
      const existingFile = convertPathToExistingFile(
        captainData?.files?.iqama_file_path,
      );

      if (existingFile) {
        setExistingIqamaFiles([existingFile]);
      }
    }

    if (captainData?.files?.license_file_path) {
      const liecenseFile = convertPathToExistingFile(
        captainData?.files?.license_file_path,
      );

      if (liecenseFile) {
        setDrivingLicense([liecenseFile]);
      }
    }

    if (captainData?.files?.agreement) {
      const agreementFile = convertPathToExistingFile(
        captainData?.files?.agreement,
      );

      if (agreementFile) {
        setExistingAgreement([agreementFile]);
      }
    }

    if (
      captainData?.files?.vehicle_images &&
      Array.isArray(captainData.files.vehicle_images)
    ) {
      const existingFiles = captainData.files.vehicle_images
        .map((path: string) => convertPathToExistingFile(path))
        .filter((file): file is ExistingFile => file !== null);

      setExistingVehicleImages(existingFiles);
    }
  }, [captainData]);
  // Handle form initialization for edit mode
  useEffect(() => {
    if (!isEdit) return;
    if (isLoadingCaptain) return;
    if (!captainData) return;
    if (hasInitializedForm.current) return;

    hasInitializedForm.current = true;

    const formValues = mapCaptainToFormValues(captainData);

    // Reset form with new values and clear all state
    form.reset(formValues, {
      keepErrors: false,
      keepDirty: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });

    // Ensure Select components have time to update
    setTimeout(() => {
      setFormReady(true);
    }, 50);
  }, [isEdit, isLoadingCaptain, captainData, form]);

  // Watch asset_category changes
  const selectedAssetCategory = form.watch("asset_category");

  // Reset asset field when category changes
  useEffect(() => {
    if (selectedAssetCategory) {
      form.setValue("asset", []);
    }
  }, [selectedAssetCategory, form]);

  const onSubmit = async (data: any) => {
    // Clear any previous server errors before submitting
    clearServerErrors(form);
    setIsSubmitting(true);
    try {
      const formData = await processFormData(data, isEdit);
      const result = isEdit
        ? await updateCaptain(id, formData)
        : await createCaptain(formData);

      if (!result.success) {
        handleServerValidationErrors(result.error, form);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["captains"],
      });

      form.reset();
      toast.success(
        isEdit
          ? "Captain updated successfully"
          : "Captain created successfully",
      );
      router.push(`/dashboard/3pl/captain`);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    router.push(`/dashboard/3pl/captain`);
  };

  const generateAgreement = async () => {
    try {
      const isValid = await form.trigger();

      if (!isValid) {
        toast.error(
          "Please fill in all required fields before generating the agreement",
        );
        return;
      }

      setIsGeneratingAgreement(true);

      const data = form.getValues();
      const formData = await processFormData(data, isEdit);

      const response = isEdit
        ? await updateCaptainAgreement(formData, Number(id))
        : await generateCaptainAgreement(formData);

      if (!response?.agreement) {
        toast.error("Agreement generation failed");
        return;
      }

      const filename = `agreement__${new Date().toISOString().split("T")[0]}.pdf`;
      downloadBase64PDF(response.agreement, filename);

      toast.success("Agreement generated and downloaded successfully!");
    } catch (error: unknown) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Failed to generate agreement",
      );
    } finally {
      setIsGeneratingAgreement(false);
    }
  };

  // Show loading state while fetching or initializing
  if (isEdit && (isFetching || !formReady)) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg font-medium">Loading captain details...</div>
          <div className="text-sm text-muted-foreground mt-2">
            Please wait while we fetch the information
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Information Section */}
        <Card>
          <CardHeader className="bg-amber-400 rounded-t-xl p-4">
            <CardTitle className="dark:text-black">Information</CardTitle>
            <CardDescription className="dark:text-black">
              Basic information about the captain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-4">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Number */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Residential ID Number */}
              <FormField
                control={form.control}
                name="iqama_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter residential ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Residential ID Expiry Date */}
              <FormField
                control={form.control}
                name="iqama_expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <DatePicker
                      label="Residential ID Expiry Date"
                      date={field.value}
                      onChange={(date) =>
                        field.onChange(date ? toApiDate(date) : "")
                      }
                      yearRange={10}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Driving License Number */}
              <FormField
                control={form.control}
                name="licence_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driving License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter license number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Driving License Expiry Date */}
              <FormField
                control={form.control}
                name="licence_expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <DatePicker
                      label="Driving License Expiry Date"
                      date={field.value}
                      onChange={(date) =>
                        field.onChange(date ? toApiDate(date) : "")
                      }
                      yearRange={10}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <SearchableSelect
                      label="Nationality"
                      value={field.value || ""}
                      placeholder="Select nationality"
                      options={
                        countries?.map((country: Country) => ({
                          id: country.id.toString(),
                          label: country.name,
                        })) ?? []
                      }
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Residential ID */}
              <FormField
                control={form.control}
                name="iqama"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Upload Residential ID</FormLabel>
                    <FileUpload
                      name="iqama"
                      acceptedTypes={["image", "pdf"]}
                      maxSize={1 * 1024 * 1024}
                      showPreview={true}
                      files={value}
                      onFilesChange={(files) => {
                        onChange(files);
                        setExistingIqamaFiles([]);
                      }}
                      existingFiles={existingIqamaFiles}
                      multiple={false}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Driving License */}
              <FormField
                control={form.control}
                name="licence"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Upload Driving License</FormLabel>
                    <FileUpload
                      name="licence"
                      acceptedTypes={["image", "pdf"]}
                      maxSize={1 * 1024 * 1024}
                      showPreview={true}
                      files={value}
                      onFilesChange={(files) => {
                        onChange(files);
                        setDrivingLicense([]);
                      }}
                      existingFiles={existingDrivingLicense}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Work Information Section */}
        <Card>
          <CardHeader className="bg-amber-400 rounded-t-xl p-4">
            <CardTitle className="dark:text-black">Work Information</CardTitle>
            <CardDescription className="dark:text-black">
              Employment and work details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-4">
              {/* Employment Type */}
              <FormField
                control={form.control}
                name="employment_type"
                defaultValue={"Third Party"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Input {...field} value={"Third Party"} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Working Area (Regions) */}
              <FormField
                control={form.control}
                name="regions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Working Area</FormLabel>
                    <MultiSelect
                      options={
                        areas?.map((area: AreaFilter) => ({
                          label: area.name,
                          value: area.id.toString(),
                        })) ?? []
                      }
                      selected={field.value}
                      onChange={(values) => field.onChange(values)}
                      placeholder="Select working areas"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Activation Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <SearchableSelect
                      label="Activation Status"
                      value={field.value || ""}
                      placeholder="Select status"
                      options={[
                        { id: "Active", label: "Active" },
                        { id: "Request", label: "Request" },
                      ]}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Asset Category Assignment */}
              <AssetCategoryAssignment assets={assets} />

              {/* Joined Date */}
              <FormField
                control={form.control}
                name="date_of_joining"
                render={({ field }) => (
                  <FormItem>
                    <DatePicker
                      label="Joined Date"
                      date={field.value}
                      onChange={(date) =>
                        field.onChange(date ? toApiDate(date) : "")
                      }
                      yearRange={10}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type of Vehicle */}
              {/* <FormField
                control={form.control}
                name="type_of_vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Vehicle</FormLabel>
                    <MultiSelect
                      options={
                        vehicleTypes?.map((vehicle: FilterVehicleType) => ({
                          label: vehicle.name,
                          value: vehicle.id.toString(),
                        })) ?? []
                      }
                      selected={field.value}
                      onChange={(values) => field.onChange(values)}
                      placeholder="Select vehicle types"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Vehicle */}
              {/* <FormField
                control={form.control}
                name="vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicles?.map((vehicle: Vehicle) => (
                          <SelectItem
                            key={vehicle.id}
                            value={vehicle.id.toString()}
                          >
                            {vehicle.number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <VehicleTypeAssignment
                vehicleTypes={vehicleTypes}
                isEdit={isEdit}
              />

              {/* Monthly Salary */}
              <FormField
                control={form.control}
                name="monthly_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter monthly salary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Daily Rent */}
              <FormField
                control={form.control}
                name="daily_rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Rent</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter daily rent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Given Custody Amount */}
              <FormField
                control={form.control}
                name="given_custodyamount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Given Custody Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        {...field}
                        readOnly={isEdit}
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Auto Assign Priority */}
              <FormField
                control={form.control}
                name="auto_assign_priority"
                render={({ field }) => (
                  <FormItem>
                    <SearchableSelect
                      label="Auto Assign Priority"
                      value={field.value || ""}
                      placeholder="Select priority"
                      options={
                        autoAssignPriority?.map((priority: Country) => ({
                          id: priority.id.toString(),
                          label: priority.name,
                        })) ?? []
                      }
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rent Valid From */}
              <FormField
                control={form.control}
                name="rent_valid_from"
                render={({ field }) => (
                  <FormItem>
                    <DatePicker
                      label="Rent Valid From"
                      date={field.value}
                      onChange={(date) =>
                        field.onChange(date ? toApiDate(date) : "")
                      }
                      yearRange={10}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Commission Rule */}
              <FormField
                control={form.control}
                name="commission_rule_id"
                render={({ field }) => (
                  <FormItem>
                    <SearchableSelect
                      label="Select Commission Rule"
                      value={field.value || ""}
                      placeholder="Select commission rule"
                      options={
                        commissionRule?.map((rule: BaseSelect) => ({
                          id: rule.id.toString(),
                          label: rule.name,
                        })) ?? []
                      }
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Images */}
              <FormField
                control={form.control}
                name="vehicle_images"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Vehicle Images</FormLabel>
                    <FileUpload
                      acceptedTypes={["image"]}
                      name="vehicle_images"
                      maxSize={1 * 1024 * 1024}
                      showPreview={true}
                      files={value}
                      onFilesChange={(files) => onChange(files)}
                      multiple
                      existingFiles={existingVehicleImages}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Login Information Section */}
        <Card>
          <CardHeader className="bg-amber-400 rounded-t-xl p-4">
            <CardTitle className="dark:text-black">Login Information</CardTitle>
            <CardDescription className="dark:text-black">
              Account credentials for the captain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Username)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password {isEdit && "(Leave empty to keep current)"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={
                          isEdit
                            ? "Leave empty to keep current"
                            : "Enter password"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Generate Agreement Button */}
              <div className="md:col-span-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={generateAgreement}
                  disabled={isGeneratingAgreement}
                >
                  {isGeneratingAgreement
                    ? "Generating..."
                    : "Generate & Download Agreement"}
                </Button>
              </div>

              {/* Upload Agreement Copy */}
              <FormField
                control={form.control}
                name="upload_agreement_copy"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Upload Agreement Copy</FormLabel>
                    <FileUpload
                      name="upload_agreement_copy"
                      acceptedTypes={["pdf"]}
                      maxSize={1 * 1024 * 1024}
                      showPreview={true}
                      files={value}
                      onFilesChange={(files) => {
                        onChange(files);
                        setExistingAgreement([]);
                      }}
                      existingFiles={existingAgreement}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEdit
                ? "Update Captain"
                : "Create Captain"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
