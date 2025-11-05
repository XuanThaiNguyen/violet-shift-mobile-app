import { Button } from '@components/button';
import BackHeader from '@components/header/BackHeader';
import { InsetSubstitute } from '@components/insetSubtitute/insetSubstitute';
import { showSnack } from '@components/snackBar';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { IClient } from '@models/Client';
import { IShiftProgress } from '@models/Shift';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ApiStatus } from '@services/ApiStatus';
import { showErrorMessage } from '@services/errorHandler';
import { shiftService } from '@services/shift';
import { QueryObjectResponse } from '@services/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@themes/color';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import ProgressInfo from './components/progressInfo';
import { useGetClientSchedulesOfDetailShift } from './hooks';
import { ProgressOptionKeyEnum } from './types';

interface ProgressFormikValues {
  client: IClient | null;
  shift: string | null;
  description: string;
  url?: string[];
  shiftProgressType: ProgressOptionKeyEnum | null;
  metadata: Record<string, any>;
}

const initialValues: ProgressFormikValues = {
  client: null,
  shift: null,
  description: '',
  url: [],
  shiftProgressType: null,
  metadata: {},
};

const AddProgress = () => {
  const { goBack } = useNavigation();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.AddProgress>>();

  const { key, label, shiftId } = route.params ?? {};

  const inits = { ...initialValues };

  const queryClient = useQueryClient();

  const { mutate: mutateAddProgress, isPending } = useMutation({
    mutationFn: shiftService.postProgress,
    onSuccess: (data: QueryObjectResponse<IShiftProgress>) => {
      if (data.status === ApiStatus.OK) {
        showSnack({
          msg: 'Submit progress successfully',
          position: 'top',
          type: 'success',
          iconColor: colors.green,
        });
        queryClient.invalidateQueries({ queryKey: ['myShiftProgresses'] });
        queryClient.invalidateQueries({ queryKey: ['myShiftProgressEvents'] });
        goBack();
      }
    },
    onError: (error: AxiosError) => {
      showErrorMessage(error);
    },
  });

  const { values, setFieldValue, handleSubmit } =
    useFormik<ProgressFormikValues>({
      initialValues: inits,
      onSubmit: values => {
        const submitParams: any = {
          client: values.client?._id || '',
          description: values.description,
          shiftProgressType: values.shiftProgressType,
        };

        if (values.shiftProgressType === ProgressOptionKeyEnum.EXPENSE) {
          const metadata = {
            expense: values.metadata.expense || '',
          };
          submitParams.metadata = metadata;
        }

        if (values.shiftProgressType === ProgressOptionKeyEnum.MILEAGE) {
          const metadata = {
            mileage: values.metadata.mileage || '',
            mileageStartPoint: values.metadata.mileageStartPoint || '',
          };
          submitParams.metadata = metadata;
        }

        mutateAddProgress({ shiftId: values.shift!, values: submitParams });
      },
    });

  const { data: dataClientSchedules, isSuccess: isSuccessClient } =
    useGetClientSchedulesOfDetailShift({
      shiftId,
    });

  useEffect(() => {
    if (isSuccessClient && dataClientSchedules?.data?.[0]?.client) {
      setFieldValue('client', dataClientSchedules.data[0].client);
    }
    if (shiftId) setFieldValue('shift', shiftId);
    if (key) setFieldValue('shiftProgressType', key);
  }, [isSuccessClient, shiftId, key]);

  const shouldBeDisabled = useMemo(() => {
    if (values.shiftProgressType === ProgressOptionKeyEnum.EXPENSE) {
      return !values.metadata.expense || !values.description;
    }

    if (values.shiftProgressType === ProgressOptionKeyEnum.MILEAGE) {
      return !values.metadata.mileage || !values.description;
    }

    return !values.description;
  }, [values.shiftProgressType, values.description, values.metadata.expense]);

  return (
    <View style={styles.container}>
      <BackHeader title={`Add ${label}`} />
      <Spacer height={16} />
      <ProgressInfo
        values={values}
        progressKey={key}
        setFieldValue={setFieldValue}
      />
      <Button
        disabled={shouldBeDisabled}
        preset="primary"
        text="Save"
        style={styles.btnSave}
        onPress={handleSubmit}
        loading={isPending}
      />
      <InsetSubstitute type="bottom" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
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
  btnSave: {
    marginHorizontal: 16,
  },
});

export default AddProgress;
