import { useRouter } from 'next/router';
import { useState, FormEvent } from 'react';
import { setAuthenticated } from '@/redux/state/authSlice';
import { useAppDispatch } from '@/redux/hooks';

export const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    const validEmail = 'email@gmail.com';
    const validPassword = 'Qw9#Kp3$Xs6&Lm2@Rt5';

    if (email === validEmail && password === validPassword) {
      setIsLoading(true);

      dispatch(setAuthenticated(true));

      localStorage.setItem('authenticated', 'true');

      router.push('/admin');
    } else {
      alert('Невірна пошта або пароль');
    }
  };

  return (
    <section className="form">
      <form onSubmit={handleSignIn} className="form-content">
        <h2>Війдіть в акаунт</h2>
        <input style={{ backgroundColor: '#fff' }} type="email" name="email" required />
        <input style={{ backgroundColor: '#fff' }} type="password" name="password" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Війти'}
        </button>
      </form>
    </section>
  );
};
