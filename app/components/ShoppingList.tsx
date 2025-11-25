import React from "react";
import { FlatList } from 'react-native';
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = ({ items, removeFromList }: { items: string[]; removeFromList: (itemToDelete: string) => void }) =>
  (
    <FlatList
      data={items}
      renderItem={({item, index}) => 
        <ShoppingListItem 
          item={item} 
          keyId={`shopping-${index}`} 
          removeFromList={removeFromList} 
        />}
    />
  )
  
export default ShoppingList;
