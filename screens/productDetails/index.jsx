import { ActivityIndicator, StyleSheet, Button, Text, Modal, View, Pressable, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ProductDetailsItem from '../../components/productDetailsItem';

export default function ProductDetails() {

  const route = useRoute()
  const navigation = useNavigation()
  const { productId } = route.params
  console.log(route.params);

  const [loading, setLoading] = useState(false);
  const [productDetailsdata, setProductDetailsdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
          <Button onPress={() => setModalVisible(true)} title='Add favorites' />
        )
      }
    })
  }, [])

  if (loading) {
    return (
      <ActivityIndicator size='large' color={'red'} />
    )
  }

  console.log(productDetailsdata)
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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
})
