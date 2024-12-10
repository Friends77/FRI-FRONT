import { SubmitHandler, useForm } from "react-hook-form";

type LoginType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <input type="submit" />
      </form>
    </main>
  );
}
