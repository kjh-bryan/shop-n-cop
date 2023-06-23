import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { styles } from "../styles/historyCard_styles";
import { StyledText } from "./StyledText";

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
          <StyledText title={title} style={styles.historyTitle} />
          <StyledText title={content} style={styles.historyShop} />
          <StyledText title={price} isBold style={styles.historyPrice} />
          <StyledText
            title="Last Viewed on 16 June 2023"
            style={styles.historyLastViewed}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;
