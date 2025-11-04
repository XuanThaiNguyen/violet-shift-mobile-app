import { Button } from '@components/button';
import { Divider } from '@components/divider';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import {
  MileageStartPointEnum,
  ProgressOptionKeyEnum,
} from '@features/home/types';
import colors from '@themes/color';
import images from '@themes/images';
import { getFullName } from '@utils/handleStrings';
import React, { useMemo } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ExpenseForm from '../progressForm/ExpenseForm';
import MileageForm from '../progressForm/MileageForm';
import NoteForm from '../progressForm/NoteForm';

interface ProgressInfoProps {
  progressKey: ProgressOptionKeyEnum;
  values: any;
  setFieldValue: (key: string, value: any) => void;
}

const ProgressInfo = ({
  progressKey,
  values,
  setFieldValue,
}: ProgressInfoProps) => {
  const onSetNote = (description: string) => {
    setFieldValue('description', description);
  };

  const onSetExpense = (expense: string) => {
    setFieldValue('expense', expense);
  };

  const onSetMileage = (mileage: string) => {
    setFieldValue('mileage', mileage);
  };

  const onSetMileageStartPoint = (mileageStartPoint: MileageStartPointEnum) => {
    setFieldValue('mileageStartPoint', mileageStartPoint);
  };

  const _fullname = useMemo(() => getFullName(values.client), [values.client]);

  let moreContent = <></>;
  switch (progressKey) {
    case ProgressOptionKeyEnum.EXPENSE:
      moreContent = (
        <ExpenseForm expense={values.expense} setExpense={onSetExpense} />
      );
      break;
    case ProgressOptionKeyEnum.MILEAGE:
      moreContent = (
        <MileageForm
          mileageStartPoint={values.mileageStartPoint}
          mileage={values.mileage}
          setMileage={onSetMileage}
          setMileageStartPoint={onSetMileageStartPoint}
        />
      );
      break;
    default:
      break;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.viewProgress}>
        {moreContent}
        <View style={styles.client}>
          <FastImage source={images.avatar} style={styles.icon16} />
          <Typo variant="regular_14">
            <Typo variant="semibold_14">Client:</Typo> {_fullname}
          </Typo>
        </View>
        <Spacer height={8} />
        <Divider />
        <Spacer height={8} />
        <NoteForm note={values.description} setNote={onSetNote} />
        <Spacer height={24} />
        <Typo variant="semibold_14">Attachments</Typo>
        <Spacer height={4} />
        <Typo variant="regular_12" color={colors.secondaryText}>
          Attach any relevant documents or images here
        </Typo>
        <Spacer height={12} />
        <Button preset="secondary" style={styles.btnAttach}>
          <Typo variant="semibold_12">Attach Files</Typo>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  viewProgress: {
    marginHorizontal: SpacingDefault.normal,
    flex: 1,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  client: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SpacingDefault.smaller,
  },
  btnAttach: {
    height: 36,
  },
});

export default ProgressInfo;
