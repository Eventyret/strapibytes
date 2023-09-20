"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface ComboboxProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
};

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>((props, ref) => {
  const { options, value, onChange } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Popover isOpen={ open } onOpenChange={ setOpen }>
      <PopoverTrigger>
        <Button
          variant="bordered"
          role="combobox"
          aria-expanded={ open }
          className="w-full justify-between"
        >
          { value
            ? options.find((option) => option.value === value)?.label
            : "Select option..." }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">

        <Command className='w-full'>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            { options.map((option) => (
              <CommandItem
                key={ option.value }
                className='w-full'
                onSelect={ () => {
                  onChange(option.value === value ? "" : option.value)
                  setOpen(false)
                } }
              >
                <Check
                  className={ cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  ) }
                />
                { option.label }
              </CommandItem>
            )) }
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

Combobox.displayName = "Combobox";