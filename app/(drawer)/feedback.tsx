import { ScrollView, StatusBar, View, Text, TouchableOpacity, Image, PermissionsAndroid, Modal, ActivityIndicator, StyleSheet ,TextInput} from 'react-native'
import React, { useState, useCallback } from "react";
import ThemedBackground from "@/components/ThemedBackground";
import { Colors } from "@/constants/Colors";
import UploadCard from "@/components/upload/UploadCard";
import RoundedButton from "@/components/buttons/RoundedButton";
import { Slider } from '@miblanchard/react-native-slider';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import { Feather } from '@expo/vector-icons';
import client from "@/connection/client"
import { useSelector } from 'react-redux';
const maxImages=7
const primary = '#CBA652'
const Feedback = () => {
  const [value, setValue] = useState(1);
  const [quantityRating, setquantityRating] = useState(1)
  const [overall_quality, setoverall_quality] = useState(1)
  const [loading, setloading] = useState(false)
  const [images, setImages] = useState([])
  const [foodTags, setFoodTags] = useState({
    Too_hot: false,
    Too_spicy: false,
    Too_oily: false,
  });
  const familyId = useSelector((state: any) => state.user.family_id);
  const jamiatId=useSelector((state:any)=>state.user.jamiat_id)
  const user_id=useSelector((state:any)=>state.user.id)
  const [comments, setcomments] = useState('')
  const requestGalleryPermission = async () => {
    try {
      console.log("permission")
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: "Gallery Permission",
          message: "App needs access to your gallery to upload images",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };


  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
     

    const options = {
      mediaType: 'photo',
      selectionLimit: maxImages - images.length,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        alert('ImagePicker Error: ' + response.errorMessage);
        return;
      }

      if (response.assets) {
        if (images.length + response.assets.length > maxImages) {
          alert('You can only upload up to '+maxImages+'images');
          return;
        }
        setImages([...images, ...response.assets]);
      }
    });
  }

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  
  const toggleTag = (tag) => {
    setFoodTags(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };
  const getTodayDate=()=>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const submit=async()=>{
    if(!quantityRating||!value||!overall_quality||comments.length===0){
     alert("Please fill all the required fields")
      return;
    }
    try {
      console.log("submit")
      const formData = new FormData();
      setloading(true)
    const {data:res,status}=await client.post('/menus/by-date',{
      "date": getTodayDate(),
    })
    if(status===200){
      if(res.menu.length>0){
        const id=res.menu[0].id
        let foodTagsString=""
      Object.keys(foodTags).map((tag)=>{
          if(foodTags[tag]){
            foodTagsString+=tag+","
          }
        })
        if(foodTagsString.length>0){
          foodTagsString=foodTagsString.substring(0,foodTagsString.length-1)
        }
        formData.append('menu_id',id)
        formData.append('jamiat_id',jamiatId)
        formData.append('family_id',"4")
        formData.append('user_id',user_id)
        formData.append('food_taste',value+"")
        formData.append('food_quantity',quantityRating+"")
        formData.append('food_quality',overall_quality+"")
        formData.append('others',foodTagsString)
        images.map((image,index)=>{
          formData.append('image[]',{
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          })
        })
        formData.append('date',getTodayDate())
        formData.append('remarks',comments)
        console.log(formData)
        const {data:feedbackRes,status:feedbackStatus}=await client.post('/feedbacks/add',formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          },
        })
        if(status===200){
          console.log(feedbackRes)
          onsubmit()
        }
      }else{
        alert("Menu not found for today")
      }

    }
    else{
      alert("Something went wrong")
    }
    } catch (error) {
      console.log(error)
      
    }finally{
      setloading(false)
    }
    
  }
  const renderContent = useCallback(() => {
    return (
      <>
       
        <Text style={styles.title}>Give Us Your Feedback</Text>
        <Text style={{fontSize:14,color:'black'}}>
        {'Maula TUS ni Kushi Mubarak em che ke Mumin Jaman acha ma achu jamey, Maula TUS ni kushi mubarak ne nazar ma rakhta huwa aap si iltemas che ke jaman nu feedback aapiye. Shukran'}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Taste of Food ( 1 Poor - 10 Excellent)</Text>
          
          <View style={styles.sliderContainer}>
            <Slider
              value={value}
              onValueChange={value => setValue(Array.isArray(value) ? value[0] : value)}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#CBA652"
              maximumTrackTintColor="#8E8E93"
              thumbTintColor="#CBA652"
              animateTransitions
              animationType="timing"
              thumbStyle={{ width: 15, height: 15, borderRadius: 12.5 , backgroundColor: "#CBA652"}}
              renderAboveThumbComponent	= {() => (
                <View style={{ width: 25, height: 25, borderRadius: 12.5, backgroundColor: "#CBA652",alignItems:'center',justifyContent:'center' }} >
                  <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: "#FFFFFF" }}>{value}</Text>
                </View>
              )}  
            />
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Quantity of Food ( 1 Poor - 10 Excellent)</Text>
          
          <View style={styles.sliderContainer}>
            <Slider
              value={quantityRating}
              onValueChange={quantityRating => setquantityRating(Array.isArray(quantityRating) ? quantityRating[0] : quantityRating)}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#CBA652"
              maximumTrackTintColor="#8E8E93"
              thumbTintColor="#CBA652"
              animateTransitions
              animationType="timing"
              thumbStyle={{ width: 15, height: 15, borderRadius: 12.5 , backgroundColor: "#CBA652"}}
              renderAboveThumbComponent	= {() => (
                <View style={{ width: 25, height: 25, borderRadius: 12.5, backgroundColor: "#CBA652",alignItems:'center',justifyContent:'center' }} >
                  <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: "#FFFFFF" }}>{quantityRating}</Text>
                </View>
              )}  
            />
          </View>
        </View>
        <View>
          <Text style={[styles.ratingText,{marginBottom:10}]}>Food was (optional) :</Text>
          <View style={styles.checkboxContainer}>
            {Object.keys(foodTags).map((tag) => (
              <TouchableOpacity 
                key={tag}
                style={[
                  styles.checkboxItem,
                  foodTags[tag] && styles.checkboxItemSelected
                ]}
                onPress={() => toggleTag(tag)}
              >
                <View style={[
                  styles.checkbox,
                  foodTags[tag] && styles.checkboxSelected
                ]}>
                  {foodTags[tag] && <Entypo color={"white"} size={16} name="check" />}
                </View>
                <Text style={[
                  styles.checkboxText,
                  foodTags[tag] && styles.checkboxTextSelected
                ]}>{tag.split('_')[0]}{' '}{tag.split('_')[1]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Overall Quality of Food ( 1 Poor - 10 Excellent)</Text>
          
          <View style={styles.sliderContainer}>
            <Slider
              value={overall_quality}
              onValueChange={overall_quality => setoverall_quality(Array.isArray(overall_quality) ? overall_quality[0] : overall_quality)}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#CBA652"
              maximumTrackTintColor="#8E8E93"
              thumbTintColor="#CBA652"
              animateTransitions
              animationType="timing"
              thumbStyle={{ width: 15, height: 15, borderRadius: 12.5 , backgroundColor: "#CBA652"}}
              renderAboveThumbComponent	= {() => (
                <View style={{ width: 25, height: 25, borderRadius: 12.5, backgroundColor: "#CBA652",alignItems:'center',justifyContent:'center' }} >
                  <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: "#FFFFFF" }}>{overall_quality}</Text>
                </View>
              )}  
            />
          </View>
        </View>
        <TextInput
         style={{
           width:"100%",
           marginTop:10,
           backgroundColor:'white',
           padding:15,
           borderRadius:15,
           color:'black',
           height: 150,
           textAlignVertical: 'top',
           borderColor:'#CBA652',
           borderWidth:1,
           fontSize:15
         }}
         multiline={true}
         numberOfLines={4}
         placeholder={"Write your comments here..."}
         placeholderTextColor={"black"}
         value={comments}
         onChangeText={(text) => setcomments(text)}
        />
        
        
        <Text style={styles.title}>Upload Photos</Text>
        <Text style={styles.subtitle}>
          You can upload screenshots to help us understand your feedback better.
          This is optional but highly appreciated.
        </Text>
        
        <View style={{gap:10, marginTop:10}}>
           
            <TouchableOpacity 
              onPress={pickImage}
              style={{
                borderWidth: 2,
                borderColor: "#CBA652",
                borderStyle: 'dashed',
                borderRadius: 10,
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5'
              }}
            >
              <Icon name="image-plus" size={40} color={primary} />
              <Text style={{
                fontFamily: "Poppins-Medium",
                color: primary,
                marginTop: 10
              }}>
                Browse Images
              </Text>
            </TouchableOpacity>
            
            <Text style={{
              fontFamily: "Poppins-Regular",
              color: 'grey',
              fontSize: 12,
              textAlign: 'center'
            }}>
              Max 10MB files are allowed
            </Text>

            {images.length > 0 && (
              <View style={{gap: 10}}>
                <Text style={{
                  fontFamily: "Poppins-Medium",
                  color: primary,
                  fontSize: 14
                }}>
                  Selected Images ({images.length}/{maxImages})
                </Text>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={{flexDirection: 'row'}}
                >
                  <View style={{flexDirection: 'row', gap: 10, paddingVertical: 10}}>
                    {images.map((image, index) => (
                      <View key={index} style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        overflow: 'hidden',
                        position: 'relative',
                        borderColor:primary,
                        borderWidth:1
                      }}>
                        <Image
                          source={{ uri: image.uri }}
                          style={{
                            width: '100%',
                            height: '100%',
                            
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: 15,
                            padding: 5
                          }}
                        >
                          <Icon name="close" size={15} color="white" />
                        </TouchableOpacity>
                      </View>
                    ))}
                    {images.length < maxImages && (
                      <TouchableOpacity
                        onPress={pickImage}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: primary,
                          borderStyle: 'dashed',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Icon name="plus" size={30} color={primary} />
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        <View style={{ height: 20 }} />
        <RoundedButton 
          title={!loading?"Submit Feedback":"Submitting..."} 
          onPress={() => {
            // Add any submission logic here
            submit()
          }}
        />
      </>
    );
  }, [value, quantityRating, foodTags,overall_quality,images,comments,loading]);
  const [isDialogBox, setisDialogBox] = useState(false);
  const onsubmit = () => {
    setisDialogBox(true)
    setTimeout(() => {
      setisDialogBox(false)
    }, 3000);
  }

  return (
    <ThemedBackground>
      <View style={styles.safeContainer}>
      {isDialogBox&&<View style={{width:'100%',position:'absolute',padding:15,zIndex:2}}>
         <View style={{width:"100%",borderRadius:25,backgroundColor:"white",flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,borderWidth:1,borderColor:primary}}>
             <Feather name='check-circle' color={'#1AB864'} size={30} />
             <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',marginLeft:10}}>
              <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>
                Feedback Submitted
              </Text>
              <Text style={{fontSize:14,fontWeight:'400',color:'grey'}}>
              Thank you for your feedback!             
               </Text>
             </View>
             <TouchableOpacity onPress={()=>{setisDialogBox(false)}}> 
        <Entypo name='cross' color={'grey'} size={30} />
        </TouchableOpacity>
         </View>
         
        </View>}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </ThemedBackground>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    width: '100%',
  },
  container: { 
    flex: 1, 
    alignSelf: "stretch",
  },
  contentContainer: {
    flexGrow: 1, 
    padding: 10, 
    gap: 10
  },
  title: {
    fontSize: 20,
    color: Colors.light.accent,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.light.black,
  },
  ratingContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 5,
  },
  ratingText: {
    color: "#CBA652",
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 25,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  valueText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: "#CBA652"
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    alignItems:'center',
    justifyContent:"space-evenly"
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBA652',
    backgroundColor: 'transparent',
  },
  checkboxItemSelected: {
    backgroundColor: 'rgba(203, 166, 82, 0.1)',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CBA652',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#CBA652',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  checkboxText: {
    color: '#CBA652',
    fontWeight: '500',
  },
  checkboxTextSelected: {
    fontWeight: '600',
  },
});
