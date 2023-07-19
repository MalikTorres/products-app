import { ActivityIndicator, StyleSheet, Button, Text, Modal, View, Pressable, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState, useContext } from 'react';
import ProductDetailsItem from '../../components/productDetailsItem';
import { Context } from '../../context';

export default function ProductDetails() {

  const route = useRoute()
  const navigation = useNavigation()
  const { productId } = route.params


  const { addToFavorites, favoriteItems } = useContext(Context)

  const [loading, setLoading] = useState(false);
  const [productDetailsdata, setProductDetailsdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('')

  const isCurrentItemIsPresentInFavoriteItemsArray = favoriteItems && favoriteItems.length > 0 ? favoriteItems.filter(item => item.id === productId) : false

  useEffect(() => {

    setLoading(true)

    async function getDataFromApi() {
      const apiRes = await fetch(`https://dummyjson.com/products/${productId}`)
      const finalResult = await apiRes.json()

      if (finalResult) {
        setLoading(false)
        setProductDetailsdata(finalResult);
      }

    }
    getDataFromApi();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button onPress={() => setModalVisible(true)}
            title={
              isCurrentItemIsPresentInFavoriteItemsArray.length > 0
              ? 'Update Favorites'
              : 'Add Favorites'
            }
          />
        );
      },
    });
  }, []);

  const handleOnChange = (enteredText) => {
    setReason(enteredText);
  }

  if (loading) {
    return (
      <ActivityIndicator size='large' color={'red'} />
    )
  }


  return (
    <View>
      <ProductDetailsItem productDetailsdata={productDetailsdata} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // <TextInput

        // />
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder='Do You Like This Product ?'
              onChangeText={handleOnChange}
              value={reason}
              style={styles.reasonTextInput}
            />
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  addToFavorites(productId, reason)
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>{
                isCurrentItemIsPresentInFavoriteItemsArray && isCurrentItemIsPresentInFavoriteItemsArray > 0

                ? 'Update'
                : 'Add'}

                </Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonWrapper: {
    flexDirection: 'row'
  },
  button: {
    borderRadius: 1,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    maringRIght: 5
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    maringLeft: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  reasonTextInput: {
    borderRadius: 1,
    borderWidth: 1,
    padding: 10,

  }
})
