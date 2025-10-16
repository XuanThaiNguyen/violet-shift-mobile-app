import { Button } from '@components/button';
import { Divider } from '@components/divider';
import BackHeader from '@components/header/BackHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IClient } from '@models/Client';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import { navigationRef } from '@navigation/navigationUtil';
import Screen from '@navigation/screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const AllShiftClients = () => {
  const route =
    useRoute<RouteProp<MainStackScreenProps, Screen.AllShiftClients>>();

  const clients = route.params.clients || [];

  const onViewProfile = (client: IClient) => () => {
    navigationRef.current?.navigate(Screen.Profile, {
      clientInfo: client,
      mode: 'client',
    });
  };

  const _renderItem = (client: IClient, index: number) => {
    return (
      <View key={`${client._id}-${index}`}>
        <Button onPress={onViewProfile(client)} style={styles.btnProfile}>
          <View style={styles.viewInfo}>
            <View style={styles.avatar}>
              <FastImage
                source={images.avatar}
                style={styles.icon32}
                tintColor={colors.white}
              />
            </View>
            <Spacer width={'small'} />
            <Typo variant="regular_14" color={colors.primaryButton}>
              {'123123'}
            </Typo>
          </View>

          <FastImage source={images.back} style={styles.icon16} />
        </Button>
        {index === clients.length - 1 ? (
          <></>
        ) : (
          <>
            <Spacer height={12} />
            <Divider />
            <Spacer height={12} />
          </>
        )}
      </View>
    );
  };

  return (
    <View>
      <BackHeader title="All Clients" />
      <Spacer height={20} />
      <View style={styles.container}>{clients.map(_renderItem)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.normal,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon32: {
    width: 32,
    height: 32,
  },
  icon16: {
    width: 16,
    height: 16,
    transform: [{ rotate: '180deg' }],
  },
  btnProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AllShiftClients;
