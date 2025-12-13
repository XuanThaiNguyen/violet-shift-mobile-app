import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import {
  AvailabilityTypeEnum,
  IAvailibility,
  WeekDataAvailibility,
} from '@models/Availibility';
import { ApiStatus } from '@services/ApiStatus';
import { availibilityService } from '@services/availibility';
import { showErrorMessage } from '@services/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@themes/color';
import { EMPTY_STRING } from '@themes/constant';
import images from '@themes/images';
import { formatTimeRange } from '@utils/handleDateTime';
import { AxiosError } from 'axios';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface AvailibilityItemProps {
  item: WeekDataAvailibility;
  dateLabel: string;
  dayLabel: string;
}

const AvailibilityItem = ({
  dateLabel,
  dayLabel,
  item,
}: AvailibilityItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: mutateRemoveLeave, isPending: isPendingRemoveLeave } =
    useMutation({
      mutationFn: availibilityService.removeLeave,
      onSuccess: data => {
        if (data.status === ApiStatus.OK) {
          queryClient.invalidateQueries({ queryKey: ['myAvailibilities'] });
        }
      },
      onError: (error: AxiosError) => {
        showErrorMessage(error);
      },
    });

  const onRemoveLeave = (leaveId: string) => () => {
    mutateRemoveLeave(leaveId);
  };

  const renderLeaves = (leave: IAvailibility, index: number) => {
    const isAvailableLeave = leave.type === AvailabilityTypeEnum.AVAILABLE;

    return (
      <View
        key={leave._id}
        style={[styles.btnLeave, isAvailableLeave && styles.btnAvailable]}
      >
        <View style={styles.viewLeave}>
          <View style={styles.viewApproved}>
            <FastImage
              source={images.calendar}
              style={styles.icon16}
              tintColor={isAvailableLeave ? '#017458' : '#cd2334'}
            />
            <Typo
              variant="semibold_14"
              color={isAvailableLeave ? '#017458' : '#cd2334'}
            >
              {isAvailableLeave ? 'Available' : 'Unavailable'}
            </Typo>
          </View>
          {isAvailableLeave ? (
            <></>
          ) : (
            <View style={styles.viewAccept}>
              <FastImage
                source={images.circleCheck}
                style={styles.icon16}
                tintColor={leave.isApproved ? '#017458' : '#cd2334'}
              />
              <Typo variant="semibold_14">
                {leave.isApproved ? 'Approved' : 'Unapproved'}
              </Typo>
            </View>
          )}
        </View>
        <Spacer height={8} />
        <Typo variant="semibold_12" color={colors.primaryText}>
          {formatTimeRange(leave.from, leave.to)}
        </Typo>
        {isAvailableLeave ? (
          <></>
        ) : (
          <>
            <Spacer height={8} />
            <Typo variant="semibold_12" color={colors.primaryText}>
              {leave?.note || EMPTY_STRING}
            </Typo>
            <Spacer height={8} />
            <Button onPress={onRemoveLeave(leave._id)} style={styles.btnRemove}>
              <Typo variant="semibold_12" color={'#cd2334'}>
                Remove
              </Typo>
            </Button>
          </>
        )}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Typo variant="medium_10" color={colors.secondaryText}>
        No Leaves
      </Typo>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <Typo center variant="medium_16" color={colors.black}>
          {dateLabel}
        </Typo>
        <Typo center variant="medium_16" color={colors.black}>
          {dayLabel}
        </Typo>
      </View>

      <View style={styles.rightPart}>
        {item?.leaves?.length > 0
          ? item.leaves.map(renderLeaves)
          : renderEmpty()}
      </View>
    </View>
  );
};

export default AvailibilityItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftPart: {
    width: SpacingDefault.width * 0.15,
    alignItems: 'center',
  },
  rightPart: {
    flex: 1,
    marginRight: SpacingDefault.normal,
  },
  empty: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  btnLeave: {
    borderWidth: 0.5,
    borderStyle: 'dashed',
    padding: 12,
    marginBottom: 12,
    borderColor: '#cb5a10',
    borderRadius: 8,
    backgroundColor: '#f1ecec',
  },
  btnAvailable: {
    borderColor: '#0b7d5c',
    backgroundColor: '#e6eded',
  },
  viewLeave: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnRemove: {
    paddingVertical: 4,
    paddingHorizontal: SpacingDefault.small,
    borderRadius: 8,
    borderColor: '#cd2334',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  viewApproved: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  viewAccept: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
});
