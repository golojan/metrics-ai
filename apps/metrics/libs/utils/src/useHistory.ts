import React, { useState, useEffect } from 'react';
import { IHistory } from '../../interfaces';

interface ReturnedData {
  history?: IHistory;
  error?: Error | any;
  loading?: boolean;
}

const useHistory = (domain: string): ReturnedData => {
  const [state, setState] = useState<ReturnedData>({});

  useEffect(() => {
    setState({ ...state, loading: true });
    if (!domain) return;
    const getHistory = async () => {
      try {
        const result = await fetch(`/api/schools/${domain}/history`);
        const { status, data } = await result.json();
        if (!status) return;
        setState({
          ...state,
          history: data,
        });
      } catch (error) {
        setState({ ...state, error: error });
      } finally {
        setState({ ...state, loading: false });
      }
    };
    getHistory();
  }, [state, domain]);

  return state;
};

export default useHistory;
