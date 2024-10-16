"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { CompanionFormProps, PREAMBLE, SEED_CHAT } from "@/lib";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instructions: z.string().min(200, {
    message: "Instructions required at least 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed required at least 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export const CompanionForm = ({
  initialData,
  categories,
}: CompanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        //Update companion data
        await axios.patch(`/api/companion/${initialData.id}`, values);
        console.log(values);
      } else {
        //Create new companion
        await axios.post(`/api/companion`, values);
      }

      toast({
        description: `${initialData ? "Updated" : "Created"} companion`,
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(`Error: ${error}`);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm  text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>AI Companion name.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    AI Companion short description.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Choose a category"
                          aria-describedby="select value"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent aria-describedby="ai companion categories">
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a category for your AI companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm  text-muted-foreground">
                Detailed instructions for AI behavior
              </p>
              <Separator className="bg-primary/10" />
            </div>
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>
                    Describe in details your companion&apos;s backstory and
                    relevant details.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Example Conversation</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={SEED_CHAT}
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>
                    Describe in details your companion&apos;s backstory and
                    relevant details.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button disabled={isLoading}>
                {initialData ? "Edit your companion" : "Create your companion"}
                <Wand2 className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
