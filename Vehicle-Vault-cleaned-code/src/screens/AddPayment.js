import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "react-native-modal-datetime-picker";

export default function AddPayment({ navigation, route }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState("");

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState(null);
  const [itemsType, setItemsType] = useState([
    { label: "Upcoming", value: "Upcoming" },
    { label: "Past", value: "Past" },
  ]);

  const [openCategory, setOpenCat] = useState(false);
  const [valueCategory, setValueCat] = useState(null);
  const [itemsCategory, setItemsCat] = useState([
    { label: "Car Payment", value: "Car Payment" },
    { label: "Insurance", value: "Insurance" },
    { label: "Refuel", value: "Refuel" },
    { label: "Car Wash", value: "Car Wash" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Other", value: "Other" },
  ]);

  const { addPayment } = route.params;

  const handleSubmit = () => {
    if (!name || !amount || !selectedDate || !valueType || !valueCategory) {
      Alert.alert("Error", "Please fill all required fields before saving.");
      console.log("Please fill in all required fields.");
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}-${day}-${year}`;

    const newPayment = {
      type: valueType,
      category: valueCategory,
      name,
      amount,
      date: formattedDate,
      notes,
    };

    addPayment(newPayment);
    navigation.goBack();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDatePicked = (date) => {
    console.log("Selected date:", date.toDateString());
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleClear = () => {
    setName("");
    setAmount("");
    setSelectedDate("");
    setNotes("");
    setValueType(null);
    setValueCat(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={"#D9D9D9"} />
      <KeyboardAwareFlatList // use flatlist to avoid nested virtualized lists error
        data={[{ key: "dummy" }]} // necessary for flatlist to work
        renderItem={() => (
          <>
            <Text style={styles.title}>Add an upcoming or past payment</Text>

            <Text style={styles.text}>Type</Text>
            <DropDownPicker
              open={openType}
              value={valueType}
              items={itemsType}
              setOpen={setOpenType}
              setValue={setValueType}
              setItems={setItemsType}
              style={styles.dropdown}
              zIndex={1}
              onChangeItem={(item) => setValue(item.valueType)}
              placeholder="Select an item"
            />

            <Text style={styles.text}>Category</Text>
            <DropDownPicker
              open={openCategory}
              value={valueCategory}
              items={itemsCategory}
              setOpen={setOpenCat}
              setValue={setValueCat}
              setItems={setItemsCat}
              style={styles.dropdown}
              zIndex={-1}
              onChangeItem={(item) => setValue(item.valueCategory)}
              placeholder="Select an item"
              listMode="SCROLLVIEW"
            />

            <Text style={[styles.text, { zIndex: -2 }]}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder={"Enter name of payment"}
              placeholderTextColor="#A9A9A9"
              maxLength={20}
              value={name}
              onChangeText={(text) => setName(text)}
              zIndex={-2}
            />
            <Text style={[styles.charCount, { marginBottom: -15, zIndex: -2 }]}>
              {name.length}/20
            </Text>

            <Text style={[styles.text, { zIndex: -2 }]}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder={"$0.00"}
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              maxLength={8}
              value={amount}
              onChangeText={(amt) => {
                const c = amt
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1");
                setAmount(c);
              }}
              zIndex={-2}
            />

            <Text style={[styles.text, { zIndex: -2 }]}>Date</Text>
            <Button
              title={
                selectedDate ? selectedDate.toDateString() : "Choose a date"
              }
              onPress={showDatePicker}
            />
            <DateTimePicker
              mode="date"
              isVisible={isDatePickerVisible}
              onConfirm={handleDatePicked}
              onCancel={hideDatePicker}
              display="inline"
              date={selectedDate ? selectedDate : new Date()}
            />

            <Text style={[styles.text, { zIndex: -2 }]}>Notes (optional)</Text>
            <TextInput
              style={[styles.input, { height: 65 }]}
              placeholder="Enter notes here"
              placeholderTextColor="#A9A9A9"
              multiline
              maxLength={100}
              numberOfLines={2}
              value={notes}
              onChangeText={(notes) => setNotes(notes)}
              zIndex={-2}
            />
            <Text style={[styles.charCount, { marginBottom: 30, zIndex: -2 }]}>
              {notes.length}/100
            </Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => {
                  console.log("Clear pressed.");
                  handleClear();
                }}
                style={styles.btn}
              >
                <Text style={styles.btnTxt}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log("Save pressed.");
                  handleSubmit();
                }}
                zIndex={-2}
                style={styles.btn}
              >
                <Text style={styles.btnTxt}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    opacity: 0.9,
    marginLeft: "1%",
    marginTop: 11,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#00000",
    width: "100%",
    marginTop: 4,
    padding: 8,
    height: 45,
    backgroundColor: "#ffffff",
  },
  charCount: {
    fontSize: 14,
    textAlign: "right",
    marginTop: 2,
  },
  dropdown: {
    marginTop: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000000",
    backgroundColor: "#000000",
    width: "45%",
    margin: "2%",
    alignItems: "center",
  },
  btnTxt: {
    color: "#ffffff",
    padding: 20,
    fontSize: 16,
    fontWeight: 500,
  },
});
