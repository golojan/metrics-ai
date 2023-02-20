import React, { forwardRef } from 'react';
import MaterialTable, { Icons, Column, Action } from '@material-table/core';
import { noAction } from '../../libs/utils';
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

const tableIcons: Icons<AuthUserInfo> = {
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
import { AuthUserInfo } from '../../libs/interfaces';
import Link from 'next/link';

const options = {
  paging: true,
  pageSize: 10,
  emptyRowsWhenPaging: false,
  pageSizeOptions: [10, 100, 200, 300, 400],
  headerStyle: {
    fontWeight: 'bold',
    backgroundColor: '#01579b',
    color: '#FFF'
  },
  selection: true,
  toolbar: true,
  exportButton: true,
  exportAllData: true,
  exportFileName: `metricsai-${authSchoolId()}-users`,
};


type Props = {
  title: string;
  data: AuthUserInfo[];
  loading: boolean;
};

const AuthUserPublication = (props: Props) => {
  const { title, data, loading } = props;
  const schoolId = authSchoolId();
  const columns: Column<AuthUserInfo>[] = [
    { title: 'Lecturer', field: 'firstname', render: rowData => <Link className='text-lg m-0' href="#" onClick={noAction}>{`${rowData.firstname} ${rowData.lastname}`}</Link> },
    { title: 'Publications', field: 'totalPublications' },
    { title: 'First Published', field: 'firstPublicationYear' },
    { title: 'Last Published', field: 'lastPublicationYear' },
  ];
  const detailPanel = [
    {
      tooltip: 'Show Name',
      render: rowData => {
        return (
          <div className='h-[100px] bg-red-400 rounded-4 m-2'>
            {rowData.firstname}
          </div>
        )
      },
    },
  ];

  return (
    <MaterialTable
      title={title}
      isLoading={loading}
      data={data}
      options={options}
      columns={columns}
      icons={tableIcons}
      detailPanel={detailPanel}
    />
  );
};

export default AuthUserPublication;
