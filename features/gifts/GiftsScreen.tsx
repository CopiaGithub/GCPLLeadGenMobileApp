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
  const submitGifts = useFormik({
    initialValues: formHelper.formikInitialValue,
    onSubmit: async (values) => {},
  });
  useEffect(() => {
    if (isFocused) {
      dispatch(GetLeadDataRequest(""));
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
        formData: giftStatus
          ? leadDetails.message.filter((item) => item.noOfGifts)
          : leadDetails.message.filter((item) => item.noOfGifts == null),
      });
    } else {
      submitGifts.setValues({
        formData: [],
      });
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
            setLoaderState(resp ? false : true);
            if (resp && resp.statusCode == 200) {
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
        {leadDetails &&
        leadDetails.statusCode == 200 &&
        leadDetails.message.length &&
        submitGifts.values.formData.length ? (
          <>
            {submitGifts.values.formData.map((item, i) => (
              <View style={style.itemView} key={i}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Campaign:</Text>
                  <Text style={style.valueText}>{item.campaignId}</Text>

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
                {/* <View style={style.txtView}>
                  <Text style={style.keyText}>Created By:</Text>
                  <Text style={style.valueText}>{item.createdBy}</Text>
                  <View style={style.extra}></View>
                </View> */}
                <View style={style.txtView}>
                  <Text style={style.keyText}>No. of Gifts:</Text>
                  {item.noOfGifts ? (
                    <Text style={style.valueText}>{item.noOfGifts}</Text>
                  ) : (
                    <TextInput
                      style={style.txtInput}
                      placeholder="Enter No. of Gifts"
                      placeholderTextColor={"grey"}
                      keyboardType="numeric"
                      maxLength={2}
                      editable={leadDetails.message[i].noOfGifts ? false : true}
                      value={item.noOfGifts as any}
                      onChangeText={(val) => {
                        handleNoOfGifts(val, i);
                      }}
                    />
                  )}
                  <View style={style.extra}></View>
                </View>

                <View style={style.txtView}>
                  <Text style={style.keyText}>Gift Details:</Text>
                  {item.giftDetails ? (
                    <Text style={style.valueText}>{item.giftDetails}</Text>
                  ) : (
                    <TextInput
                      style={style.txtInput}
                      placeholder="Enter Gift Details"
                      editable={leadDetails.message[i].noOfGifts ? false : true}
                      placeholderTextColor={"grey"}
                      value={item.giftDetails as any}
                      onChangeText={(val) => {
                        handleGiftDetails(val, i);
                      }}
                    />
                  )}
                  <View style={style.extra}></View>
                </View>
                {item.giftDetails ? null : renderButton(i)}
              </View>
            ))}
          </>
        ) : leadDetails &&
          leadDetails.statusCode == 200 &&
          !leadDetails.message ? (
          <View>
            <Text>No data found</Text>
          </View>
        ) : leadDetails && leadDetails.statusCode != 200 ? (
          <View>
            <Text>{`${leadDetails.message}`}</Text>
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
              dispatch(GetLeadDataRequest(""));
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
