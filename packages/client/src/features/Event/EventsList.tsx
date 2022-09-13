import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Event } from '@eve/server/src/router/event';
import { Header } from '../../components/Header';

const columnHelper = createColumnHelper<Event>();

const columns = [
  columnHelper.accessor('title', {
    header: () => <span className='text-sm w-[200px]'>Title</span>,
    cell: info => <div className='truncate pl-1'>{info.getValue()}</div>,
    size: 80,
  }),
  columnHelper.accessor('firstName', {
    header: () => <span className='text-sm'>First Name</span>,
    cell: info => <div className='truncate pl-1'>{info.getValue()}</div>,
    size: 80,
  }),
  columnHelper.accessor('lastName', {
    header: () => <span className='text-sm'>Last Name</span>,
    cell: info => <div className='truncate pl-1'>{info.getValue()}</div>,
    size: 80,
  }),
  columnHelper.accessor('email', {
    header: () => <span className='text-sm'>Email</span>,
    cell: info => <div className='truncate pl-1'>{info.getValue()}</div>,
    size: 100,
  }),
  columnHelper.accessor('eventDate', {
    header: () => <span className='text-sm'>Date</span>,
    cell: info => <div className='text-sm whitespace-nowrap pl-1'>{new Date(info.getValue()).toISOString().split('T')[0]}</div>,
    size: 60,
  }),
  columnHelper.accessor('details', {
    header: () => <span className='text-sm'>Details</span>,
    cell: info => <div className='truncate pl-1'>{info.getValue()}</div>,
    size: 100,
  }),
];

type Props = {
  events: Event[];
}

export function EventsList({events}: Props) {
  const table = useReactTable({
    data: events,
    columns,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
  });
  
  return (
    <div className='bg-background border-2 border-normal-cyan hover:border-bright-cyan overflow-x:auto'>
      <Header title='Events' />
      <div className="py-5">
          <table className='w-full text-foreground'>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}
                      colSpan={header.colSpan}
                      style={{ position: 'relative', width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}