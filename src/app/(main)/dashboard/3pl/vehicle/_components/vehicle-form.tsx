/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable max-lines */
"use client";
"use no memo";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { VEHICLE_STATUS } from "../_constant/vehicle";
import { useAreaList } from "../_hooks/use-area-list";
import { useCaptainList } from "../_hooks/use-captain-list";
import { useCreateVehicle } from "../_hooks/use-create-vehicle";
import { useNextVehicleCode } from "../_hooks/use-next-vehicle-code";
import { useOwnerDetails } from "../_hooks/use-owner-details";
import { useOwnersList } from "../_hooks/use-owner-list";
import { useUpdateVehicle } from "../_hooks/use-update-vehicle";
import { useVehicleDetails } from "../_hooks/use-vehicle-details";
import { useVehicleParams } from "../_hooks/use-vehicle-params";
import { useVehicleTypeList } from "../_hooks/use-vehicle-type-list";
import {
  VehicleFormSchema,
  type VehicleFormValues,
} from "../_types/vehicle-type";

interface Props {
  defaultValues?: Partial<VehicleFormValues>;
  isEdit?: boolean;
  vehicleId?: string | number;
}

export function VehicleForm({
  defaultValues,
  isEdit = false,
  vehicleId,
}: Props) {
  const { code: urlCode, setCode: setUrlCode } = useVehicleParams();
  const createVehicle = useCreateVehicle();
  const updateVehicle = useUpdateVehicle(vehicleId ?? "");
  const { data: areaOptions = [], isLoading: isAreaLoading } = useAreaList();
  const { data: captainOptions = [], isLoading: isCaptainLoading } =
    useCaptainList();
  const { data: typeOptions = [], isLoading: isTypeLoading } =
    useVehicleTypeList();
  const { data: vehicleDetails, isLoading: isDetailsLoading } =
    useVehicleDetails(vehicleId ?? "");
  const { data: nextVehicleCode, isLoading: isCodeLoading } =
    useNextVehicleCode(!isEdit);
  const router = useRouter();
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(VehicleFormSchema),
    defaultValues: {
      code: urlCode ?? "",
      brand: "",
      name: "",
      number: "",
      status: "Active",
      onboarding: "No",
      region_id: "",
      type: "1",
      owner_name: "",
      owner_email: "",
      owner_number: "",
      assigned_to: "",
      rc_book_expiry_date: "",
      insurance_expiry_date: "",
      current_km: "",
      ...defaultValues,
    },
  });

  // Populate form with vehicle details in edit mode
  useEffect(() => {
    if (isEdit && vehicleDetails?.status === "success" && vehicleDetails.data) {
      const data = vehicleDetails.data;

      // Find status value from label if needed
      let statusValue = "Active";
      if (data.status === "Banned" || data.status === "2")
        statusValue = "Banned";
      else if (data.status === "Onboarding" || data.status === "0")
        statusValue = "Onboarding";
      else if (
        data.status === "Active" ||
        data.status === "active" ||
        data.status === "1"
      )
        statusValue = "Active";

      form.reset({
        code: data.code || "",
        brand: data.brand || "",
        name: data.name || "",
        number: data.number || "",
        status: statusValue,
        onboarding: "No",
        region_id: data.region_id ? String(data.region_id) : "",
        type: data.type ? String(data.type) : "1",
        owner_name: data.owner_name || "",
        owner_email: data.owner_email || "",
        owner_number: data.owner_number || "",
        assigned_to: data.assigned_to ? String(data.assigned_to) : "",
        rc_book_expiry_date: data.rc_book_expiry_date ?? "",
        insurance_expiry_date: data.insurance_expiry_date ?? "",
        current_km: data.current_km ? String(data.current_km) : "",
      });
    }
  }, [isEdit, vehicleDetails, form]);

  // Sync form code with nextVehicleCode in create mode
  useEffect(() => {
    if (
      !isEdit &&
      nextVehicleCode?.status === "success" &&
      nextVehicleCode.data
    ) {
      form.setValue("code", nextVehicleCode.data);
    }
  }, [isEdit, nextVehicleCode, form]);

  // Sync form code with URL code only if no nextVehicleCode
  useEffect(() => {
    if (urlCode && !form.getValues("code") && isEdit) {
      form.setValue("code", urlCode);
    }
  }, [urlCode, form, isEdit]);

  const { data: ownerOptions = [], isLoading: isOwnerLoading } =
    useOwnersList();

  const selectedOwnerId = form.watch("owner_name");
  const { data: selectedOwnerDetails } = useOwnerDetails(selectedOwnerId);

  // Auto-populate owner email and number
  useEffect(() => {
    if (
      selectedOwnerDetails?.status === "success" &&
      selectedOwnerDetails.data
    ) {
      form.setValue("owner_email", selectedOwnerDetails.data.email);
      form.setValue("owner_number", selectedOwnerDetails.data.contact_number);
    }
  }, [selectedOwnerDetails, form]);

  const onSubmit = (data: VehicleFormValues) => {
    if (isEdit && vehicleId) {
      updateVehicle.mutate(data, {
        onSuccess: (res) => {
          if (res.status === "success") {
            router.push("/dashboard/3pl/vehicle");
          }
        },
      });
    } else {
      createVehicle.mutate(data, {
        onSuccess: (res) => {
          if (res.status === "success") {
            router.push("/dashboard/3pl/vehicle");
          }
        },
      });
    }
  };

  const onError = (errors: any) => {
    Object.entries(errors).forEach(([_, error]: [string, any]) => {
      // toast.error(error.message ?? "Validation error");
    });
  };

  if (isEdit && isDetailsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-amber-400 px-6 py-4 rounded-t-xl border-bottom border-black">
        <CardTitle className="text-xl font-semibold text-muted-foreground">
          {isEdit ? "Edit Vehicle" : "Vehicle Details"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-8"
          >
            {/* Row 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Id</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter vehicle ID"
                        readOnly
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Vehicle Brand
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter vehicle brand name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Vehicle Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter vehicle name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Vehicle Number
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter vehicle number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr></hr>

            {/* Section: Vehicle Activation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-muted-foreground">
                Vehicle Activation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Status
                      </FormLabel>
                      <FormControl>
                        <DataTableFilterBox
                          title="Status"
                          options={VEHICLE_STATUS}
                          filterValue={field.value ? [field.value] : []}
                          setFilterValue={(value) => {
                            field.onChange(value?.[0] ?? "");
                          }}
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region_id"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Select Running Area
                      </FormLabel>
                      <FormControl>
                        <DataTableFilterBox
                          title="Select Running Area"
                          options={areaOptions}
                          filterValue={field.value ? [field.value] : []}
                          setFilterValue={(value) => {
                            field.onChange(value?.[0] ?? "");
                          }}
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Vehicle Type
                      </FormLabel>
                      <FormControl>
                        <DataTableFilterBox
                          title="Vehicle Type"
                          options={typeOptions}
                          filterValue={field.value ? [field.value] : []}
                          setFilterValue={(value) => {
                            field.onChange(value?.[0] ?? "");
                          }}
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <hr></hr>

            {/* Section: Assign Vehicle to Captain */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-muted-foreground">
                Assign Vehicle To Captain
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="assigned_to"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Vehicle Assign To</FormLabel>
                      <FormControl>
                        <DataTableFilterBox
                          title="Select Captain"
                          options={captainOptions}
                          filterValue={field.value ? [field.value] : []}
                          setFilterValue={(value) => {
                            field.onChange(value?.[0] ?? "");
                          }}
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <hr></hr>

            {/* Section: Owner Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-muted-foreground">
                Owner Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="owner_name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Owner Name
                      </FormLabel>
                      <FormControl>
                        <DataTableFilterBox
                          title="Owner Name"
                          options={ownerOptions}
                          filterValue={field.value ? [field.value] : []}
                          setFilterValue={(value) => {
                            field.onChange(value?.[0] ?? "");
                          }}
                          error={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="owner_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Owner Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter owner email"
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="owner_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Owner Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter owner number"
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <hr></hr>

            {/* Section: Document Expiry */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-muted-foreground">
                Document Expiry
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="rc_book_expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <DatePicker
                        label="RC Book Expiry Date"
                        date={field.value}
                        onChange={(d) =>
                          field.onChange(d ? d.toISOString().split("T")[0] : "")
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insurance_expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <DatePicker
                        label="Insurance Expiry Date"
                        date={field.value}
                        onChange={(d) =>
                          field.onChange(d ? d.toISOString().split("T")[0] : "")
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="current_km"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Current Running KM
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
                          min={0}
                          onKeyDown={(e) => {
                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <hr></hr>

            {/* Section: Upload Documents */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-muted-foreground">
                Upload Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="rc_file"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel>RC Book Upload</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="rc-upload"
                            onChange={(e) => onChange(e.target.files)}
                          />
                          <label htmlFor="rc-upload" className="w-fit">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2 cursor-pointer"
                              asChild
                            >
                              <span>
                                <Upload className="h-4 w-4" />
                                Upload RC Book
                              </span>
                            </Button>
                          </label>
                          {form.watch("rc_file")?.[0]?.name ? (
                            <p className="text-xs text-muted-foreground break-all">
                              {form.watch("rc_file")[0].name}
                            </p>
                          ) : (
                            isEdit &&
                            vehicleDetails?.data?.rc_file_path && (
                              <p className="text-xs font-medium text-primary break-all">
                                Current File: {vehicleDetails.data.rc_file_path}
                              </p>
                            )
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insurance_file"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel>Insurance Upload</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="insurance-upload"
                            onChange={(e) => onChange(e.target.files)}
                          />
                          <label htmlFor="insurance-upload" className="w-fit">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2 cursor-pointer"
                              asChild
                            >
                              <span>
                                <Upload className="h-4 w-4" />
                                Upload Insurance
                              </span>
                            </Button>
                          </label>
                          {form.watch("insurance_file")?.[0]?.name ? (
                            <p className="text-xs text-muted-foreground break-all">
                              {form.watch("insurance_file")[0].name}
                            </p>
                          ) : (
                            isEdit &&
                            vehicleDetails?.data?.insurance_file_path && (
                              <p className="text-xs font-medium text-primary break-all">
                                Current File:{" "}
                                {vehicleDetails.data.insurance_file_path}
                              </p>
                            )
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicle_images"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel>Vehicle Images Upload</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="vehicle-images-upload"
                            multiple
                            onChange={(e) => onChange(e.target.files)}
                          />
                          <label
                            htmlFor="vehicle-images-upload"
                            className="w-fit"
                          >
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2 cursor-pointer"
                              asChild
                            >
                              <span>
                                <Upload className="h-4 w-4" />
                                Upload Vehicle Images
                              </span>
                            </Button>
                          </label>
                          {form.watch("vehicle_images")?.length > 0 ? (
                            <p className="text-xs text-muted-foreground break-all">
                              {form.watch("vehicle_images").length} files
                              selected
                            </p>
                          ) : (
                            isEdit &&
                            vehicleDetails?.data?.vehicle_images_paths && (
                              <p className="text-xs font-medium text-primary break-all">
                                Current Images:{" "}
                                {vehicleDetails.data.vehicle_images_paths}
                              </p>
                            )
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mb-5">
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  createVehicle.isPending ||
                  updateVehicle.isPending
                }
              >
                {(createVehicle.isPending || updateVehicle.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEdit ? "Update Vehicle" : "Create Vehicle"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
