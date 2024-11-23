import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Overlay } from "react-native-elements";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

type CDSTestProps = {};

const CDSTest: React.FC<CDSTestProps> = (props) => {
  type PickerValues = { id: number; title: string };
  const [pickerState, setPickerState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentValues, setCurrentValues] = useState<PickerValues>({
    id: 0,
    title: "Select",
  });
  const ITEM_HEIGHT = 100;

  const data = [
    { id: 1, name: "Siddhesh Chaure" },
    { id: 2, name: "Aarav Mehta" },
    { id: 3, name: "Ishita Sharma" },
    { id: 4, name: "Rohan Gupta" },
    { id: 5, name: "Ananya Deshmukh" },
    { id: 6, name: "Kabir Singh" },
    { id: 7, name: "Meera Patel" },
    { id: 8, name: "Vivaan Rao" },
    { id: 9, name: "Priya Jain" },
    { id: 10, name: "Aryan Verma" },
    { id: 11, name: "Simran Kaur" },
    { id: 12, name: "Aditya Joshi" },
    { id: 13, name: "Diya Shah" },
    { id: 14, name: "Kunal Das" },
    { id: 15, name: "Nidhi Kulkarni" },
    { id: 16, name: "Arjun Singh" },
    { id: 17, name: "Tanvi Pandey" },
    { id: 18, name: "Harsh Vardhan" },
    { id: 19, name: "Sneha Roy" },
    { id: 20, name: "Rahul Mishra" },
  ];
  const renderPickerItems = () => {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={pickerState}
            onRequestClose={() => {
              setPickerState(false);
            }}
          >
            <View
              style={{
                height: "40%",
              }}
            >
              <ScrollView contentContainerStyle={{}}>
                <View style={{ height: "20%" }}>
                  {data.map((item, i) => (
                    <TouchableHighlight
                      key={i}
                      style={styles.item}
                      onPress={() => {
                        setPickerState(false);
                        setCurrentValues({ id: item.id, title: item.name });
                      }}
                    >
                      <Text style={styles.title}>{item.name}</Text>
                    </TouchableHighlight>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.pickerText}>{currentValues.title}</Text>
        <AntDesign
          name={pickerState ? "up" : "down"}
          size={24}
          style={styles.pickerIcon}
          onPress={() => setPickerState(!pickerState)}
        />
      </View>
      {renderPickerItems()}
    </>
  );
};
export default CDSTest;

const styles = StyleSheet.create({
  container: {
    margin: "2%",
    padding: "2%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "white",
  },
  pickerText: {
    flex: 1.8,
    fontWeight: "500",
    fontSize: 16,
  },
  pickerIcon: {
    flex: 0.2,
  },
  item: {
    backgroundColor: "#ffff",
    marginHorizontal: "2%",
    padding: "2%",
    borderWidth: 0.8,
    borderRadius: 1,
  },
  title: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
