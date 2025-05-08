"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function SchemaExplorer() {
  const [schema, setSchema] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSchema() {
      try {
        const response = await fetch("/api/schema-explorer")
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        setSchema(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSchema()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Database Schema Explorer</CardTitle>
            <CardDescription>Loading schema information...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Database Schema Explorer</CardTitle>
            <CardDescription>Error loading schema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-md text-red-800">
              <p>Failed to load database schema: {error}</p>
              <p className="mt-2">This could be due to insufficient permissions or connection issues.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Database Schema Explorer</CardTitle>
          <CardDescription>Exploring the structure of your Supabase database</CardDescription>
        </CardHeader>
        <CardContent>
          {schema?.tables?.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {schema.tables.map((table: any) => (
                <AccordionItem key={table.name} value={table.name}>
                  <AccordionTrigger className="font-medium">{table.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Column Name</TableHead>
                            <TableHead>Data Type</TableHead>
                            <TableHead>Nullable</TableHead>
                            <TableHead>Default</TableHead>
                            <TableHead>Constraints</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {table.columns.map((column: any) => {
                            // Check if this column is a foreign key
                            const fk = table.foreignKeys.find((fk: any) => fk.column_name === column.column_name)

                            return (
                              <TableRow key={column.column_name}>
                                <TableCell className="font-medium">{column.column_name}</TableCell>
                                <TableCell>{column.data_type}</TableCell>
                                <TableCell>{column.is_nullable === "YES" ? "Yes" : "No"}</TableCell>
                                <TableCell>{column.column_default || "-"}</TableCell>
                                <TableCell>
                                  {fk && (
                                    <Badge variant="outline" className="bg-blue-50">
                                      FK → {fk.information_schema.table_constraints.table_name}
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10">
              <p>No tables found in the database.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
