"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BadgeInputListProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    label?: string;
    placeholder?: string;
    form: UseFormReturn<TFormValues>;
    description?: React.ReactNode;
    onItemsChange?: (items: string[]) => void;
    onItemsDelete?: (item: string) => void;
}

// Define the component with generic type parameter
export default function BadgeInputList<TFormValues extends FieldValues>({
    name,
    label = "Add Items",
    placeholder = "Type an item and click add",
    form,
    onItemsChange,
    onItemsDelete,
}: BadgeInputListProps<TFormValues>) {
    const [inputValue, setInputValue] = useState<string>("");

    const handleAddItem = () => {
        if (inputValue.trim() === "") return;

        const currentValue = (form.watch(name) as string[]) || [];
        const updatedItems = [...currentValue, inputValue.trim()];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setValue(name, updatedItems as any, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setInputValue("");

        if (onItemsChange) {
            onItemsChange(updatedItems);
        }
    };

    const handleRemoveItem = (index: number) => {
        const currentValue = (form.watch(name) as string[]) || [];
        const updatedItems = [...currentValue];
        updatedItems.splice(index, 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setValue(name, updatedItems as any, {
            shouldValidate: true,
            shouldDirty: true,
        });

        if (onItemsChange) {
            onItemsChange(updatedItems);
        }

        if (onItemsDelete) {
            onItemsDelete(currentValue[index]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddItem();
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex gap-2">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </FormControl>
                        <Button
                            type="button"
                            variant={"outline"}
                            onClick={handleAddItem}
                            className="flex items-center gap-1">
                            <Plus className="w-4 h-4" /> Add
                        </Button>
                    </div>
                    <FormMessage />

                    <div className="flex flex-wrap gap-2 mt-2">
                        {field.value?.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No items added yet.
                            </p>
                        ) : (
                            field.value?.map((item: string, index: number) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1 px-3 py-1">
                                    <span>{item}</span>
                                    <div
                                        onClick={() => handleRemoveItem(index)}>
                                        <X className="w-5 h-5 ml-1 cursor-pointer block text-red-500" />
                                    </div>
                                </Badge>
                            ))
                        )}
                    </div>
                </FormItem>
            )}
        />
    );
}
