import React, { useEffect, useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  tasteRating: number;
  setTasteRating: (value: number) => void;
  quantityRating: number;
  setQuantityRating: (value: number) => void;
  overallQualityRating: number;
  setOverallQualityRating: (value: number) => void;
  comments: string;
  setComments: (text: string) => void;
  feedbackImages: any[];
  setFeedbackImages: (images: any[]) => void;
  submittingFeedback: boolean;
  feedbackSuccess: boolean;
  foodTags: {
    Too_spicy: boolean;
    Too_oily: boolean;
  };
  toggleTag: (tag: "Too_spicy" | "Too_oily") => void;
  pickImage: () => void;
  removeImage: (index: number) => void;
  submitFeedback: () => void;
  maxImages: number;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onClose,
  tasteRating,
  setTasteRating,
  quantityRating,
  setQuantityRating,
  overallQualityRating,
  setOverallQualityRating,
  comments,
  setComments,
  feedbackImages,
  submittingFeedback,
  feedbackSuccess,
  foodTags,
  toggleTag,
  pickImage,
  removeImage,
  submitFeedback,
  maxImages,
}) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      // Show the modal
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Add back button handler for Android
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          handleClose();
          return true;
        }
      );

      return () => backHandler.remove();
    } else {
      // Hide the modal
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Handle closing the modal
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const renderSlider = (
    value: number,
    setValue: (value: number) => void,
    title: string
  ) => (
    <View style={styles.feedbackRatingContainer}>
      <Text style={styles.feedbackRatingText}>
        {title} (1 Poor - 10 Excellent)
      </Text>

      <View style={styles.feedbackSliderContainer}>
        <Slider
          value={value}
          onValueChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="#CBA652"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#CBA652"
          animateTransitions
          animationType="timing"
          trackStyle={{ height: 6, borderRadius: 6 }}
          thumbStyle={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: "#CBA652",
          }}
          renderAboveThumbComponent={() => (
            <View style={styles.sliderThumbLabel}>
              <Text style={styles.sliderThumbText}>{value}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );

  // Don't render anything if not visible
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.modalContainer}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.feedbackModalHeader}>
          <Text style={styles.feedbackModalTitle}>Give Thaali Feedback</Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {feedbackSuccess ? (
          <View style={styles.successContainer}>
            <Feather name="check-circle" color="#1AB864" size={70} />
            <Text style={styles.feedbackSuccessText}>Feedback Submitted</Text>
            <Text style={styles.feedbackSuccessSubtext}>
              Thank you for your valuable feedback!
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={styles.introText}>
              Maula TUS ni Kushi Mubarak em che ke Mumin Jaman acha ma achu
              jamey, Maula TUS ni kushi mubarak ne nazar ma rakhta huwa aap si
              iltemas che ke jaman nu feedback aapiye. Shukran
            </Text>

            {/* Taste Rating */}
            {renderSlider(tasteRating, setTasteRating, "Taste of Food")}

            {/* Quantity Rating */}
            {renderSlider(
              quantityRating,
              setQuantityRating,
              "Quantity of Food"
            )}

            {/* Overall Quality */}
            {renderSlider(
              overallQualityRating,
              setOverallQualityRating,
              "Overall Quality of Food"
            )}

            {/* Food Tags */}
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsTitle}>Food was (optional):</Text>
              <View style={styles.tagsWrapper}>
                {Object.keys(foodTags).map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagButton,
                      {
                        backgroundColor: foodTags[tag as keyof typeof foodTags]
                          ? "rgba(203, 166, 82, 0.1)"
                          : "transparent",
                      },
                    ]}
                    onPress={() => toggleTag(tag as "Too_spicy" | "Too_oily")}
                  >
                    <View
                      style={[
                        styles.tagCheckbox,
                        {
                          backgroundColor: foodTags[
                            tag as keyof typeof foodTags
                          ]
                            ? "#CBA652"
                            : "transparent",
                        },
                      ]}
                    >
                      {foodTags[tag as keyof typeof foodTags] && (
                        <Entypo color="white" size={16} name="check" />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.tagText,
                        {
                          fontWeight: foodTags[tag as keyof typeof foodTags]
                            ? "600"
                            : "500",
                        },
                      ]}
                    >
                      {tag.split("_")[0]} {tag.split("_")[1]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Comments */}
            <TextInput
              style={styles.feedbackInput}
              multiline={true}
              numberOfLines={4}
              placeholder="Write your comments here..."
              placeholderTextColor="gray"
              value={comments}
              onChangeText={setComments}
            />

            {/* Upload Photos */}
            <Text style={styles.uploadTitle}>Upload Photos</Text>
            <Text style={styles.uploadSubtitle}>
              You can upload screenshots to help us understand your feedback
              better. This is optional but highly appreciated.
            </Text>

            <View style={styles.uploadContainer}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.feedbackUploadButton}
              >
                <MaterialCommunityIcons
                  name="image-plus"
                  size={40}
                  color="#CBA652"
                />
                <Text style={styles.uploadButtonText}>Browse Images</Text>
              </TouchableOpacity>

              <Text style={styles.maxSizeHint}>Max 10MB files are allowed</Text>

              {feedbackImages.length > 0 && (
                <View style={styles.selectedImagesContainer}>
                  <Text style={styles.selectedImagesText}>
                    Selected Images ({feedbackImages.length}/{maxImages})
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: "row" }}
                  >
                    <View style={styles.imagesRow}>
                      {feedbackImages.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                          <Image
                            source={{ uri: image.uri }}
                            style={styles.imagePreview}
                          />
                          <TouchableOpacity
                            onPress={() => removeImage(index)}
                            style={styles.removeImageButton}
                          >
                            <MaterialCommunityIcons
                              name="close"
                              size={15}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                      {feedbackImages.length < maxImages && (
                        <TouchableOpacity
                          onPress={pickImage}
                          style={styles.addMoreImagesButton}
                        >
                          <MaterialCommunityIcons
                            name="plus"
                            size={30}
                            color="#CBA652"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Submit Button */}
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                style={styles.feedbackSubmitButton}
                onPress={submitFeedback}
                disabled={submittingFeedback}
              >
                {submittingFeedback ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.feedbackSubmitText}>Submit Feedback</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  feedbackModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.accent,
  },
  introText: {
    fontSize: 14,
    color: "black",
    marginBottom: 15,
  },
  feedbackRatingContainer: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
  feedbackRatingText: {
    color: "#CBA652",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 15,
  },
  feedbackSliderContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  sliderThumbLabel: {
    width: 20,
    height: 20,
    borderRadius: 12.5,
    backgroundColor: "#CBA652",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -5,
  },
  sliderThumbText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tagsContainer: {
    marginBottom: 15,
  },
  tagsTitle: {
    color: "#CBA652",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  tagButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#CBA652",
  },
  tagCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CBA652",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tagText: {
    color: "#CBA652",
  },
  feedbackInput: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    color: "black",
    height: 120,
    textAlignVertical: "top",
    borderColor: "#CBA652",
    borderWidth: 1,
    fontSize: 15,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.accent,
    marginTop: 20,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
  uploadContainer: {
    gap: 10,
    marginTop: 10,
  },
  feedbackUploadButton: {
    borderWidth: 2,
    borderColor: "#CBA652",
    borderStyle: "dashed",
    borderRadius: 10,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  uploadButtonText: {
    color: "#CBA652",
    marginTop: 10,
    fontWeight: "500",
  },
  maxSizeHint: {
    color: "grey",
    fontSize: 12,
    textAlign: "center",
  },
  selectedImagesContainer: {
    gap: 10,
  },
  selectedImagesText: {
    color: "#CBA652",
    fontSize: 14,
    fontWeight: "500",
  },
  imagesRow: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    borderColor: "#CBA652",
    borderWidth: 1,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    padding: 5,
  },
  addMoreImagesButton: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBA652",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  feedbackSubmitButton: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackSubmitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 250,
  },
  feedbackSuccessText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
  feedbackSuccessSubtext: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
    marginTop: 10,
  },
});

export default FeedbackModal;
