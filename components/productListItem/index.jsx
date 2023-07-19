import { Pressable, Text, View, StyleSheet } from 'react-native';

export default function ProductListItem({ title, onPress, bgColor }) {

  return (
    <View style={styles.productItemOuterContainer}>
      <Pressable android_ripple={{color: '#cad346'}}onPress={onPress} style={{...styles.pressableView, backgroundColor: bgColor}}>
        <View style={styles.productItemInnerContainer}>
          <Text numberOflines={1} ellipsizeMode='tail' style={styles.title}>
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  productItemOuterContainer: {
    flex: 1,
    margin: 16,
    height: 160,
    borderRadius: 8

  },
  pressableView: {
    flex: 1
  },
  productItemInnerContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000'
  }
})

