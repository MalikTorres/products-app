import { Text, View, StyleSheet } from 'react-native';

export default function ProductDetailsItem({productDetailsdata}) {

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{productDetailsdata.title}</Text>
      <Text style={styles.textStyle}>{productDetailsdata.description}</Text>
      <Text style={styles.textStyle}>{productDetailsdata.price}</Text>
      <Text style={styles.textStyle}>{productDetailsdata.rating}</Text>
      <Text style={styles.textStyle}>{productDetailsdata.category}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    margin: 10,
    borderColor: '#88da9e'
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 20,
    paddingBottom: 12
  }
})
