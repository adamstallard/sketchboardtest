// @flow

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';

/**
 * Notification Card in the Notifications Screen
 * each Notification should have:
 * @prop msg
 * @prop icon
 */

type Props = {
  navigation: { navigate: () => null },
};


class NotificationCard extends React.Component<Props> {

  render() {
    const { navigation, msg, icon } = this.props;

    return (
      <TouchableOpacity
          onPress={() => {
            navigation.navigate('Backup');
          }}
      >
        <View style={{ ...styles.container }}>
          <Ionicon size={32} style={styles.itemIcon} name={icon} color="#ccc" />
          <Text style={styles.msg}>{msg}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  msg: {
    fontFamily: 'ApexNew-Book',
    color: 'black',
    fontSize: 24,
    marginLeft: 20,
  },
  itemIcon: {
    // margin: 16,
  },
});

export default connect()(NotificationCard);