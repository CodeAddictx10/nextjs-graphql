"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useTransition } from "react";
import { login } from "@/app/login/actions";

const formSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "user",
            password: "12345678",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const { error } = await login({ ...data });
            if (error) {
                 toast.error("Fail to login", {
                    description: "Invalid email/password",
                });
            } else {
                toast.success("Successfully login 🎉");
                window.location.href = "/departments";
                 return;
            }
        });
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your username below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="username"
                                                        type="text"
                                                        placeholder="user"
                                                        required
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="12345678"
                                                        required
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full cursor-pointer">
                                        {isPending ? "Submitting..." : "Login"}
                                    </Button>
                                </div>
                                <p className="text-xs text-center text-yellow-400">Test account: user/12345678</p>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
