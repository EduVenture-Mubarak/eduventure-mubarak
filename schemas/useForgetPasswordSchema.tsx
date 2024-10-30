import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useForgetSchema = () => {
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email({ message: t('forgetSchema.email') }), // Custom invalid email message
  });

  return schema;
};

export default useForgetSchema;

