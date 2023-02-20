import React, { forwardRef } from 'react';
import MaterialTable, { Icons, Column, Action } from '@material-table/core';
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
import { noAction, shortenedMRC } from '../../libs/utils';
import { authSchoolId } from '../../libs/hocs';
import { MRCInfo } from '../../libs/interfaces';
import Link from 'next/link';
import copy from 'copy-to-clipboard';


const tableIcons: Icons<MRCInfo> = {
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

const options = {
  paging: true,
  pageSize: 10,
  emptyRowsWhenPaging: false,
  pageSizeOptions: [10, 100, 200, 300, 400],
  headerStyle: {
    fontWeight: 'bold',
    backgroundColor: '#01579b',
    color: '#FFF'
  }
};

type Props = {
  title: string;
  data: MRCInfo[];
  loading: boolean;
};

const AuthMRCTable = (props: Props) => {
  const { title, data, loading } = props;
  const schoolId = authSchoolId();

  const copyToClipBoard = async (e: React.SyntheticEvent, mrcId: string) => {
    e.preventDefault();
    await copy(mrcId);
  };

  const columns: Column<MRCInfo>[] = [
    { title: 'MRC', field: 'mrcId', render: rowData => <Link href="#" onClick={(e) => copyToClipBoard(e, rowData.mrcId)}> <strong>{shortenedMRC(rowData.mrcId)}</strong></Link> },
    { title: 'Staff ID', field: 'regId' },
    { title: 'Firstname', field: 'firstname' },
    { title: 'Lastname', field: 'lastname' },
    { title: 'Middlename', field: 'middlename' },
    { title: 'Gender', field: 'gender' },
    { title: 'Rank', field: 'rank' },
  ];
  
  return (
    <MaterialTable
      title={title}
      isLoading={loading}
      data={data}
      options={options}
      columns={columns}
      icons={tableIcons}
    />
  );
};

export default AuthMRCTable;
