import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CDSDropDown, { DropDownType } from "../../../login/CDSDropDown";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AddCustomerData } from "../leadDetails/LeadDetailsHelper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { ProductFamilyRequest } from "../../../../services/productFamilyModelRequest/ProductFamilyRequest";
import { ProductModelRequest } from "../../../../services/productFamilyModelRequest/ProductModelRequest";
import {
  GetModelFromProductModel,
  GetProductFamily,
  GetProductModel,
} from "./MachineDetailsUtility";
import { MachineDetailsData } from "./machineDetailsDao/MachineDetails";
import {
  addMachineDetails,
  createMachineDetailsTable,
  deleteMachine,
  getMachineDetails,
  resetMachineDetailsTable,
} from "./machineDetailsDao/MachineDetailsDao";
import { DisplayToast } from "../../../../utility/ToastMessage";
import { FormState } from "../../createLead/CreateLeadScreen";
import { GetSBUMaster } from "../../../dashboard/DashboardUtility";
import { SBUMasterRequest } from "../../../../services/sbuMasterRequest.tsx/SBUMasterRequest";

type MachineDetailsProps = {
  setFormData: React.Dispatch<React.SetStateAction<MachineDetailsData[]>>;
  setAllFormState: React.Dispatch<React.SetStateAction<FormState>>;
  allFormState: FormState;
  companyType: number;
};

const MachineDetails: React.FC<MachineDetailsProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  const { sbuMaster } = useSelector((state: RootState) => state.sbuMaster);

  const { ProductFamily } = useSelector(
    (state: RootState) => state.productFamily
  );
  const { ProductModel } = useSelector(
    (state: RootState) => state.productModel
  );

  const [productFamilyID, setProductFamilyID] = useState<{
    id: string;
    name: string;
  }>({ id: "0", name: "" });
  const [productModelID, setProductModelID] = useState<{
    id: string;
    name: string;
    product: string;
  }>({ id: "0", name: "", product: "" });
  const [noOfMachines, setNoOfMachines] = useState("0");
  const [sbuId, setSBUId] = useState("0");
  const [machineCartData, setMachineCartData] = useState<
    Array<MachineDetailsData>
  >(new Array<MachineDetailsData>());

  const isValid = () => {
    if (sbuId == "0" && props.companyType && props.companyType == 2) {
      DisplayToast("Please select brand");
      return false;
    } else if (
      productFamilyID.id == "0" &&
      props.companyType &&
      props.companyType == 2
    ) {
      DisplayToast("Please select product family");
      return false;
    } else if (
      productModelID.id == "0" &&
      props.companyType &&
      props.companyType == 2
    ) {
      DisplayToast("Please select product model");
      return false;
    } else if (
      noOfMachines == "0" &&
      props.companyType &&
      props.companyType == 2
    ) {
      DisplayToast("Please enter no of machines");
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (isFocused) {
      dispatch(SBUMasterRequest(null));
      createMachineDetailsTable();
      resetMachineDetailsTable(setMachineCartData);
      getMachineDetails(setMachineCartData);
    }
  }, [isFocused]);

  const handleProductFamily = (val: DropDownType) => {
    if (val) {
      setProductFamilyID({ id: val.value, name: val.label });
    }
  };
  const renderCustCartList = () => {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingRight: "30%" }}
        keyboardShouldPersistTaps="always"
      >
        {machineCartData && machineCartData.length ? (
          <>
            {machineCartData.map((item, i) => (
              <View style={style.cartCard} key={i}>
                <View style={style.cartView}>
                  <Text style={style.cartLeftTxt}>Product Family: </Text>
                  <Text style={style.cartRightTxt}>
                    {item.productFamilyName}
                  </Text>
                </View>
                <View style={style.cartView}>
                  <Text style={style.cartLeftTxt}>Product Model:</Text>
                  <Text style={style.cartRightTxt}>
                    {item.productModelName}
                  </Text>
                </View>
                <View style={style.cartView}>
                  <Text style={style.cartLeftTxt}>No. of Machines: </Text>
                  <Text style={style.cartRightTxt}>{item.noOfMachines}</Text>
                </View>
                <TouchableOpacity
                  style={style.cartBtnView}
                  onPress={() => {
                    deleteMachine(item.ID, setMachineCartData);
                  }}
                >
                  <Text style={style.cartBtnTxt}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    );
  };

  return (
    <View style={{ margin: "2%" }}>
      <Text style={style.headerText}>
        {
          "Fill the following details and add machines\n(You can add multiple machines)"
        }
      </Text>
      <View style={style.cardView}>
        {/* Select SBU */}
        <Text style={style.labelText}>
          SBU:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select Brand"
            data={GetSBUMaster(sbuMaster, +sbuId)}
            onSelect={(val) => {
              if (val) {
                setSBUId(val.value);
                dispatch(ProductFamilyRequest(+val.value));
                dispatch(ProductModelRequest(Number(val.value)));
              }
            }}
          />
        </View>
        {/* Product Family */}
        <Text style={style.labelText}>
          Product Family:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select product family"
            data={GetProductFamily(ProductFamily)}
            onSelect={(val) => {
              handleProductFamily(val);
            }}
          />
        </View>
        {/* Product Model */}
        <Text style={style.labelText}>
          Product Model:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select product model"
            data={GetProductModel(ProductModel)}
            onSelect={(val) => {
              const id = GetModelFromProductModel(
                ProductModel?.message,
                Number(val.value)
              );
              setProductModelID({
                id: val.value,
                name: val.label,
                product: id ? id.productFamilyId.toString() : "",
              });
            }}
          />
        </View>
        {/* No. of machines */}
        <Text style={style.labelText}>
          No. of machines:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of machines"
          keyboardType="numeric"
          maxLength={2}
          value={noOfMachines}
          onChangeText={(val) => {
            setNoOfMachines(val);
          }}
          placeholderTextColor={"grey"}
        />
        <TouchableOpacity
          style={style.addBtnView}
          onPress={() => {
            if (isValid()) {
              const cartData: MachineDetailsData = {
                ID: 0,
                noOfMachines: noOfMachines,
                productFamilyID: productFamilyID?.id,
                productFamilyName: productFamilyID?.name,
                productModelID: productModelID?.id,
                productModelName: productModelID?.name,
                productID: productModelID.product,
                sbuId: Number(sbuId),
              };

              addMachineDetails(cartData, setMachineCartData);
            }
          }}
        >
          <FontAwesome6 name="add" size={24} style={style.addBtnIcon} />
          <Text style={style.addBtnTxt}>Add to list</Text>
        </TouchableOpacity>
        {renderCustCartList()}
      </View>
      {!props.allFormState.formTwo ? (
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            if (isValid()) {
              props.setFormData(machineCartData);
              console.warn("Machine Details", machineCartData);

              props.setAllFormState((val) => ({
                ...val,
                formTwo: true,
              }));
            }
          }}
        >
          <Text style={style.btnText}>Save Machine Details</Text>
        </TouchableOpacity>
      ) : null}
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
  cartCard: {
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    backgroundColor: "white",
    marginVertical: "2%",
    padding: "1.5%",
    marginRight: "2%",
  },
  cartView: {
    flexDirection: "row",
    margin: "1%",
  },

  cartLeftTxt: {
    flex: 1,
    fontWeight: "500",
  },
  cartRightTxt: {
    flex: 1,
    fontWeight: "400",
  },
  cartIcon: { flex: 1 },
  cartBtnView: {
    backgroundColor: "#d90404",
    padding: "2%",
    borderRadius: 8,
    margin: "2%",
  },
  cartBtnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
});
