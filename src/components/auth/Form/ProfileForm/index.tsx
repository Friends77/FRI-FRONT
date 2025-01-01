import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { moveToStep } from '@/utils/step/moveSteps';
import { useSetRecoilState } from 'recoil';

const ProfileForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);
  return (
    <>
      <PrimaryButton
        type="button"
        onClick={() => moveToStep('prev', setSignUpStep)}
      >
        뒤로
      </PrimaryButton>
    </>
  );
};

export default ProfileForm;
