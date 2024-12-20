import resetPasswordStepAtom from "@/recoil/auth/resetPassword";
import { moveToStep } from "@/utils/step/moveSteps";
import { useSetRecoilState } from "recoil";

const EmailVerificationForm = () => {
  const setResetPasswordStep = useSetRecoilState(resetPasswordStepAtom);

  return (
    <div>
      <p>EmailVerificationForm</p>
      <button onClick={() => moveToStep("next", setResetPasswordStep)}>
        다음
      </button>
    </div>
  );
};

export default EmailVerificationForm;
