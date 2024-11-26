import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CDSDropDown from "../../../login/CDSDropDown";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type MachineDetailsProps = {};

const MachineDetails: React.FC<MachineDetailsProps> = (props) => {
  return (
    <View style={{ margin: "2%" }}>
      <Text style={style.headerText}>
        {
          "Fill the following details and add machines\n(You can add multiple machines)"
        }
      </Text>
      <View style={style.cardView}>
        {/* Product Family */}
        <Text style={style.labelText}>Product Family:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select product family"
            data={[{ label: "Select", value: "0" }]}
            onSelect={() => {}}
          />
        </View>
        {/* Product Model */}
        <Text style={style.labelText}>Product Model:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select product model"
            data={[{ label: "Select", value: "0" }]}
            onSelect={() => {}}
          />
        </View>
        {/* No. of machines */}
        <Text style={style.labelText}>No. of machines:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of machines"
          placeholderTextColor={"grey"}
        />
        <TouchableOpacity style={style.addBtnView}>
          <FontAwesome6 name="add" size={24} style={style.addBtnIcon} />
          <Text style={style.addBtnTxt}>Add to list</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MachineDetails;

const style = StyleSheet.create({
  addBtnView: {
    flexDirection: "row",
    padding: "2%",
    alignSelf: "flex-end",
    width: "40%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#5c5c5c",
  },
  addBtnIcon: {
    flex: 0.2,
    color: "white",
  },
  addBtnTxt: {
    flex: 0.8,
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  headerText: {
    margin: "2%",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    color: "#707070",
  },
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
