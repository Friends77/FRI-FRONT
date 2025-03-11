import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import CheckBox from '@/components/@common/Form/Checkbox';
import Radio from '@/components/@common/Form/Radio';
import { EI, FT, JP, NS } from '@/constants/user/mbti';
import useGetCategory from '@/hooks/@common/useGetCategory';
import { useGeoLocation } from '@/hooks/auth/useGeoLocation';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { Theme } from '@/styles/theme';
import { moveToStep } from '@/utils/step/moveSteps';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import InputField from '../../../@common/Form/InputField';
import * as Styled from './AdditionalInfoForm.styled';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const AdditionalInfoForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  useGeoLocation(geolocationOptions);

  // 관심사 조회
  const { data: categories } = useGetCategory();

  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <Styled.FormWrapper>
      <Styled.FormHeader>프로필 작성</Styled.FormHeader>
      <Styled.FormContentSection>
        <Styled.FormMBTISection>
          <Styled.FormLabel>MBTI</Styled.FormLabel>
          <Styled.FormMBTIOption>
            <Styled.FormRadio>
              {EI.map((option) => {
                return (
                  <Radio
                    key={option.label}
                    name="EI"
                    label={option.label}
                    value={option.value}
                  />
                );
              })}
            </Styled.FormRadio>
            <Styled.FormRadio>
              {NS.map((option) => {
                return (
                  <Radio
                    key={option.label}
                    name="NS"
                    label={option.label}
                    value={option.value}
                  />
                );
              })}
            </Styled.FormRadio>
            <Styled.FormRadio>
              {FT.map((option) => {
                return (
                  <Radio
                    key={option.label}
                    name="FT"
                    label={option.label}
                    value={option.value}
                  />
                );
              })}
            </Styled.FormRadio>
            <Styled.FormRadio>
              {JP.map((option) => {
                return (
                  <Radio
                    key={option.label}
                    name="JP"
                    label={option.label}
                    value={option.value}
                  />
                );
              })}
            </Styled.FormRadio>
          </Styled.FormMBTIOption>
        </Styled.FormMBTISection>
        <InputField
          type="text"
          label="한 줄 소개"
          name="selfDescription"
          placeholder="한 줄 소개를 적어주세요"
          isErrorMsgRelative={true}
          boldLabel={true}
          labelColor="Gray_1000"
        />
        <Styled.FormTagSection>
          <Styled.FormLabel>관심사 (1개 이상 선택해주세요)</Styled.FormLabel>
          <Styled.FormCheckBoxSection>
            <Styled.FormColumnSection>
              {/* 관심사 영역 */}
              {categories && (
                <>
                  {categories.map((category) => {
                    if (category.type === 'SUBJECT') {
                      return (
                        <CheckBox
                          key={category.id}
                          name="interestTag"
                          label={`${category.image}  ${category.name}`}
                          value={category.id}
                          rules={{
                            required: true,
                          }}
                        />
                      );
                    }
                  })}
                </>
              )}
            </Styled.FormColumnSection>
            <Styled.FormColumnSection>
              {/* 지역 영역 */}
              {categories && (
                <>
                  {categories.map((category) => {
                    if (category.type === 'REGION') {
                      return (
                        <CheckBox
                          key={category.id}
                          name="interestTag"
                          label={category.name}
                          value={category.id}
                        />
                      );
                    }
                  })}
                </>
              )}
            </Styled.FormColumnSection>
          </Styled.FormCheckBoxSection>
        </Styled.FormTagSection>
        <Styled.FormButtonSection>
          <PrimaryButton
            type="button"
            width="160px"
            style={{
              backgroundColor: Theme.colors.Gray_200,
              color: Theme.colors.Gray_800,
            }}
            onClick={() => moveToStep('prev', setSignUpStep)}
          >
            이전
          </PrimaryButton>
          <PrimaryButton type="submit" disabled={!isValid}>
            확인
          </PrimaryButton>
        </Styled.FormButtonSection>
      </Styled.FormContentSection>
    </Styled.FormWrapper>
  );
};

export default AdditionalInfoForm;
