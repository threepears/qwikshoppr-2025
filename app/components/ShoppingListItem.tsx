import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, CheckBox, Icon, ListItem } from "@rneui/themed";

// type ShoppingListItemProps = {
//   item: string;
//   removeFromList: (itemToDelete: string) => void;
// };
// const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, removeFromList }) => {

const ShoppingListItem = ({ item, removeFromList }: { item: string; removeFromList: (itemToDelete: string) => void }) => {
  const [selected, setSelected] = useState(false);

  const toggleCheckbox = () => setSelected(!selected);

  console.log("ITEM IN ITEM", item);
  console.log("SELECTED", selected);

  return (
    <ListItem.Swipeable
      bottomDivider
      rightWidth={70}
      containerStyle={selected && {backgroundColor: "#97a690"}}
      // style={selected && styles.listItem}
      // rightContent={(reset) => (
      //   <Button
      //     // title="Info"
      //     containerStyle={{
      //       flex: 1,
      //       justifyContent: "center",
      //       backgroundColor: "red",
      //     }}
      //     onPress={() => reset()}
      //     icon={{ name: "delete", color: "white" }}
      //     buttonStyle={{ minHeight: "100%" }}
      //   />
      // )}
      rightContent={() => (
        <Button
          onPress={() => removeFromList(item)}
          style={styles.buttonItem}
          // icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          containerStyle={{ height: '100%' }}
        >
          <Icon name="delete" color="white" />
        </Button>
      )}
    >
      <ListItem.CheckBox
        checked={selected}
        containerStyle={selected && {backgroundColor: "#97a690"}}
        onPress={toggleCheckbox}
        // Use ThemeProvider to make change for all checkbox
        iconType="material-community"
        checkedIcon="check-circle"
        size={36}
        uncheckedIcon="circle-outline"
        checkedColor="green"
      />
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  buttonItem: {
    height: '100%',
    width: 70,
  },
  listItem: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
})

export default ShoppingListItem;
