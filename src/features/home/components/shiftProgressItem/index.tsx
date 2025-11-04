import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IShiftProgress } from '@models/Shift';
import { navigationRef } from '@navigation/navigationUtil';
import Screen from '@navigation/screen';
import colors from '@themes/color';
import images from '@themes/images';
import { capitalizeFirst, getFullName } from '@utils/handleStrings';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ShiftProgressItemProps {
  item: IShiftProgress;
  shiftId: string;
}

const ShiftProgressItem = ({ item, shiftId }: ShiftProgressItemProps) => {
  const _fullName = getFullName(item.client);

  let defaultAttachmentTxt = 'No attachment';
  if (item.url.length === 1) {
    defaultAttachmentTxt = '1 attachment';
  }
  if (item.url.length > 1) {
    defaultAttachmentTxt = `${item.url.length} attachments`;
  }

  const onDetail = () => {
    navigationRef.current?.navigate(Screen.ProgressDetail, {
      shiftId,
      shiftProgressId: item._id,
    });
  };

  return (
    <Button onPress={onDetail} style={styles.progressItem}>
      <View style={styles.viewIcon}>
        <FastImage
          source={images.note}
          style={styles.icon16}
          tintColor={colors.white}
        />
      </View>
      <View style={styles.viewTxt}>
        <Typo variant="medium_14">
          <Typo variant="bold_14">Type:</Typo>{' '}
          {capitalizeFirst(item.shiftProgressType)}
        </Typo>
        <Spacer height={8} />
        <Typo variant="medium_14">
          <Typo variant="bold_14">Client:</Typo> {_fullName}
        </Typo>
        <Spacer height={8} />
        <Typo variant="medium_14">
          <Typo variant="bold_14">Description:</Typo>{' '}
          {item.description || 'No description'}
        </Typo>
        <Spacer height={8} />
        <Button style={styles.btnAttach}>
          <Typo variant="semibold_12">{defaultAttachmentTxt}</Typo>
        </Button>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  icon16: {
    width: 16,
    height: 16,
  },
  progressItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: SpacingDefault.normal,
    gap: SpacingDefault.normal,
    marginBottom: 12,
  },
  btnAttach: {
    paddingVertical: 8,
    paddingHorizontal: SpacingDefault.small,
    borderWidth: 0.5,
    borderColor: colors.divider,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTxt: {
    marginRight: SpacingDefault.normal,
  },
});

export default ShiftProgressItem;
