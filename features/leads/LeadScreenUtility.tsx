import { GetCampaignDataResp } from "../../types/campaignTypes/GetCampaignsTypes";
import {
  GetLeadResp,
  GetLeadRespMessage,
} from "../../types/leadTypes/GetLeadsTypes";

export const HandleSearchList = (
  searchText: string,
  campaignList: GetLeadResp | null,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  itemData: GetLeadRespMessage[],
  setItemData: React.Dispatch<React.SetStateAction<GetLeadRespMessage[]>>
) => {
  setSearch(searchText);

  searchText = searchText.toLowerCase();
  if (
    searchText &&
    campaignList &&
    campaignList.statusCode == 200 &&
    campaignList.message &&
    campaignList.message.length
  ) {
    const result = campaignList.message.filter((item) => {
      if (
        item.id.toString().indexOf(searchText) > -1 ||
        item.companyName.toLowerCase().indexOf(searchText) > -1 ||
        item.createdOn.toLowerCase().indexOf(searchText) > -1
      ) {
        return item;
      }
    });
    return setItemData(result);
  } else {
    return setItemData(campaignList?.message as any);
  }
};

export const GetCampaignNameByID = (
  data: GetCampaignDataResp | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message && data.message.length) {
    return data.message.find((item) => item.id == id)?.campaignName;
  } else {
    return "";
  }
};
