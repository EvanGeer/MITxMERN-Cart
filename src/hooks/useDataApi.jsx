import React from 'react';
import axios from "axios";
import { dataFetchReducer } from "./dataFetchReducer";

export const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);
  const [forceUpdate, setForceUpdate] = useState(false);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  console.log(`useDataApi called`);

  const doFetch = () => {
    setForceUpdate(true);
  }

  useEffect(() => {
    doFetch();
  }, [url]);

  useEffect(() => {
    console.log("useEffect Called");
    if(!forceUpdate) return;

    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        console.log("FETCH FROM URl");
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          setForceUpdate(false);
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
          setForceUpdate(false);
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [forceUpdate]);

  return [state, setUrl, doFetch];
};
