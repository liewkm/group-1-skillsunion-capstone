import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { GlobalColors } from '../../utilities/colors'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='white' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalColors.primary700
  }
})

export default LoadingOverlay

