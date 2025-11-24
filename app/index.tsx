import React, { useEffect, useState } from "react";
import { MMKV } from 'react-native-mmkv';
import {
  Dimensions,
  // ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Header, Input } from "@rneui/themed";
import ShoppingList from "./components/ShoppingList";

const { width, height } = Dimensions.get("window");
const CartImage = require("@/assets/images/cart-icon.png");
const storage = new MMKV()

export default function Index() {
  let localItems: string[] = [];
  const stored = storage.getString("groceries");
  if (stored) {
    localItems = JSON.parse(stored);
  }

  const [itemListText, setItemListText] = useState<string>("");
  const [items, setItems] = useState<string[]>(localItems);

  useEffect(() => {
    console.log("INSIDE THE USE EFFECT")
    // const itemList = itemListText ? itemListText.toLowerCase().split("next") : [];
    // const finalList = itemList.map((item) => item.trim());

    // setItems(finalList);
  }, [itemListText]);

  const MyCustomTitle = () => <Text style={styles.headerText}>QwikShoppr</Text>;

  const createList = () => {
    console.log("ITEM LIST TEXT", itemListText);
    console.log("ITEMS", items);
    
    const itemList = itemListText ? itemListText.toLowerCase().split("next") : [];
    const finalList = itemList.map((item) => item.trim()).concat(items);

    console.log("FINAL LIST", finalList);

    setItemListText("");
    storage.set("groceries", JSON.stringify(finalList));
    // localStorage.setItem("groceries", JSON.stringify(finalList));
    setItems(finalList);
  }

  const removeFromList = (itemToDelete: string) => {
    console.log("REMOVING ITEM", itemToDelete);
    const finalList = items.filter((item: string) => item !== itemToDelete);
    console.log("AFTER ITEM REMOVED", finalList);

    setItemListText("");
    storage.set("groceries", JSON.stringify(finalList));
    // localStorage.setItem("groceries", JSON.stringify(finalList));
    setItems(finalList);
  }

  console.log("ITEMS", items);
  console.log("TEXT", itemListText);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        {/* <ImageBackground source={CartImage} resizeMode="cover" style={styles.backgroundImage}> */}
          <Header
            centerComponent={<MyCustomTitle />}
            containerStyle={styles.header}
          />

          <ShoppingList items={items} removeFromList={removeFromList}></ShoppingList>

          <View style={styles.footerInput}>
            <Input
              placeholder="Type Here..."
              errorStyle={{ margin: 0 }}
              inputContainerStyle={{borderBottomWidth:0}}
              containerStyle={styles.textInput}
              onChangeText={setItemListText}
              value={itemListText}
            />
            <Button onPress={createList} style={styles.button} title="Submit" />
          </View>
        {/* </ImageBackground> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    // backgroundPosition: "center",
    flex: 1,
    // height: height,
    // width: width,
    // resizeMode: "contain", // Cover the entire area, potentially cropping the image
    justifyContent: "center", // Center content vertically
    // alignItems: "center",
    // position: "static",
    //   width: 280,
    // alignItems: "center",
    // justifyContent: "center",
    //   padding: 30,
  },
  button: {
    backgroundColor: "#FF0000",
    backgroundImage:
      "linear-gradient(to bottom,rgb(193, 8, 8) 0%,#FF0000 100%)" /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
    borderRadius: 8,
  },
  container: {
    backgroundImage: `url(${CartImage})`,
    // backgroundImage:
    //   "url('http://localhost:8081/assets/?unstable_path=.%2Fassets%2Fimages/cart-icon.png')",
    backgroundColor: "#2d4f20",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    flex: 1,
  },
  footerInput: {
    backgroundColor: "#4d9900",
    backgroundImage:
      "linear-gradient(to bottom, #4d9900 0%,#336600 100%)" /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
    bottom: 0,
    display: "flex",
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9900', endColorstr='#336600',GradientType=0 )",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    position: "fixed",
    width: "100%",
  },
  header: {
    backgroundColor: "#4d9900",
    borderBottomWidth: 0,
    paddingBottom: 14,
    paddingTop: 12,
    // backgroundImage:
    //   "-moz-linear-gradient(top, #4d9900 0%, #336600 100%)" /* FF3.6-15 */,
    // backgroundColor:
    //   "-webkit-linear-gradient(top, #4d9900 0%,#336600 100%)" /* Chrome10-25,Safari5.1-6 */,
    backgroundImage:
      "linear-gradient(to bottom, #4d9900 0%,#336600 100%)" /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9900', endColorstr='#336600',GradientType=0 )",
  },
  headerText: {
    color: "#fff",
    fontFamily: "Verdana",
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "#336600",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  listItem: {
    width: "100%",
  },
  textInput: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    marginRight: 16,
    padding: 0,
    width: "75%"
  },
  text: {
    color: "#fff",
  },
});
