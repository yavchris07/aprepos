import ItemCard from "./item-card";

const ItemCardList = () => {
  return (
    <div className="grid grid-cols-3 gap-3 p-2">
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
};

export default ItemCardList;
