import React from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import {
  styled,
  withStyles,
  createStyles,
  Theme,
  makeStyles,
} from "@mui/material/styles";
import { users } from "../../utils/mockData";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import styles from "./styles";

const columns: MUIDataTableColumn[] = [
  {
    name: "personalId",
    label: "Personal Id",
    options: { filter: true, sort: false },
  },
  { name: "name", label: "Name", options: { filter: true, sort: true } },
  { name: "surname", label: "Surname", options: { filter: true, sort: true } },
  { name: "gender", label: "Gender", options: { filter: true, sort: true } },
  {
    name: "birthDate",
    label: "Birth Date",
    options: {
      customBodyRender: (value: Date) => {
        return value.toLocaleDateString();
      },
      filter: false,
      sort: true,
    },
  },
  {
    name: "birthPlace",
    label: "Birth Place",
    options: { filter: true, sort: true },
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    options: { filter: false, sort: false },
  },
  {
    name: "address",
    label: "Address",
    options: { filter: true, sort: false },
  },
  {
    name: "",
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <button
            onClick={() =>
              window.alert(
                `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
              )
            }
          >
            <ModeEditIcon />
          </button>
        );
      },
    },
  },
];

const DataTable = () => {
  return (
    <MUIDataTable
      title={""}
      data={users}
      columns={columns}
      options={{
        filterType: "checkbox",
        textLabels: {
          pagination: {
            rowsPerPage: "მწკრივების რაოდენობა გვერდზე",
          },
        },
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20, 50],
        selectableRows: "none",
      }}
    />
  );
};

export default DataTable;
