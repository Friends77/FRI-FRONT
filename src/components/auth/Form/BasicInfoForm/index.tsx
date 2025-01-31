/**
 * 프로필 사진, 닉네임, 출생년도, 성별 입력 폼
 * @author 선우
 */

import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import Dropdown from '@/components/@common/Dropdown';
import Radio from '@/components/@common/Radio';
import { GENDER } from '@/constants/gender';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { BIRTH_MONTH } from '@/constants/month';
import { AUTH_PATTERN } from '@/constants/pattern';
import { BIRTH_YEAR } from '@/constants/year';
import { useCheckAvailability } from '@/hooks/auth/useCheckAvailability';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { getDaysInMonth } from '@/utils/date';
import { moveToStep } from '@/utils/step/moveSteps';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import ImagePicker from '../../ImagePicker';
import InputField from '../../InputField';
import * as Styled from './BasicInfoForm.styled';

const BasicInfoForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  const [days, setDays] = useState([{ value: '', label: '' }]);

  const {
    control,
    getValues,
    setValue,
    formState: { isValid },
  } = useFormContext();

  // 닉네임 유효성 검사
  const { mutateAsync: verifyNickname } = useCheckAvailability();

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

  const handleSelectBirthYM = () => {
    // 출생년도나 생월의 값이 변경되면 생일의 값을 1로 초기화
    setValue('day', '01');

    // 사용자가 선택한 출생년도
    const year = getValues('year');

    // 사용자가 선택한 생월
    const month = getValues('month');

    // 날짜 select에 날짜 세팅
    setDays(getDaysInMonth(year, month));
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
              render={({ field: { ref, value, onChange } }) => (
                <Dropdown
                  name="year"
                  label="나이(출생년도)"
                  options={BIRTH_YEAR}
                  placeholder="출생년도를 선택해주세요."
                  isRequired={true}
                  ref={ref}
                  value={BIRTH_YEAR.find((option) => option.value === value)}
                  onChange={(...args) => {
                    onChange(args[0].value);
                    handleSelectBirthYM();
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
              render={({ field: { ref, value, onChange } }) => (
                <Dropdown
                  name="month"
                  width="156px"
                  options={BIRTH_MONTH}
                  placeholder="월"
                  ref={ref}
                  value={BIRTH_YEAR.find((option) => option.value === value)}
                  onChange={(...args) => {
                    onChange(args[0].value);
                    handleSelectBirthYM();
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
                  message: '일을 선택해주세요.',
                },
              }}
              render={({ field: { ref, value, onChange } }) => (
                <Dropdown
                  name="day"
                  width="156px"
                  options={days}
                  placeholder="일"
                  ref={ref}
                  value={days.find((option) => option.value === value)}
                  onChange={(...args) => {
                    onChange(args[0].value);
                  }}
                />
              )}
            />
          </Styled.BasicInfoFormMDSection>
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
