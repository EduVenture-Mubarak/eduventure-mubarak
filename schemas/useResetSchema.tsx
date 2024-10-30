import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useResetSchema = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      password: z.string().min(6, { message: t('resetSchema.password') }), // Custom invalid password message
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: t('resetSchema.passwordConfirm'), // Custom message for mismatched passwords
      path: ['confirm'], // Show error on confirm field
    });

  return schema;
};

export default useResetSchema;

