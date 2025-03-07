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

const AcceptBloodRequest = ({
  setAcceptedRequest,
}: {
  setAcceptedRequest: React.Dispatch<React.SetStateAction<boolean>>;
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

  const handleAcceptRequest = async () => {
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
     setAcceptedRequest(true);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      {/* Button to trigger modal */}
      <TouchableOpacity
        onPress={openModal}
        style={{
          shadowColor: "#DAE1EB9E",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 30,
          elevation: 10,
        }}
        className="w-[166px] h-[53px] bg-[#008000] border-2 border-[#23C223] rounded-[10px] shadow-md flex justify-center items-center"
      >
        <Text className="text-white text-[16px] font-bold">Accept Request</Text>
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
            source={require("../../assets/images/tick-circle.png")}
            className="w-20 h-20 mx-auto mb-4"
          />
          <Text className="text-center text-[16px] font-bold mb-4">
            Accept Blood Request
          </Text>
          <Text className="text-center text-[14px] text-[#4C4C4C] mb-6">
            Are you sure you want to accept this blood request? Once accepted,
            you will be contacted by the recipient.
          </Text>

          {/* Actions */}
          <View className="flex-row justify-between">
            <Pressable
              onPress={handleAcceptRequest}
              style={{
                shadowColor: "#DAE1EB9E",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 30,
                elevation: 10,
              }}
              className={`w-[166px] h-[53px] ${
                loading ? "bg-[#008000]" : "bg-[#008000]"
              } border-2 border-[#23C223] rounded-[10px] shadow-md flex justify-center items-center`}
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white text-[16px] font-bold">
                  Yes, Accept
                </Text>
              )}
            </Pressable>
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
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
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
            Blood Request Accepted
          </Text>
          <Text className="text-center text-[14px] text-[#4C4C4C] mb-6">
            You've accepted this blood request. Click below to view recipient
            and hospital details.
          </Text>

          {/* Close Button */}
          <Pressable
            onPress={closeConfirmationModal}
            className="w-full h-[53px] bg-[#008000] rounded-[10px] flex justify-center items-center"
          >
            <Text className="text-white text-[16px] font-bold">
              View Details
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default AcceptBloodRequest;
