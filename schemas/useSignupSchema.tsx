import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useSignupSchema = () => {
  const { t } = useTranslation();

  const schema = z.object({
    name: z.string().min(1, { message: t('signupSchema.name') }),
    email: z.string().email({ message: t('signupSchema.email') }), // Custom invalid email message
    password: z.string().min(6, { message: t('signupSchema.password') }), // Using translation for password error
  });

  return schema;
};

export default useSignupSchema;

