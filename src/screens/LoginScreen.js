import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { toast } from "../shared/utils";

const LoginScreen = ({ user, setUser }) => {
  const {
    container,
    headerText,
    text,
    font,
    input,
    button,
    section,
    bottomView,
    modalView
  } = styles;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const logIn = async () => {
    setLoading(true);
    try {
      // check if both input have characters
      if (email && password) {
        const currUser = await signInWithEmailAndPassword(auth, email, password);
        console.log("Successfully logged in", currUser);
        setUser(currUser);
        navigation.navigate("Main");
      } else {
        toast("Email and password must contain any character.");
      }
    } catch (err) {
      toast(err.message);
    } finally {
      setLoading(false);
    }
  }

  const resetPassword = async () => {
    setLoading(true);
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email);
        setModalVisible(!modalVisible);
        toast("You can now check your email to verify.");
      } else {
        toast("You must first enter your email address.");
      }
    } catch (err) {
      toast(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={container}>
      <View style={[section, { flexDirection: "row" }]}>
        <Text
          style={[headerText, font, {
            marginLeft: 20
          }]}
        >
          LOGIN
        </Text>
      </View>

      <View style={[section, { justifyContent: "center" }]}>
        <View>
          <Text style={[text, font]}>EMAIL</Text>
          <TextInput
            style={[input, text]}
            keyboardType="email-address"
            onChangeText={value => setEmail(value)}
          />
          <View>

          </View>
        </View>
        <View>
          <Text style={[text, font]}>PASSWORD</Text>
          <TextInput
            style={input}
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
          />
          <Text
            style={[text, font, {
              color: "#D64045",
              textAlign: "right",
            }]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            Forgot Password?
          </Text>
        </View>

      </View>

      <View style={[section, { justifyContent: "flex-end", rowGap: 10 }]}>
        <CustomButton
          title="LOGIN"
          style={button}
          textStyle={[text, font, { textAlign: "center", marginTop: 7 }]}
          textColor="white"
          loading={loading}
          onPress={logIn}
        />
        <Pressable
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={[text, font, {
              marginBottom: 30,
              color: "#D64045",
              textDecorationLine: "underline"
            }]}
          >
            I dont have an account.
          </Text>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <Pressable
          style={bottomView}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={modalView}>
            <Text style={[text, font]}>
              Would you really like to reset your password via email?
            </Text>
            <CustomButton
              title="YES"
              style={button}
              textStyle={[text, font, { textAlign: "center", marginTop: 7 }]}
              textColor="white"
              loading={loading}
              onPress={resetPassword}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#D64045",
    textAlign: "left"
  },
  text: {
    color: "#000000",
    marginVertical: 10,
    fontSize: 12,
    paddingLeft: 10
  },
  font: {
    fontFamily: "NotoSans-SemiBold"
  },
  input: {
    padding: 10,
    width: 320,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: 191,
    height: 37,
    backgroundColor: "#D64045",
    borderRadius: 20,
    flexShrink: 0
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  modalView: {
    width: "100%",
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default LoginScreen;
