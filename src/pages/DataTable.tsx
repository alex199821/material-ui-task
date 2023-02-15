import React from "react";

import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableData,
} from "mui-datatables";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import OpenFormButton from "../components/OpenFormButton";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store";
// import styles from "./styles";
import { timestampToDate } from "../utils/helperFunctions";


import {
  Checkbox,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
  ListItemText
} from "@mui/material";

const DataTable = () => {
  const navigate = useNavigate();

  const { usersData } = useSelector((state: RootState) => state.usersData);

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
        //Birthdate Filtering needs to be added
        filter: true,
        filterType: 'custom',
        filterOptions: {
          logic: (location, filters, row) => {
            if (filters.length) return !filters.includes(location);
            return false;
          },
          display: (filterList, onChange, index, column) => {
            const optionValues = ['Minneapolis', 'New York', 'Seattle'];
            return (
              <FormControl>
                <InputLabel htmlFor='select-multiple-chip'>
                  Location
                </InputLabel>
                <Select
                  multiple
                  value={filterList[index]}
                  renderValue={selected => selected.join(', ')}
                  onChange={()=>console.log('filter')}
                >
                  {optionValues.map(item => (
                    <MenuItem key={item} value={item}>
                      <Checkbox
                        color='primary'
                        checked={filterList[index].indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
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
