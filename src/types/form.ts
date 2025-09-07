import type z from "zod";

import type formSchema from "@/schema/form";

export type FormSchema = z.infer<typeof formSchema>;
