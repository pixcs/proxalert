import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  defaultPhoto,
  loadFonts,
  useDefaultPhoto
} from "../shared/utils";

const HomeScreen = ({
  user,
  setUser,
  accountDetails
}) => {
  const navigation = useNavigation();
  const [fontsLoaded] = loadFonts();

  const {
    container,
    button,
    text,
    image,
    sameRow,
    profile,
    section,
    headerColor,
    font,
    textSection,
  } = styles;

  const [loading, setLoading] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 500,
      useNativeDriver: true, // Set to true if possible for better performance
    }).start();
  };

  const resetScale = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={container}>
      <View style={section}>
        <View style={sameRow}>
          <Text
            style={[headerColor, {
              fontSize: 19,
              fontFamily: "NotoSans-Bold"
            }]}
          >
            {user?.displayName ? `Hello, ${user?.displayName}!` : "Hey, User!"}
          </Text>

          <TouchableOpacity
            style={profile}
            onPress={() => navigation.navigate("Settings", {
              profilePicture: user.photoURL ? user.photoURL : defaultPhoto
            })}
          >
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={{ uri: useDefaultPhoto(accountDetails?.isResponder, accountDetails?.sortResponder).photo }}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>
        </View>

        {user.emailVerified && (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 5,
          }}>
            <MaterialIcons name="verified" size={24} color="green" />
            <Text style={[font, { color: "green" }]}>Verified</Text>
          </View>
        )}

        <Text
          style={[headerColor, {
            fontSize: 15,
            fontFamily: "NotoSans-Medium"
          }]}
        >
          We are here for you.
        </Text>

      </View>

      <View
        style={{ alignItems: "center" }}
      >
        <Animated.View
          style={{ transform: [{ scale: scaleValue }] }}
        >
          <Pressable
            onPressIn={handlePress}
            onPressOut={resetScale}
            onLongPress={() => navigation.navigate("Map")}
          >
            <Image
              source={require("../../assets/images/request-btn.png")}
              style={image}
            />
          </Pressable>
        </Animated.View>
        <View style={textSection}>
          <Text style={[font, { fontSize: 14 }]}>
            {accountDetails?.isResponder
              ? "HOLD TO GO OVER TO THE EMERGENCY MAP"
              : "HOLD TO REQUEST EMERGENCY ASSISTANT"
            }
          </Text>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    rowGap: 50,
    backgroundColor: "white"
  },
  section: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 60
  },
  headerColor: {
    color: "#333"
  },
  font: {
    fontFamily: "NotoSans-SemiBold"
  },
  sameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  textSection: {
    alignItems: "center",
    marginVertical: 30
  },
  button: {
    width: 191,
    height: 37,
    backgroundColor: "#D64045",
    border: 1,
    borderColor: "gray",
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 150,
    padding: 50
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "silver"
  }
})
