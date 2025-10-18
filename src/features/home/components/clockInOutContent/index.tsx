import { Button } from '@components/button';
import BottomModalHeader from '@components/header/BottomModalHeader';
import { Spacer } from '@components/spacer';
import { Typo } from '@components/typo/typo';
import { ClockState } from '@features/home/detailShift';
import colors from '@themes/color';
import images from '@themes/images';
import { modalUtil } from '@utils/modalUtil';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ClockInOutContentProps {
  clockState: ClockState;
  onConfirm: () => void;
}

const ClockInOutContent = ({
  clockState,
  onConfirm,
}: ClockInOutContentProps) => {
  const onCancel = () => {
    modalUtil.hideModal();
  };

  const _isClockIn = clockState === ClockState.IN;

  return (
    <View>
      <BottomModalHeader title="" />
      <Spacer height={20} />
      <FastImage
        source={_isClockIn ? images.warningCircle : images.warningAlert}
        tintColor={_isClockIn ? colors.orange : colors.primaryButton}
        style={styles.icon}
      />
      <Spacer height={20} />
      <Typo center variant="semibold_16">
        {_isClockIn ? 'Clock out' : 'Clock in'}
      </Typo>
      <Spacer height={8} />
      <Typo center variant="regular_14">
        {`Are you sure to clock ${_isClockIn ? 'out' : 'in'}?`}
      </Typo>
      <Spacer height={32} />
      <Button
        text={_isClockIn ? 'Clock out' : 'Clock in'}
        preset="primary"
        onPress={onConfirm}
      />
      <Spacer height={12} />
      <Button text="Cancel" preset="secondary" onPress={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

export default ClockInOutContent;
