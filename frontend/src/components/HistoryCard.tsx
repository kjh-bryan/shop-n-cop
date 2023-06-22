import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { styles } from "../styles/historyCard_styles";
import { Card } from "react-native-elements";

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
    <Card containerStyle={styles.cardOuter}>
      <View style={styles.card}>
        <Image source={image} style={styles.historyImg} />
        <View style={styles.content}>
          <Text style={styles.historyTitle}>{title}</Text>
          <Text style={styles.historyShop}>{content}</Text>
          <Text style={styles.historyPrice}>{price}</Text>
          <Text style={styles.historyLastViewed}>
            Last Viewed on 16 June 2023
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default HistoryCard;
