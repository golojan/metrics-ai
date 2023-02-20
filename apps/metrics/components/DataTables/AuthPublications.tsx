import React, { forwardRef, useState } from 'react';
import Link from 'next/link';
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
import { noAction, shortenedMRC } from '../../libs/utils';
import { authSchoolId } from '../../libs/hocs';
import { MRCInfo, PublicationInfo } from '../../libs/interfaces';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAreaChart,
  faLink,
  faLinkSlash,
} from '@fortawesome/free-solid-svg-icons';

const tableIcons: Icons<PublicationInfo> = {
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
  data: PublicationInfo[];
  loading: boolean;
};

const AuthPublications = (props: Props) => {
  const [pubId, setPubId] = useState<string>('');

  const { title, data, loading } = props;
  // {
  //   title: String,
  //   link: String,
  //   citation_id: String,
  //   authors: String,
  //   cited_by: {
  //     value: Number,
  //     link: String,
  //     serpapi_link: String,
  //     cites_id: String,
  //   },
  //   year: String,
  // },

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
      backgroundColor: pubId === rowData._id ? '#EEE' : '#FFF',
    }),
  };

  const columns: Column<PublicationInfo>[] = [
    {
      title: 'Scholar',
      field: 'serpi',
      render: (rowData) => (
        <Link className="w-full" href={`${rowData.link}`} target="_blank">
          <FontAwesomeIcon className="text-secondary" size="3x" icon={faLink} />
        </Link>
      ),
    },
    {
      title: 'Title',
      field: 'title',
      render: (rowData) => <div className="w-full">{rowData.title}</div>,
    },
    {
      title: 'Citations',
      field: 'citations',
      render: (rowData) => <strong>{rowData.cited_by.value}</strong>,
    },
    { title: 'Authors/Collaborators', field: 'authors' },
    { title: 'Published', field: 'year' },
    {
      title: 'Links',
      field: 'links',
      render: (rowData) => (
        <>
          <Link
            className="w-full text-success mx-2"
            href={`${rowData.cited_by.link}`}
            target="_blank"
          >
            <FontAwesomeIcon size="2x" icon={faLinkSlash} />
          </Link>
        </>
      ),
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
      onRowClick={(evt, row) => setPubId(row._id)}
    />
  );
};

export default AuthPublications;
