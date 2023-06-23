import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { styles } from "../styles/historyCard_styles";

interface ResultsCardProps {
  title: string;
  content: string;
  price: string;
  image: ImageSourcePropType;
}

const HistoryCard: React.FC<ResultsCardProps> = ({
  title,
  content,
  image,
  price,
}) => {
  return (
    <View style={styles.cardOuter}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.historyImg} />
        </View>
        <View style={styles.content}>
          <Text style={styles.historyTitle}>{title}</Text>
          <Text style={styles.historyShop}>{content}</Text>
          <Text style={styles.historyPrice}>{price}</Text>
          <Text style={styles.historyLastViewed}>
            Last Viewed on 16 June 2023
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;
