import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import instance from "@/config/instance";
import Loader from "@/components/loader";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createBrandSchema,
  type CreateBrandFormSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SuccessModal } from "@/components/success-modal";

export const Route = createFileRoute("/")({
  component: Index,
});

interface BrandResponse {
  _id: string;
  name: string;
  website: string;
  email: string;
}

function Index() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<CreateBrandFormSchema>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: "",
      website: "",
      email: "",
    },
  });

  const createBrandMutation = useMutation({
    mutationFn: async (data: CreateBrandFormSchema) => {
      const response = await instance.post<BrandResponse>("/brand", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Save brand ID, name, and website to localStorage
      localStorage.setItem("brandId", data._id);
      localStorage.setItem("brandName", data.name);
      localStorage.setItem("brandWebsite", data.website);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      console.error("Error creating brand:", error);
    },
  });

  const onSubmit = (values: CreateBrandFormSchema) => {
    createBrandMutation.mutate(values);
  };

  const handleViewInsights = () => {
    setShowSuccessModal(false);
    navigate({ to: "/dashboard" });
  };

  return (
    <>
      {createBrandMutation.isPending && <Loader />}
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-4">
        <Card className="w-full max-w-md shadow-none">
          <CardHeader>
            <CardTitle>Check Your Brand</CardTitle>
            <CardDescription>
              Enter your brand information to get insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input className="shadow-none" placeholder="Enter your brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input className="shadow-none" placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="shadow-none"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-10"
                  disabled={createBrandMutation.isPending}
                >
                  Check Your Brand
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        onViewInsights={handleViewInsights}
      />
    </>
  );
}
