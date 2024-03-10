import React from "react";
import { Image } from "react-native";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const Model = ({ modalopen, setShowModal, passValidTill }) => {
  //   const [modalVisible, setShowModal] = useState(props?.modalopen??false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalopen}
      style={{ width: 50 }}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setShowModal((pre) => !pre);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 120, height: 120 }}
              source={require("./assets/success.png")}
            />
          </View>
          <Text style={styles.modalText}>
            Self Verification Done Successfully
          </Text>
          <View>
            <View style={styles.flexing}>
              <Text style={styles.head1}>Pass Number</Text>
              <Text style={styles.head1}>TPASS9307165</Text>
            </View>
            <View style={styles.flexing}>
              <Text style={styles.head1}>Pass type</Text>
              <Text style={styles.head1}>Monthly</Text>
            </View>

            <View style={styles.flexing}>
              <Text style={styles.head1}>Pass valid till</Text>
              <Text style={styles.head1}>{passValidTill}</Text>
            </View>
            <View
              style={{
                borderBottomColor: "black",
                opacity: 0.3,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 5,
                marginBottom: 5,
              }}
            />
            <View style={styles.flexing}>
              <Text style={styles.head12}>Pass fare</Text>
              <Text style={styles.head12}>&#8377; 3650</Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal((pre) => !pre)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // width:'80%',
  },
  flexing: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    width: "90%",
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  blurViewStyle: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 120,
    backgroundColor: "black",
  },
  buttonOpen: {
    backgroundColor: "blue",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    margin: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    color: "#174c75",
    fontWeight: "bold",
  },
  head1: {
    color: "#757575",
    fontSize: 13.5,
    fontWeight: "500",
  },
  head12: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Model;
