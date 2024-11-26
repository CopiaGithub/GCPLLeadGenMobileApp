import { db } from "../../../../../utility/createDb";
import { MachineDetailsData } from "./MachineDetails";

export const createMachineDetailsTable = async () => {
  const result = await db.execAsync(
    "create table if not exists machineDetails (ID integer primary key not null, productFamilyID text, productFamilyName text, productModelID text, productModelName text, noOfMachines text);"
  );
};

//Get Data from Table
export const getMachineDetails = async (
  setMachineDetails: React.Dispatch<React.SetStateAction<MachineDetailsData[]>>
) => {
  const allRows = await db.getAllAsync("select * from machineDetails");
  try {
    if (allRows) {
      setMachineDetails(allRows as any);
      return allRows;
    }
  } catch (error) {
    console.warn(error);
  }
  return "";
};
//Insert Data into table
export const addMachineDetails = async (
  data: MachineDetailsData,
  setMachineDetails: React.Dispatch<React.SetStateAction<MachineDetailsData[]>>
) => {
  const result = db.runAsync(
    "insert into machineDetails(productFamilyID, productFamilyName, productModelID, productModelName, noOfMachines)values(?,?,?,?,?)",
    [
      data.productFamilyID,
      data.productFamilyName,
      data.productModelID,
      data.productModelName,
      data.noOfMachines,
    ]
  );
  result
    .then((val) => {
      console.warn(val);
      getMachineDetails(setMachineDetails);
    })
    .catch((err) => {
      console.error(err);
    });
};
//Delete Item
export const deleteMachine = async (
  id: number,
  setMachineDetails: React.Dispatch<React.SetStateAction<MachineDetailsData[]>>
) => {
  const result = db.getAllAsync(`delete from machineDetails where ID = ?;`, [
    id,
  ]);
  result
    .then((val) => {
      console.warn(val);
    })
    .catch((err) => {
      console.error(err);
    });
  getMachineDetails(setMachineDetails);
};

//Reset Table
export const resetMachineDetailsTable = async (
  setMachineDetails: React.Dispatch<React.SetStateAction<MachineDetailsData[]>>
) => {
  const result = db.runAsync("DELETE FROM machineDetails");
  result
    .then((val) => {
      console.warn(val);
      getMachineDetails(setMachineDetails);
    })
    .catch((err) => {
      console.error(err);
    });
};
