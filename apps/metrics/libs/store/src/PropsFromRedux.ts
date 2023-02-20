import { connect, ConnectedProps } from 'react-redux';
import { RootState, Dispatch } from './store';

const mapState = (state: RootState) => ({});
const mapDispatch = (dispatch: Dispatch) => ({});

export const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;
