import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1, {message: "Name must be atleast 1 character"}).max(100),
    })

    static readonly LOGIN : ZodType = z.object({
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100)
    })
}