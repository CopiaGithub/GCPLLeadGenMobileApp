import { View, Text, StyleSheet, TextInput } from "react-native";

type OtherDetailsProps = {};

const OtherDetails: React.FC<OtherDetailsProps> = (props) => {
  return (
    <View style={{ margin: "2%" }}>
      <View style={style.cardView}>
        {/* Purchase Timeline */}
        <Text style={style.labelText}>Purchase Timeline:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Purchase Timeline"
          placeholderTextColor={"grey"}
        />
        {/* Financing Required? */}
        <Text style={style.labelText}>Financing Required?:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Financing Required?"
          placeholderTextColor={"grey"}
        />
        {/* No. of machines */}
        <Text style={style.labelText}>No. of machines:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of machines"
          placeholderTextColor={"grey"}
        />
        {/* No. of people accompanied */}
        <Text style={style.labelText}>No. of people accompanied:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of people accompanied"
          placeholderTextColor={"grey"}
        />
        {/* No. of gifts needed */}
        <Text style={style.labelText}>No. of gifts needed:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of gifts needed"
          placeholderTextColor={"grey"}
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
