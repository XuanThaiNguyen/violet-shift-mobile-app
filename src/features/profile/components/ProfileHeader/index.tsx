import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IClient } from '@models/Client';
import { IUser } from '@models/User';
import colors from '@themes/color';
import images from '@themes/images';
import { getFullName } from '@utils/handleStrings';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const ProfileHeader = ({ dataProfile }: { dataProfile: IUser | IClient }) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatar}>
        <FastImage
          source={images.avatar}
          style={styles.icon32}
          tintColor={colors.white}
        />
      </View>
      <Spacer width={'large'} />
      <Typo variant="semibold_16" color={colors.primaryButton}>
        {dataProfile ? getFullName(dataProfile) : ''}
      </Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: SpacingDefault.normal,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon32: {
    width: 36,
    height: 36,
  },
});

export default ProfileHeader;
