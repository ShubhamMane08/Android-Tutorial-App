import { StyleSheet } from "react-native";

export const globalheaderStyle = () => {
  return {
    headerStyle: { backgroundColor: "#007676" },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
    headerShown: false,
    tabBarActiveTintColor: "#138B7F",
    tabBarStyle: {
      position: "absolute",
      borderTopColor: "rgba(0, 0, 0, .2)",
    },
  };
};

export const globalTabStyle = () => {
  return {
    tabBarStyle: {
      backgroundColor: '#465256', 
    },
    tabBarLabelStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    tabBarIndicatorStyle: {
      backgroundColor: '#FF6666', 
    },
    tabBarActiveTintColor: '#FF6666', 
    tabBarInactiveTintColor: '#DDD', 
    }
  };


export const loaderStyles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export const commonModalStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#EFFFFF",
    width: "100%",
    padding: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },  
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  textlabel: {
    marginBottom: "10pt",
    color: "#aaaaaa",
    paddingBottom: 10,
  },
  textInputbox: {
    color: "#aaaaaa",
    width: "100%",
  },
});

export const globalFormStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  ScreenTitle:{
    fontSize:20,
    fontWeight:'bold',
    color:'#4c4a48'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#138B7F",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContainerError: {
    borderColor: "red",
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  checkboxContainer: {
    // flexDirection: 'row',
    flexWrap: "wrap",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1ccfbe",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export const globalStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EFFFFF",
  }, 
  OfficialLogin: {
    paddingTop: 20,
    flexDirection: "row-reverse",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerTile: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "Top",
    height: "100%",
  },
  containerProduct: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize:18,
    paddingBottom:10,
  },
  containerTaskMain: {
    //flex:1,
    backgroundColor: "#ffffff",
    padding: 20,
    color: "Black",
    marginBottom:15,
    borderRadius:15,
    marginStart:8,
    marginEnd:8
  },
  containerTaskBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  containerTaskBodyRow: {
    flexDirection: "row",
    padding: 15,
  },
  containerVisitDetailsBody: {
    flexDirection: "row",
    //justifyContent: "flex-start",
    padding: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  teleBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 18,
    width: "100%",
    alignItems: "center",
    color: "#FFFFFF",
    paddingBottom: 10,
  },
  taskHeader: {
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tile: {
    width: "40%",
    height: "20%",
    backgroundColor: "#f3f7ff",
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    margin: "5%",
    borderColor: "black",
    borderRadius: 15,
  },
  
tileList:{
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center', 
  width:'100%', 
  borderRadius:15
},
  tileProduct: {
    Width: "100%",
    height: 260,
    backgroundColor: "#f3f7ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    //margin: "5%",
    borderColor: "back",
    borderRadius: 15,
    margin: 10,
  },
  gpsImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  gpsImageProduct: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textProduct: {
    fontSize: 16, // Adjust font size as needed
    color: "#000",
    lineHeight: 20,
    textAlign: "justify",
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 110,
    height: 200,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  main: {
    alignItems: "center",
  },
  titlewelcome: {
    fontSize: 18,
    marginHorizontal: "auto",
    textTransform: "uppercase",
  },
  titleslogon: {
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlignVertical: "auto",
  },
  divider: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#aaa",
    marginTop: 25,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1ccfbe",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonDisabled: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ccc",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonAdd: {
    width: "10%",
    backgroundColor: "#1ccfbe",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 4,
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "center",
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  whatsappText: {
    color: "#FFFFFF",
    marginLeft: 10, // Space between icon and text
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: "100%",
    borderRadius: 4,
    borderColor: "#138B7F",
    borderWidth: 1,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  whatsappclass: { color: "#FFFFFF" },
  agriment: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 25,
  },
  phoneText: {
    color: "#1ccfbe",
    marginLeft: 10, // Space between icon and text
  },
  flatlistTile: {
    Width: "100%",
    minHeight: 100,
    backgroundColor: "#ffffff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#138B7F",
    borderRadius: 5,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 18,
  },
  loginInputBox: {
    height: 40,
    borderColor: "#138B7F",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  agentbutton: {
    color: "yellow",
  },
  shareId: {
    color: "#ffffff",
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 15,
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#138B7F",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputContainerError: {
    borderColor: "red",
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: 16,
  },
  inputValid: {
    borderColor: "#1ccfbe",
  },
  searchIcon: {
    marginRight: 10,
  },
  error: {
    color: "red",
  },
  addButton: { position: "absolute", right: 16, bottom: 16, zIndex: 2 },
  screenContainer: {
    flex: 1, // Ensures the container takes up the full screen
    position: "relative", // Necessary for absolute positioning of child elements
  },
  scrollViewContent: {
    flexGrow: 1, // Allows the ScrollView to expand and take full height if content is small
  },
  teleDashChart: {
    marginVertical: 5,
    borderRadius: 5,
    marginLeft: -10,
    marginRight: "auto",
    width: "60%",
  },
  teleBarLegendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  teleBarLegendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  teleBarLegendItems: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
});
