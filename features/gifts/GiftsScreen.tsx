import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../types";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { style } from "./GiftsScreenStyle";

type GiftScreenProps = NativeStackScreenProps<RootStackParamList, "Gifts">;

const GiftScreen: React.FC<GiftScreenProps> = (props) => {
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
  const renderButton = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          props.navigation.navigate("AddMachineDetails");
        }}
      >
        <Text style={style.btnText}>Submit</Text>
      </TouchableOpacity>
    );
  };
  const renderItems = () => {
    return (
      <>
        <View style={style.itemView}>
          <View style={style.txtView}>
            <Text style={style.keyText}>Campaign:</Text>
            <Text style={style.valueText}>Exibhition Admin</Text>
            {/* <FontAwesome5
              name="pencil-alt"
              size={16}
              color="black"
              style={style.extra}
              onPress={() => {
                props.navigation.navigate("CreateUser", { operation: "1" });
              }}
            /> */}
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Lead ID:</Text>
            <Text style={style.valueText}>+91 9999999999</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Customer:</Text>
            <Text style={style.valueText}>Caterpillar</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Created By:</Text>
            <Text style={style.valueText}>Super Admin</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>No. of Gifts:</Text>
            <TextInput
              style={style.txtInput}
              placeholder="Enter No. of Gifts"
              placeholderTextColor={"grey"}
            />
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Code:</Text>
            <TextInput
              style={style.txtInput}
              placeholder="Enter Code"
              placeholderTextColor={"grey"}
            />
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Gift Details:</Text>
            <TextInput
              style={style.txtInput}
              placeholder="Enter Gift Details"
              placeholderTextColor={"grey"}
            />
            <View style={style.extra}></View>
          </View>
          {renderButton()}
        </View>
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderSearchBar()}
      {renderItems()}
    </ImageBackground>
  );
};
export default GiftScreen;
