import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export type DropDownType = { label: string; value: string };
type CDSDropDownProps = {
  data: Array<DropDownType>;
  onSelect: (item: { label: string; value: string }) => void;
  placeholder?: string;
  leftIcon?: () => React.JSX.Element;
  hasLeftIcon?: boolean;
  hasSearchOperation?: boolean;
  searchPlaceholder?: string;
};

const CDSDropDown: React.FC<CDSDropDownProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(props.data);
  const toggleDropdown = () => {
    setVisible(!visible);
    setFilteredData(props.data);
  };

  const handleSelect = (item: { label: string; value: string }) => {
    setSelectedItem(item);
    setVisible(false);
    props.onSelect(item);
    setSearchQuery(searchQuery ? "" : searchQuery);
    setFilteredData(props.data);
  };

  // Function to handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredData(props.data); // Reset list when search is empty
    } else {
      const filtered = props.data.filter((item) =>
        item.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  return (
    <View style={styles.container}>
      {/* Selected Item */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => {
          toggleDropdown();
        }}
      >
        {props.hasLeftIcon && props.leftIcon ? (
          <View style={styles.leftIcon}>{props.leftIcon()}</View>
        ) : null}
        <Text style={styles.selectedText}>
          {selectedItem ? selectedItem.label : props.placeholder}
        </Text>
        <Icon
          name={visible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={20}
          color="#000"
          style={styles.rightIcon}
        />
      </TouchableOpacity>

      {/* Dropdown List */}
      {visible && (
        <View style={styles.dropdownList}>
          {props.hasSearchOperation ? (
            <View style={styles.searchView}>
              <EvilIcons name="search" size={24} style={styles.searchIcon} />
              <TextInput
                placeholder={props.searchPlaceholder}
                style={styles.searchTxtInput}
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
          ) : null}
          <ScrollView nestedScrollEnabled>
            {props.data && filteredData && filteredData.length ? (
              <>
                {filteredData.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.item}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>No items found</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
    flex: 1.6,
  },
  leftIcon: {
    flex: 0.2,
  },
  rightIcon: {
    flex: 0.2,
  },
  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    maxHeight: 150,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  searchView: {
    flexDirection: "row",
    paddingHorizontal: "2%",
    paddingVertical: "1%",
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 4,
  },
  searchTxtInput: {
    flex: 1.8,
  },
  searchIcon: {
    flex: 0.2,
    alignSelf: "center",
  },
});

export default CDSDropDown;
