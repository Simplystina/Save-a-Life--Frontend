import AsyncStorage from "@react-native-async-storage/async-storage";
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) return null; // No token found

    // if (!response.ok) {
    //   await AsyncStorage.removeItem("userToken"); // Token is invalid, remove it
    //   return null;
    // }

    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export default getToken