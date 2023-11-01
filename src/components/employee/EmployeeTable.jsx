import React from "react";
import BasicTable from "../ui/BasicTable";

const EmployeeTable = ({ data, columns }) => {
  return <BasicTable data={data} columns={columns} />;
};

export default EmployeeTable;
