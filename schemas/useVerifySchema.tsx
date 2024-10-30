import { z } from 'zod';
import { useTranslation } from 'react-i18next';

const useVerifySchema = () => {
  const { t } = useTranslation();

  const schema = z.object({
    code: z
      .string()
      .min(6, { message: t('verifySchema.code') })
      .max(6, { message: t('verifySchema.code') }), // Custom invalid email message
  });

  return schema;
};

export default useVerifySchema;

