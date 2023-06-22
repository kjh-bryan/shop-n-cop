import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "../styles/historyPage_style";
import HistoryCard from "../components/HistoryCard";

const HistoryPageScreen: React.FC = () => {
  const data = [
    {
      title: "Ready Stock Ni*ke Air..",
      content: "Shopee",
      price: "$22.81",
      image: require("../../assets/images/product1.png"),
    },
    {
      title: "Authentic Nlke_Air Force..",
      content: "Amazon",
      price: "$47.03",
      image: require("../../assets/images/product2.png"),
    },
    {
      title: "Special Offer NIK-E AIR..",
      content: "Shopee",
      price: "$64",
      image: require("../../assets/images/product3.png"),
    },
    {
      title: "NIke Air Max Fusion Air",
      content: "Lazada",
      price: "$75",
      image: require("../../assets/images/product4.png"),
    },
    {
      title: "Ready Stock Ni*ke Air..",
      content: "Shopee",
      price: "$22.81",
      image: require("../../assets/images/product1.png"),
    },
    {
      title: "Authentic Nlke_Air Force..",
      content: "Amazon",
      price: "$47.03",
      image: require("../../assets/images/product2.png"),
    },
    {
      title: "Special Offer NIK-E AIR..",
      content: "Shopee",
      price: "$64",
      image: require("../../assets/images/product3.png"),
    },
    {
      title: "NIke Air Max Fusion Air",
      content: "Lazada",
      price: "$75",
      image: require("../../assets/images/product4.png"),
    },
  ];

  return (
    <ScrollView
      stickyHeaderIndices={[0]} // Specify the index of the sticky header
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.back}
          source={require("../../assets/images/back-arrow.png")}
        />
        <Text style={styles.text}>History</Text>
      </View>
      <View style={styles.body}>
        {data.map((item, index) => (
          <HistoryCard
            key={index}
            title={item.title}
            content={item.content}
            price={item.price}
            image={item.image}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HistoryPageScreen;
