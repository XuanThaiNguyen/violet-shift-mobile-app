import BackHeader from '@components/header/BackHeader';
import { Spacer } from '@components/spacer';
import { SpacingDefault } from '@components/spacing/spacing';
import { Typo } from '@components/typo/typo';
import { MainStackScreenProps } from '@navigation/mainStackScreenProps';
import Screen from '@navigation/screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RenderHTML from 'react-native-render-html';

const ShiftInstruction = () => {
  const route =
    useRoute<RouteProp<MainStackScreenProps, Screen.ShiftInstruction>>();

  const instruction = route.params.instruction || '';

  return (
    <View style={styles.container}>
      <BackHeader title="Instructions" />
      <Spacer height={8} />
      <ScrollView
        contentContainerStyle={styles.scrollview}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Spacer height={8} />
        {!!instruction ? (
          <RenderHTML
            contentWidth={SpacingDefault.width - SpacingDefault.normal * 2}
            tagsStyles={{
              b: { fontWeight: 'bold' },
              strong: { fontWeight: 'bold' },
              i: { fontStyle: 'italic' },
              u: { textDecorationLine: 'underline' },
            }}
            source={{
              html: instruction,
            }}
          />
        ) : (
          <Typo variant="medium_16">No instruction.</Typo>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    paddingHorizontal: SpacingDefault.normal,
  },
});

export default ShiftInstruction;
