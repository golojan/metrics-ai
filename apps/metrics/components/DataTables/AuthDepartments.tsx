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
import { DepartmentsInfo, DepartmentsInfo } from '../../libs/interfaces';

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
      title: 'Citations',
      field: 'citations',
    },
    {
      title: 'H-Index',
      field: 'hindex',
    },
    {
      title: 'I10-Index',
      field: 'i10hindex',
    },
    {
      title: 'Total',
      field: 'total',
    },
    {
      title: 'Position',
      field: 'position',
    },
  ];

  const options = {
    paging: true,
    pageSize: 10,
    exportButton: true,
    selection: false,
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
