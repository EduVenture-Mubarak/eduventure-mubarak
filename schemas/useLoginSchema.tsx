import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useLoginSchema = () => {
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email({ message: t('loginSchema.email') }), // Custom invalid email message
    password: z.string().min(1, { message: t('loginSchema.password') }), // Using translation for password error
  });

  return schema;
};

export default useLoginSchema;

