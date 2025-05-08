"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { supabase } from "@/lib/supabase"

interface Business {
  id: string
  name: string
}

interface BusinessComboboxProps {
  value: string
  onChange: (value: string) => void
  onNameChange?: (name: string) => void
}

export function BusinessCombobox({ value, onChange, onNameChange }: BusinessComboboxProps) {
  const [open, setOpen] = useState(false)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true)
      try {
        let query = supabase.from("businesses").select("id, name").eq("status", "approved").order("name")

        if (searchTerm) {
          query = query.ilike("name", `%${searchTerm}%`)
        }

        const { data, error } = await query.limit(20)

        if (error) {
          console.error("Error fetching businesses:", error)
          return
        }

        setBusinesses(data || [])
      } catch (err) {
        console.error("Error in business fetch:", err)
      } finally {
        setLoading(false)
      }
    }

    // Add a small delay to prevent too many requests while typing
    const timeoutId = setTimeout(() => {
      fetchBusinesses()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleSelect = (currentValue: string) => {
    const selectedBusiness = businesses.find((business) => business.id === currentValue)
    onChange(currentValue === value ? "" : currentValue)
    if (onNameChange && selectedBusiness) {
      onNameChange(selectedBusiness.name)
    }
    setOpen(false)
  }

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue)
    if (onNameChange && inputValue && businesses.length === 0) {
      onNameChange(inputValue)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value
            ? businesses.find((business) => business.id === value)?.name || "Select business..."
            : "Select business..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search businesses..." onValueChange={handleInputChange} />
          {loading ? (
            <div className="py-6 text-center text-sm">Loading businesses...</div>
          ) : (
            <CommandList>
              <CommandEmpty>
                {searchTerm ? (
                  <div className="py-3 text-center text-sm">
                    No businesses found. You can still use "{searchTerm}" as a referral.
                  </div>
                ) : (
                  <div className="py-3 text-center text-sm">No businesses found.</div>
                )}
              </CommandEmpty>
              <CommandGroup>
                {businesses.map((business) => (
                  <CommandItem key={business.id} value={business.id} onSelect={() => handleSelect(business.id)}>
                    <Check className={cn("mr-2 h-4 w-4", value === business.id ? "opacity-100" : "opacity-0")} />
                    {business.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
