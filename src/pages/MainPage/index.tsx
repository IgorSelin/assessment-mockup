import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { mockSchools } from "../../mockData/schools";
import {
  customNumberGenerator,
  formatDate,
  getRandomDate,
} from "../../helpers/numbers";
import style from "./MainPage.module.css";

interface Data {
  id: number;
  name: string;
  date: string;
  currentOrientation: number;
  priorityOrientation: number;
  currentSchoolPolicy: number;
  prioritySchoolPolicy: number;
  currentPhysicalEnvironment: number;
  priorityPhysicalEnvironment: number;
  currentSocialEnvironment: number;
  prioritySocialEnvironment: number;
  currentHealthSkills: number;
  priorityHealthSkills: number;
  currentCommunityLinks: number;
  priorityCommunityLinks: number;
  currentSchoolStuff: number;
  prioritySchoolsStuff: number;
}

function createData(
  id: number,
  name: string,
  date: string,
  currentOrientation: number,
  priorityOrientation: number,
  currentSchoolPolicy: number,
  prioritySchoolPolicy: number,
  currentPhysicalEnvironment: number,
  priorityPhysicalEnvironment: number,
  currentSocialEnvironment: number,
  prioritySocialEnvironment: number,
  currentHealthSkills: number,
  priorityHealthSkills: number,
  currentCommunityLinks: number,
  priorityCommunityLinks: number,
  currentSchoolStuff: number,
  prioritySchoolsStuff: number
): Data {
  return {
    id,
    name,
    date,
    currentOrientation,
    priorityOrientation,
    currentSchoolPolicy,
    prioritySchoolPolicy,
    currentPhysicalEnvironment,
    priorityPhysicalEnvironment,
    currentSocialEnvironment,
    prioritySocialEnvironment,
    currentHealthSkills,
    priorityHealthSkills,
    currentCommunityLinks,
    priorityCommunityLinks,
    currentSchoolStuff,
    prioritySchoolsStuff,
  };
}

const dataFields = [
  {
    key: "currentOrientation",
    label: "Orientation(current)",
  },
  {
    key: "priorityOrientation",
    label: "Orientation(priority)",
  },
  {
    key: "currentSchoolPolicy",
    label: "School policy(current)",
  },
  {
    key: "prioritySchoolPolicy",
    label: "School policy(priority)",
  },
  {
    key: "currentPhysicalEnvironment",
    label: "Physical environment(current)",
  },
  {
    key: "priorityPhysicalEnvironment",
    label: "Physical environment(priority)",
  },
  {
    key: "currentSocialEnvironment",
    label: "Social environment(current)",
  },
  {
    key: "prioritySocialEnvironment",
    label: "Social environment(priority)",
  },
  {
    key: "currentHealthSkills",
    label: "Health skills(current)",
  },
  {
    key: "priorityHealthSkills",
    label: "Health skills(priority)",
  },
  {
    key: "currentCommunityLinks",
    label: "Community links(current)",
  },
  {
    key: "priorityCommunityLinks",
    label: "Community links(priority)",
  },
  {
    key: "currentSchoolStuff",
    label: "School stuff(current)",
  },
  {
    key: "prioritySchoolsStuff",
    label: "Schools stuff(priority)",
  },
];

const rows = mockSchools.map((e) =>
  createData(
    e.id,
    e.schoolNameTranslation.nameTranslation.textValueKaz!,
    getRandomDate().toISOString(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator(),
    customNumberGenerator()
  )
);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  className?: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "School name",
    className: "headerName",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },

  ...dataFields.map((e) => ({
    id: e.key as any,
    numeric: true,
    disablePadding: true,
    className: "dataCell",
    label: e.label,
  })),
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={style[headCell.className as any]}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler((headCell as any).id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Assessment tool statistics
      </Typography>
    </Toolbar>
  );
}

const MainPage = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }} className={style.container}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ padding: 2 }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{formatDate(row.date)}</TableCell>
                    {dataFields.map((e) => (
                      <TableCell align="center">{(row as any)[e.key]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default MainPage;
