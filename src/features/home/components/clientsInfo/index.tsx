import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import { IClient } from '@models/Client';
import { IClientScheduleOfDetailShift } from '@models/Shift';
import { navigationRef } from '@navigation/navigationUtil';
import Screen from '@navigation/screen';
import colors from '@themes/color';
import images from '@themes/images';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ClientsInfoProps {
  clients: IClientScheduleOfDetailShift[];
}

const ClientsInfo = ({ clients = [] }: ClientsInfoProps) => {
  const maxToShow = 2;
  const visibleClients = clients?.length > 0 ? clients.slice(0, maxToShow) : [];
  const remainingCount = clients?.length > 0 ? clients.length - maxToShow : 0;

  const onViewAllClients = () => {
    const _mapClients = clients.map(item => item.client);

    navigationRef.current?.navigate(Screen.AllShiftClients, {
      clients: _mapClients,
    });
  };

  const onViewClient = (client: IClient) => () => {
    navigationRef.current?.navigate(Screen.Profile, {
      mode: 'client',
      clientInfo: client,
    });
  };

  if (clients && clients.length === 0) return <></>;

  if (clients && clients.length === 1)
    return (
      <Button
        onPress={onViewClient(clients[0].client)}
        style={styles.avatarInfo}
      >
        <View style={styles.avatar}>
          <FastImage
            source={images.avatar}
            style={styles.icon32}
            tintColor={colors.white}
          />
        </View>
        <Typo variant="regular_14" color={colors.primaryButton}>
          {clients[0].client.preferredName || ''}
        </Typo>
      </Button>
    );

  return (
    <Button onPress={onViewAllClients} style={styles.container}>
      {visibleClients.map((client, index) => (
        <View
          key={client._id}
          style={[
            styles.avatarWrapper,
            { marginLeft: index === 0 ? 0 : -20 },
            { zIndex: visibleClients.length - index },
          ]}
        >
          <View style={styles.avatar}>
            <FastImage
              source={images.avatar}
              style={styles.icon32}
              tintColor={colors.white}
            />
          </View>
        </View>
      ))}

      {remainingCount > 0 && (
        <View style={[styles.avatar, styles.moreAvatar, styles.moreSpacing]}>
          <View style={styles.moreView}>
            <Typo variant="semibold_12">+{remainingCount}</Typo>
          </View>
        </View>
      )}

      <Spacer width={'smaller'} />

      <Typo variant="regular_14" color={colors.primaryButton}>
        {'View all'}
      </Typo>
    </Button>
  );
};

export default ClientsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
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
  moreAvatar: {
    backgroundColor: '#E5E7EB',
  },
  moreView: {
    position: 'absolute',
    right: 6,
  },
  moreSpacing: {
    marginLeft: -20,
  },
  avatarInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
