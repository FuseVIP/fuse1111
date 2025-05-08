import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 })
    }

    // Get list of all tables
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .order("table_name")

    if (tablesError) {
      return NextResponse.json({ error: tablesError.message }, { status: 500 })
    }

    // Get detailed information for each table
    const tableDetails = []
    for (const table of tables) {
      const tableName = table.table_name

      // Get columns for this table
      const { data: columns, error: columnsError } = await supabase
        .from("information_schema.columns")
        .select("column_name, data_type, is_nullable, column_default")
        .eq("table_schema", "public")
        .eq("table_name", tableName)
        .order("ordinal_position")

      if (columnsError) {
        console.error(`Error fetching columns for ${tableName}:`, columnsError)
        continue
      }

      // Get foreign keys for this table
      const { data: foreignKeys, error: fkError } = await supabase
        .from("information_schema.key_column_usage")
        .select(`
          constraint_name,
          column_name,
          information_schema.table_constraints!inner(constraint_type, table_name),
          information_schema.referential_constraints!inner(unique_constraint_name, update_rule, delete_rule)
        `)
        .eq("table_schema", "public")
        .eq("table_name", tableName)
        .eq("information_schema.table_constraints.constraint_type", "FOREIGN KEY")

      tableDetails.push({
        name: tableName,
        columns,
        foreignKeys: foreignKeys || [],
      })
    }

    return NextResponse.json({ tables: tableDetails })
  } catch (error) {
    console.error("Error exploring schema:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
