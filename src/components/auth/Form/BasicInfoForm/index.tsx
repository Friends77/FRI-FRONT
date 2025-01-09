/**
 * 프로필 사진, 닉네임, 출생년도, 성별 입력 폼
 */

import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import Dropdown from '@/components/@common/Dropdown';
import Radio from '@/components/@common/Radio';
import { GENDER } from '@/constants/gender';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import { BIRTH_YEAR } from '@/constants/year';
import { useCheckAvailabilty } from '@/hooks/auth/useCheckAvailabilty';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { moveToStep } from '@/utils/step/moveSteps';
import { Controller, useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import ImagePicker from '../../ImagePicker';
import InputField from '../../InputField';
import * as Styled from './BasicInfoForm.styled';

const BasicInfoForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);
  const {
    control,
    formState: { isValid },
  } = useFormContext();

  // 닉네임 유효성 검사
  const { mutateAsync: verifyNickname } = useCheckAvailabilty();

  const handleVerifyNicknameValidate = async (value: string) => {
    const { isValid, message } = await verifyNickname({
      type: 'nickname',
      value,
    });

    if (!isValid) {
      return message;
    }

    return true;
  };

  return (
    <Styled.BasicInfoFormWrapper>
      <Styled.BasicInfoFormHeader>프로필 작성</Styled.BasicInfoFormHeader>
      <Styled.BasicInfoFormContentSection>
        <Styled.BasicInfoFormImagePickerSection>
          <ImagePicker name="imageUrl" />
        </Styled.BasicInfoFormImagePickerSection>
        <InputField
          label="닉네임"
          labelColor="Gray_1000"
          boldLabel={true}
          isRequired={true}
          name="nickname"
          rules={{
            required: {
              value: true,
              message: AUTH_ERROR_MSG.NICKNAME_REQUIRED,
            },
            pattern: {
              value: AUTH_PATTERN.NICKNAME,
              message: AUTH_ERROR_MSG.NICKNAME_PATTERN,
            },
            validate: handleVerifyNicknameValidate,
          }}
          placeholder="닉네임을 입력해주세요"
          isErrorMsgRelative={true}
        />
        <Styled.BasicInfoFormBirthSection>
          <Controller
            name="birth"
            control={control}
            rules={{
              required: {
                value: true,
                message: '출생년도를 선택해주세요.',
              },
            }}
            render={({ field: { ref, value, onChange } }) => (
              <Dropdown
                name="birth"
                label="나이(출생년도)"
                options={BIRTH_YEAR}
                placeholder="생년월일을 입력해주세요"
                isRequired={true}
                ref={ref}
                value={BIRTH_YEAR.find((option) => option.value === value)}
                onChange={(...args) => {
                  onChange(args[0].value);
                }}
              />
            )}
          />
        </Styled.BasicInfoFormBirthSection>
        <Styled.BasicInfoFormGenderSection>
          <Styled.BasicInfoFormLabel>성별&nbsp;</Styled.BasicInfoFormLabel>
          <Controller
            name="gender"
            control={control}
            rules={{
              required: {
                value: true,
                message: '성별 입력 필요',
              },
            }}
            render={() => {
              return (
                <Styled.BasicInfoFormRadio>
                  {GENDER.map((gender) => {
                    return (
                      <Radio
                        key={gender.label}
                        name="gender"
                        text={gender.label}
                        value={gender.value}
                      />
                    );
                  })}
                </Styled.BasicInfoFormRadio>
              );
            }}
          />
        </Styled.BasicInfoFormGenderSection>
        <PrimaryButton
          disabled={!isValid}
          onClick={() => moveToStep('next', setSignUpStep)}
        >
          다음
        </PrimaryButton>
      </Styled.BasicInfoFormContentSection>
    </Styled.BasicInfoFormWrapper>
  );
};

export default BasicInfoForm;
