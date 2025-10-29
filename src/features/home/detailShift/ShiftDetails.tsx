import { Button } from '@components/button';
import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '@themes/color';
import images from '@themes/images';
import { getFullName } from '@utils/handleStrings';
import useAuthStore from '@zustand/authStore';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ClientsInfo from '../components/clientsInfo';
import {
  useGetClientSchedulesOfDetailShift,
  useGetDetailShift,
} from '../hooks';

interface ShiftDetailsProps {
  shiftId: string;
}

const ShiftDetails = ({ shiftId }: ShiftDetailsProps) => {
  const { navigate } =
    useNavigation<NavigationProp<MainStackScreenProps, Screen.ShiftManager>>();

  const { currentUser } = useAuthStore();

  const { data: dataDetailShift } = useGetDetailShift({ shiftId });

  const { data: dataClientSchedules, isLoading: isLoadingClientSchedules } =
    useGetClientSchedulesOfDetailShift({
      shiftId,
    });

  const _shiftDate = `${dayjs(dataDetailShift?.data?.timeFrom).format(
    'dddd',
  )}\n${dayjs(dataDetailShift?.data?.timeFrom).format('MMM Do YYYY')}`;

  const _shiftRangeTime = `${dayjs(dataDetailShift?.data?.timeFrom).format(
    'h:mm A',
  )} - ${dayjs(dataDetailShift?.data?.timeTo).format('h:mm A')}`;

  const onViewMyself = () => {
    navigate(Screen.Profile, { mode: 'mine' });
  };

  return (
    <View>
      {/* <View style={styles.viewMap}>
        <Typo variant="bold_20" color={colors.white}>
          This is map
        </Typo>
      </View> */}
      {!isLoadingClientSchedules ? (
        <View style={styles.viewUser}>
          <View style={styles.viewBoxUser}>
            <Typo center variant="medium_14">
              STAFF
            </Typo>
            <Button onPress={onViewMyself} style={styles.avatarInfo}>
              <View style={styles.avatar}>
                <FastImage
                  source={images.avatar}
                  style={styles.icon32}
                  tintColor={colors.white}
                />
              </View>
              <Typo variant="regular_14" color={colors.primaryButton}>
                {currentUser ? getFullName(currentUser) : ''}
              </Typo>
            </Button>
          </View>
          <View style={styles.viewBoxUser}>
            <Typo center variant="medium_14">
              CLIENT
            </Typo>
            <ClientsInfo clients={dataClientSchedules?.data || []} />
          </View>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.viewDetail}>
        <Spacer height={16} />
        <Typo variant="semibold_14">Details</Typo>
        <Spacer height={20} />
        <View style={styles.detailItem}>
          <View style={styles.detailItemTitle}>
            <FastImage source={images.date} style={styles.icon16} />
            <Typo variant="regular_14">Date</Typo>
          </View>
          <View>
            <Typo variant="regular_14">{_shiftDate}</Typo>
          </View>
        </View>
        <Spacer height={16} />
        <View style={styles.detailItem}>
          <View style={styles.detailItemTitle}>
            <FastImage source={images.time} style={styles.icon16} />
            <Typo variant="regular_14">Time</Typo>
          </View>
          <View>
            <Typo variant="regular_14">{_shiftRangeTime}</Typo>
          </View>
        </View>
        <Spacer height={16} />
        <View style={styles.detailItem}>
          <View style={styles.detailItemTitle}>
            <FastImage source={images.location} style={styles.icon16} />
            <Typo variant="regular_14">Location</Typo>
          </View>
          <View style={styles.block}>
            <Typo variant="regular_14">
              {dataDetailShift?.data?.address || 'Address'}
            </Typo>
          </View>
        </View>
        <Spacer height={16} />
        <View style={styles.viewInstructions}>
          <View style={styles.instructTitle}>
            <FastImage
              source={images.danger}
              style={styles.icon16}
              tintColor={colors.red}
            />
            <Typo variant="medium_14">Instructions</Typo>
          </View>
          <Typo variant="medium_14" color={colors.primaryButton}>
            View
          </Typo>
        </View>
        <Spacer height={20} />
        <Typo variant="semibold_14">More Actions</Typo>
        <Spacer height={16} />
        <View style={styles.actionsItem}>
          <View style={styles.actionsItemTitle}>
            <FastImage source={images.menu} style={styles.icon16} />
            <Typo variant="regular_14">Shift related forms</Typo>
          </View>
          <FastImage source={images.back} style={styles.iconBack} />
        </View>
        <Spacer height={8} />
        <Divider />
        <Spacer height={8} />
        <View style={styles.actionsItem}>
          <View style={styles.actionsItemTitle}>
            <FastImage source={images.menu} style={styles.icon16} />
            <Typo variant="regular_14">Signatures</Typo>
          </View>
          <FastImage source={images.back} style={styles.iconBack} />
        </View>
        <Spacer height={16} />
      </View>
    </View>
  );
};

export default ShiftDetails;

const MAP_WIDTH = SpacingDefault.width;
const MAP_HEIGHT = (SpacingDefault.width * 254) / 405;

const styles = StyleSheet.create({
  viewMap: {
    backgroundColor: colors.blue,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBoxUser: {
    paddingHorizontal: SpacingDefault.normal,
    paddingVertical: 16,
    backgroundColor: colors.background,
    gap: 8,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    flex: 1,
  },
  avatarInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetail: {
    paddingHorizontal: SpacingDefault.normal,
    backgroundColor: colors.white,
  },
  detailItem: {
    flexDirection: 'row',
    height: 36,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  detailItemTitle: {
    flexDirection: 'row',
    gap: SpacingDefault.small,
    width: '40%',
  },
  block: {
    flex: 1,
  },
  viewInstructions: {
    paddingVertical: 20,
    paddingHorizontal: SpacingDefault.small,
    backgroundColor: '#e7ebf3',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instructTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.small,
  },
  actionsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionsItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.small,
  },
  iconBack: {
    width: 16,
    height: 16,
    transform: [{ rotate: '180deg' }],
  },
});
