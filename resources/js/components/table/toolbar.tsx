import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { ViewOptions } from './view-options';

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export const Toolbar = <TData,>({ table }: ToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <section className="flex items-center justify-between">
      <Input
        placeholder="Buscar por ..."
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
        className="h-8 w-[250px]"
      />
      {/* I can go to Faceted Filters. Example: priority, status, etc. */}
      {isFiltered && (
        <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2">
          <X />
        </Button>
      )}
      <ViewOptions table={table} />
    </section>
  );
};
