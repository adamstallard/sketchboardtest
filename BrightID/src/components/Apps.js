// @flow

import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';

import api from '../Api/BrightId';

class Apps extends React.Component<Props> {
  static navigationOptions = () => ({
    title: 'Apps',
    headerRight: <View />,
  });

  async componentDidMount() {
    if (this.props.navigation.state.params) { // if 'params' is defined, the user came through a deep link
      const { host, context, id } = this.props.navigation.state.params;
      const oldHost = api.baseUrl;
      let contextInfo;
      try {
        api.baseUrl = host;
        contextInfo = await api.getContext(context);
      } catch (e) {
        console.log(e);
      } finally {
        api.baseUrl = oldHost;
      }

      if (contextInfo && contextInfo.verification) {
        Alert.alert(
          'App Verification?',
          `Do you want to allow ${context} to link the account with id ${id} to your BrightID verification?`,
          [
            {
              text: 'Yes',
              onPress: () => this.linkVerification(host, context, contextInfo, id),
            },
            {
              text: 'No',
              style: 'cancel',
              onPress: () => {
                this.props.navigation.goBack();
              },
            },
          ],
        );
      } else {
        this.props.navigation.goBack();
      }
    }
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }

  async linkVerification(host, context, contextInfo, id) {
    const oldHost = api.baseUrl;
    try {
      api.baseUrl = host;
      const verification = await api.getVerification(context, id);
      const response = await fetch(`${contextInfo.verificationUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(verification),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (e) {
      Alert.alert(
        `App verification failed`,
        `${e.message}\n${e.stack || ''}`,
        [
          {
            text: 'Dismiss',
            style: 'cancel',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ],
      );
    } finally {
      api.baseUrl = oldHost;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default connect((state) => state.main)(Apps);
