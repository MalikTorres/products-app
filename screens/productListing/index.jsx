import { useContext } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Context } from '../../context';
import ProductListItem from '../../components/productListItem';
import { useNavigation } from '@react-navigation/native';


function createRandomcolor() {
  let letters ='012345679ABCDEF';
  let color = '#'

  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random()*16)];
  }

  return color;
}


export default function ProductListing() {
  const { loading, products } = useContext(Context);

  const navigation = useNavigation()

  if (loading) {
    return <ActivityIndicator  style={styles.loader} color={'red'} size={'large'} />;
  }

  const handleOnPress = (getId) => {
    navigation.navigate('productDetails',{
      productId : getId,
    });
  }
  return (
    <View>
      <FlatList
      data={products}
      renderItem = {(itemData) => (
      <ProductListItem
        title={itemData.item.title}
        bgColor={createRandomcolor()}
        onPress={()=>handleOnPress(itemData.item.id)}
        />
        )}
      keyExtractor={(itemData) => itemData.id}
      numColumns={2}
      />
      <Text>ProductListing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader : {
    flex : 1,
    justifyContent: 'center',
    alignItems : 'center'
  }
})
