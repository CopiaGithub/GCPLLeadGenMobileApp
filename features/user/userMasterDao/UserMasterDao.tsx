//Create Table If not Exists

import { db } from "../../../utility/createDb";
import { UserMaster } from "./UserMaster";

export const createUserMasterTable = async () => {
  db.execAsync(
    "create table if not exists userMaster (ID integer primary key not null, masterId text, orgId text, orgName text, sbuId text, username text, password text, email text, mobile text, address text, pincode text, roleId text, status text)"
  );
};
//Get Data from Table
export const getUserMasterData = async (
  setAddToCartData: React.Dispatch<React.SetStateAction<UserMaster[]>>
) => {
  const allRows = db.getAllAsync("select * from userMaster", [null]);

  allRows
    .then((val) => {
      setAddToCartData(val as any);
      console.warn(val);
    })
    .catch((err) => {
      console.error(err);
    });
};
//Insert Data into table
export const addUserMasterData = async (
  data: UserMaster,
  setAddToCartData: React.Dispatch<React.SetStateAction<UserMaster[]>>
) => {
  const result = db.runAsync(
    "INSERT INTO userMaster(masterId, orgId, orgName, sbuId, username, password, email, mobile, address, pincode, roleId, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",

    [
      data.masterId,
      data.orgId,
      data.orgName,
      data.sbuId,
      data.username,
      data.password,
      data.email,
      data.mobile,
      data.address,
      data.pincode,
      data.roleId,
      data.status,
    ]
  );
  result
    .then((val) => {
      console.warn(val);
      getUserMasterData(setAddToCartData);
    })
    .catch((err) => {
      console.error(err);
    });
};
//Delete Item
export const deleteUserMasterItem = async (
  ID: number,
  setAddToCartData: React.Dispatch<React.SetStateAction<UserMaster[]>>
) => {
  const result = db.runAsync(`delete from userMaster where ID = ?;`, [ID]);
  result
    .then((val) => {
      console.warn(val);
      getUserMasterData(setAddToCartData);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Reset Table
export const resetUserMasterTable = async (
  setAddToCartData: React.Dispatch<React.SetStateAction<UserMaster[]>>
) => {
  const result = db.runAsync(`delete from userMaster;`, [null]);
  result
    .then((val) => {
      console.warn(val);
      getUserMasterData(setAddToCartData);
    })
    .catch((err) => {
      console.error(err);
    });
};
