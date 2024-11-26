import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CDSDropDown from "../../../login/CDSDropDown";
import {
  GetFinancingRequired,
  GetPurchaseTimeline,
} from "./OtherMachinesUtility";

type OtherDetailsProps = {};

const OtherDetails: React.FC<OtherDetailsProps> = (props) => {
  const [purchase, setPurchase] = useState("");
  const [financing, setFinancing] = useState(false);
  const [noOfMachines, setNoOfMachines] = useState(0);
  const [noOfPeople, setNoOfPeople] = useState(0);
  const [noOfGifts, setNoOfGifts] = useState(0);
  return (
    <View style={{ margin: "2%" }}>
      <View style={style.cardView}>
        {/* Purchase Timeline */}
        <Text style={style.labelText}>Purchase Timeline:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={GetPurchaseTimeline()}
            onSelect={(val) => {
              setPurchase(val.value);
            }}
            placeholder="Select timeline"
          />
        </View>
        {/* Financing Required? */}
        <Text style={style.labelText}>Financing Required?:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={GetFinancingRequired()}
            onSelect={(val) => {
              setFinancing(val.value == "true" ? true : false);
            }}
            placeholder="Select one option"
          />
        </View>
        {/* No. of machines */}
        <Text style={style.labelText}>No. of machines:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of machines"
          placeholderTextColor={"grey"}
          keyboardType="numeric"
          value={noOfMachines.toString()}
          maxLength={2}
          onChangeText={(val) => {
            setNoOfMachines(Number(val));
          }}
        />
        {/* No. of people accompanied */}
        <Text style={style.labelText}>No. of people accompanied:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of people accompanied"
          placeholderTextColor={"grey"}
          keyboardType="numeric"
          value={noOfPeople.toString()}
          maxLength={2}
          onChangeText={(val) => {
            setNoOfPeople(Number(val));
          }}
        />
        {/* No. of gifts needed */}
        <Text style={style.labelText}>No. of gifts needed:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of gifts needed"
          placeholderTextColor={"grey"}
          keyboardType="numeric"
          value={noOfGifts.toString()}
          maxLength={1}
          onChangeText={(val) => {
            setNoOfGifts(Number(val));
          }}
        />
      </View>
    </View>
  );
};
export default OtherDetails;

const style = StyleSheet.create({
  formView: {
    marginHorizontal: "3%",
    marginVertical: "1%",
    padding: "1%",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
  },
  headerView: {
    flexDirection: "row",
  },
  headerTxt: {
    flex: 1.8,
    fontWeight: "500",
    fontSize: 16,
  },
  headerIcon: {
    flex: 0.2,
  },
  cardView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#d6d4d4",
    borderBottomColor: "#d6d4d4",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 6,
    backgroundColor: "white",
    padding: "2%",
  },
  qrText: {
    flex: 1,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  qrIcon: {
    flex: 1,
  },
  acvView: {
    flexDirection: "row",
    marginVertical: "1%",
  },
  avcText: {
    flex: 0.8,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  acvIcon: {
    flex: 1.2,
  },
  acvTxtInput: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    paddingHorizontal: "2%",
  },
  labelText: {
    fontSize: 15,
    fontWeight: "500",
  },
  inputTxt: {
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    marginVertical: "2%",
    padding: "3%",
  },
  btn: {
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 8,
    marginVertical: "2%",
    marginHorizontal: "4%",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
});
