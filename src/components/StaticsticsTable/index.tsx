import * as React from "react";
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { formatDate } from "../../helpers/numbers";
import style from "./StatisticsTable.module.css";
import Layout from "../../components/Layout";
import { Autocomplete, TextField } from "@mui/material";
import { ReactComponent as PdfIcon } from "../../assets/images/pdf-icon.svg";
import { Link } from "react-router-dom";
import { SchoolType } from "../../types/schools";

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

const createData = (
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
) => {
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
};

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
  {
    id: "downloadPdf",
    numeric: true,
    disablePadding: true,
    className: "dataCell",
    label: "Download PDF",
  },
];

interface EnhancedTableProps {
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
            className={style[headCell.className as string]}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
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

interface StatisticsTableProps {
  title: string;
  data: SchoolType[];
  isSingleSchool?: boolean;
}

const StatisticsTable = (props: StatisticsTableProps) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selectedSchools, setSelectedSchools] = React.useState<number[]>([]);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRows = () => {
    let rows = props.data.map((e) =>
      createData(
        e.id,
        e.name,
        e.date,
        e.currentOrientation,
        e.priorityOrientation,
        e.currentSchoolPolicy,
        e.prioritySchoolPolicy,
        e.currentPhysicalEnvironment,
        e.priorityPhysicalEnvironment,
        e.currentSocialEnvironment,
        e.prioritySocialEnvironment,
        e.currentHealthSkills,
        e.priorityHealthSkills,
        e.currentCommunityLinks,
        e.priorityCommunityLinks,
        e.currentSchoolStuff,
        e.prioritySchoolsStuff
      )
    );
    if (selectedSchools.length > 0) {
      rows = rows.filter((e) => selectedSchools.includes(e.id));
    }
    return rows;
  };

  const rows = getRows();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    const sortedSchools = stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return sortedSchools;
  }, [order, orderBy, page, rowsPerPage, selectedSchools]);

  return (
    <Layout>
      <Box sx={{ width: "100%" }} className={style.container}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              display: "flex",
              alignItems: "start",
              padding: "40px",
              gap: "25px",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {props.isSingleSchool && (
                <Link to="/" className={style.backLink}>
                  <ArrowBackIosIcon /> <div> Back to all schools</div>
                </Link>
              )}
              {props.title}
            </Typography>
            <Box>
              {!props.isSingleSchool && (
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  options={props.data.map((e) => ({
                    label: (e as any).name,
                    id: e.id,
                  }))}
                  multiple
                  onChange={(_, values) =>
                    setSelectedSchools(values.map((e) => e.id))
                  }
                  sx={{ width: 300 }}
                  className={style.schoolsInput}
                  renderInput={(params) => (
                    <TextField {...params} label="Schools" />
                  )}
                />
              )}
            </Box>
          </Toolbar>
          <TableContainer sx={{ padding: 2 }}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell className={style.nameCell}>
                        <Link to={`/school/${row.id}`}>{row.name}</Link>
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.date)}
                      </TableCell>
                      {dataFields.map((e) => (
                        <TableCell align="center">
                          {(row as any)[e.key]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <PdfIcon className={style.pdfIcon} />
                      </TableCell>
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
    </Layout>
  );
};

export default StatisticsTable;
