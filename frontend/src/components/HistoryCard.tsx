import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/historyCard_styles";
import { StyledText } from "./StyledText";
import moment from "moment";

interface HistoryCardProps {
  title: string;
  content: string;
  price: string;
  image: ImageSourcePropType;
  date: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  content,
  image,
  price,
  date,
}) => {
  const handlePressed = () => {
    const data = {
      title,
      content,
      image,
      price,
      date,
    };
    console.log(data);
  };

  const currentDate = moment(date).format("DD MMM YYYY");

  return (
    <View style={styles.cardOuter}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => handlePressed()}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.historyImg} />
          </View>
          <View style={styles.content}>
            <StyledText title={title} style={styles.historyTitle} />
            <StyledText title={content} style={styles.historyShop} />
            <StyledText title={price} isBold style={styles.historyPrice} />
            <StyledText
              title={"Last Viewed on " + currentDate}
              style={styles.historyLastViewed}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryCard;
