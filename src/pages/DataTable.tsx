//Libraries
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store";
//Components
import OpenFormButton from "../components/OpenFormButton";
//MUI Components
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableData,
} from "mui-datatables";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
//Utils
import {
  timestampToDate,
  dateToTimestamp,
  timestampStringtoDate,
} from "../utils/helperFunctions";

const DataTable = () => {
  const navigate = useNavigate();
  const { usersData } = useSelector((state: RootState) => state.usersData);

  //Navigates to user form and passes id of row to be edited as props
  const handleEdit = (dataTableProps: MUIDataTableData): void => {
    let id = dataTableProps["0" as keyof typeof dataTableProps];
    navigate("/userform", { state: { id: id } });
  };

  const handleNewRow = (): void => {
    navigate("/userform");
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "personalId",
      label: "Personal Id",
      options: {
        filter: true,
        sort: false,
        filterType: "textField",
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "surname",
      label: "Surname",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: true,
        filterType: "dropdown",
      },
    },
    {
      name: "birthDate",
      label: "Birth Date",
      options: {
        customBodyRender: (value: number): string => {
          return timestampToDate(value).toLocaleDateString("en-US");
        },
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          //Option which renders filters and their data to Datatable 
          render: (birthDateFilter) => {
            if (birthDateFilter[0] && birthDateFilter[1]) {
              return [
                `Earliest Birth Date: ${timestampStringtoDate(
                  birthDateFilter[0]
                )}`,
                `Latest Birth Date: ${timestampStringtoDate(
                  birthDateFilter[1]
                )}`,
              ];
            } else if (birthDateFilter[0]) {
              return `Earliest Birth Date: ${timestampStringtoDate(
                birthDateFilter[0]
              )}`;
            } else if (birthDateFilter[1]) {
              return `Latest Birth Date: ${timestampStringtoDate(
                birthDateFilter[1]
              )}`;
            }
            return false;
          },
        },
        filterOptions: {
          fullWidth: true,

          logic(birthDate, filters) {
            //Function to compare Birthdates of Users to provided filters and filter accordingly
            let birthDateTimestamp = dateToTimestamp(
              new Date(Date.parse(birthDate))
            );
            if (filters[0] && filters[1]) {
              return (
                birthDateTimestamp < filters[0] ||
                birthDateTimestamp > filters[1]
              );
            } else if (filters[0]) {
              return birthDateTimestamp < filters[0];
            } else if (filters[1]) {
              return birthDateTimestamp > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => {
            //Datepicker Components for filtering Datatable according to Date filters
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start date"
                    inputFormat="dd/MM/yyyy"
                    value={timestampStringtoDate(filterList[index][0])}
                    onChange={(event: Date | null) => {
                      if (event instanceof Date)
                        filterList[index][0] =
                          dateToTimestamp(event).toString();
                      onChange(filterList[index], index, column);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "48%" }}
                        {...params}
                        error={false}
                      />
                    )}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End date"
                    inputFormat="dd/MM/yyyy"
                    value={timestampStringtoDate(filterList[index][1])}
                    onChange={(event: Date | null) => {
                      if (event instanceof Date)
                        filterList[index][1] =
                          dateToTimestamp(event).toString();
                      onChange(filterList[index], index, column);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "48%" }}
                        {...params}
                        error={false}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            );
          },
        },
        sort: true,
      },
    },
    {
      name: "birthPlace",
      label: "Birth Place",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      options: {
        filter: false,
        sort: false,
        filterType: "textField",
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
        filterType: "textField",
      },
    },
    // Below is edit button which redirects user to form and provides as props row id
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <OpenFormButton
              onClick={() =>
                handleEdit(tableMeta.tableData[tableMeta.rowIndex])
              }
              icon={<ModeEditIcon />}
            />
          );
        },
      },
    },
  ];

  return (
    <>
      <MUIDataTable
        title={""}
        data={usersData}
        columns={columns}
        options={{
          responsive: "standard",
          textLabels: {
            pagination: {
              rowsPerPage: "მწკრივების რაოდენობა გვერდზე",
            },
          },
          rowsPerPage: 10,
          rowsPerPageOptions: [10, 20, 50],
          selectableRows: "none",
          rowHover: true,
          viewColumns: true,
          draggableColumns: { enabled: true, transitionTime: 100 },
          customToolbar: () => {
            return <OpenFormButton onClick={handleNewRow} icon={<AddIcon />} />;
          },
        }}
      />
    </>
  );
};

export default DataTable;
