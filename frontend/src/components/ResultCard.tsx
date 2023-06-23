import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { styles } from "../styles/resultsCard_styles";

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
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productShop}>{content}</Text>
      <Text style={styles.productPrice}>{price}</Text>
    </View>
  );
};

export default ResultsCard;
