import React, { useContext } from "react";
import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native";
import { color } from "../../utility";

const { height, width } = Dimensions.get("window");

const Loading = () => {
  let loading = false;

  return loading ? (
    <View style={styles.loaderContainer}>
      <View style={styles.indicator}>
        <ActivityIndicator
          size="large"
          animating={loading}
          color={color.WHITE}
          style={{
            left: 1.3,
            top: 1,
          }}
        />
      </View>
    </View>
  ) : null;
};

export default Loading;

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 1,
    elevation: 2,
    height,
    width,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.SEMI_TRANSPARENT,
  },
  indicator: {
    backgroundColor: color.DARK_GRAY,
    height: 44,
    width: 44,
    borderRadius: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
