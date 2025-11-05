import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { IShiftProgressEvent } from '@models/Shift';
import colors from '@themes/color';
import images from '@themes/images';
import { capitalizeFirst } from '@utils/handleStrings';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ShiftProgressEventItemProps {
  item: IShiftProgressEvent;
  fullNameUser: string;
}

const ShiftProgressEventItem = ({
  item,
  fullNameUser,
}: ShiftProgressEventItemProps) => {
  return (
    <View style={styles.progressItem}>
      <View style={styles.viewIcon}>
        <FastImage
          source={images.note}
          style={styles.icon16}
          tintColor={colors.white}
        />
      </View>
      <View style={styles.viewTxt}>
        <Typo variant="medium_14">
          <Typo variant="bold_14">Time:</Typo> {dayjs(item.createdAt).fromNow()}
        </Typo>
        <Spacer height={8} />
        <Typo variant="medium_14">
          <Typo variant="bold_14">Action:</Typo>{' '}
          {item.action === 'created' ? 'Create' : 'Update'}
        </Typo>
        <Spacer height={8} />
        {item.action === 'created' ? (
          <Typo variant="medium_14">
            {fullNameUser} created a new{' '}
            {capitalizeFirst(item.shiftProgressType)} progress
          </Typo>
        ) : (
          <></>
        )}
        {item.action === 'updated' ? (
          <>
            <Typo variant="medium_14">
              {fullNameUser} updated {capitalizeFirst(item.shiftProgressType)}{' '}
              progress
            </Typo>
            <Spacer height={8} />
            {item.changes &&
              Object.entries(item.changes).map(
                ([field, { old, new: newValue }]) => (
                  <View
                    key={field}
                    style={{
                      marginBottom: 8,
                      marginRight: SpacingDefault.normal,
                    }}
                  >
                    <Typo variant="medium_14">
                      Changed <Typo variant="bold_14">{field}</Typo> from{' '}
                      <Typo variant="bold_14">{`"${old}"`}</Typo> to{' '}
                      <Typo variant="bold_14">{`"${newValue}"`}</Typo>
                    </Typo>
                  </View>
                ),
              )}
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressItem: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 4,
    paddingHorizontal: SpacingDefault.normal,
    gap: SpacingDefault.normal,
  },
  icon16: {
    width: 16,
    height: 16,
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

export default ShiftProgressEventItem;
