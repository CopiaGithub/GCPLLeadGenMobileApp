import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../types";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { style } from "./GiftsScreenStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { GetLeadDataRequest } from "../../services/leadsServices/GetLeadDataRequest";
import { useEffect, useState } from "react";
import CDSLoader from "../../component/CDSLoader";
import { DisplayToast } from "../../utility/ToastMessage";
import { GetLeadRespMessage } from "../../types/leadTypes/GetLeadsTypes";
import GiftsHelper from "./GiftScreenHelper";
import { useFormik } from "formik";
import { EnterGiftDetails } from "../../services/giftsRequest/EnterGiftDetailsRequest";
import { EnterGiftDetailsReq } from "../../types/giftTypes/EnterGiftDetailsTypes";
import CDSAlertBox from "../../component/CDSAlertBox";
import CDSDropDown from "../login/CDSDropDown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";
import { GetCampaignNameByID } from "../leads/LeadScreenUtility";

type GiftScreenProps = NativeStackScreenProps<RootStackParamList, "Gifts">;

const GiftScreen: React.FC<GiftScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { leadDetails } = useSelector((state: RootState) => state.leadData);
  const formHelper = new GiftsHelper();
  const [noOfGifts, setNoOfGifts] = useState(0);
  const [giftDetails, setGiftDetails] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [leadData, setLeadData] = useState<Array<GetLeadRespMessage>>(
    new Array<GetLeadRespMessage>()
  );
  const [giftStatus, setGiftStatus] = useState(false);
  const [sbuID, setSBUID] = useState(0);
  const [userId, setUserId] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setSBUID(user.message.user.sbuId);
        setUserId(user.message.user.id);
        setRoleId(user.message.user.roleId);
      }
    });
  }, [isFocused, sbuID]);
  const submitGifts = useFormik({
    initialValues: formHelper.formikInitialValue,
    onSubmit: async (values) => {},
  });
  useEffect(() => {
    if (isFocused) {
      dispatch(
        GetLeadDataRequest({
          subId: roleId && roleId == 1 ? 0 : sbuID,
          userId: (roleId && roleId == 1) || roleId == 4 ? 0 : userId,
        })
      );
      dispatch(GetCampaignDataRequest({}));
    }
  }, [isFocused]);

  useEffect(() => {
    if (
      isFocused &&
      leadDetails &&
      leadDetails.statusCode == 200 &&
      leadDetails.message.length
    ) {
      submitGifts.setValues({
        formData: leadDetails.message,
      });
      setLeadData(leadDetails.message);
    } else {
      submitGifts.setValues({
        formData: [],
      });
      setLeadData([]);
    }
  }, [isFocused, leadDetails?.statusCode, giftStatus]);

  const isValid = (data: GetLeadRespMessage) => {
    if (!data.noOfGifts) {
      DisplayToast("No of gifts cannot be 0");
      return false;
    } else if (!data.giftDetails) {
      DisplayToast("Please enter gift details");
      return false;
    } else {
      return true;
    }
  };

  const renderSearchBar = () => {
    return (
      <View style={style.searchView}>
        <Ionicons
          name="search-sharp"
          size={24}
          color="black"
          style={style.searchIcon}
        />
        <TextInput
          style={style.searchTxtInput}
          placeholder="Search Gifts"
          placeholderTextColor={"grey"}
        />
      </View>
    );
  };
  const renderButton = (i: number) => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={async () => {
          const data = submitGifts.values.formData[i];
          if (isValid(data)) {
            setLoaderState(true);

            const payload: EnterGiftDetailsReq = {
              giftDetails: data.giftDetails,
              noOfGifts: data.noOfGifts,
            };
            const resp = await EnterGiftDetails(payload, +data.id);
            console.warn(resp);

            setLoaderState(resp ? false : true);
            if (resp && resp.statusCode == 201) {
              setAlertState(true);
            } else {
              DisplayToast(`${resp.message}`);
            }
          }
        }}
      >
        <Text style={style.btnText}>Submit</Text>
      </TouchableOpacity>
    );
  };
  const handleNoOfGifts = (val: string, i: number) => {
    submitGifts.setFieldValue(`formData[${i}].noOfGifts`, val);
  };
  const handleGiftDetails = (val: string, i: number) => {
    submitGifts.setFieldValue("formData[" + i + "].giftDetails", val);
  };

  const renderItems = () => {
    return (
      <>
        {submitGifts.values.formData.length ? (
          <>
            {submitGifts.values.formData
              .filter((item, i) =>
                !giftStatus ? item.noOfGifts == null : item.noOfGifts
              )
              .map((item, i) => (
                <View style={style.itemView} key={i}>
                  <View style={style.txtView}>
                    <Text style={style.keyText}>Campaign:</Text>
                    <Text style={style.valueText}>
                      {GetCampaignNameByID(getCampaignData, +item.campaignId) ??
                        ""}
                    </Text>

                    <View style={style.extra}></View>
                  </View>
                  <View style={style.txtView}>
                    <Text style={style.keyText}>Lead ID:</Text>
                    <Text style={style.valueText}>{item.id}</Text>
                    <View style={style.extra}></View>
                  </View>
                  <View style={style.txtView}>
                    <Text style={style.keyText}>Customer:</Text>
                    <Text style={style.valueText}>{item.companyName}</Text>
                    <View style={style.extra}></View>
                  </View>

                  <View style={style.txtView}>
                    <Text style={style.keyText}>No. of Gifts:</Text>
                    {item.noOfGifts == null ? (
                      <TextInput
                        style={style.txtInput}
                        placeholder="Enter No. of Gifts"
                        placeholderTextColor={"grey"}
                        keyboardType="numeric"
                        maxLength={2}
                        value={item.noOfGifts as any}
                        onChangeText={(val) => {
                          handleNoOfGifts(val, i);
                        }}
                      />
                    ) : (
                      <Text style={style.valueText}>{item.noOfGifts}</Text>
                    )}
                    <View style={style.extra}></View>
                  </View>

                  <View style={style.txtView}>
                    <Text style={style.keyText}>Gift Details:</Text>
                    {item.giftDetails != null ? (
                      <Text style={style.valueText}>{item.giftDetails}</Text>
                    ) : (
                      <TextInput
                        style={style.txtInput}
                        placeholder="Enter Gift Details"
                        placeholderTextColor={"grey"}
                        value={item.giftDetails as any}
                        onChangeText={(val) => {
                          handleGiftDetails(val, i);
                        }}
                      />
                    )}
                    <View style={style.extra}></View>
                  </View>
                  {item.giftDetails && item.noOfGifts ? null : renderButton(i)}
                </View>
              ))}
          </>
        ) : !submitGifts.values.formData.length ? (
          <View>
            <Text style={{ textAlign: "center", margin: "10%", fontSize: 20 }}>
              No data found
            </Text>
          </View>
        ) : (
          <CDSLoader />
        )}
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {loaderState ? (
        <CDSLoader />
      ) : (
        <>
          <CDSAlertBox
            alertVisibility={alertState}
            alertTitle="Gifts!"
            alertDesc="Gift data updated successfully!"
            showNegativeBtn={false}
            positiveBtnTxt="Cancel"
            negativeBtnTxt="Ok"
            onNegativeClick={() => {
              setAlertState(false);
              dispatch(
                GetLeadDataRequest({
                  subId: roleId && roleId == 1 ? 0 : sbuID,
                  userId: (roleId && roleId == 1) || roleId == 4 ? 0 : userId,
                })
              );
            }}
            onPositiveClick={() => {
              setAlertState(false);
            }}
          />
          {renderSearchBar()}
          <View style={{ marginHorizontal: "4%" }}>
            <CDSDropDown
              data={[
                { label: "Delivered Gifts", value: "1" },
                { label: "Undelivered Gifts", value: "0" },
              ]}
              placeholder="Undelivered Gifts"
              onSelect={(val) => {
                setGiftStatus(val.value == "1" ? true : false);
              }}
            />
          </View>
          <ScrollView>{renderItems()}</ScrollView>
        </>
      )}
    </ImageBackground>
  );
};
export default GiftScreen;
