import { match } from "ts-pattern";
import { fileSave } from "browser-fs-access";
import { useCallback, type JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formSchema from "@/schema/form";
import type { FormSchema } from "@/types/form";
import useConvertCSV from "@/hooks/useConvertCSV";
import useConvertTXT from "@/hooks/useConvertTXT";
import useConvertHTML from "@/hooks/useConvertHTML";
import { FILE_TYPE, MIME_TYPE, EXTENSION } from "@/const/file-type";

export default function Page(): JSX.Element {
  const { mutateAsync: convertToCSV } = useConvertCSV();
  const { mutateAsync: convertToTXT } = useConvertTXT();
  const { mutateAsync: convertToHTML } = useConvertHTML();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (data: FormSchema) => {
      const result = await match(data.type)
        .with(FILE_TYPE.CSV, () => convertToCSV(data))
        .with(FILE_TYPE.TXT, () => convertToTXT(data))
        .with(FILE_TYPE.HTML, () => convertToHTML(data))
        .exhaustive();

      const blob = new Blob([result], { type: MIME_TYPE[data.type] });

      await fileSave(blob, {
        fileName: `converted${EXTENSION[data.type]}`,
        extensions: [EXTENSION[data.type]],
        description: "Converted file",
      });
    },
    [convertToCSV, convertToHTML, convertToTXT]
  );

  return (
    <main className="flex flex-col items-center justify-center gap-6 h-screen py-8 box-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Excel Converter</CardTitle>
              <CardDescription>
                Convert your Excel files to other formats with ease.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { ref, name, onBlur, onChange } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xls,.xlsx,.xlsm,.xlsb,.xltx,.xltm"
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload your Excel file here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field: { name, value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Convert to</FormLabel>
                    <FormControl>
                      <Select
                        name={name}
                        value={value}
                        onValueChange={onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a file type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>File Type</SelectLabel>
                            <SelectItem value={FILE_TYPE.CSV}>CSV</SelectItem>
                            <SelectItem value={FILE_TYPE.TXT}>TXT</SelectItem>
                            <SelectItem value={FILE_TYPE.HTML}>HTML</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Choose the format you want to convert your Excel file to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      If your Excel file is password-protected, enter the
                      password here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sheets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sheets</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Sheet 1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the sheet name to convert. Leave empty to convert
                      the first sheet.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <span>Convert</span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
