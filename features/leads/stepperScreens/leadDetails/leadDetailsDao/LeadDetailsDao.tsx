import { db } from "../../../../../utility/createDb";
import { DisplayToast } from "../../../../../utility/ToastMessage";
import { CustomerDetails } from "../LeadDetailsHelper";

export const createCustomerDetailsTable = async () => {
  const result = await db.execAsync(
    "create table if not exists customerDetails (ID integer primary key not null, customerName text, mobileNumber text, alternativeMobileNumber text, email text, sbuId text);"
  );
};

//Get Data from Table
export const getCustomerDetails = async (
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails[]>>
) => {
  const allRows = await db.getAllAsync("select * from customerDetails");
  try {
    if (allRows) {
      setCustomerDetails(allRows as any);
      return allRows;
    }
  } catch (error) {}
  return "";
};
//Insert Data into table
export const addCustomerDetails = async (
  data: CustomerDetails,
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails[]>>
) => {
  const result = db.runAsync(
    "insert into customerDetails(customerName, mobileNumber, alternativeMobileNumber, email, sbuId)values(?,?,?,?,?)",
    [
      data.customerName,
      data.mobileNumber,
      data.alternativeMobileNumber,
      data.email,
      data.sbuId,
    ]
  );
  result
    .then((val) => {
      getCustomerDetails(setCustomerDetails);
    })
    .catch((err) => {});
};
//Delete Item
export const deleteCustomer = async (
  id: number,
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails[]>>
) => {
  const result = db.getAllAsync(`delete from customerDetails where ID = ?;`, [
    id,
  ]);
  result
    .then((val) => {
      console.warn(val);
    })
    .catch((err) => {
      console.error(err);
    });
  getCustomerDetails(setCustomerDetails);
};

//Reset Table
export const resetCustomerDetailsTable = async (
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails[]>>
) => {
  const result = db.runAsync("DELETE FROM customerDetails");
  result
    .then((val) => {
      console.warn(val);
      getCustomerDetails(setCustomerDetails);
    })
    .catch((err) => {
      console.error(err);
    });
};
