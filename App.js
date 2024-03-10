import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { CameraView, Camera } from "expo-camera/next";

// import {
//   QrCodeScannedCallback,
//   QrCodeScanner,
//   requestAuthorizationAsync,
// } from "react-native-ios-qr-code-scanner";
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Model from "./Model";
import { StatusBar } from "expo-status-bar";
export default function App() {
  // const [photo, setPhoto] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [showqr, setShowqr] = useState(false);
  const [busno, setBusno] = useState("BMTC BUS KA57F46");
  const [gDate, setGDate] = useState("");
  const [passValid, setPassValid] = useState();
  const [passValidTill, setPassValidTill] = useState();
  const [passPurchase, setPassPurchase] = useState();
  const [showmodal, setShowModal] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    currDate();
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    retriveValue();
  }, []);
  const retriveValue = async () => {
    const time = await getValue("time");

    time ? setGDate(time) : currentDate();
    const bus = await getValue("bussno");
    setBusno(bus ?? "BMTC BUS KA57F46");
  };
  const currentDate = () => {
    const date = new Date();
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // get last date
    const lastDate = lastDayOfMonth.getDate().toString().padStart(2, "0"); // last date in string
    // creates a new Date object with current date and time
    const day = date.getDate().toString().padStart(2, "0"); // get the day and pad it with leading zeros if necessary
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth(); // get the month index (0-11)
    const month = monthNames[monthIndex];

    // get the month name
    const year = date.getFullYear(); // get the year
    let hours = date.getHours(); // get the hours (0-23)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // get the minutes and pad it with leading zeros if necessary
    const ampm = hours >= 12 ? "PM" : "AM"; // determine AM/PM

    hours = hours % 12; // convert to 12-hour format
    hours = hours ? hours : 12; // handle midnight (0:00) and noon (12:00)
    const time = `${hours}:${minutes} ${ampm}`; // construct the time string
    setPassPurchase(`01 ${month} ${year}, 07:03 AM`);
    setPassValid(`01 ${month} ${year}, 12:00 AM`);
    setPassValidTill(`${lastDate}  ${month} ${year}, 11:59 PM`);
    const formattedDate = `${day} ${month} ${year}, ${time}`; // construct the formatted date string
    console.log(formattedDate);
    storeValue("time", formattedDate);
    setGDate(formattedDate);
  };
  const currDate = () => {
    const date = new Date();
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0); // get last date
    const lastDate = lastDayOfMonth.getDate().toString().padStart(2, "0"); // last date in string
    // creates a new Date object with current date and time
    const day = date.getDate().toString().padStart(2, "0"); // get the day and pad it with leading zeros if necessary
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth(); // get the month index (0-11)
    const month = monthNames[monthIndex];

    // get the month name
    const year = date.getFullYear(); // get the year
    let hours = date.getHours(); // get the hours (0-23)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // get the minutes and pad it with leading zeros if necessary
    const ampm = hours >= 12 ? "PM" : "AM"; // determine AM/PM

    hours = hours % 12; // convert to 12-hour format
    hours = hours ? hours : 12; // handle midnight (0:00) and noon (12:00)
    const time = `${hours}:${minutes} ${ampm}`; // construct the time string
    setPassPurchase(`01 ${month} ${year}, 07:03 AM`);
    setPassValid(`01 ${month} ${year}, 12:00 AM`);
    setPassValidTill(`${lastDate}  ${month} ${year}, 11:59 PM`);
  };
  const storeValue = async (key, value) => {
    await AsyncStorage.setItem(key, value)
      .then(() => {
        console.log("Value saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving value:", error);
      });
  };
  const getValue = async (keyToRetrieve) => {
    const value = await AsyncStorage.getItem(keyToRetrieve);
    return value;
  };

  const storeData = async (value) => {
    try {
      // await AsyncStorage.setItem('@storage_Key', value)
      // console.log(res)
      storeValue("bussno", value);
      setBusno(value);
      // setGDate('');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      // const value = await AsyncStorage.getItem('@storage_Key')
      // if(value !== null) {
      //   console.log(value);
      // }
      // return setBusno(value);
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // const handleQrCode = useCallback(code => {
  //   setScanned(true)

  //   console.log("QR code =", code)
  //   alert(`QR code with data ${code.data} has been scanned!`)
  // }, [])
  const handleBarCodeScanned = ({ type, data }) => {
    if (data == undefined) return;
    //  const ind = data.indexof('=');
    //  const lastind = data.indexof('&');
    const findex = data.indexOf("=");
    const lindex = data.indexOf("Bangalore");
    const co = data.slice(findex + 1, lindex);
    console.log("hello", co);
    console.log(data, typeof data, co);
    console.log(data.indexOf("="), data.indexOf("&"));
    storeData(co);
    currentDate();
    // alert(co);
    setShowModal(true);
    setScanned(true);
    setShowqr(false);

    // const main = data.slice(data.indexof('=')+1,data.indexof('&'));
    // console.log("data",main,type)

    // alert( `Bar code with Type and data ${Linking.o}`)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // useEffect(() => {
  //   (async () => {
  //     const cameraPermission = await Camera.requestCameraPermissionsAsync();
  //     const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
  //     setHasCameraPermission(cameraPermission.status === "granted");
  //     setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
  //   })();
  // }, []);

  // if (hasCameraPermission === undefined) {
  //   return <Text>Requesting permissions...</Text>
  // } else if (!hasCameraPermission) {
  //   return <Text>Permission for camera not granted. Please change this in settings.</Text>
  // }
  // if (hasMediaLibraryPermission === undefined) {
  //   return <Text>Requesting permissions...</Text>
  // } else if (!hasCameraPermission) {
  //   return <Text>Permission for camera not granted. Please change this in settings.</Text>
  // }
  const onSuccess = (e) => {
    console.log(e.data); // e.data contains the QR code data
  };
  if (showqr)
    return (
      <View style={styles.qrcompo}>
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <TouchableHighlight>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setShowqr((pre) => !pre)}
          >
            <Text> </Text>
          </TouchableOpacity>
        </TouchableHighlight>
      </View>
    );
  return (
    <SafeAreaView>
      <View style={{ fontFamily: "sans-serif" }}>
        <View
          style={{
            paddingBottom: 1,
            paddingVertical: 35,
            paddingHorizontal: 20,
            marginBottom: 30,
            backgroundColor: "#1A6E74",
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, paddingBottom: 20, color: "#fff" }}>
            Your Bus Pass
          </Text>
          <Text style={styles.underlinedText}>support</Text>
        </View>
        <View
          style={{
            position: "relative",
            width: "90%",
            height: 170,
            borderRadius: 8,
            backgroundColor: "#fff",
            left: 18,
            top: -22,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
            padding: 10,
            elevation: 5,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("./assets/R.jpeg")}
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text
                style={{ fontSize: 16, paddingLeft: 20, fontWeight: "400" }}
              >
                Vayu Vajra Gold Pass
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginVertical: 5,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 40,
                    paddingLeft: 20,
                  }}
                >
                  {/* <Text>Monthly</Text> */}
                  <Text
                    style={{
                      backgroundColor: "rgba(17, 187, 196, 0.2)",
                      minWidth: 35,
                      textAlign: "center",
                      borderRadius: 4,
                      paddingHorizontal: 5,
                      paddingVertical: 1,
                      color: "#11BB11",
                      fontWeight: "500",

                      fontSize: 12,
                    }}
                  >
                    Monthly
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: 5,
                  }}
                >
                  {/* <Text>Monthly</Text> */}
                  <Text
                    style={{
                      backgroundColor: "#CCC",
                      width: 35,
                      textAlign: "center",
                      borderRadius: 4,
                      color: "#576453",
                      fontWeight: "500",
                      fontSize: 12,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    AC
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", paddingLeft: 0, right: 42 }}>
                <Text style={styles.pass}>Pass ID: </Text>
                <Text style={styles.pass1}>TPASS9301135</Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  right: 40,
                  margin: 5,
                }}
              >
                {/* <Image
                style={{ width: 35, height: 45, bottom: 2 }}
                source={require("./assets/Screenshot.png")}
              /> */}
                {/* <Button title='Scan conductor OR for validation' color="Black" style={{}} /> */}
                <View style={{ gap: 5 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowqr((pre) => !pre)}
                  >
                    <Image
                      style={{ width: 22, height: 22 }}
                      source={require("./assets/icons8-qr-50.png")}
                    />
                    <Text
                      style={{ fontWeight: "500", fontSize: 14, color: "#FFF" }}
                    >
                      {" "}
                      Scan OR{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "#11BBC4",
                      fontWeight: "500",
                      left: 50,
                    }}
                  >
                    ⓘ How to Validate Your Pass?
                  </Text>
                </View>
              </View>

              {/* <Text>  Scan conductor OR for validation</Text> */}
            </View>
            {/* <Image style={{width:50,height:50,marginLeft:20}} source={require('./assets/timeline1.png')} /> */}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: "90%",
              borderRadius: 8,
              backgroundColor: "#fff",
              shadowColor: "black",
              left: 18,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              padding: 10,
              marginTop: 20,
              marginBottom: 40,
              elevation: 5,
            }}
          >
            {/* <Text>hello</Text> */}
            <Text style={styles.book}>Booking Details</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={{ display: "flex", gap: 10, margin: 5 }}>
                <View>
                  <Text style={styles.head1}>Passenger name</Text>
                  <Text style={styles.head2}>Riyam Jain</Text>
                </View>
                <View>
                  <Text style={styles.head1}>Identification type</Text>
                  <Text style={styles.head2}>Aadhar Card</Text>
                </View>
                <View>
                  <Text style={styles.head1}>
                    Identification number (Last 4 digits)
                  </Text>
                  <Text style={styles.head2}>2105</Text>
                </View>
              </View>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("./assets/Image.png")}
              />
            </View>

            {/* <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          /> */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 10,
              }}
            >
              <View>
                <Text style={styles.head1}>Pass purchase date</Text>
                <Text style={styles.head2}> {passPurchase} </Text>
              </View>
              <View>
                <Text style={styles.head1}>Pass valid from</Text>
                <Text style={styles.head2}>{passValid}</Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.head1}>Pass valid till</Text>
                  <Text style={styles.head2}>{passValidTill}</Text>
                </View>
                <View>
                  <Text style={[styles.head1, styles.fare]}>Pass fare</Text>
                  <Text style={[styles.head2, styles.price]}>
                    &#8377; 3650.0
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={styles.mail}>
                  <Text style={styles.mailtext}> Generate mail receipt </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: StyleSheet.hairlineWidth,
                top: 40,
              }}
            />

            <View style={styles.check23}>
              <Text style={styles.valid}>Last validation</Text>
              <Text style={styles.valid}>{gDate}</Text>
              <Text style={styles.valid}>Bus Number</Text>
              <Text style={styles.valid}> {busno} </Text>
              <Text style={styles.valid}>Validated By</Text>
              <Text style={styles.valid}>Self</Text>
            </View>
            <View
              style={{
                borderBottomColor: "grey",
                borderBottomWidth: StyleSheet.hairlineWidth,
                top: 10,
                marginBottom: 10,
              }}
            />
            <View style={{ height: 550 }}>
              <Image
                style={{ height: 300, width: 330, right: 25 }}
                source={require("./assets/code.gif")}
              />
              <Image
                style={{
                  height: 35,
                  width: 34,
                  position: "relative",
                  bottom: 180,
                  left: 125,
                }}
                source={require("./assets/R.jpeg")}
              />
            </View>
          </View>
        </ScrollView>
        <Model
          modalopen={showmodal}
          setShowModal={setShowModal}
          passValidTill={passValidTill}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  qrcompo: {
    flex: 1,
    // flexDirection:"column",
    justifyContent: "center",
    backgroundColor: "black",
  },
  scrollView: {
    // backgroundColor: 'pk',
    // marginHorizontal: 20,
  },
  valid: {
    fontWeight: "500",
    fontSize: 16,
  },
  mail: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#11BBC4",
    width: 200,
    padding: 5,
    borderRadius: 5,
  },
  mailtext: {
    color: "#11BBC4",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  check23: {
    backgroundColor: "#B4c793",
    opacity: 0.6,
    height: 150,
    top: 50,
    padding: 10,
    marginBottom: 50,
    borderRadius: 8,
  },
  button: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11BBC4",
    padding: 10,
    borderRadius: 4,
    height: 35,
    width: 300,

    borderRadius: 5,
  },
  button1: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 0,
    height: 3,
  },
  head1: {
    color: "#757575",
    fontSize: 12,
    fontWeight: "500",
  },
  fare: {
    textDecorationLine: "underline",
    alignItems: "flex-end",
    display: "flex",
    left: 10,
  },
  pass: {
    color: "#757575",
    fontSize: 12,
    fontWeight: "500",
  },
  pass1: {
    color: "#102c38",
    fontSize: 12,
    marginLeft: 15,
    fontWeight: "400",
  },
  book: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 2,
    color: "#0e2d38",
  },
  head2: {
    color: "#0f2c39",
    fontSize: 13,
    fontWeight: "400",
  },
  position: {
    backgroundColor: "#264b54",
  },
  underlinedText: {
    color: "white",
    fontSize: 13,
    paddingTop: 5,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  header: {
    backgroundColor: "#0f2d38",
    width: "100%",
  },
  price: { fontSize: 19, fontWeight: "400" },
});
