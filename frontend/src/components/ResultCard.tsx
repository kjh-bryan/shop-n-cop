import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { styles } from "../styles/resultsCard_styles";
import { StyledText } from "./StyledText";

interface ResultsCardProps {
  title: string;
  content: string;
  price: string;
  image: ImageSourcePropType;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  title,
  content,
  image,
  price,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* for image url purpose */}
      {/* <Image source={{ uri: image }} /> */}
      <Image source={image} />
      <StyledText title={title} style={styles.productTitle} />
      <StyledText title={content} style={styles.productShop} />
      <StyledText title={price} isBold style={styles.productPrice} />
    </View>
  );
};

export default ResultsCard;
