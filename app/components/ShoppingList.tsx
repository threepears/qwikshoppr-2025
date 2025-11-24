import React from "react";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = ({ items, removeFromList }: { items: string[]; removeFromList: (itemToDelete: string) => void }) =>
  items.map((item: string) => <ShoppingListItem item={item} key={item} removeFromList={removeFromList} />);

export default ShoppingList;
