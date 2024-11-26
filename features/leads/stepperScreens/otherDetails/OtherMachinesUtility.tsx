import { DropDownType } from "../../../login/CDSDropDown";

export const GetPurchaseTimeline = () => {
  const respData: DropDownType[] = [
    {
      label: "1-2 Month",
      value: "1-2 Month",
    },
    {
      label: "3-6 Month",
      value: "3-6 Month",
    },
    {
      label: "1 Year",
      value: "1 Year",
    },
  ];

  return respData;
};

export const GetFinancingRequired = () => {
  const respData: DropDownType[] = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  return respData;
};
