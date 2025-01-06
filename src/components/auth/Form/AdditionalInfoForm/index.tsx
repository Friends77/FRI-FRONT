/**
 * MBTI, 한 줄 소개, 관심사 입력 폼
 */

import { Controller, useFormContext } from 'react-hook-form';
import * as Styled from './AdditionalInfoForm.styled';
import { EI, FT, JP, NS } from '@/constants/mbti';
import Radio from '@/components/@common/Radio';
import InputField from '../../InputField';
import CheckBox from '@/components/@common/Checkbox';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import { Theme } from '@/styles/theme';
import { moveToStep } from '@/utils/step/moveSteps';
import { useSetRecoilState } from 'recoil';
import signUpStepAtom from '@/recoil/auth/signUp/atom';

const AdditionalInfoForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);
  const {
    control,
    formState: { isValid },
  } = useFormContext();
  return (
    <Styled.AIFormWrapper>
      <Styled.AIFormHeader>프로필 작성</Styled.AIFormHeader>
      <Styled.AIFormContentSection>
        <Styled.AIFormMBTISection>
          <Styled.AIFormMBTILabel>MBTI</Styled.AIFormMBTILabel>
          <Styled.AIFormMBTIOption>
            <Controller
              name="EI"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {EI.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="EI"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
            <Controller
              name="NS"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {NS.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="NS"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
            <Controller
              name="FT"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {FT.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="FT"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
            <Controller
              name="JP"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {JP.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="JP"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
          </Styled.AIFormMBTIOption>
        </Styled.AIFormMBTISection>
        <InputField
          label="한 줄 소개"
          name="selfDescription"
          placeholder="한 줄 소개를 적어주세요"
          isErrorMsgRelative={true}
          boldLabel={true}
          labelColor="Gray_1000"
        />
        <Styled.AIFormTagSection>
          <Styled.AIFormMBTILabel>
            관심사 (1개 이상 선택해주세요)
          </Styled.AIFormMBTILabel>
          <CheckBox name="interestTag" text="관심사1" value="관심사1" />
        </Styled.AIFormTagSection>
        <Styled.AIFormButtonSection>
          <PrimaryButton
            width="160px"
            style={{
              backgroundColor: Theme.colors.Gray_200,
              color: Theme.colors.Gray_800,
            }}
            onClick={() => moveToStep('prev', setSignUpStep)}
          >
            이전
          </PrimaryButton>
          <PrimaryButton disabled={!isValid}>확인</PrimaryButton>
        </Styled.AIFormButtonSection>
      </Styled.AIFormContentSection>
    </Styled.AIFormWrapper>
  );
};

export default AdditionalInfoForm;
