import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Input = ({
  placeholder,
  icon,
  password,
  onChange,
  keyboardType,
  maxLength,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.icon} source={icon} />
      </View>
      <TextInput
        style={styles.input}
        secureTextEntry={password}
        placeholder={placeholder}
        onChangeText={onChange}
        keyboardType={keyboardType}
        maxLength={maxLength}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("75%"),
    height: hp("6%"),
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    // borderWidth: 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 4,
    borderBottomColor: "grey",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    marginLeft: 20,
    // resizeMode: "contain",
    width: 15,
    height: 15,
  },
  input: {
    width: wp("65%"),
    height: hp("5%"),
    backgroundColor: "#FFFFFF",
    color: "#727C8E",
    fontWeight: "500",
    fontSize: 14,
    paddingLeft: 15,
  },
});

export default Input;
