'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import DataTableViewOptions from '@//components/table/table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { priorities, statuses } from '@/components/table/data/data';
import DataTableFacetedFilter from '@/components/table/table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function TableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && <DataTableFacetedFilter column={table.getColumn('status')} title="Status" options={statuses} />}
        {table.getColumn('priority') && <DataTableFacetedFilter column={table.getColumn('priority')} title="Priority" options={priorities} />}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
