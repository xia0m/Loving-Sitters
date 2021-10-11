import { TableHead, TableRow, TableCell } from '@mui/material';

export default function RequestTableHead(): JSX.Element {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Ower Info</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Dropoff Time</TableCell>
        <TableCell align="center">Pickup Time</TableCell>
        <TableCell align="center">Payment status</TableCell>
        <TableCell align="center">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}
