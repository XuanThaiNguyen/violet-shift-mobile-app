import { Button } from '@components/button';
import DrawerHeader from '@components/header/DrawerHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import images from '@themes/images';
import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';

enum NOTI_TAB {
  UNREAD = 'unread',
  READ = 'read',
}

const Notification = () => {
  const styles = useStyles();

  const [notiTab, setNotiTab] = useState(NOTI_TAB.UNREAD);

  const onMarkAsRead = () => {
    //
  };

  const _renderRightHeader = () => {
    if (notiTab === NOTI_TAB.READ) {
      return <View style={styles.icon20} />;
    }

    return (
      <Button onPress={onMarkAsRead}>
        <FastImage
          source={images.squareTick}
          style={styles.icon20}
          tintColor={colors.white}
        />
      </Button>
    );
  };

  const onChangeTab = (tab: NOTI_TAB) => () => {
    setNotiTab(tab);
  };

  return (
    <View style={styles.container}>
      <DrawerHeader
        title={
          notiTab === NOTI_TAB.READ
            ? 'Read Notifications'
            : 'Unread Notifications'
        }
        renderRightHeader={_renderRightHeader}
      />
      <View style={styles.notiContent}>
        <Typo variant="semibold_12">No notifications</Typo>
      </View>
      <View style={styles.footer}>
        <View style={styles.notiTab}>
          <Button style={styles.btnTab} onPress={onChangeTab(NOTI_TAB.UNREAD)}>
            <FastImage
              source={images.menu}
              style={styles.icon16}
              tintColor={
                notiTab === NOTI_TAB.UNREAD
                  ? colors.primaryText
                  : colors.secondaryText
              }
            />
            <Typo
              variant={notiTab === NOTI_TAB.UNREAD ? 'medium_10' : 'regular_10'}
              color={
                notiTab === NOTI_TAB.UNREAD
                  ? colors.primaryText
                  : colors.secondaryText
              }
            >
              UNREAD
            </Typo>
          </Button>
          <Button style={styles.btnTab} onPress={onChangeTab(NOTI_TAB.READ)}>
            <FastImage
              source={images.squareTick}
              style={styles.icon16}
              tintColor={
                notiTab === NOTI_TAB.READ
                  ? colors.primaryText
                  : colors.secondaryText
              }
            />
            <Typo
              variant={notiTab === NOTI_TAB.UNREAD ? 'medium_10' : 'regular_10'}
              color={
                notiTab === NOTI_TAB.READ
                  ? colors.primaryText
                  : colors.secondaryText
              }
            >
              READ
            </Typo>
          </Button>
        </View>
        <InsetSubstitute type="bottom" />
      </View>
    </View>
  );
};

export default Notification;
