import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const CancelBloodRequest = ({
  setRejectedRequest,
}: {
  setRejectedRequest: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setLoading(false); // Reset loading state in case modal is reopened
    setModalVisible(false);
  };

  const handleRejectRequest = async () => {
    setLoading(true); // Start loading
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with actual API call
      setConfirmationModalVisible(true); // Open the confirmation modal
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setLoading(false); // Stop loading
      closeModal();
    }
  };

  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
    router.push("/request/1");
    setRejectedRequest(true)
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      {/* Button to trigger modal */}
      <TouchableOpacity
        onPress={openModal}
        style={{
          shadowColor: "#DAE1EB9E", // Shadow color
          shadowOffset: { width: 0, height: 4 }, // Shadow offset
          shadowOpacity: 0.5, // Shadow opacity
          shadowRadius: 30, // Shadow blur radius
          elevation: 10, // Shadow for Android
        }}
        className="w-[166px] h-[53px] bg-[#FFFFF] border-2 border-[#F64F49] rounded-[10px] shadow-md shadow-[#DAE1EB9E] flex justify-center items-center"
      >
        <Text className="text-[#C30D02] font-euclidSemiBold text-[16px] font-bold">
          Cancel Blood Request
        </Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="flex-1 bg-black/50" />
        </TouchableWithoutFeedback>

        <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-6 shadow-md">
          <Image
            source={require("../../assets/images/trash.png")}
            className="w-20 h-20 mx-auto mb-4"
          />
          <Text className="text-center text-[16px] font-bold mb-4">
            Cancel Blood Request
          </Text>
          <Text className="text-center text-[14px] text-[#4C4C4C] mb-6">
            You'll be cancelling your blood request and won't be contacted by
            any donoronce you do this.
          </Text>

          {/* Actions */}
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={handleRejectRequest}
              style={{
                shadowColor: "#808DA19E", // Shadow color
                shadowOffset: { width: 0, height: 4 }, // Shadow offset
                shadowOpacity: 0.5, // Shadow opacity
                shadowRadius: 30, // Shadow blur radius
                elevation: 10, // Shadow for Android
              }}
            >
              <LinearGradient
                colors={["#DC110A", "#C30D02"]}
                start={{ x: 0.05, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  width: 166,
                  height: 53,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white text-[16px] font-bold">
                    Yes, Reject
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <Pressable
              onPress={closeModal}
              style={{
                shadowColor: "#DAE1EB9E",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 30,
                elevation: 10,
              }}
              className="w-[166px] h-[53px] bg-[#FFFFFF] border-2 border-[#858585] rounded-[10px] shadow-md flex justify-center items-center"
            >
              <Text className="text-[#4C4C4C] text-[16px] font-bold">
                No, Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Rejection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={closeConfirmationModal}
      >
        <TouchableWithoutFeedback onPress={closeConfirmationModal}>
          <View className="flex-1 bg-black/50" />
        </TouchableWithoutFeedback>

        <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-6 shadow-md">
          <Text className="text-center text-[16px] font-bold mb-4">
            Blood Request Rejected
          </Text>
          <Text className="text-center text-[14px] text-[#4C4C4C] mb-6">
            You have cancelled this blood request. Click below to return to your
            dashboard or explore other requests
          </Text>

          {/* Close Button */}
          <Pressable
            onPress={closeConfirmationModal}
            className="w-full h-[53px] bg-[#008000] rounded-[10px] flex justify-center items-center"
          >
            <Text className="text-white text-[16px] font-bold">Return</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default CancelBloodRequest; 
