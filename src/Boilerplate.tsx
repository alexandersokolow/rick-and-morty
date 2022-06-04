import React from "react";
import "./Boilerplate.css";
import useCharacters from './hooks/useCharacters';

/**
 * feel free to remove this.
 */
export const Boilerplate = (): JSX.Element => {
  console.log("hi");
  const { loading, error, data } = useCharacters(1);
  console.log("loading: ", loading);
  console.log("error: ", error);
  console.log("data: ", data);

  return (<div></div>);
};
