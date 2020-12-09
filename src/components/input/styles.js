import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";

export default StyleSheet.create({
  input: {
    marginLeft: 15,
    backgroundColor: appStyle.fieldBgColor,
    width: "90%",
    color: appStyle.fieldTextColor,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginLeft: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 10,
  },
});
