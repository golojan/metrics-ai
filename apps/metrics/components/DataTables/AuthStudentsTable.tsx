import React, { forwardRef, useState } from 'react';
import MaterialTable, {
  Icons,
  Column,
  Action,
  Options,
} from '@material-table/core';
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
  PanoramaFishEye,
} from '@material-ui/icons';

const tableIcons: Icons<GSIRanking> = {
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

import { authSchoolId } from '../../libs/hocs';
import {
  DepartmentsInfo,
  FacultiesInfo,
  GSIRanking,
} from '../../libs/interfaces';
import Image from 'next/image';
import useSWR from 'swr';

import {
  loadDepartments,
  citationByWeight,
  citationsPerCapita,
  hindexPerCapita,
  i10hindexPerCapita,
} from '../../libs/utils';
import AuthLecturerProfileRow from './AuthLecturerProfileRow';

type Props = {
  title: string;
  data: GSIRanking[];
  loading: boolean;
};

const AuthStudentsTable = (props: Props) => {
  const schoolId = authSchoolId();
  const apiUri = process.env.NEXT_PUBLIC_API_URI;

  const { title, data, loading } = props;
  const [lecturerId, setLecturerId] = useState<string>('');

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
      backgroundColor: lecturerId === rowData._id ? '#EEE' : '#FFF',
    }),
  };

  const columns: Column<GSIRanking>[] = [
    {
      field: 'picture',
      title: '-',
      render: (rowData) => (
        <Image
          alt={`${rowData.fullname}`}
          src={rowData.picture}
          width={40}
          height={40}
          className="rounded-[50%]"
        />
      ),
    },
    { title: 'ID', field: '_id', hidden: true },
    { title: 'Name', field: 'fullname' },
    {
      title: 'Citations',
      field: 'citations',
      render: (rowData) => <span>{rowData.citationsPerCapita.toFixed(2)}</span>,
    },
    {
      title: 'H-Index',
      field: 'hindex',
      render: (rowData) => <span>{rowData.hindexPerCapita.toFixed(2)}</span>,
    },
    {
      title: 'i10-Index',
      field: 'i10hindex',
      render: (rowData) => <span>{rowData.i10hindexPerCapita.toFixed(2)}</span>,
    },
    {
      title: 'Total',
      field: 'total',
      render: (rowData) => <span>{rowData.total.toFixed(2)}</span>,
    },
  ];

  const detailPanel = (row) => {
    return <AuthLecturerProfileRow row={row} />;
  };

  return (
    <MaterialTable
      title={title}
      isLoading={loading}
      data={data}
      options={options}
      columns={columns}
      icons={tableIcons}
      detailPanel={detailPanel}
      onRowClick={(evt, row) => setLecturerId(row._id)}
    />
  );
};

export default AuthStudentsTable;
