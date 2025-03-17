import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import Dropdown from '@/components/@common/Form/Dropdown';
import Radio from '@/components/@common/Form/Radio';
import { AUTH_ERROR_MESSAGE } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useCheckAvailability } from '@/hooks/auth/useCheckAvailability';
import signUpStepAtom from '@/recoil/auth/signUpStep/atom';
import { getDaysInMonth } from '@/utils/date';
import { moveToStep } from '@/utils/step/moveSteps';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import ImagePicker from '../../../@common/ImagePicker';
import InputField from '../../../@common/Form/InputField';
import * as Styled from './BasicInfoForm.styled';
import { BIRTH_MONTH } from '@/constants/user/month';
import { GENDER } from '@/constants/user/gender';
import { BIRTH_YEAR } from '@/constants/user/year';
import { Options } from '@/types/@common';

const BasicInfoForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  const {
    control,
    getValues,
    setValue,
    formState: { isValid },
  } = useFormContext();

  const nickname = useWatch({ name: 'nickname', control });

  // 닉네임 유효성 검사
  const { data: nicknameAvailability } = useCheckAvailability({
    type: 'nickname',
    value: nickname,
  });

  // 사용자의 생년, 생월에 해당하는 일 세팅
  const [dayOptions, setDayOptions] = useState<Options[]>([
    {
      value: '',
      label: '',
    },
  ]);

  const handleVerifyNicknameValidate = async () => {
    if (nicknameAvailability && !nicknameAvailability.isValid) {
      return nicknameAvailability.message;
    }

    return true;
  };

  const handleBirthMonthChange = (month: string) => {
    setDayOptions(getDaysInMonth(+getValues('year'), +month));
    setValue('day', '');
  };

  return (
    <Styled.BasicInfoFormWrapper>
      <Styled.BasicInfoFormHeader>프로필 작성</Styled.BasicInfoFormHeader>
      <Styled.BasicInfoFormContentSection>
        <Styled.BasicInfoFormImagePickerSection>
          <ImagePicker name="imageUrl" usage="public" />
        </Styled.BasicInfoFormImagePickerSection>
        <InputField
          type="text"
          label="닉네임"
          labelColor="Gray_1000"
          boldLabel={true}
          isRequired={true}
          name="nickname"
          rules={{
            required: {
              value: true,
              message: AUTH_ERROR_MESSAGE.NICKNAME_REQUIRED,
            },
            pattern: {
              value: AUTH_PATTERN.NICKNAME,
              message: AUTH_ERROR_MESSAGE.NICKNAME_PATTERN,
            },
            validate: handleVerifyNicknameValidate,
          }}
          placeholder="닉네임을 입력해주세요"
          isErrorMsgRelative={true}
        />
        <Styled.BasicInfoFormBirthSection>
          <Styled.BasicInfoFormBirthYearSection>
            <Controller
              name="year"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: '출생년도를 선택해주세요.',
                },
              }}
              render={({ field }) => (
                <Dropdown
                  name="year"
                  label="나이"
                  options={BIRTH_YEAR}
                  placeholder="출생년도를 선택해주세요."
                  isRequired={true}
                  value={BIRTH_YEAR.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                />
              )}
            />
          </Styled.BasicInfoFormBirthYearSection>
          <Styled.BasicInfoFormMDSection>
            <Controller
              name="month"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: '월을 선택해주세요.',
                },
              }}
              render={({ field }) => (
                <Dropdown
                  name="month"
                  width="156px"
                  options={BIRTH_MONTH}
                  placeholder="월"
                  value={BIRTH_YEAR.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(e) => {
                    field.onChange(e.value);
                    handleBirthMonthChange(e.value);
                  }}
                />
              )}
            />
            <Controller
              name="day"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: '일자를 선택해주세요',
                },
              }}
              render={({ field }) => (
                <Dropdown
                  name="day"
                  width="156px"
                  options={dayOptions}
                  placeholder="일"
                  value={dayOptions.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                />
              )}
            />
          </Styled.BasicInfoFormMDSection>
        </Styled.BasicInfoFormBirthSection>
        <Styled.BasicInfoFormGenderSection>
          <Styled.BasicInfoFormLabel>성별&nbsp;</Styled.BasicInfoFormLabel>
          <Styled.BasicInfoFormRadio>
            {GENDER.map((gender) => {
              return (
                <Radio
                  rules={{
                    required: {
                      value: true,
                      message: '성별 입력 필요',
                    },
                  }}
                  key={gender.label}
                  name="gender"
                  label={gender.label}
                  value={gender.value}
                />
              );
            })}
          </Styled.BasicInfoFormRadio>
        </Styled.BasicInfoFormGenderSection>
        <PrimaryButton
          type="button"
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
