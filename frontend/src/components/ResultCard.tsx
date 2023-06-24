import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
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
  const handlePressed = () => {
    const data = {
      title,
      content,
      image,
      price,
    };
    console.log(data);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => handlePressed()}>
      <View style={styles.cardContainer}>
        {/* for image url purpose */}
        {/* <Image source={{ uri: image }} /> */}
        <Image source={image} />
        <StyledText title={title} style={styles.productTitle} />
        <StyledText title={content} style={styles.productShop} />
        <StyledText title={price} isBold style={styles.productPrice} />
      </View>
    </TouchableOpacity>
  );
};

export default ResultsCard;
