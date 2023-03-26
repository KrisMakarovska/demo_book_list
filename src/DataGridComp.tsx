import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

import { Book } from './types/Book';

type Props = {
  allBooks: Book[],
  setSelectedRow: (row: Book) => void,
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 300, },
  { field: 'author', headerName: 'Author', width: 300 },
  { field: 'published', headerName: 'Published Year', width: 150 },
  { 
    field: 'edit', 
    headerName: 'Edit', 
    width: 70, 
    renderCell: () => <EditIcon />
  },
  { 
    field: 'delete', 
    headerName: 'Delete', 
    width: 70, 
    renderCell: () => <DeleteIcon/>
  },
];

export const DataGridComp = ({ allBooks, setSelectedRow}: Props) => {

  const handleEditClick = (row: Book) => {
    setSelectedRow(row);
    // navigate(`/books/${selectedRow?.id}/edit`);
    console.log('Edit clicked for row:', row);
  };

  return (
    <DataGrid 
      rows={allBooks}
      columns={columns}
      onRowClick={(event) => handleEditClick(event.row)}
    />
  )
}