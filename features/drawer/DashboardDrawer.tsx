import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import CdsDrawer from "./CDSDrawer";

type DashboardDrawerProps = {};
// Replace with your drawer component

const DashboardDrawer: React.FC<DashboardDrawerProps> = () => {
  return (
    <>
      <CdsDrawer />
    </>
  );
};

export default DashboardDrawer;
