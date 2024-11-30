import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  DimensionValue,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { APP_THEME_COLOR } from "../constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { DisplayToast } from "../utility/ToastMessage";

type CDSDatePickerProps = {
  onDateTap: (data: string) => void;
  dateFormat?: string;
  date: Date;
};

const CDSDatePicker: React.FC<CDSDatePickerProps> = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => setShow(true)}>
        <FontAwesome5 name="calendar-alt" size={24} style={styles.iconView} />
        <Text style={styles.text}>
          {moment(props.date, "DD MMM YYYY").format("DD MMM YYYY")}
        </Text>
      </TouchableOpacity>
      <>
        {show ? (
          <DateTimePicker
            value={props.date}
            mode="date"
            display="default"
            onChange={(val) => {
              setShow(false);
              const date = new Date(val.nativeEvent.timestamp);
              const formateDate = moment(date, "DD MMM YYYY").format(
                props.dateFormat ? props.dateFormat : "DD MMM YYYY"
              );
              props.onDateTap(formateDate);
            }}
          />
        ) : null}
      </>
    </View>
  );
};
export default CDSDatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    padding: "3%",
    backgroundColor: "white",
    marginVertical: "2%",
  },
  iconView: {
    flex: 0.2,
    color: APP_THEME_COLOR,
  },
  text: {
    flex: 0.8,
    textAlignVertical: "center",
  },
});
