import React, { forwardRef, useState } from 'react';
import MaterialTable, { Icons, Column } from '@material-table/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import { DepartmentsInfo } from '../../libs/interfaces';
import Link from 'next/link';
import { noAction } from '../../libs/utils';

const tableIcons: Icons<DepartmentsInfo> = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

type Props = {
  title: string;
  data: DepartmentsInfo[];
  loading: boolean;
};

const AuthDepartments = (props: Props) => {
  const { title, data, loading } = props;
  const [departmentId, setDepartmentId] = useState<string>('');

  const columns: Column<DepartmentsInfo>[] = [
    {
      title: 'Department',
      field: 'departmentName',
    },
    {
      title: 'citations Per Capita ',
      field: 'citationsPerCapita',
      render: (rowData) => (
        <span>{rowData.citationsPerCapita?.toFixed(2)}</span>
      ),
    },
    {
      title: 'H-Index Per Capita',
      field: 'hindexPerCapita',
      render: (rowData) => <span>{rowData.hindexPerCapita?.toFixed(2)}</span>,
    },
    {
      title: 'I10-Index Per Capita',
      field: 'i10hindexPerCapita',
      render: (rowData) => (
        <span>{rowData.i10hindexPerCapita?.toFixed(2)}</span>
      ),
    },
    {
      title: 'Total',
      field: 'total',
      render: (rowData) => <span>{rowData.total?.toFixed(2)}</span>,
    },
    {
      title: 'Position',
      field: 'position',
      render: (rowData) => (
        <Link
          href={'#'}
          onClick={noAction}
          className="bg-[#3265AF] text-white px-1"
        >
          {rowData.position}
        </Link>
      ),
    },
    {
      title: '-',
      field: 'view',
      render: (rowData) => (
        <Link
          href={`/dashboard/reports/departments/${rowData._id}`}
          className="btn-link btn-md"
        >
          Full Metrics
        </Link>
      ),
    },
  ];

  const options = {
    paging: true,
    pageSize: 10,
    exportButton: true,
    selection: true,
    sorting: true,
    exportAllData: true,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 100, 200, 300, 400],
    headerStyle: {
      fontWeight: 'bold',
      backgroundColor: '#01579b',
      color: '#FFF',
    },
    rowStyle: (rowData) => ({
      backgroundColor: departmentId === rowData._id ? '#EEE' : '#FFF',
    }),
  };

  return (
    <MaterialTable
      title={title}
      isLoading={loading}
      data={data}
      options={options}
      columns={columns}
      icons={tableIcons}
      onRowClick={(evt, row) => setDepartmentId(row._id)}
    />
  );
};

export default AuthDepartments;
